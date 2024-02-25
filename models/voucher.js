const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true },
    discount: { type: Number, required: true },
    type: {
      type: String,
      enum: ["flat", "percentage"],
      required: true,
    },
    expiryDate: { type: Date, required: true },
    maxUsage: { type: Number, default: null },
    currentUsage: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
