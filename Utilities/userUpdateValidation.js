const Joi = require("joi");

const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  age: Joi.number().integer().min(0).required(),
  addresses: Joi.array().items(
    Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
    }).required()
  ),
  phones: Joi.array().items(Joi.number()).required(),
});

module.exports = updateUserSchema;
