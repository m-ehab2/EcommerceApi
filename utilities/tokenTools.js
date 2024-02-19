const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

// Create a token based on id
const createTokenUser = (id, status) => {
  const token = jwt.sign({ id: id, active: status }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
};
const createTokenAdmin = (id, authorities, username) => {
  const token = jwt.sign(
    { id: id, authorities: authorities, username },
    process.env.JWT_SECRET,
    {
      expiresIn: "10h",
    }
  );
  return token;
};

module.exports = { createTokenUser, createTokenAdmin };
