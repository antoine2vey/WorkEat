const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  articlesId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  bundlesId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bundle',
    },
  ],
  articlesNumber: Array,
  bundlesNumber: Array,
  amount: Number,
  orderedAt: {
    type: Date,
    default: Date.now,
  },
  placeToShip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  },
});

module.exports = mongoose.model('Order', orderSchema);
