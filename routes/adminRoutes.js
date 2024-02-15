const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/adminAuthController");
const adminUserController = require("../controllers/adminDashboardUser");
const adminCatController = require("../controllers/adminDashboardCategories");
const adminProductsController = require("../controllers/adminDashboardProducts");
const adminOrdersController = require("../controllers/adminDashboardOrders");
const checkAdminAuthorities = require("../middleware/abac");

// Admin Authentication Routs

// Route to login admin
router.post("/login", adminAuthController.loginAdmin);

// Authorization Control Routes

// Route to create a new admin
router.post(
  "/admins",
  checkAdminAuthorities(["admin"]),
  adminAuthController.createAdmin
);

// Route to create a new admin
router.get(
  "/admins",
  checkAdminAuthorities(["admin"]),
  adminAuthController.getAllAdmins
);

// Route to create a new admin
router.patch(
  "/admins/:adminId",
  checkAdminAuthorities(["admin"]),
  adminAuthController.updateAdmin
);

//User Control Routes

// Route to view a list of users
router.get(
  "/users",
  checkAdminAuthorities(["users"]),
  adminUserController.viewUsers
);

//Route to get one user
router.get(
  "/users/:userId",
  checkAdminAuthorities(["users"]),
  adminUserController.getUser
);

// Route to search, filter, and sort users (bonus)
router.get(
  "/users/search",
  checkAdminAuthorities(["users"]),
  adminUserController.searchUsers
);

// Route to edit user profiles
router.patch(
  "/users/update/:userId",
  checkAdminAuthorities(["users"]),
  adminUserController.editUserProfile
);

// Route to deactivate user accounts
router.patch(
  "/users/deactivate",
  checkAdminAuthorities(["users"]),
  adminUserController.deactivateUsers
);

// Route to delete user accounts
router.delete(
  "/users",
  checkAdminAuthorities(["users"]),
  adminUserController.deleteUsers
);

// Category Control Routes

//Create a category
router.post(
  "/categories",
  checkAdminAuthorities(["categories"]),
  adminCatController.createCategory
);

// Get all categories
router.get(
  "/categories",
  checkAdminAuthorities(["categories"]),
  adminCatController.getCategories
);

// Update a category
router.patch(
  "/categories/update/:categoryId",
  checkAdminAuthorities(["categories"]),
  adminCatController.editCategory
);

// Delete a category
router.delete(
  "/categories/:categoryId",
  checkAdminAuthorities(["categories"]),
  adminCatController.deleteCategory
);

// Product Control Routes

// Route to create a product
router.post(
  "/products",
  checkAdminAuthorities(["products"]),
  adminProductsController.createProduct
);

// Route to get all products
router.get(
  "/products",
  checkAdminAuthorities(["products"]),
  adminProductsController.getAllProducts
);

// Route to query products
router.get(
  "/products/search",
  checkAdminAuthorities(["products"]),
  adminProductsController.searchProducts
);

// Route to get one product
router.get(
  "/products/:productId",
  checkAdminAuthorities(["products"]),
  adminProductsController.getProduct
);

// Route to patch a product
router.patch(
  "/products/update/:productId",
  checkAdminAuthorities(["products"]),
  adminProductsController.updateProduct
);

// Route to freeze products
router.patch(
  "/products/freeze",
  checkAdminAuthorities(["products"]),
  adminProductsController.freezeProducts
);

// Route to freeze products
router.post(
  "/products/ticket",
  checkAdminAuthorities(["products"]),
  adminProductsController.addTicket
);

// Voucher Control Routes
router.post("/vouchers", checkAdminAuthorities(["vouchers"]));

// Orders Control Routes

// Route to create an order
router.post(
  "/orders",
  checkAdminAuthorities(["orders"]),
  adminOrdersController.createOrder
);

// Route to get all orders
router.get(
  "/orders",
  checkAdminAuthorities(["orders"]),
  adminOrdersController.getAllOrders
);

module.exports = router;
