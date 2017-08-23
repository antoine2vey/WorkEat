const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  position: Number,
  method: String,
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  bundles: [
    {
      bundle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bundle',
      },
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
  ],
  quantitiesById: {},
  amount: Number,
  orderedAt: {
    type: Date,
    default: Date.now,
  },
  placeToShip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  },
  finished: {
    type: Boolean,
    default: false,
  },
  isDistribued: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Order', orderSchema);
