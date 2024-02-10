// Import required modules
const express = require("express");
const connect = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config(); // Load environment variables from .env file

// Create an instance of Express
const app = express();
app.use(express.json());
// Define a route
app.use("/api/users", userRoutes);
app.use("/api/dashboard", adminRoutes);

//Use Error Handling Middleware
app.use(errorHandler);
//Connect To Db
connect(process.env.URI);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
