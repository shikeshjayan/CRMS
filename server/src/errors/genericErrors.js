// Global error handling middleware for Express app
const handleErrors = (error, req, res, next) => {
  console.log(error); // Log error for debugging

  const statusCode = error.statusCode || 500; // Default to 500 for unhandled errors

  // Standardized error response format
  const response = {
    success: false,
    message: statusCode === 500 ? "Internal Server Error" : error.message,
  };

  res.status(statusCode).json(response); // Send JSON error response
};

export { handleErrors };
