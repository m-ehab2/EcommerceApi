const Joi = require("joi");

// Define Joi schema for ticket creation
const ticketCreationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  item_ids: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .required(),
});

module.exports = ticketCreationSchema;
