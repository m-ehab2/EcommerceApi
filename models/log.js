const mongoose = require("mongoose");

// Define log schema
const logSchema = new mongoose.Schema(
  {
    process: { type: String, required: true },
    doneBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create Log model
const Log = mongoose.model("Log", logSchema);

module.exports = Log;
