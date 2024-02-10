const Joi = require("joi");
const errorHandler = (err, req, res, next) => {
  //   console.error(err.stack);
  console.log(err);
  if (err instanceof Joi.ValidationError) {
    return res.status(400).json({
      success: false,
      error: "Invalid Schema",
    });
  } else if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      success: false,
      error: "Invalid Id",
    });
  } else if (err.message === "Email is already registered") {
    return res.status(400).json({
      success: false,
      error: "Email is already registered",
    });
  } else if (err.message === "Invalid credentials") {
    return res.status(400).json({
      success: false,
      error: "Invalid Credentials",
    });
  } else {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

module.exports = errorHandler;
