const Joi = require("joi");

// Joi validation schema for category
const categoryValidationSchema = Joi.object({
  name: Joi.string().min(4).required(),
  description: Joi.string().min(10).required(),
  subCategories: Joi.array().items(Joi.string().required()).min(1),
});

module.exports = categoryValidationSchema;
