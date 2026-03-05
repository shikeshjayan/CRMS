import dotenv from "dotenv";
dotenv.config(); // Load JWT_SECRET from .env
import User from "../models/users.schema.js"; // User model import
import JWT from "jsonwebtoken"; // JSON Web Token library
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
const saltRound = 5;

// Get All Users - Public endpoint
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("[ERROR] Get users failed", error);
    next(error); // Pass to global error handler
  }
};

// Get User By ID - Protected by ObjectId middleware
const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("[ERROR] Get user failed", error);
    next(error);
  }
};

// CREATE User - Generates JWT token
const register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;
    // Validate required fields
    if (!username || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check for existing user duplicate
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with same username and email already exists",
      });
    }
    const hash = await bcrypt.hash(password, saltRound);
    // Create and save new user
    const newUser = new User({
      username,
      email,
      password: hash,
      confirmPassword: hash,
      role,
    });
    await newUser.save();

    // Generate JWT token with email payload
    const token = JWT.sign({ email }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 86400 * 1000,
    });

    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };

    res.status(201).json({
      success: true,
      data: userResponse,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("[ERROR] Create user failed", error);
    next(error);
  }
};

// UPDATE User - Full update with JWT auth & duplicate check
const updateUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // JWT Authentication from cookie
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    const authenticatedUser = JWT.verify(token, process.env.JWT_SECRET);
    if (!authenticatedUser) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Check for duplicate username/email (excluding current user)
    const username = req.body.username?.trim();
    const email = req.body.email?.trim();
    if (username && email) {
      const existingUser = await User.findOne({
        username: username,
        email: email,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Another user with same name and email already exists",
        });
      }
    }

    // Perform update with validation
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User data updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("[ERROR] Update user data failed", error);
    next(error);
  }
};

// Partial UPDATE User - Only updated fields with duplicate check
const partialUpdateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateFields = { ...req.body };

    // Clean and build duplicate check conditions
    const orConditions = [];
    if (updateFields.username) {
      updateFields.username = updateFields.username.trim().toLowerCase();
      orConditions.push({ username: updateFields.username });
    }
    if (updateFields.email) {
      updateFields.email = updateFields.email.trim().toLowerCase();
      orConditions.push({ email: updateFields.email });
    }

    // Check for duplicates excluding current user
    if (orConditions.length > 0) {
      const existingUser = await User.findOne({
        $or: orConditions,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Another user with same username or email already exists",
        });
      }
    }

    // Perform partial update
    const modifiedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    if (!modifiedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User data updated successfully",
      data: modifiedUser,
    });
  } catch (error) {
    console.error("[ERROR] Partial update user failed:", error);
    next(error);
  }
};

// DELETE User by ID
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const removedUser = await User.findByIdAndDelete(userId);

    if (!removedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: { name: removedUser.username, _id: removedUser._id },
    });
  } catch (error) {
    console.error("[ERROR] Delete user failed:", error);
    next(error);
  }
};

// LoginUser
const login = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is required",
      });
    }

    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }

    const payload = { email: user.email, role: user.role };
    const token = generateToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      user: {
        email: user.email,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("[ERROR] Login user failed:", error);
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const checkUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User validated",
    user: req.user,
  });
};

export {
  getAllUsers,
  getUserById,
  register,
  updateUsers,
  partialUpdateUserById,
  deleteUser,
  login,
  logout,
  checkUser,
};
