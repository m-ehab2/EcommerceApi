const Admin = require("../models/admin");
var bcrypt = require("bcryptjs");
const { createTokenAdmin } = require("../Utilities/tokenTools");

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw "Invalid email or password";
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw "Invalid email or password";
    }

    // Generate JWT token
    const token = createTokenAdmin(admin._id, admin.authorities);

    // Return success response with JWT token
    res.json({
      message: "Login successful",
      token: token,
      authorities: admin.role,
      username: admin.username,
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

module.exports = { loginAdmin };
