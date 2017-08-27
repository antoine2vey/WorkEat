const Order = require('../models/order.model');
const mailer = require('../mailing').interface;
const createPdf = require('../pdf');

exports.getOne = (req, res) => {
  const { id } = req.params;
  Order.findOne({ _id: id })
    .populate({
      path: 'articles',
      model: 'Product',
      populate: {
        path: 'tags',
        model: 'Tag',
      },
    })
    .populate('bundles.bundle')
    .populate('bundles.entree')
    .populate('bundles.plat')
    .populate('bundles.dessert')
    .populate('bundles.boisson')
    .populate('placeToShip', 'name -_id')
    .populate('orderedBy', 'name address codePostal town surname username')
    .exec((err, order) => {
      if (!order) {
        return res.status(404).send('Cet commande n\'existe pas');
      }

      if (err) {
        return res.status(400).send('Erreur');
      }

      mailer.sendMail({
        from: 'WorkEat',
        to: order.orderedBy.username,
        subject: 'Votre commande',
        template: 'recap',
        context: {
          hostUrl: `${req.protocol}://${req.hostname}`,
          total: order.amount,
          user: {
            address: order.orderedBy.address,
            codePostal: order.orderedBy.codePostal,
            town: order.orderedBy.town,
          },
          articles: order.articles,
          bundles: order.bundles,
          quantitiesById: order.quantitiesById,
          where: order.placeToShip,
        },
      }, (err, response) => {
        if (err) {
          return console.log(err);
        }

        console.log('mail sent!', response.response);
        return mailer.close();
      });

      return res.send(order);
    });
};

exports.create = (req, res) => {
  const { cart, quantites } = req.body;
  const products = cart.filter(item => !item.isBundle);
  const bundles = cart.filter(item => item.isBundle).map(bundle => ({
    bundle: bundle._id,
    entree: bundle.entree._id || undefined,
    plat: bundle.plat._id || undefined,
    dessert: bundle.dessert._id || undefined,
    boisson: bundle.boisson._id || undefined,
  }));

  Order.count({}).exec((err, len) => {
    const order = new Order({
      position: len + 1,
      orderedBy: req.user.id,
      articles: products,
      bundles,
      quantitiesById: quantites,
      amount: cart.reduce((curr, next) => curr + (next.quantity * next.price), 0),
      placeToShip: req.body.placeId,
    });

    order.save((err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Database error');
      }

      const fields = 'name price';
      Order.findById(order._id)
        .populate('articles', fields)
        .populate('bundles.bundle', fields)
        .populate('bundles.entree', fields)
        .populate('bundles.plat', fields)
        .populate('bundles.dessert', fields)
        .populate('bundles.boisson', fields)
        .populate('placeToShip', 'name description')
        .populate('orderedBy', 'name address codePostal town surname username phoneNumber')
        .exec((err, data) => {
          createPdf(data, res);
        });
      return res.send({ id: order._id });
    });
  });
};

exports.forCurrentUser = (req, res) => {
  Order
    .find({})
    .where('orderedBy').equals(req.user.id)
    .select('position orderedAt finished method amount quantitiesById')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).send('Error getting orders for current user');
      }

      return res.status(200).send(orders);
    });
};
