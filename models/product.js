const mongoose = require("mongoose");

// Define product schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    description: { type: String },
    modelNumber: { type: String },
    manufacturer: { type: String },
    countryOfOrigin: { type: String },
    brandName: { type: String },
    stock: { type: Number, default: 0 },
    colors: [{ type: String }],
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    keywords: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Create Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
