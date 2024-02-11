const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

// Create a token based on id
const createToken = (id) => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
};

const verifyToken = (req) => {
  // Extract token from the request (e.g., from headers)
  const header = req.headers.authorization;

  if (!header) {
    // If no token is provided, authentication fails
    return false;
  }

  try {
    token = header.split(" ")[1];

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If verification succeeds, the token is valid
    return true;
  } catch (error) {
    // If verification fails (e.g., token expired, invalid signature), authentication fails
    return false;
  }
};

module.exports = { createToken, verifyToken };
