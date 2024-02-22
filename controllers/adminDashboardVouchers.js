const Voucher = require("../models/voucher");
const voucherValidationSchema = require("../validation/voucherCreationSchema");
const jwt = require("jsonwebtoken");
const Log = require("../models/log");

const createVoucher = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = voucherValidationSchema.validate(req.body);
    if (error) {
      throw error;
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Create a new voucher object
    const voucher = await Voucher.create({
      code: req.body.code,
      discount: req.body.discount,
      expiryDate: req.body.expiryDate,
      maxUsage: req.body.maxUsage,
      createdBy: decoded.id,
    });

    // Return success response
    res
      .status(201)
      .json({ message: "Voucher created successfully", voucher: voucher });
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

    // Validate request body
    if (!req.body.active || !req.body.maxUsage) {
      throw new Error("Invalid Schema");
    }
    // Update the voucher
    const updatedVoucher = await Voucher.findByIdAndUpdate(
      voucher.id,
      {
        active: req.body.active,
        maxUsage: req.body.maxUsage,
      },
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