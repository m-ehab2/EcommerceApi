const Joi = require("joi");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof Joi.ValidationError) {
    return res.status(422).json({
      success: false,
      error: "Invalid Schema",
    });
  } else if (err.message === "Unauthorized") {
    return res.status(401).json({
      success: false,
      error: "Unauthorized Access",
    });
  } else if (
    err.message === "User not found" ||
    err.message === "User IDs array is required" ||
    err.message === "jwt expired" ||
    err.message === "Invalid credentials" ||
    err.message === "Category not found"
  ) {
    return res.status(404).json({
      success: false,
      error: err.message,
    });
  } else if (err.code === 11000) {
    // Duplicate key error
    return res.status(409).json({
      success: false,
      error: "Duplicate key error",
    });
  } else if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      success: false,
      error: "Invalid Id",
    });
  } else if (err.message === "Email is already registered") {
    return res.status(409).json({
      success: false,
      error: "Email is already registered",
    });
  } else {
    return res.status(500).json({
      success: false,
      error: err.message || "Internal Server Error",
    });
  }
};

module.exports = errorHandler;
