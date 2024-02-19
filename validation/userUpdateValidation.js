const Joi = require("joi");

const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  age: Joi.number().integer().min(0).required(),
  address_1: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  }),
  address_2: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
  }),
  phones: Joi.array().items(Joi.number()).required(),
});

module.exports = updateUserSchema;
