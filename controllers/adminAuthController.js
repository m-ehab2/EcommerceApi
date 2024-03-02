const Admin = require("../models/admin");
var bcrypt = require("bcryptjs");
const { createTokenAdmin } = require("../utilities/tokenTools");
const adminValidationSchema = require("../validation/adminCreationValidation");
const jwt = require("jsonwebtoken");
const Log = require("../models/log");
const validateSchema = require("../helpers/validateSchema");

const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user by email
    const admin = await Admin.findOne({ username });
    if (!admin) {
      throw new Error("Invalid email or password");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = createTokenAdmin(
      admin._id,
      admin.authorities,
      admin.username
    );

    // Return success response with JWT token
    res.status(200).json({
      message: "Login successful",
      token: token,
      username: admin.username,
      authorities: admin.authorities,
      id: admin._id,
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    // Validate request body
    validateSchema(adminValidationSchema, req.body);

    // Get admin info from request body
    const { username, password, authorities } = req.body;

    // Check duplicate username
    const admin = await Admin.findOne({ username: username });
    if (admin) {
      throw new Error("Duplicate Admin Username");
    }

    // Decode token to get admin ID
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hash admin password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new admin
    const newAdmin = await Admin.create({
      username: username,
      password: hashedPassword,
      createdBy: decoded.username,
      authorities: authorities,
    });

    // Create log item
    await Log.create({
      process: `Deleted ${newAdmin.username}`,
      doneBy: decoded.username,
    });

    // Return success response with JWT token
    res.status(201).json({
      message: "Register successful",
      newUsername: newAdmin.username,
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

const getAllAdmins = async (req, res, next) => {
  try {
    // Retrieve all admins from the database
    const admins = await Admin.find({}, { password: 0 });

    // Check if any admins were found
    if (!admins || admins.length === 0) {
      return res.status(200).json({ message: "No admins found" });
    }

    // Return the admins
    res.status(200).json({ admins });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    // Extract admin ID and updated authorities from request body
    const id = req.params.adminId;
    const authorities = req.body;

    // Update authorities for the admin in the database
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { authorities },
      { new: true }
    );

    console.log(updatedAdmin);

    // Check if admin with the provided ID exists
    if (!updatedAdmin) {
      throw new Error("Admin not found");
    }

    //Get username of authorized admin
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Create log item
    await Log.create({
      process: `Updated Admin ${updatedAdmin.username}`,
      doneBy: decoded.username,
    });

    // Return the updated admin
    res
      .status(200)
      .json({ success: true, newAuthorities: updatedAdmin.authorities });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    // Extract admin ID from request parameters
    const adminId = req.params.adminId;

    // Find admin by ID and delete
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    // Check if admin with the provided ID exists
    if (!deletedAdmin) {
      throw new Error("Admin not found");
    }

    //Get username of authorized admin
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Create log item
    await Log.create({
      process: `Deleted Admin ${deletedAdmin.username}`,
      doneBy: decoded.username,
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: `Admin ${deletedAdmin.username} deleted successfully`,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

module.exports = {
  loginAdmin,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
