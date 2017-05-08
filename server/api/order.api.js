const Order = require('../models/order.model');

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
    .populate('bundles')
    .populate('placeToShip')
    .exec((err, order) => {
      if (!order) {
        return res.status(404).send('Cet commande n\'existe pas');
      }

      if (err) {
        return res.status(400).send('Erreur');
      }

      return res.send(order);
    });
};

exports.create = (req, res) => {
  const { cart, quantites } = req.body;

  Order.count({}).exec((err, len) => {
    const order = new Order({
      position: len + 1,
      orderedBy: req.user.id,
      articles: cart.map(p => p._id),
      quantitiesById: quantites,
      amount: cart.reduce((curr, next) => curr + (next.quantity * next.price), 0),
    });

    order.save((err) => {
      if (err) {
        return res.status(500).send('Database error');
      }

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
