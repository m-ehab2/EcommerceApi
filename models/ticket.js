const mongoose = require("mongoose");

// Define the ticket schema
const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["product", "order"], required: true },
    item_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
    state: {
      type: String,
      enum: ["open", "in progress", "resolved", "closed"],
      default: "open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Ticket model based on the schema
const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
