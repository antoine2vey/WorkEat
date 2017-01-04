const mongoose = require('mongoose');
const Order = require('../models/order.model');

function mongoId(id) {
  return mongoose.Types.ObjectId(id);
}

exports.create = (req, res) => {
  let prices = [];
  const ids = [];
  const { items, place } = req.body;

  req.checkBody('items', 'You pushed empty cart ...').notEmpty().isArray();
  req.checkBody('place', 'No place to ship...').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  items.forEach((item) => {
    ids.push(mongoId(item._id));
    prices.push(item.price * item.amount);
  });

  const amount = prices.reduce((a, b) => {
    return a + b;
  }, 0);

  const product = new Order({
    orderedBy: mongoId(req.user._id),
    articlesId: ids,
    amount,
    orderedAt: new Date(),
    placeToShip: mongoId(place),
  });

  product.save((err) => {
    if (err) {
      return res.status(500).send('Database error');
    }

    return res.send({
      PAYMENT_ID: product._id,
      data: 'Produit crée, nous procédons au payment',
    });
  });
};
