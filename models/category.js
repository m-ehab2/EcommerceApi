const mongoose = require('mongoose');

// Define category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
});

// Create Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
