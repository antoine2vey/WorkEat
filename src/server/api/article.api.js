const mongoose = require('mongoose');
const Article = require('../models/article.model');

mongoose.Promise = Promise;

exports.list = (req, res) => {
  });
};
exports.listOne = (req, res) => {
  const { id } = req.params;
}
exports.create = (req, res) => {
  const {  } = req.body;
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('price', 'Price is required').notEmpty().isInt();
  req.checkBody('itemsId', 'Items are required in bundle').notEmpty().isArray();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }
};

exports.delete = (req, res) => {

};
