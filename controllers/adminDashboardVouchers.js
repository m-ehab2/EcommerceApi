const Voucher = require("../models/voucher");
const voucherValidationSchema = require("../validation/voucherCreationSchema");
const jwt = require("jsonwebtoken");
const Log = require("../models/log");
const validateSchema = require("../helpers/validateSchema");

const createVoucher = async (req, res, next) => {
  try {
    // Get data from the request body
    const voucher = {
      code: req.body.voucherCode,
      discount: req.body.discount,
      type: req.body.type,
      expiryDate: req.body.expiryDate,
      maxUsage: req.body.maxUsage,
    };

    // Validate request body
    validateSchema(voucherValidationSchema, voucher);

    if (new Date(voucher.expiryDate) <= new Date()) {
      throw new Error("Expiry date is older than current date");
    }

    // Get admin id
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    voucher.createdBy = decoded.id;

    // Create a new voucher object
    const createdVoucher = await Voucher.create(voucher);

    // Return success response
    res.status(201).json({
      message: "Voucher created successfully",
      voucher: createdVoucher,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const getAllVouchers = async (req, res, next) => {
  try {
    // Parse query parameters for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch Paginated vouchers from the database
    const vouchers = await Voucher.find().skip(skip).limit(limit);

    // Return the fetched vouchers as a response
    res.status(200).json(vouchers);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const updateVoucher = async (req, res, next) => {
  try {
    // Find the voucher by ID
    const voucher = await Voucher.findById(req.params.voucherId);

    // Check if the voucher exists
    if (!voucher) {
      throw new Error("Voucher not found");
    }

    // Get values from request body
    const { discount, type, expiryDate, maxUsage } = req.body;

    // Validate expiryDate
    if (new Date(expiryDate) <= new Date()) {
      throw new Error("Expiry date is older than current date");
    }

    // Update the voucher
    const updatedVoucher = await Voucher.findByIdAndUpdate(
      voucher.id,
      { discount, type, expiryDate, maxUsage },
      { new: true }
    );

    // Return a success response with the updated voucher data
    res.status(200).json({
      message: "Voucher updated successfully",
      voucher: updatedVoucher,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};
const getVoucher = async (req, res, next) => {
  try {
    // Find the voucher by ID
    const voucher = await Voucher.findById(req.params.voucherId);

    // Check if the voucher exists
    if (!voucher) {
      throw new Error("Voucher not found");
    }

    // get the voucher
    const updatedVoucher = await Voucher.findById(voucher.id);

    // Return a success response with the updated voucher data
    res.status(200).json({
      message: "Voucher Retrieved successfully",
      voucher: updatedVoucher,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};
module.exports = { createVoucher, getAllVouchers, updateVoucher, getVoucher };
