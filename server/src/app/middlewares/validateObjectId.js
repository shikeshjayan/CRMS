import mongoose from "mongoose"; // MongoDB ODM for ObjectId validation

// Middleware to validate MongoDB ObjectId parameters
const checkObjectId = (req, res, next) => {
  const { id } = req.params; // Extract ID from URL params (:id)

  // Validate MongoDB ObjectId format (24 hex characters)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Customer ID format", // Standardized error response
    });
  }

  next(); // Proceed to controller if valid
};

export default checkObjectId; // Used in customer/user/cases ID routes
