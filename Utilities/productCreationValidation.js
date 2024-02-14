const Joi = require("joi");

// Define Joi schema for product validation
const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  images: Joi.array().items(
    Joi.object({ name: Joi.string(), url: Joi.string() })
  ),
  description: Joi.string(),
  modelNumber: Joi.string(),
  manufacturer: Joi.string(),
  countryOfOrigin: Joi.string(),
  brandName: Joi.string(),
  colors: Joi.array().items(
    Joi.object({
      colorName: Joi.string(),
      quantity: Joi.number().default(0),
    })
  ),
  price: Joi.number().required(),
  discountPercentage: Joi.number().default(0),
  ratings: Joi.object({
    count: Joi.number().default(0),
    average: Joi.number().default(0),
  }),
  reviews: Joi.array().items(Joi.string()),
  category: Joi.string(),
  subCategory: Joi.string(),
  keywords: Joi.array().items(Joi.string()),
  frozen: Joi.boolean().default(false),
  tickets: Joi.array().items(Joi.string()),
});

module.exports = productValidationSchema;
