const mongoose = require('mongoose');

const CarPartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('CarPart', CarPartSchema);