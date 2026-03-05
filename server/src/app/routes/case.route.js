import express from "express"; // Express router for case management
import {
  createCases,
  deleteCases,
  getCases,
  getCasesById,
  updateCases,
  partialUpdateCasesById,
} from "../controllers/cases.controller.js";

const casesRouter = express.Router(); // Create dedicated router instance

// RESTful CRUD Routes for Case Management API
casesRouter.get("/", getCases); // List all cases
casesRouter.get("/:id", getCasesById); // Retrieve single case
casesRouter.post("/", createCases); // Create new case
casesRouter.put("/:id", updateCases); // Replace entire case
casesRouter.patch("/:id", partialUpdateCasesById); // Update specific fields
casesRouter.delete("/:id", deleteCases); // Delete case by ID

export default casesRouter; // Mount at /api/v1/cases in app.js
