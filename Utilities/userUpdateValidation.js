const Joi = require("joi");

const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  gender: Joi.string().valid("Male", "Female", "Other"),
  age: Joi.number().integer().min(0),
  email: Joi.string().email(),
  active: Joi.boolean(),
  addresses: Joi.array().items(
    Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
      country: Joi.string().required(),
    })
  ),
  phones: Joi.array().items(Joi.string()),
});

module.exports = updateUserSchema;
