const fs = require('fs');
const json2csv = require('json2csv');
const Order = require('../models/order.model');

/**
 * Check if given fields exists in a given array for CSV file
 * @param {*} array 
 * @param {*} field 
 */
const doesFieldExists = (array, field) => {
  return array.some(fields => fields.name === field);
};

exports.createFile = (req, res) => {
  const { date } = req.body;
  const limit = new Date(date);

  limit.setHours(limit.getHours() + 11);

  Order
  .find({ orderedAt: {
    $gt: date,
    $lte: limit,
  } })
  .populate('articles', 'name')
  .populate('bundles.entree', 'name')
  .populate('bundles.plat', 'name')
  .populate('bundles.dessert', 'name')
  .populate('bundles.boisson', 'name')
  .select('articles bundles quantitiesById -_id')
  .exec((err, orders) => {
    if (err) {
      return console.log('ERR %s', err);
    }

    if (orders.length) {
      const fields = ['name', 'amount'];
      const data = [];
      orders.forEach((order) => {
        // Articles
        order.articles.forEach((article) => {
          if (doesFieldExists(data, article.name)) {
            const index = data.findIndex(obj => obj.name === article.name);
            return (data[index].amount += order.quantitiesById[article._id]);
          }

          data.push({
            name: article.name,
            amount: order.quantitiesById[article._id],
          });
        });

        // Bundles
        order.bundles.forEach((bundle) => {
          const keys = ['entree', 'plat', 'dessert', 'boisson'];

          keys.forEach((key) => {
            if (bundle[key] === null) {
              return;
            }

            if (doesFieldExists(data, bundle[key].name)) {
              const index = data.findIndex(obj => obj.name === bundle[key].name);
              return (data[index].amount += 1);
            }

            data.push({
              name: bundle[key].name,
              amount: 1,
            });
          });
        });
      });

      const csv = json2csv({ data, fields });
      fs.writeFile('file.csv', csv, (err) => {
        if (err) {
          res.status(500).send('Quelque chose s\'est mal déroulé, veuillez réessayer');
        }
        res.status(200).send('Fichier crée!');
      });
    } else {
      res.status(404).send('Pas de commandes aujourd\'hui');
    }
  });
};

exports.download = (req, res) => {
  res.download('file.csv', 'file.csv', (err) => {
    if (err) {
      throw new Error(err);
    }

    res.end();
  });
};
