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
    $lte: limit
  }})
  .populate('articlesId', 'name -_id')
  // Moyen cleen pour faire une deep populate (Bundle qui a des items qui ont des articles)
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
      return console.log('ERR %s', err)
    }

    if (orders.length) {
      console.log(orders);
      const fields = ['name', 'amount'];
      let data = [];

      orders.forEach((order) => {
        // Articles
        order.articlesId.forEach((article, i) => {
          data.push({
            name: article.name,
            amount: order.articlesNumber[i]
          })
        });

        // Bundles
        order.bundlesId.forEach(bundle => {
          bundle.itemsId.forEach((item, i) => {
            console.log(item)
            // On ajoute 1 seul item car on ne peut mettre que 1 seul item dans
            // un bundle
            data.push({
              name: item.name,
              amount: 1
            })
          });
        });
      });

      const csv = json2csv({ data, fields });
      fs.writeFile('file.csv', csv, function(err) {
        if (err) throw err;
        console.log('csv done');
        res.send('Created file');
      });
    } else {
      res.status(200).send('Pas de commandes aujourd\'hui');
    }
  });
};
exports.download = (req, res, next) => {
  res.download('file.csv', 'file.csv', err => {
    if(err) {
      console.log(err);
    } else {
      console.log('Yeah?')
    }
  });
}
