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
  amount: Number,
  orderedAt: Date,
  placeToShip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  },
});

module.exports = mongoose.model('Order', orderSchema);
