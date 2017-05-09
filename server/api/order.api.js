const Order = require('../models/order.model');

exports.create = (req, res) => {
  let total = 0;
  const products = req.body;
  products.forEach(product => parseInt(total += (product.quantity * product.price), 10).toFixed(2));

  const order = new Order({
    orderedBy: req.user.id,
    articles: products.map(p => p._id),
    amount: total,
  });

  order.save((err) => {
    if (err) {
      return res.status(500).send('Database error');
    }

    return res.send(order._id);
  });
};
