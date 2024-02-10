const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/adminAuthController");

// Route to login admin
router.post("/login", adminAuthController.loginAdmin);

// // Route to view a list of users
// router.get("/users", adminController.viewUsers);

// // Route to search, filter, and sort users (bonus)
// router.get("/users/search", adminController.searchUsers);

// // Route to edit user profiles
// router.put("/users/:userId", adminController.editUserProfile);

// // Route to deactivate or delete user accounts
// router.put("/users/:userId/deactivate", adminController.deactivateUser);
// router.delete("/users/:userId", adminController.deleteUser);

// // Route to manage user roles and permissions
// router.put("/users/:userId/roles", adminController.updateUserRoles);

// // Route to create content
// router.post("/content", adminController.createContent);

// // Route to edit content
// router.put("/content/:contentId", adminController.editContent);

// // Route to delete content
// router.delete("/content/:contentId", adminController.deleteContent);

// // Route to manage categories
// router.post("/categories", adminController.createCategory);
// router.put("/categories/:categoryId", adminController.editCategory);
// router.delete("/categories/:categoryId", adminController.deleteCategory);

// // Route to manage tags (if applicable)
// router.post("/tags", adminController.createTag);
// router.put("/tags/:tagId", adminController.editTag);
// router.delete("/tags/:tagId", adminController.deleteTag);

module.exports = router;
