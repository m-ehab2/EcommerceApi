const mongoose = require("mongoose");

// Define the ticket schema
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    product_ids: [
      {
        type: String,
      },
    ],
    state: {
      type: String,
      enum: ["open", "in progress", "resolved", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

// Create a Ticket model based on the schema
const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
