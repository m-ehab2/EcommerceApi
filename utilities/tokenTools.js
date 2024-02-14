const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

// Create a token based on id
const createTokenUser = (email, status) => {
  const token = jwt.sign(
    { email: email, active: status },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return token;
};
const createTokenAdmin = (id, authorities) => {
  const token = jwt.sign(
    { id: id, authorities: authorities },
    process.env.JWT_SECRET,
    {
      expiresIn: "10h",
    }
  );
  return token;
};

const verifyToken = (req) => {
  // Extract token from the request (e.g., from headers)
  console.log(req.headers.Authorization);
  const header = req.headers.Authorization;

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

module.exports = { createTokenUser, verifyToken, createTokenAdmin };
