const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  preparation: String,
  allergics: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tag: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: true,
    },
  ],
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
  availableAt: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true
    }
  ]
});

module.exports = mongoose.model('Product', productSchema);
