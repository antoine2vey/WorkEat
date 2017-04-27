const mongoose = require('mongoose');
const Product = require('../models/product.model');

mongoose.Promise = Promise;

exports.get = (req, res) => {
  try {
    const { addedIds } = req.session.cart;
    Product.find()
      .where('_id')
      .in(req.session.cart.addedIds)
      .select('name file price')
      .exec((err, products) => {
        res.send(products);
      });
  } catch (e) {}
};

exports.add = (req, res) => {
  req.session.cart = req.body;
  Product.find()
    .where('_id')
    .in(req.session.cart.addedIds)
    .select('name file price')
    .exec((err, products) => {
      res.send(products);
    });
};

exports.delete = (req, res) => {
  const { cart } = req.session;
};
