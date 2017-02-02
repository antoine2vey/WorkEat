const mongoose = require('mongoose');
const Product = require('../models/product.model');
const fs = require('fs');
const genId = require('shortid');

mongoose.Promise = Promise;

function trimArray(arr, splitter = ',') {
  return arr.split(splitter).map(item => item.trim());
}

exports.list = (req, res) => {
  Product.find({}).populate('tag').exec((err, products) => {
    if (err) {
      return res.status(500).send('Database error.');
    }

    return res.status(200).send(products);
  });
};
exports.create = (req, res) => {
  const {
    file,
    name,
    description,
    preparation,
    allergics,
    price,
    tag,
    type,
    places
  } = req.body;

  req.checkBody('file', 'Image is required').notEmpty();
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  // req.checkBody('preparation', 'Preparation is required').notEmpty();
  req.checkBody('allergics', 'Allergics are required').notEmpty();
  req.checkBody('price', 'Price is required and/or must be a number').notEmpty().isInt();
  req.checkBody('tag', 'Tags are required').notEmpty();
  req.checkBody('type', 'Types are required').notEmpty();
  req.checkBody('places', 'Places are required').notEmpty().isArray();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  // If input price is `hacked`
  if (price < 0) {
    return res.status(500).send('Stop hacking the fucking input thank you');
  }

  const image = file;
  const base64data = image.replace(/^data:image\/\w+;base64,/, '');
  const id = genId.generate();
  const fileName = `public/uploads/products/${id}-${Date.now()}.png`;

  const product = new Product({
    file: fileName,
    name,
    description,
    preparation,
    allergics: trimArray(allergics),
    price,
    type,
  });

  Product.findOne({ name }, (err, existProduct) => {
    if (existProduct) {
      return res.status(500).send('This product already exists...');
    }

    tag.forEach((oneTag) => {
      product.tag.push(oneTag._id);
    });
    places.forEach(place => {
      product.availableAt.push(place._id);
    });

    product.save((err) => {
      if (err) {
        return res.status(500).send('Database error, please try again!');
      }

      fs.writeFile(fileName, base64data, { encoding: 'base64' }, (err) => {
        if (err) {
          console.log(err);
        }
      });

      return res.status(200).send('Product created !');
    });
  });
};
exports.delete = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndRemove(id, (err, product) => {
    if (err) {
      res.status(500).send('Database error, cannot delete product');
    }

    // delete image if successful request
    fs.unlink(product.file, (err) => {
      if (err) {
        console.log(err);
      }
    });

    return res.status(200).send('Product deleted!');
  });
};
