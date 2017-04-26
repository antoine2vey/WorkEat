const mongoose = require('mongoose');
const Product = require('../models/product.model');

mongoose.Promise = Promise;

exports.get = (req, res) => {
  Product.find()
    .where('_id')
    .in(req.session.cart.addedIds)
    .select('name')
    .exec((err, products) => {
      res.send(products);
    });
};

exports.add = (req, res) => {
  req.session.cart = req.body;
  console.log(req.session.cart);
  res.send('Produit ajouté au panier!');
};

exports.delete = (req, res) => {
  const { cart } = req.session;
};
