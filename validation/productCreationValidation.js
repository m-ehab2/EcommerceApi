const Joi = require("joi");

// Define Joi schema for product validation
const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  images: Joi.array().items(
    Joi.object({ name: Joi.string(), url: Joi.string() })
  ),
  description: Joi.string().required(),
  modelNumber: Joi.string().required(),
  manufacturer: Joi.string().required(),
  countryOfOrigin: Joi.string().required(),
  brandName: Joi.string().required(),
  colors: Joi.array()
    .items(
      Joi.object({
        colorName: Joi.string(),
        quantity: Joi.number().default(0),
      })
    )
    .required(),
  price: Joi.number().required(),
  discountPercentage: Joi.number().default(0),
  ratings: Joi.object({
    count: Joi.number().default(0),
    average: Joi.number().default(0),
  }).required(),
  reviews: Joi.array().items(Joi.string()),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  keywords: Joi.array().items(Joi.string()),
  frozen: Joi.boolean().default(false),
  tickets: Joi.array().items(Joi.string()),
});

module.exports = productValidationSchema;
