const validateSchema = require("../helpers/validateSchema");
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const Voucher = require("../models/voucher");
const orderSchema = require("../validation/orderCreationSchema");

const createOrder = async (req, res, next) => {
  try {
    // Validate request body against the Joi schema
    validateSchema(orderSchema, req.body);

    // Getting user id from the request - assigned at middleware
    const user = req.user.id;

    // Extract order details from request body
    const {
      products,
      address,
      paymentMethod,
      deliveryStatus,
      voucher,
      finalPrice,
    } = req.body;

    // Generating a random tracking number
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let trackingNumber = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      trackingNumber += characters[randomIndex];
    }

    // Checking for duplicate tracking number
    const oldOrder = await Order.findOne({ trackingNumber: trackingNumber });
    if (oldOrder) {
      const error = new Error("Duplicate Order");
      error.code = 11000;
      throw error;
    }

    // Checking for voucher and updating usage status
    if (voucher) {
      voucherToUpdate = await Voucher.findOneAndUpdate(
        { code: voucher },
        { $inc: { currentUsage: 1 } },
        { new: true }
      );
    }

    // Create a new order document
    const order = await Order.create({
      trackingNumber,
      products,
      user,
      address,
      paymentMethod,
      deliveryStatus,
      finalPrice,
      voucher,
    });

    // Adding the order to user
    await User.findByIdAndUpdate(user, { $push: { orders: order._id } });

    // Return the created order
    res.status(201).json({ success: true, Order: order });
  } catch (error) {
    // Handle any unexpected errors
    next(error);
  }
};

module.exports = { createOrder };
