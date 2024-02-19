const Order = require("../models/order");

const getAllOrders = async (req, res, next) => {
  try {
    //Get page number from request params
    const pageNumber = parseInt(req.query.p, 10) || 1;
    const numberPerPage = 10;
    const skipItems = (pageNumber - 1) * numberPerPage;

    // Retrieve total count of products (unpaginated)
    const totalCount = await Order.countDocuments({});

    // Retrieve all orders from the database
    const orders = await Order.find({})
      .populate({
        path: "products.product",
        model: "Product",
      })
      .populate({
        path: "user",
        model: "User",
        select: " firstName lastName email",
      })
      .skip(skipItems)
      .limit(numberPerPage);

    // Check if any orders were found
    if (!orders || orders.length === 0) {
      res.status(200).json({ success: true, orders: [] });
    }

    // Return the orders
    return res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const getOneOrder = async (req, res, next) => {
  try {
    // Retrieve all orders from the database
    const order = await Order.findById(req.params.orderId)
      .populate({
        path: "products.product",
        model: "Product",
      })
      .populate({
        path: "user",
        model: "User",
        select: "firstName lastName email",
      });

    // Check if any orders were found
    if (!order) {
      throw new Error("Order not found");
    }

    // Return the orders
    return res.status(200).json({ success: true, order: order });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    // Check for the requested Id
    const orderId = await Order.findById(req.params.orderId);
    if (!Order) {
      throw new Error("Order not found");
    }

    // Getting the new status from the body
    const { deliveryStatus } = req.body;

    // Define an array of valid deliveryStatus values
    const validStatusValues = [
      "pending",
      "packaging",
      "shipping",
      "delivered",
      "canceled",
    ];

    // Checking if it's one of the valid values
    if (!validStatusValues.includes(deliveryStatus)) {
      throw new Error("Invalid Schema");
    }

    // Updating the status of the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        deliveryStatus,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, updatedOrder });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllOrders, updateOrderStatus, getOneOrder };
