const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/adminAuthController");
const adminUserController = require("../controllers/adminDashboardUsers");
const adminCatController = require("../controllers/adminDashboardCategories");
const adminProductsController = require("../controllers/adminDashboardProducts");
const adminOrdersController = require("../controllers/adminDashboardOrders");
const adminVoucherController = require("../controllers/adminDashboardVouchers");
const adminLogsController = require("../controllers/adminDashboardLogs");
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

// Route to get all admins
router.get(
  "/admins",
  checkAdminAuthorities(["admin"]),
  adminAuthController.getAllAdmins
);

// Route to edit admin authorities
router.patch(
  "/admins/:adminId",
  checkAdminAuthorities(["admin"]),
  adminAuthController.updateAdmin
);

// Route to delete an admin
router.delete(
  "/admins/:adminId",
  checkAdminAuthorities(["admin"]),
  adminAuthController.deleteAdmin
);

//User Control Routes

// Route to view a list of users
router.get(
  "/users",
  checkAdminAuthorities(["users"]),
  adminUserController.getAllUsers
);

//Route to get one user
router.get(
  "/users/:userId",
  checkAdminAuthorities(["users"]),
  adminUserController.getUser
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

// Route to deactivate user accounts
router.patch(
  "/users/activate",
  checkAdminAuthorities(["users"]),
  adminUserController.activateUsers
);

// Route to delete user accounts
router.put(
  "/users/delete",
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

// Get one category
router.get(
  "/categories/:categoryName",
  checkAdminAuthorities(["categories"]),
  adminCatController.getOneCategory
);

// Update a category
router.put(
  "/categories/:categoryName",
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

// Route to unfreeze products
router.patch(
  "/products/unfreeze",
  checkAdminAuthorities(["products"]),
  adminProductsController.unFreezeProducts
);

// Route to add tickets to products
router.post(
  "/products/ticket",
  checkAdminAuthorities(["products"]),
  adminProductsController.addTicket
);

// Route to delete products
router.put(
  "/products",
  checkAdminAuthorities(["products"]),
  adminProductsController.deleteProducts
);

// Voucher Control Routes

// Route to create a voucher
router.post(
  "/vouchers",
  checkAdminAuthorities(["vouchers"]),
  adminVoucherController.createVoucher
);

//Route to get all vouchers
router.get(
  "/vouchers",
  checkAdminAuthorities(["vouchers"]),
  adminVoucherController.getAllVouchers
);

//Route to get one voucher
router.get(
  "/vouchers/:voucherId",
  checkAdminAuthorities(["vouchers"]),
  adminVoucherController.getVoucher
);

router.patch(
  "/vouchers/:voucherId",
  checkAdminAuthorities(["vouchers"]),
  adminVoucherController.updateVoucher
);

// Orders Control Routes

// Route to get all orders
router.get(
  "/orders",
  checkAdminAuthorities(["orders"]),
  adminOrdersController.getAllOrders
);

// Route to get one order
router.get(
  "/orders/:orderId",
  checkAdminAuthorities(["orders"]),
  adminOrdersController.getOneOrder
);

// Route to update one order status
router.patch(
  "/orders/:orderId",
  checkAdminAuthorities(["orders"]),
  adminOrdersController.updateOrderStatus
);

// Route to add ticket to order
router.post(
  "/orders/ticket",
  checkAdminAuthorities(["orders"]),
  adminOrdersController.addTicket
);

// Log Control Routes

// Route to get all orders
router.get("/logs", checkAdminAuthorities([]), adminLogsController.getAllLogs);

module.exports = router;
