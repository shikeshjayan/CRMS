import dotenv from "dotenv";
dotenv.config(); // Load environment variables from custom .env file

import app from "./app/app.js"; // Import Express app instance
import { connectDB } from "./config/db.js"; // Import database connection function

const PORT = process.env.PORT || 5000; // Set port from env or default to 5000

// Start server with DB connection
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1); // Exit process on startup failure
  }
};

startServer(); // Initialize server
