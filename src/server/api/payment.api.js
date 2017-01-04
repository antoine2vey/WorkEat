const Order = require('../models/order.model');
const User = require('../models/user.model');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

function getStripeAmount(amount) {
  return amount * 100;
}

exports.send = (req, res) => {
  const { username } = req.user;
  const { id } = req.params;
  const { token } = req.body;

  if (!id || !token) return;

  Order.findById(id).populate('articlesId orderedBy placeToShip').exec((err, order) => {
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
          email: username,
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

    /**
     * Apres le paiement, je récupère mon panier avec les id via populate et je crée sur le serveur
     * smtp  (proxy)
     */
    const { orderedBy, articlesId, placeToShip, amount } = order;
    const { surname, name } = orderedBy;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PWD,
      },
    });
    const mailOptions = {
      from: 'WorkEat',
      to: orderedBy.username,
      subject: 'WorkEat - Facture!', // Subject line
      text: `
      Merci pour votre commande ${surname} ${name} !
      
      Votre commande se constitue de :

      test
      test
      liste

      Votre commande sera livré à l'endroit suivant : ${placeToShip.name}

      Pour un total de ${amount}
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info);
    });
  });
};
