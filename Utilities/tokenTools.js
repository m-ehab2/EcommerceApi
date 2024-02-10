const jwt = require('jsonwebtoken')
require('dotenv').config(); // Load environment variables from .env file

// Create a token based on id
const createToken = (id)=>{
    const token = jwt.sign({_id:id}, process.env.JWT_SECRET, { expiresIn:'2h' });
    return token;
}

module.exports={createToken}