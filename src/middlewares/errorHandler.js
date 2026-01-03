const ApiError = require("../utils/apiError");

module.exports = (err, req, res, next) => {
  // Known / expected errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unknown / system errors
  console.error("Unhandled Error:", err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
