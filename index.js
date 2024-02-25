// Import required modules
const express = require("express");
const connect = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

// Create an instance of Express
const app = express();

// Use CORS policy
app.use(cors());

// Parse body as JSON
app.use(express.json());

//User morgan to log requests
app.use(morgan("combined"));

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/dashboard", adminRoutes);

//Use error handling middleware
app.use(errorHandler);

//Connect To Db
connect(process.env.URI_Cloud);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
