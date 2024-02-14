const Joi = require("joi");

// Define schema for user registration
const userSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z]+$/)
    .required(),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z]+$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required(),
});

module.exports = userSchema;
