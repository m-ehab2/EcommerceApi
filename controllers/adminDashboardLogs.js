const Log = require("../models/log");

const getAllLogs = async (req, res, next) => {
  try {
    const Logs = await Log.find();
    res.status(200).json({
      success: true,
      logs: Logs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllLogs };
