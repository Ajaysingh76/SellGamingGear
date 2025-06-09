const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  condition: String,
  price: Number,
  category: String,
  description: String,
  images: [String], // URLs or Base64 strings
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Product', productSchema);
