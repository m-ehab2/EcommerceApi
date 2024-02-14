const Product = require("../models/product");
const formidable = require("formidable");
const imgbbUploader = require("imgbb-uploader");
const productValidationSchema = require("../Utilities/productCreationValidation");
const Category = require("../models/category");

const createProduct = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) return next(err);

      const images = [];
      const uploadPromises = [];

      // Upload files to ImgBB
      for (const fileKey in files) {
        if (files.hasOwnProperty(fileKey)) {
          const uploadPromise = imgbbUploader(
            "233bc527d5a1c48bda36603a1d0eaf01",
            files[fileKey][0].filepath
          );
          images.push({ name: fileKey, promise: uploadPromise });
          uploadPromises.push(uploadPromise);
        }
      }

      // Wait for all image uploads to complete
      const responses = await Promise.all(uploadPromises);
      const parsedData = JSON.parse(fields.ProductData[0]);

      // Check for duplicate product
      const matchedProduct = await Product.findOne({
        modelNumber: parsedData.modelNumber,
      });
      if (matchedProduct) return next(new Error("Duplicate Product"));

      // Validate product data using JOI
      const { error } = productValidationSchema.validate(parsedData);
      if (error) return next(new Error(error));

      // Find category ID
      const productCategory = await Category.findOne({
        name: parsedData.category,
      });

      // Store image URLs in product data
      const imagesUrls = responses.map((response, index) => ({
        name: images[index].name,
        url: response.display_url,
      }));
      parsedData.images = imagesUrls;

      // Add category ID to product data
      parsedData.category = productCategory._id;

      // Create product document
      const createdProduct = await Product.create(parsedData);

      // Send response with images and product data
      res.json({ success: true, product: createdProduct });
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    //Get page number from request params
    const pageNumber = parseInt(req.query.p, 10) || 1;
    console.log(pageNumber);
    const numberPerPage = 10;
    const skipItems = (pageNumber - 1) * numberPerPage;
    // Retrieve all products from the database
    const products = await Product.find({}, { _id: 0, colors: 1 })
      .skip(skipItems)
      .limit(numberPerPage);

    // Check if any products were found
    if (!products || products.length === 0) {
      res.json({ success: true, products: [] });
    }

    // Return the products
    res.json({
      success: true,
      products: products,
      productsLength: products.length,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    const productId = req.params.productId;

    form.parse(req, async (err, fields, files) => {
      if (err) return next(err);

      const images = [];
      const uploadPromises = [];

      // Upload files to ImgBB
      for (const fileKey in files) {
        if (files.hasOwnProperty(fileKey)) {
          const uploadPromise = imgbbUploader(
            "233bc527d5a1c48bda36603a1d0eaf01",
            files[fileKey][0].filepath
          );
          images.push({ name: fileKey, promise: uploadPromise });
          uploadPromises.push(uploadPromise);
        }
      }

      // Wait for all image uploads to complete
      const responses = await Promise.all(uploadPromises);
      const parsedData = JSON.parse(fields.ProductData[0]);

      // Check for duplicate product
      const matchedProduct = await Product.findById(productId);
      if (!matchedProduct) return next(new Error("Product not found"));

      // Validate product data using JOI
      const { error } = productValidationSchema.validate(parsedData);
      if (error) return next(new Error(error));

      // Find category ID
      const productCategory = await Category.findOne({
        name: parsedData.category,
      });

      // Store image URLs in product data
      const imagesUrls = responses.map((response, index) => ({
        name: images[index].name,
        url: response.display_url,
      }));
      parsedData.images = imagesUrls;

      // Add category ID to product data
      parsedData.category = productCategory._id;

      // Create product document
      const createdProduct = await Product.findOneAndUpdate(
        { _id: productId },
        parsedData,
        { new: true }
      );

      // Send response with images and product data
      res.json({ success: true, product: createdProduct });
    });
  } catch (error) {
    next(error);
  }
};
const getProduct = async (req, res, next) => {
  try {
    // Fetch users from the database
    const product = await Product.findById({ _id: req.params.productId });

    // Return the list of users in the response
    res.json(product);
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};
const freezeProducts = async (req, res, next) => {
  try {
    // Get Id array from req body
    const productIds = req.body.productIds;
    console.log(productIds);

    // update all posts in Id array
    const updatedProducts = await Product.updateMany(
      { _id: { $in: productIds } },
      { frozen: true }
    );

    // Return the list of updated users in the response
    res.json(updatedProducts);
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  getProduct,
  freezeProducts,
};
