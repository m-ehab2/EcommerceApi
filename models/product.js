const mongoose = require("mongoose");

// Define product schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [{ name: { type: String }, url: { type: String } }],
    description: { type: String },
    modelNumber: { type: String, unique: true },
    manufacturer: { type: String },
    countryOfOrigin: { type: String },
    brandName: { type: String },
    colors: [
      {
        colorName: { type: String },
        quantity: { type: Number, default: 0 },
      },
    ],
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    ratings: {
      count: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: String },
    keywords: [{ type: String }],
    frozen: { type: Boolean, default: false },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Calculate stock property as sum of quantities of all colors
productSchema.virtual("stock").get(function () {
  if (this.colors) {
    return this.colors.reduce((total, color) => total + color.quantity, 0);
  } else {
    return null;
  }
});

// Indexes
productSchema.index({ name: 1 });
productSchema.index({ brandName: 1 });

// Create Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
