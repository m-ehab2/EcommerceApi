const updateUserSchema = require("../validation/userUpdateValidation");
const User = require("../models/user");

//User Control Logic
const getAllUsers = async (req, res, next) => {
  try {
    // Getting query data
    const { search, gender, state, city, val1, val2, sortBy, order } =
      req.query;

    // Setting search query as an empty object for dynamic searching
    let searchQuery = {};

    // Assigning search key
    if (search) {
      if (search.match(/^[0-9a-fA-F]{24}$/)) {
        // If the query is a valid MongoDB ID
        searchQuery._id = search;
      } else if (search.includes("@")) {
        // If the query contains '@', assume it's an email
        searchQuery.email = { $regex: search, $options: "i" };
      } else if (search.match(/^01\d{9}$/)) {
        // If the query is a phone number following the pattern "01xxxxxxxxx" without spaces
        searchQuery.phones = `[${search}]`;
      } else {
        // if the query is a string not matching the patterns match it with last name or first name
        searchQuery["$and"] = []; // we create an and to merge it with city and state queries
        searchQuery["$and"].push({
          $or: [{ firstName: search }, { lastName: search }],
        });
      }
    }
    // Checking for different search parameters and adding them to the dynamic query
    if (gender) {
      searchQuery.gender = gender;
    }
    if (state || city) {
      if (searchQuery["$and"]) {
        if (state) {
          searchQuery["$and"].push({
            $or: [{ "address_1.state": state }, { "address_2.state": state }],
          });
        }
        if (city) {
          searchQuery["$and"].push({
            $or: [{ "address_1.city": city }, { "address_2.city": city }],
          });
        }
      } else {
        searchQuery["$or"] = [];
        if (state) {
          searchQuery["$or"].push(
            { "address_1.state": state },
            { "address_2.state": state }
          );
        }
        if (city) {
          searchQuery["$or"].push(
            { "address_1.city": city },
            { "address_2.city": city }
          );
        }
      }
    }

    if (val1 && val2) {
      searchQuery.age = {
        $gt: Math.min(val1, val2),
        $lt: Math.max(val1, val2),
      };
    }
    console.log(searchQuery);

    // Parse query parameters for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch users from the database
    const user = await User.find(searchQuery, { password: 0 })
      .skip(skip)
      .limit(limit);

    // Return the list of users in the response
    res.status(200).json(user);
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    // Fetch users from the database
    const user = await User.findById(req.params.userId, { password: 0 });

    if (!user) {
      throw new Error("User not found");
    }
    // Return the list of users in the response
    res.status(200).json(user);
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
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
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

const deactivateUsers = async (req, res, next) => {
  try {
    // Get array of user ids from request body
    const userIds = req.body.userIds;

    // Check if userIds is not an array or is empty
    if (!Array.isArray(userIds) || userIds.length === 0) {
      throw new Error("User IDs array is required");
    }

    // Update all users in the database to deactivate their accounts
    const updatedUsers = await User.updateMany(
      { _id: { $in: userIds } },
      { active: false }
    );

    // Check if any users were updated
    if (updatedUsers.modifiedCount === 0) {
      throw new Error("No users found to deactivate");
    }

    // Return a success message or the number of users deactivated
    res.status(200).json({
      message: `${updatedUsers.modifiedCount} users deactivated successfully`,
    });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

const activateUsers = async (req, res, next) => {
  try {
    // Get array of user ids from request body
    const userIds = req.body.userIds;

    // Check if userIds is not an array or is empty
    if (!Array.isArray(userIds) || userIds.length === 0) {
      throw new Error("User IDs array is required");
    }

    // Update all users in the database to deactivate their accounts
    const updatedUsers = await User.updateMany(
      { _id: { $in: userIds } },
      { active: true }
    );

    // Check if any users were updated
    if (updatedUsers.modifiedCount === 0) {
      throw new Error("No users found to deactivate");
    }

    // Return a success message or the number of users deactivated
    res.status(200).json({
      message: `${updatedUsers.modifiedCount} users activated successfully`,
    });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    // Get array of user ids from request body
    const userIds = req.body.userIds;

    // Check if userIds is not an array or is empty
    if (!Array.isArray(userIds) || userIds.length === 0) {
      throw new Error("User IDs array is required");
    }

    // Delete all users from the database
    const deletedUsers = await User.deleteMany({ _id: { $in: userIds } });

    // Check if any users were deleted
    if (deletedUsers.deletedCount === 0) {
      throw new Error("No users found to delete");
    }

    // Return a success message or the number of users deleted
    res.status(200).json({
      message: `${deletedUsers.deletedCount} users deleted successfully`,
    });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

module.exports = {
  getAllUsers,
  editUserProfile,
  deactivateUsers,
  deleteUsers,
  getUser,
  activateUsers,
};
