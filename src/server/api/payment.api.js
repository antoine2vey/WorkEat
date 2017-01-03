const Order = require('../models/order.model');
const User = require('../models/user.model');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function getStripeAmount(amount) {
  return amount * 100;
}

exports.send = (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { token } = req.body;

  if (!id || !token) return;

  Order.findById(id).populate('articlesId', 'title -_id').exec((err, order) => {
    if (err) {
      return res.send({
        error: 'Product does not exists',
      });
    }

    User.findById(order.orderedBy, (error, user) => {
      if (error) {
        throw new Error('Database error.');
      }

      const price = getStripeAmount(order.amount);
      if (!user.tokens.stripe) {
        Stripe.customers.create({
          source: token,
          description: `${req.user.surname} ${req.user.name}`,
        }).then((customer) => {
          return Stripe.charges.create({
            amount: price,
            currency: 'eur',
            customer: customer.id,
          });
        }).then((charge) => {
          user.tokens.stripe = charge.customer;
          user.save((_err) => {
            if (_err) {
              throw new Error('Cannot create token for customer');
            }

            return res.status(200).send(`Merci pour votre paiement de ${charge.amount / 100}€`);
          });
        });
      } else {
        Stripe.charges.create({
          amount: price,
          currency: 'eur',
          customer: user.tokens.stripe,
        }).then((charge) => {
          console.log(order.articlesId);
          return res.status(200).send(`Merci pour votre paiement de ${charge.amount / 100}€`);
        });
      }
    });
  });
};
