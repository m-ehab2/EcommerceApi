const mongoose = require('mongoose');

async function connect(URI) {
    try {
        await mongoose.connect(URI);
        console.log('Connected To DB Successfully');
    } catch (error) {
        throw (error)
    }
}
module.exports = connect