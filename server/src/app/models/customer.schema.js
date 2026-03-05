import mongoose from "mongoose"; // MongoDB ODM for customer documents

// Customer schema for Customer Management system
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minLength: 6,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }, // Auto-add createdAt/updatedAt timestamps
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer; // Customer model for CRUD operations
