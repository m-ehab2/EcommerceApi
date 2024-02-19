const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Extract token from the request (e.g., from headers)
    const header = req.headers.authorization;

    if (!header) {
      // If no token is provided, authentication fails
      throw new Error("No token detected");
    }

    // Check if the token is in the correct format (Bearer <token>)
    const [bearer, token] = header.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new Error("Invalid token format");
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If verification succeeds, the token is valid
    req.user = decoded; // Set the decoded user data on the request object for further use
    next();
  } catch (error) {
    // Pass errors to the error handling middleware
    next(error);
  }
};

module.exports = verifyToken;
