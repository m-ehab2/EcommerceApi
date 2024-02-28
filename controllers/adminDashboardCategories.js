const Category = require("../models/category");
const categoryCreationSchema = require("../validation/categoryCreationValidation");

const createCategory = async (req, res, next) => {
  try {
    // Validate request body against the Joi schema
    const { error } = categoryCreationSchema.validate(req.body);
    if (error) {
      // If validation fails, throw a validation error
      throw error;
    }

    // Extract category data from request body
    const { name, description, subCategories } = req.body;

    // Create a new category document using create()
    const savedCategory = await Category.create({
      name,
      description,
      subCategories,
    });

    // Respond with a success message and the saved category
    res.status(201).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};
const getCategories = async (req, res, next) => {
  try {
    // Retrieve all categories from the database
    const categories = await Category.find();

    // Check if any categories were found
    if (!categories || categories.length === 0) {
      res.status(200).json({ success: true, categories: [] });
    }

    // Return the categories
    res.status(200).json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const getOneCategory = async (req, res, next) => {
  try {
    // Get category name from params
    const name = req.params.categoryName;

    // Retrieve all categories from the database
    const category = await Category.findOne({ name });

    // Check if any categories were found
    if (!category) {
      throw new Error("Category not found");
    }

    // Return the categories
    res.status(200).json({
      success: true,
      category: category,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const editCategory = async (req, res, next) => {
  try {
    // Extract category ID and updated data from request body
    const categoryName = req.params.categoryName;
    const updatedData = req.body;

    // Validate request body against the Joi schema
    const valid =
      updatedData.description && updatedData.subCategories.length > 0;
    if (!valid) {
      // If validation fails, throw a validation error
      throw new Error("Invalid Schema");
    }

    // Check if category ID is provided
    if (!categoryName) {
      throw new Error("Category Name is required");
    }

    // Find the category by ID and update it with the provided data
    const updatedCategory = await Category.findOneAndUpdate(
      { name: categoryName },
      updatedData,
      { new: true }
    );

    // Check if the category was found and updated
    if (!updatedCategory) {
      throw new Error("Category not found");
    }

    // Return the updated category
    res.status(200).json({
      success: true,
      category: updatedCategory,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    // Extract category ID from request parameters
    const categoryId = req.params.categoryId;

    // Check if category ID is provided
    if (!categoryId) {
      throw new Error("Category ID is required");
    }

    // Find the category by ID and delete it
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    // Check if the category was found and deleted
    if (!deletedCategory) {
      throw new Error("Category not found");
    }

    // Return a success message
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};
module.exports = {
  createCategory,
  getCategories,
  editCategory,
  deleteCategory,
  getOneCategory,
};
