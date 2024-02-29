const mongoose = require("mongoose");

// Define order schema
const orderSchema = new mongoose.Schema(
  {
    trackingNumber: { type: String, unique: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Credit"],
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "packaging", "shipping", "delivered", "canceled"],
      default: "pending",
    },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
    voucher: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher" },
    finalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Adding a virtual property to calculate total number of products in an order
orderSchema.virtual("totalItems").get(function () {
  return this.products.reduce((total, product) => total + product.quantity, 0);
});

// Create Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
