// adminValidation.js
const Joi = require("joi");

// Define Joi schema for admin validation
const adminValidationSchema = Joi.object({
  username: Joi.string().min(4).required().lowercase(),
  password: Joi.string()
    .min(8)
    .regex(/^ad-(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/)
    .required(),
  authorities: Joi.object({
    users: Joi.boolean(),
    orders: Joi.boolean(),
    products: Joi.boolean(),
    categories: Joi.boolean(),
    vouchers: Joi.boolean(),
    admin: Joi.boolean(),
  }).required(),
});

module.exports = adminValidationSchema;
