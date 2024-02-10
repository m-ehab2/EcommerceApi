// Import required modules
const express = require('express');
require('dotenv').config(); // Load environment variables from .env file

// Create an instance of Express
const app = express();
app.use(express.json())
// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Define port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
