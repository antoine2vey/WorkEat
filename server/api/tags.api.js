const mongoose = require('mongoose');
const Tag = require('../models/tag.model');

mongoose.Promise = Promise;

exports.list = (req, res) => {
  Tag.find({}, (err, tags) => {
    if (err) {
      console.log('tags create', err);
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

      res.status(200).send(tag);
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Tag.findByIdAndRemove(id, (err, tag) => {
    if (err) {
      return res.status(400).send('Database error');
    }

    return res.status(200).send(`${tag.name} supprimé!`);
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

  Tag.findByIdAndUpdate(id, query, { new: true }, (err, tag) => {
    if (err) {
      return res.status(400).send('Database error');
    }

    return res.status(200).send(tag);
  });
};
