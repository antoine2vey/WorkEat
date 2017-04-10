const mongoose = require('mongoose');
const Product = require('../models/product.model');
const fs = require('fs');
const genId = require('shortid');

const redis = require('redis'),
      client = redis.createClient();

mongoose.Promise = Promise;

const PRODUCT_HASH = 'products';

exports.list = (req, res) => {
  /**
   * In case we enable caching on product,
   * this is the right strategy to adopt
   *
  client.hgetall(PRODUCT_HASH, (err, hash) => {
    //If we get hash from redis
    if(hash != null) {
      const mappedProducts = Object.keys(hash).map(key => JSON.parse(hash[key]));
      return res.status(200).send(mappedProducts);
    } else {
      Product
      .find({})
      .populate('tag')
      .exec((err, products) => {
        if (err) {
          return res.status(500).send('Database error.');
        }

        products.forEach((product, i) => {
          client.hset(PRODUCT_HASH, product._id.toString(), JSON.stringify(product), redis.print);
        });

        return res.status(200).send(products);
      })
    }
  })
  **/
  Product.find({}).populate('tags').exec((err, products) => {
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
    tags,
    types,
    places
  } = req.body;

  console.log(req.body);
    

  req.checkBody('file', 'Image is required').notEmpty();
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  // req.checkBody('preparation', 'Preparation is required').notEmpty();
  req.checkBody('allergics', 'Allergics are required').notEmpty();
  req.checkBody('price', 'Price is required and/or must be a number').notEmpty().isInt();
  req.checkBody('tags', 'Tags are required').notEmpty().isArray();
  req.checkBody('types', 'Types are required').notEmpty().isArray();
  req.checkBody('places', 'Places are required').notEmpty().isArray().isArray();

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
  const fileName = `uploads/${id}.${Date.now()}.png`;

  const product = new Product({
    file: fileName,
    name,
    description,
    preparation,
    allergics: allergics.split(',').map(t => t.trim()),
    price,    
    tags,
    types,
    availableAt: places
  });


  Product.findOne({ name }, (err, existProduct) => {
    if (existProduct) {
      return res.status(500).send('This product already exists...');
    }

    product.save({ validateBeforeSave: false }, (err) => {
      if (err) {
        return res.status(500).send('Database error, please try again!');
      }


      fs.writeFile('public/'+fileName, base64data, { encoding: 'base64' }, (err) => {
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
