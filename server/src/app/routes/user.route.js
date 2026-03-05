import express from "express"; // Express router for user management
import {
  register,
  deleteUser,
  getAllUsers,
  getUserById,
  partialUpdateUserById,
  updateUsers,
  login,
  checkUser,
  logout,
} from "../controllers/user.controller.js";
import checkObjectId from "../middlewares/validateObjectId.js"; // MongoDB ObjectId validation
import tokenValidation from "../middlewares/auth.middleware.js";

const userRouter = express.Router(); // Dedicated user routes

// RESTful CRUD Routes for User Management API
userRouter.get("/", getAllUsers); // List all users
userRouter.get("/checkUser", tokenValidation, checkUser);
userRouter.get("/:id", checkObjectId, tokenValidation, getUserById); // Get single user (ID validated)
userRouter.post("/register", register); // Register new user
userRouter.post("/login", login); // Login user
userRouter.post("/logout", logout); // Login user
userRouter.put("/:id", checkObjectId, tokenValidation, updateUsers); // Replace entire user (ID validated)
userRouter.patch("/:id", checkObjectId, tokenValidation, partialUpdateUserById); // Partial update (ID validated)
userRouter.delete("/:id", checkObjectId, deleteUser); // Delete user (ID validated)

export default userRouter; // Mount at /api/v1/users in app.js
