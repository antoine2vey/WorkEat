const mongoose = require('mongoose');
const Order = require('../models/order.model');

function mongoId(id) {
  return mongoose.Types.ObjectId(id);
}

exports.create = (req, res) => {
  const articlesAmounts = [];
  const bundlesAmounts = [];
  const articlesId = [];
  let amount = 0;
  const bundlesId = [];
  const { items, place } = req.body;

  req.checkBody('items', 'You pushed empty cart ...').notEmpty().isArray();
  req.checkBody('place', 'No place to ship...').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  items.forEach((item) => {
    if(item.isBundle) {
      bundlesId.push(item._id);
      bundlesAmounts.push(item.amount);
    } else {
      articlesId.push(item._id);
      articlesAmounts.push(item.amount);
    }
    amount += item.amount * item.price
  });

  const product = new Order({
    orderedBy: req.user._id,
    articlesId,
    bundlesId,
    articlesNumber: articlesAmounts,
    bundlesNumber: bundlesAmounts,
    amount,
    placeToShip: place,
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
