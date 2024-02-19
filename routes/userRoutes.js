const express = require("express");
const router = express.Router();
const userController = require("../controllers/userAuthController");
const userOrdersController = require("../controllers/userOrdersController");
const verifyToken = require("../middleware/verifyToken");

// User registration route
router.post("/register", userController.registerUser);

// User login route
router.post("/login", userController.loginUser);

// User order routes

// Route to create an order
router.post("/orders", verifyToken, userOrdersController.createOrder);

module.exports = router;
