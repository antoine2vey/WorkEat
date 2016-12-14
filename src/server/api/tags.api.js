'use strict';
/* jshint node: true */
const mongoose = require('mongoose');
const Tag = require('../models/tag.model');
const Product = require('../models/product.model');
mongoose.Promise = Promise;

exports.list = (req, res) => {
  Tag.find({}, (err, tags) => {
    if (err) {
      return res.status(500).send('Error fetching database :-/');
    }

    return res.status(200).send(tags);
  });
};
exports.listOne = (req, res) => {
  const { id } = req.params;
  Tag.findById(id, (err, tag) => {
    if (err) {
      return res.status(400).send('Error fetching database');
    }

    return res.status(200).send(tag);
  });
};
exports.create = (req, res) => {
  const { name } = req.body;
  req.checkBody('name', 'Name is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  const tag = new Tag({
    name,
  });

  Tag.findOne({ name }, (err, existingTag) => {
    if (existingTag) {
      return res.status(500).send('This tag already exists...');
    }

    tag.save((error) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Database error, please try again!');
      }

      res.status(200).send('Tag created');
    });
  });
};
exports.delete = (req, res) => {
  const { id } = req.params;
  Tag.findByIdAndRemove(id, (err, tag) => {
    if (err) {
      return res.status(400).send('Database error');
    }

    // Find all products that contain our param for tags
    Product.find({ 'tag._id': mongoose.Types.ObjectId(id) }, (_err, products) => {
      if (_err) {
        return console.log(_err);
      }

      // For each products in our data
      products.forEach((product) => {
        const tags = product.tag;
        // For each tag
        tags.map((_tag, i) => {
          // If param == tag_id
          if (_tag._id == id) {
            // We get the index and remove him from array
            // since splice is a pure function
            tags.splice(i, 1);
          }
        });
        // For each product concerned, we remove this tag
        product.tag = tags;
        // Save it
        product.save((err) => {
          if (err) {
            return res.status(400).send('Database error');
          }
        });
      });
    });

    return res.status(200).send('Tag deleted!');
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  req.checkBody('name', 'Name is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  const query = {
    name,
  };

  Tag.findByIdAndUpdate(id, query, (err, tag) => {
    if (err) {
      return res.status(400).send('Database error');
    }

    // This should do a POST request to update new product
    // found when they have tag._id equals to req.params.id
    Product.update({ 'tag._id': mongoose.Types.ObjectId(id) },
      {
        $set: {
          'tag.$.name': name,
        },
      },
      {
        multi: true,
      },
      (_err, products) => {
        if (_err) {
          return console.log(_err);
        }
      });
    return res.status(200).send('Tag updated!');
  });
};
