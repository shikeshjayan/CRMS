import "dotenv/config"; // Load environment variables automatically
import mongoose from "mongoose"; // MongoDB ODM for Node.js

// Connect to MongoDB Atlas using MONGO_URL from .env
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // Establish DB connection
    console.log("Database connected successfully");
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};

export { connectDB }; // Export for server.js usage
