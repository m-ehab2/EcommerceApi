const mongoose = require("mongoose");

// Define admin schema
const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    authorities: {
      Users: { type: Boolean, default: false },
      Orders: { type: Boolean, default: false },
      Products: { type: Boolean, default: false },
      Categories: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

// Create Admin model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
