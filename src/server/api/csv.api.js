const mongoose = require('mongoose');
const fs = require('fs');
const json2csv = require('json2csv');
const Order = require('../models/order.model');
const Bundle = require('../models/bundle.model');

exports.createFile = (req, res) => {
  const { date } = req.body;
  const limit = new Date(date);
  limit.setHours(limit.getHours() + 11);

  Order
  .find({ orderedAt: {
    $gt: req.body.date,
    //$lte: limit
  }})
  .populate('articlesId', 'name -_id')
  // Moyen clean pour faire une deep populate (Bundle qui a des items qui ont des articles)
  .populate({
    path: 'bundlesId',
    model: 'Bundle',
    select: 'name itemsId -_id',
    populate: {
      path: 'itemsId',
      model: 'Product',
      select: 'name -_id'
    }
  })
  .select('bundlesNumber bundlesId articlesNumber articlesId -_id')
  .exec((err, orders) => {
    if (err) {
      return console.log('ERR %s', err);
    }

    if (orders.length) {
      const fields = ['name', 'amount'];
      let data = [];
      console.log(orders);
      orders.forEach((order) => {
        // Articles
        order.articlesId.forEach((article, i) => {
          data.push({
            name: article.name,
            amount: order.articlesNumber[i]
          });
        });

        // Bundles
        order.bundlesId.forEach(bundle => {
          bundle.itemsId.forEach((item, i) => {
            data.push({
              name: item.name,
              amount: 1
            });
          });
        });
      });

      const csv = json2csv({ data, fields });
      fs.writeFile('file.csv', csv, function(err) {
        if (err) throw err;
        res.send('Created file');
      });
    } else {
      console.log('nothing..');
      res.status(400).send('Pas de commandes aujourd\'hui');
    }
  });
};
exports.download = (req, res, next) => {
  res.download('file.csv', 'file.csv', err => {
    if(err)
      throw new Error(err);

    res.end();
  });
};
