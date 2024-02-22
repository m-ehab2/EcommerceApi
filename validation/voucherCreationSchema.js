const Joi = require("joi");

// Define the validation schema for the voucher model
const voucherValidationSchema = Joi.object({
  code: Joi.string().required(),
  discount: Joi.number().required().min(0),
  type: Joi.string().required().valid("flat", "percentage"),
  expiryDate: Joi.date().iso().required(),
  maxUsage: Joi.number().integer().min(1).allow(null),
  currentUsage: Joi.number().integer().min(0).default(0),
  active: Joi.boolean().default(true),
});

module.exports = voucherValidationSchema;
