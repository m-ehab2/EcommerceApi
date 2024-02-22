// Import necessary modules
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

// Middleware function to check admin authorities
const checkAdminAuthorities =
  (requiredAuthorities) => async (req, res, next) => {
    try {
      // Extract token from request headers
      const token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find admin user by decoded id
      const admin = await Admin.findById(decoded.id);

      // If admin is not matched with a token ID throw the unauthorized error
      if (!admin) {
        throw new Error("Unauthorized");
      }

      // Check if admin authorities meet the required authorities
      const hasRequiredAuthorities = requiredAuthorities.every(
        (authority) => admin.authorities[authority]
      );

      if (!hasRequiredAuthorities) {
        throw new Error("Unauthorized");
      }

      // If authorities are sufficient, proceed to the next middleware
      next();
    } catch (error) {
      // If token is invalid or admin is not found, return 401 Unauthorized
      next(error);
    }
  };

module.exports = checkAdminAuthorities;
