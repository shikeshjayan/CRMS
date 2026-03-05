import express from "express"; // Express framework
import customerRouter from "../app/routes/customer.route.js"; // Customer API routes
import { handleErrors } from "../errors/genericErrors.js"; // Global error handler
import casesRouter from "./routes/case.route.js"; // Case management routes
import userRouter from "./routes/user.route.js"; // User API routes
import cookieParser from "cookie-parser"; // Parse cookies from requests
import cors from "cors";

const app = express(); // Create Express application instance

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies from HTTP requests

// API Routes (v1)
app.use("/api/v1/customers", customerRouter); // Customer endpoints
app.use("/api/v1/cases", casesRouter); // Case management endpoints
app.use("/api/v1/users", userRouter); // User endpoints

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Hello World"); // Root route response
});

// Global error handling (catch-all)
app.use(handleErrors);

export default app; // Export for server.js
