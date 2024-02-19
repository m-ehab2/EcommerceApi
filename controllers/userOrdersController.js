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
      trackingNumber,
      products,
      address,
      paymentMethod,
      deliveryStatus,
      voucher,
      finalPrice,
    } = req.body;

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

    // Checking for voucher and updating usage status
    if (voucher) {
      voucherToUpdate = await Voucher.findOneAndUpdate(
        { code: voucher },
        { $inc: { currentUsage: 1 } },
        { new: true }
      );
    }

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
