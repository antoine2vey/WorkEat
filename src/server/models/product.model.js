const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  preparation: String,
  ingredients: {
    type: String,
    required: true,
  },
  allergics: Array,
  price: {
    type: Number,
    required: true,
  },
  tag: Array,
  type: {
    type: Array,
    required: true,
  },
  starsNumber: {
    type: Number,
    default: 0,
  },
  votesNumber: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Product', productSchema);
