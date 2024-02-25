const Joi = require("joi");

const validateSchema = (schema, body) => {
  const { error } = schema.validate(body);
  if (error) {
    throw error;
  }
};

module.exports = validateSchema;
