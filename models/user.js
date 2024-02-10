const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other']},
  age: { type: Number},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true,default:true },
  addresses: [{
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  }],
  phones: [{ type: String ,value:String}],
  cart: [{ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
