const mongoose = require('mongoose');
const Product = require('../models/product.model');
const Order = require('../models/order.model');

function mongoId(id) {
  return mongoose.Types.ObjectId(id);
}

exports.create = (req, res) => {
  const ids = [];
  const { items } = req.body;

  req.checkBody('items', 'You pushed empty cart ...').notEmpty().isArray();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  items.forEach((item) => {
    ids.push(mongoId(item._id));
  });

  const product = new Order({
    orderedBy: mongoId(req.user._id),
    articlesId: ids,
    // temp price
    amount: 200,
    orderedAt: new Date(),
    // temp place: Amiens
    placeToShip: mongoId('584c93cb7844cecfae9d61c1'),
  });

  product.save((err) => {
    if (err) {
      return res.status(500).send('Database error');
    }

    return res.send('Product well ordered!');
  });
};
