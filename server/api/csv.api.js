const fs = require('fs');
const json2csv = require('json2csv');
const moment = require('moment');
const path = require('path');
const Order = require('../models/order.model');

/**
 * @description Check if given fields exists in a given array for CSV file
 * @param {*} array
 * @param {*} field
 */
const doesFieldExists = (array, field) => {
  return array.some(fields => fields.produit === field);
};

exports.createFile = (req, res) => {
  const { date } = req.body;
  const formattedDate = moment(date).format('DD-MM-YYYY');
  const fileName = `commandes_${formattedDate}.csv`;
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
      const fields = ['produit', 'montant'];
      const data = [];
      orders.forEach((order) => {
        // Articles
        order.articles.forEach((article) => {
          if (doesFieldExists(data, article.name)) {
            const index = data.findIndex(obj => obj.produit === article.name);
            return (data[index].montant += order.quantitiesById[article._id]);
          }

          data.push({
            produit: article.name,
            montant: order.quantitiesById[article._id],
          });
        });

        // Bundles
        order.bundles.forEach((bundle) => {
          const keys = ['entree', 'plat', 'dessert', 'boisson'];

          keys.forEach((key) => {
            // If no boisson or plat or ....
            if (!bundle[key]) {
              return;
            }

            if (doesFieldExists(data, bundle[key].name)) {
              const index = data.findIndex(obj => obj.produit === bundle[key].name);
              return (data[index].montant += 1);
            }

            data.push({
              produit: bundle[key].name,
              montant: 1,
            });
          });
        });
      });

      const csv = json2csv({ data, fields });
      const csvDir = path.join(__dirname, '..', '..', 'csv');

      // If directory doesnt exist, we create it
      fs.stat(csvDir, (err) => {
        // We can write to dir
        if (err) {
          // On doit bloquer le thread sinon il writefile avant
          // de mkdir
          fs.mkdirSync(csvDir, () => fs.close());
        }
      });

      fs.writeFile(`${csvDir}/${fileName}`, csv, (err) => {
        if (err) {
          res.status(500).send('Quelque chose s\'est mal déroulé, veuillez réessayer');
        }

        res.status(200).send({
          fileContent: csv,
          fileName,
        });
      });
    } else {
      res.status(404).send('Pas de commandes aujourd\'hui');
    }
  });
};
