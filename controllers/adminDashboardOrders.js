const validateSchema = require("../helpers/validateSchema");
const Order = require("../models/order");
const Product = require("../models/product");
const Ticket = require("../models/ticket");
const jwt = require("jsonwebtoken");
const ticketCreationSchema = require("../validation/ticketCreationValidation");
require("dotenv").config();

const getAllOrders = async (req, res, next) => {
  try {
    const {
      page,
      limit,
      sortBy,
      order,
      trackingNumber,
      userId,
      timePeriod,
      status,
      city,
      price1,
      price2,
      itemsNumber1,
      itemsNumber2,
    } = req.query;

    // Parse page and limit
    const pageNumber = parseInt(page, 10) || 1;
    const numberPerPage = parseInt(limit) || 10;
    const skipItems = (pageNumber - 1) * numberPerPage;

    // Construct query
    const query = {};

    if (trackingNumber) {
      query.trackingNumber = { $regex: trackingNumber, $options: "i" };
    }

    if (userId) {
      query.user = userId;
    }

    if (timePeriod) {
      // Implement time period filtering based on your requirement
    }

    if (status) {
      query.deliveryStatus = status;
    }

    if (city) {
      query["address.city"] = city;
    }

    if (price1 && price2) {
      query.finalPrice = { $gte: price1, $lte: price2 };
    } else if (price1) {
      query.finalPrice = { $gte: price1 };
    } else if (price2) {
      query.finalPrice = { $lte: price2 };
    }

    if (itemsNumber1 && itemsNumber2) {
      query.totalItems = { $gte: itemsNumber1, $lte: itemsNumber2 };
    } else if (itemsNumber1) {
      query.totalItems = { $gte: itemsNumber1 };
    } else if (itemsNumber2) {
      query.totalItems = { $lte: itemsNumber2 };
    }

    // Retrieve total count of products (unpaginated)
    const totalCount = await Order.countDocuments(query);

    // Retrieve orders based on query
    const orders = await Order.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skipItems)
      .limit(numberPerPage)
      .populate({ path: "tickets", model: "Ticket", select: "title" })
      .populate({
        path: "user",
        model: "User",
        select: "firstName lastName",
      });

    // Check if any orders were found
    if (!orders || orders.length === 0) {
      return res.status(200).json({ success: true, orders: [] });
    }

    // Return the orders
    return res
      .status(200)
      .json({ success: true, orders: orders, totalCount: totalCount });
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
        select: "name price",
      })
      .populate({
        path: "user",
        model: "User",
        select: "firstName lastName email phones",
      })
      .populate({
        path: "tickets",
        model: "Ticket",
        select: "title description",
      })
      .populate({
        path: "voucher",
        model: "Voucher",
        select: "code type discount",
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
    console.log(req.params);
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
const addTicket = async (req, res, next) => {
  try {
    // Validate ticket input
    validateSchema(ticketCreationSchema, req.body);

    // Extracting data from the request body
    const { title, description, item_ids } = req.body;

    // Decode token to get admin ID
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Creating a new ticket document
    const newTicket = await Ticket.create({
      title,
      type: "order",
      description,
      item_ids,
      createdBy: decoded.id,
    });

    // Update orders with the new ticket id
    await Order.updateMany(
      { _id: { $in: item_ids } },
      { $push: { tickets: newTicket._id } }
    );

    // Sending a success response with the newly created ticket
    res.status(201).json({ Ticket: newTicket });
  } catch (error) {
    // Handling errors
    next(error);
  }
};
module.exports = { getAllOrders, updateOrderStatus, getOneOrder, addTicket };
