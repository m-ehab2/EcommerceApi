const Joi = require("joi");

const validateSchema = (schema, body) => {
  const { error } = schema.validate(body);
  if (error) {
    throw new Error("Invalid Schema");
  }
};

module.exports = validateSchema;
