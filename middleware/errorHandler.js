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
    err.message === "Invalid Schema" ||
    err.message === "Product IDs array is required" ||
    err.message === "Expiry date is older than current date"
  ) {
    return res.status(422).json({
      success: false,
      error: err.message,
    });
  } else if (
    err.message === "User not found" ||
    err.message === "Product not found" ||
    err.message === "User IDs array is required" ||
    err.message === "No products found to delete" ||
    err.message === "jwt expired" ||
    err.message === "Invalid credentials" ||
    err.message === "Category not found" ||
    err.message === "Voucher not found" ||
    err.message === "Invalid Category"
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
  } else if (err.message === "Invalid email or password") {
    return res.status(401).json({
      success: false,
      error: "Invalid Email or Password",
    });
  } else if (
    err.message === "Email is already registered" ||
    err.message === "Duplicate Product" ||
    err.message === "Duplicate Admin Username"
  ) {
    return res.status(409).json({
      success: false,
      error: err.message,
    });
  } else {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Un Handled Error: " + (err.message || "Internal Server Error"),
    });
  }
};

module.exports = errorHandler;
