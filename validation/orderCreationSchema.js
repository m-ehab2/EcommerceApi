const Joi = require("joi");

// Define the Joi schema for order creation
const orderSchema = Joi.object({
  trackingNumber: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  }).required(),
  paymentMethod: Joi.string().required(),
  voucher: Joi.string().allow("").optional(),
  finalPrice: Joi.number().min(0).required(),
});

module.exports = orderSchema;
