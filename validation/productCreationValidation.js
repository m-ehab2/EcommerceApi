const Joi = require("joi");

// Define Joi schema for product validation
const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.array(),
  modelNumber: Joi.string().required(),
  manufacturer: Joi.string().required(),
  countryOfOrigin: Joi.string().required(),
  brandName: Joi.string().required(),
  price: Joi.number().required(),
  discountPercentage: Joi.number().default(0),
  reviews: Joi.array().items(Joi.string()),
  category: Joi.string().required(),
  keywords: Joi.array().items(Joi.string()),
  frozen: Joi.boolean().default(false),
  tickets: Joi.array().items(Joi.string()),
  stock: Joi.number().default(0),
});

module.exports = productValidationSchema;
