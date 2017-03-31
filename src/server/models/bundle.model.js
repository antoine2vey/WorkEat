const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  items: {
    hasEntree: Boolean,
    hasPlat: Boolean,
    hasDessert: Boolean,
    hasBoisson: Boolean,
  },
  choosenItem: {
    entree: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    plat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    dessert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    boisson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  description: String,
  reduction: {
    type: Number,
    min: 0,
    default: 0,
    max: 100,
  },
});

module.exports = mongoose.model('Bundle', bundleSchema);
