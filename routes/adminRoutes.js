const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/adminAuthController");
const adminUserController = require("../controllers/adminDashboardUser");
const adminCatController = require("../controllers/adminDashboardCategories");
const checkAdminAuthorities = require("../middleware/abac");

// Route to login admin
router.post("/login", adminAuthController.loginAdmin);

//User Control Routes

// Route to view a list of users
router.get(
  "/users",
  checkAdminAuthorities(["Users"]),
  adminUserController.viewUsers
);

// Route to search, filter, and sort users (bonus)
router.get(
  "/users/search",
  checkAdminAuthorities(["Users"]),
  adminUserController.searchUsers
);

// Route to edit user profiles
router.patch(
  "/users/update/:userId",
  checkAdminAuthorities(["Users"]),
  adminUserController.editUserProfile
);

// Route to deactivate user accounts
router.patch(
  "/users/deactivate",
  checkAdminAuthorities(["Users"]),
  adminUserController.deactivateUsers
);

// Route to delete user accounts
router.delete(
  "/users",
  checkAdminAuthorities(["Users"]),
  adminUserController.deleteUsers
);

// Route to manage user roles and permissions
// router.put("/users/:userId/roles", adminController.updateUserRoles);

// Category Control Routes

//Create a category
router.post(
  "/categories",
  checkAdminAuthorities(["Categories"]),
  adminCatController.createCategory
);

// Get all categories
router.get(
  "/categories",
  checkAdminAuthorities(["Categories"]),
  adminCatController.getCategories
);

// Update a category
router.patch(
  "/categories/:categoryId",
  checkAdminAuthorities(["Categories"]),
  adminCatController.editCategory
);

// Delete a category
router.delete(
  "/categories/:categoryId",
  checkAdminAuthorities(["Categories"]),
  adminCatController.deleteCategory
);

// Route to create content
// router.post("/content", adminController.createContent);

// Route to edit content
// router.put("/content/:contentId", adminController.editContent);

// Route to delete content
// router.delete("/content/:contentId", adminController.deleteContent);

// Route to manage tags (if applicable)
// router.post("/tags", adminController.createTag);
// router.put("/tags/:tagId", adminController.editTag);
// router.delete("/tags/:tagId", adminController.deleteTag);

module.exports = router;
