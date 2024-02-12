const updateUserSchema = require("../Utilities/userUpdateValidation");
const User = require("../models/user");

const viewUsers = async (req, res, next) => {
  try {
    // Fetch users from the database
    const users = await User.find({}, { password: 0 });

    // Return the list of users in the response
    res.json(users);
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};
const searchUsers = async (req, res, next) => {
  try {
    // Get query parameter from request
    const query = req.query.par;

    // Construct the query based on the provided criteria
    let searchQuery;
    if (query.match(/^[0-9a-fA-F]{24}$/)) {
      // If the query is a valid MongoDB ID
      searchQuery = { _id: query };
    } else if (query.includes("@")) {
      // If the query contains '@', assume it's an email
      searchQuery = { email: query };
    } else if (query.match(/^01\d{9}$/)) {
      // If the query is a phone number following the pattern "01xxxxxxxxx" without spaces
      searchQuery = { phones: [query] };
    } else {
      // If the query doesn't match any of the expected formats, return an empty result
      return res.json({ users: [] });
    }

    // Execute the query
    const users = await User.find(searchQuery, { password: 0 });

    // Return the search results
    res.json({ users });
  } catch (error) {
    // Handle errors
    next(error);
  }
};
const editUserProfile = async (req, res, next) => {
  try {
    // Get user id and updated info from request
    const userId = req.params.userId;
    const updates = req.body;

    // Perform validation or any necessary preprocessing of the updates
    const { error } = updateUserSchema.validate(updates);
    if (error) {
      throw error;
    }

    // Update the user profile in the database and store the updated document
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, updates, {
      new: true,
      projection: { password: 0 },
    });

    // Check if the user was found and updated
    if (!updatedUser) {
      throw new Error("User not found");
    }

    // Return the updated user profile
    res.json({ user: updatedUser });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

const deactivateUser = async (req, res, next) => {
  try {
    // Get user id from request
    const userId = req.params.userId;

    // Update the user profile in the database to deactivate the account
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { active: false },
      { new: true }
    );

    // Check if the user was found and deactivated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return a success message or the updated user profile
    res.json({ message: "User deactivated successfully", user: updatedUser });
  } catch (error) {
    // Handle errors
    next(error);
  }
};
module.exports = { viewUsers, searchUsers, editUserProfile, deactivateUser };
