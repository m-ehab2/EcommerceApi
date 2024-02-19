const userSchema = require("../validation/userRegistrationValidation");
const { createTokenUser } = require("../utilities/tokenTools");
const User = require("../models/user");
var bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables from .env file

const registerUser = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw error;
    }

    // Extract user information from request body
    const { firstName, lastName, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    // Hashing the entered password
    let hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user and add it to the database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Return success response and JWT
    res.status(201).json({
      message: "User registered successfully",
      Token: createTokenUser(user._id, user.active),
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = createTokenUser(user._id, user.active);

    // Return success response with JWT token
    res.status(200).json({
      message: "Login successful",
      Token: token,
      Active: user.active,
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

module.exports = { registerUser, loginUser };
