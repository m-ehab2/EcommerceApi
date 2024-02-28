const Log = require("../models/log");

const getAllLogs = async (req, res, next) => {
  try {
    const Logs = await Log.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json({
      success: true,
      logs: Logs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllLogs };
