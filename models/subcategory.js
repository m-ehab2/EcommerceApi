const mongoose = require('mongoose');

// Define subcategory schema
const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

// Create SubCategory model
const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
