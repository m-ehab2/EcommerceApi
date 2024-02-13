const mongoose = require("mongoose");

// Define category schema
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    subCategories: [String],
  },
  {
    timestamps: true,
  }
);

// Add index to name field
categorySchema.index({ name: 1 }, { unique: true });

// Create Category model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
