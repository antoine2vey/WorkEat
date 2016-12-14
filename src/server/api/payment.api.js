//jshint camelcase: false
const mongoose = require('mongoose');
const Product = require('../models/product.model');
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

  Product.findById(id, (err, product) => {
    if (err) {
      return res.send({
        error: 'Product doesn\'t exist',
      });
    }

    User.findById(_id, (err, user) => {
      if (err) {
        throw new Error('Database error');
      }


      const amount = getStripeAmount(product.price);
      // If user has no stripe token
      if (!user.tokens.stripe) {
        user.tokens.stripe = token;
        user.save((err) => {
          if(err) {
            throw new Error('Can\'t update current token');
          }

          Stripe.charges.create({
            amount: amount,
            currency: 'eur',
            customer: user.tokens.stripe,
          }, (err, charge) => {
            if (err) {
              throw new Error('Cant charge ... aborted', err);
            }

            console.log(charge);
          });
        });
      } else {

      }
    });

    const price = getStripeAmount(product.price);
    Stripe.customers.create({
      source: token,
      description: `${req.user.name} ${req.user.surname}`,
    }).then((customer) => {
      console.log(customer.id);
      return Stripe.charges.create({
        amount: price,
        currency: 'eur',
        customer: customer.id,
      });
    }).then((charge) => {
      // YOUR CODE: Save the customer ID and other info in a database for later!
    });

    res.send(`Thanks for buying ${product.title}`);
  });
};
