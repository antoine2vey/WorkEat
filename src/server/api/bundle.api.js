const mongoose = require('mongoose');
const Bundle = require('../models/bundle.model');

mongoose.Promise = Promise;

exports.list = (req, res) => {
  Bundle.find({}).populate('itemsId').exec((err, bundles) => {
    if (err) {
      return res.status(500).send('Database error.');
    }

    return res.status(200).send(bundles);
  });
};
exports.create = (req, res) => {
  const { name, price, description, itemsId, reduction } = req.body;
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('price', 'Price is required').notEmpty().isInt();
  req.checkBody('itemsId', 'Items are required in bundle').notEmpty().isArray();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  const bundle = new Bundle({
    name,
    price,
    description,
    itemsId,
    reduction,
  });

  Bundle.findOne({ name }, (err, bundleExists) => {
    if(bundleExists) {
      return res.status(500).send('Bundle already exists!');
    }

    bundle.save((err) => {
      if(err) {
        console.log(err);
        return res.status(500).send('Database error, please try again!');
      }

      res.status(200).send('Bundle created!');
    });
  });
};

exports.delete = (req, res) => {

};
