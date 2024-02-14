const Joi = require("joi");

// Define the ticket creation schema for validation
const ticketCreationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  product_ids: Joi.array().items(Joi.string()).required(),
});

module.exports = ticketCreationSchema;
