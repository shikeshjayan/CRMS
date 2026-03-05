import mongoose from "mongoose"; // MongoDB ODM for user documents

// User schema for User Management system
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "customer"],
      required: true,
    },
  },
  { timestamps: true }, // Auto-add createdAt/updatedAt timestamps
);

const User = mongoose.model("users", userSchema);

export default User; // User model for CRUD operations
