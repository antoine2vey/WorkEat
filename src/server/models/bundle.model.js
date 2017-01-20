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
  itemsId: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }],
  description: String,
  reduction: {
    type: Number,
    min: 0,
    default: 0,
    max: 100,
  },
  isBundle: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model('Bundle', bundleSchema);
