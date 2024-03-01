const updateUserSchema = require("../validation/userUpdateValidation");
const User = require("../models/user");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");
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
        searchQuery.phones = [search];
      } else {
        // if the query is a string not matching the patterns match it with last name or first name
        searchQuery["$and"] = []; // we create an and to merge it with city and state queries
        searchQuery["$and"].push({
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
          ],
        });
      }
    }
    // Checking for different search parameters and adding them to the dynamic query
    if (gender) {
      searchQuery.gender = gender;
    }
    // If the search query has a city or a state
    if (state || city) {
      // We check if an and query has been selected already
      if (searchQuery["$and"]) {
        // We assert a parameter of and to be the or of address1.state or address2.state
        if (state) {
          searchQuery["$and"].push({
            $or: [{ "address_1.state": state }, { "address_2.state": state }],
          });
        }
        // We assert a parameter of and to be the or of address1.city or address2.city
        if (city) {
          searchQuery["$and"].push({
            $or: [{ "address_1.city": city }, { "address_2.city": city }],
          });
        }
      } else {
        // If an and key hasn`t been added to the query we add it
        searchQuery["$and"] = [];
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
      }
    }
    // Check if the query has age values or not
    if (val1 && val2) {
      searchQuery.age = {
        $gt: Math.min(val1, val2),
        $lt: Math.max(val1, val2),
      };
    }

    const sortQuery = {};
    if (sortBy && (order ? order : "desc")) {
      if (sortBy === "orders") {
        sortQuery["orders"] = order === "desc" ? -1 : 1; // if i am sorting by orders the sorting object is modified
      } else {
        sortQuery[sortBy] = order === "desc" ? -1 : 1; // order can be 'asc' or 'desc'
      }
    } else {
      // If sortBy or order is not provided some default criteria is provided
      sortQuery["firstName"] = -1; // sorting by firstName field in descending order
    }

    // Query the search query to get the count of documents
    const totalCount = await User.countDocuments(searchQuery);

    // Parse query parameters for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch users from the database using aggregation
    const users = await User.aggregate([
      {
        // Match documents to the search query
        $match: searchQuery,
      },
      {
        // Add a new field for orders array length
        $addFields: {
          orders: { $size: "$orders" }, // Add a new field representing the length of the orders array
        },
      },
      {
        // Sort my query based on the sorting provided
        $sort: sortQuery,
      },
      {
        // Modify the results for pagination
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          password: 0, // Exclude the password field
        },
      },
    ]);

    // // Return the list of users in the response
    res.status(200).json({ users, totalCount });
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

    // // Check if the user was found and updated
    if (!updatedUser) {
      throw new Error("User not found");
    }

    // Return the updated user profile
    res.status(200).json({ success: true, user: updatedUser });
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

    userIds.forEach(async (e) => {
      const user = await User.findById(e);
      if (!user) {
        throw new Error("User not Found");
      }
      if (user.orders) {
        if (user.orders.length > 0) {
          user.orders.forEach(async (e) => {
            await Order.findByIdAndDelete(e);
          });
        }
      }
    });

    // Delete all users from the database
    const deletedUsers = await User.deleteMany({ _id: { $in: userIds } });

    // Check if any users were deleted
    if (deletedUsers.deletedCount === 0) {
      throw new Error("No users found to delete");
    }
    //Get username of authorized admin
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Create log item
    await Log.create({
      process: `Deleted ${userIds.length} Users`,
      doneBy: decoded.username,
    });

    // Return a success message or the number of users deleted
    res.status(200).json({
      success: true,
      message: `Deleted ${deletedUsers.deletedCount} users`,
    });
  } catch (error) {
    // Pass the error to the next middleware
    console.log("xx");
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
