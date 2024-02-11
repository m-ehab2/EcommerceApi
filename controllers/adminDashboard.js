const { verifyToken } = require("../Utilities/tokenTools");
const User = require("../models/user");

const viewUsers = async (req, res, next) => {
  try {
    // Verify the token from the request
    const isAuthenticated = verifyToken(req);

    if (!isAuthenticated) {
      // If authentication fails, return an unauthorized error
      throw new Error("Unauthorized");
    }

    // Fetch users from the database
    const users = await User.find({}, { password: 0 });

    // Return the list of users in the response
    res.json(users);
  } catch (error) {
    // If an error occurs during database operation, pass it to the error handling middleware
    next(error);
  }
};
const searchUsers = async (req, res, next) => {};

module.exports = { viewUsers, searchUsers };
