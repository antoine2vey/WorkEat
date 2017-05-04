const Order = require('../models/order.model');
const User = require('../models/user.model');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const nodemailer = require('nodemailer');

function getStripeAmount(amount) {
  return amount * 100;
}

exports.send = (req, res) => {
  const { username } = req.user;
  const { id } = req.params;
  const { token } = req.body;

  // If no id || token, we stop here
  if (!id || !token) return;

  // Find the order from param
  Order.findById(id)
  .populate('articles', 'name price -_id')
  .populate('bundles', 'name price -_id')
  .populate('placeToShip', 'name -_id')
  .exec((err, order) => {
    if (err) {
      return res.send({
        error: 'Product does not exists',
      });
    }

    // Found the user who passed the order
    User.findById(order.orderedBy, (error, user) => {
      if (error) {
        throw new Error('Database error.');
      }

      // Format price for stripe
      const price = getStripeAmount(order.amount);
      if (!user.tokens.stripe) {
        // No token, we create a new customer first
        Stripe.customers.create({
          source: token,
          description: `${req.user.surname} ${req.user.name}`,
          email: username,
        }).then(customer => (
          // Then we charge this customer with his id as token
          Stripe.charges.create({
            amount: price,
            currency: 'eur',
            customer: customer.id,
          })
        )).then((charge) => {
          // Customer id becomes our token
          user.tokens.stripe = charge.customer;
          user.save((_err) => {
            if (_err) {
              console.log('Database error @ update user', _err);
            }
            
            // Order is finished since we saved a token
            order.finished = true;
            order.save((err) => {
              if (err) {
                console.log('Database error @ save order', err);
              }
            });
          });
        });
      } else {
        // We charge directly by the provided token!
        Stripe.charges.create({
          amount: price,
          currency: 'eur',
          customer: user.tokens.stripe,
        });

        // Finished, we update the order
        order.finished = true;
        order.save((err) => {
          if (err) {
            console.log('Database error @ save order', err);
          }
        });
      }
    });
  });
};
