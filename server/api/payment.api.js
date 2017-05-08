const Order = require('../models/order.model');
const User = require('../models/user.model');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const nodemailer = require('nodemailer');

function getStripeAmount(amount) {
  return amount * 100;
}

exports.send = (req, res) => {
  const { id } = req.params;
  const { token } = req.body;

  // If no id || token, we stop here
  if (!id || !token) return;

  // Find the order from param
  Order.findById(id)
  .populate('articles', 'file name price')
  .populate('bundles', 'file name price')
  .populate('placeToShip', 'name')
  .exec((err, order) => {
    if (err) {
      return res.status(400).send({
        error: 'Product does not exists',
      });
    }

    if (order.finished) {
      return res.status(403).send('Cette commande à déjà été passée');
    }

    // Found the user who passed the order
    User.findById(order.orderedBy, (error, user) => {
      if (error || !user) {
        res.send('No user with this username');
      }

      // Format price for stripe
      const price = getStripeAmount(order.amount);
      if (!user.tokens.stripe) {
        // No token, we create a new customer first
        Stripe.customers.create({
          source: token,
          description: `${user.surname} ${user.name}`,
          email: user.username,
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
            order = {
              finished: true,
              method: 'Carte bancaire',
            };
            order.save((err) => {
              if (err) {
                console.log('Database error @ save order', err);
              }

              res.status(200).send({ order });
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
        order = {
          finished: true,
          method: 'Carte bancaire',
        };
        order.save((err) => {
          if (err) {
            console.log('Database error @ save order', err);
          }

          res.status(200).send({ order });
        });
      }
    });
  });
};
