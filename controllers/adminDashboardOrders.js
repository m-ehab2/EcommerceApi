const Order = require("../models/order");
const orderSchema = require("../validation/orderCreationSchema");

const getAllOrders = async (req, res, next) => {
  try {
    // Retrieve all orders from the database
    const orders = await Order.find({})
      .populate({
        path: "products.product",
        model: "Product",
      })
      .populate({
        path: "user",
        model: "User",
      });

    // Check if any orders were found
    if (!orders || orders.length === 0) {
      return res.json({ success: true, orders: [] });
    }

    // Return the orders
    return res.json({ success: true, orders: orders });
  } catch (error) {
    // Pass any errors to the error handling middleware
    return next(error);
  }
};
const createOrder = async (req, res, next) => {
  try {
    // Validate request body against the Joi schema
    const { error } = orderSchema.validate(req.body);
    if (error) {
      // If validation fails, return a 400 Bad Request response with validation error details
      throw new Error(error.message);
    }

    // Extract order details from request body
    const {
      trackingNumber,
      products,
      user,
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
      voucher,
      finalPrice,
    });

    // Return the created order
    res.status(201).json({ success: true, order: order });
  } catch (error) {
    // Handle any unexpected errors
    next(error);
  }
};

module.exports = { getAllOrders, createOrder };
