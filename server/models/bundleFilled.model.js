const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const bundleFilledSchema = new mongoose.Schema({
  bundleCreator: {
    type: ObjectId,
    ref: 'Bundle',
  },
  entree: {
    type: ObjectId,
    ref: 'Product',
  },
  plat: {
    type: ObjectId,
    ref: 'Product',
  },
  dessert: {
    type: ObjectId,
    ref: 'Product',
  },
  boisson: {
    type: ObjectId,
    ref: 'Product',
  },
});

module.exports = mongoose.model('BundleFilled', bundleFilledSchema);
