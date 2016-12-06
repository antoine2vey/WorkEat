const mongoose = require('mongoose');
const Product = require('../models/product.model');
const fs = require('fs');
const genId = require('shortid');
mongoose.Promise = Promise;

exports.list = (req, res) => {
  Product.find({}, (err, products) => {
    if(err) {
      return res.status(500).send('Database error dsl fdp');
    }

    return res.status(200).send(products);
  });
};
exports.create = (req, res) => {
  req.checkBody('file', 'Image is required').notEmpty();
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  // req.checkBody('preparation', 'Preparation is required').notEmpty();
  req.checkBody('ingredients', 'Ingredients are required').notEmpty();
  req.checkBody('allergics', 'Allergics are required').notEmpty();
  req.checkBody('price', 'Price is required and/or must be a number').notEmpty().isInt();
  // req.checkBody('tag', 'Tags are required').notEmpty();
  req.checkBody('type', 'Types are required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  //If input price is `hacked`
  if(req.body.price < 0) {
    return res.status(500).send('Stop hacking the fucking input thank you');
  }

  let image = req.body.file;
  const base64data = image.replace(/^data:image\/\w+;base64,/, '');
  const id = genId.generate();
  const fileName = `public/uploads/${id}-${Date.now()}.png`;

  let tagObjectIds = [];
  const tags = req.body.tag;
  //Generator for updated product Id's
  //We destructure the req.body.tag Object
  tags.map(tag => {
    //For each tag, we push to a new array the updated names
    //id from the `req.body.tag`
    tagObjectIds.push({
      '_id': mongoose.Types.ObjectId(tag._id),
      'name': tag.name
    });
  });

  const product = new Product({
    file: fileName,
    title: req.body.title,
    description: req.body.description,
    preparation: req.body.preparation,
    ingredients: req.body.ingredients,
    allergics: req.body.allergics,
    price: req.body.price,
    tag: tagObjectIds,
    type: req.body.type
  });


  Product.findOne({title: req.body.title}, (err, existProduct) => {
    if(existProduct){
      return res.status(500).send('This product already exists...');
    }

    product.save(err => {
      if(err) {
        return res.status(500).send('Database error, please try again!');
      }

      fs.writeFile(fileName, base64data, {encoding: 'base64'}, (err) => {
        if(err) {
          console.log(err);
        }
      });

      return res.status(200).send('Product created !');
    });
  });
};
exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, product) => {
    if(err) {
      res.status(500).send('Database error, cannot delete product');
    }

    //delete image if successful request
    fs.unlink(product.file, err => {
      if(err) {
        console.log(err);
      }
    });

    return res.status(200).send('Product deleted!');
  });
};
