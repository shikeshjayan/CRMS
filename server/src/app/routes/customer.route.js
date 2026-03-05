import express from "express"; // Express router for customer management
import {
  createCustomer,
  getCustomerById,
  getCustomers,
  partialUpdateCustomerById,
  updateCustomers,
  deleteCustomer,
} from "../controllers/customer.controller.js";
import checkObjectId from "../middlewares/validateObjectId.js"; // MongoDB ObjectId validation

const customerRouter = express.Router(); // Dedicated customer routes

// RESTful CRUD Routes for Customer Management API
customerRouter.get("/", getCustomers); // List all customers
customerRouter.get("/:id", checkObjectId, getCustomerById); // Get single customer (ID validated)
customerRouter.post("/", createCustomer); // Create new customer
customerRouter.put("/:id", checkObjectId, updateCustomers); // Replace entire customer (ID validated)
customerRouter.patch("/:id", checkObjectId, partialUpdateCustomerById); // Partial update (ID validated)
customerRouter.delete("/:id", checkObjectId, deleteCustomer); // Delete customer (ID validated)

export default customerRouter; // Mount at /api/v1/customers in app.js
