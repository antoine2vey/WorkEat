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

  Order.findById(id)
  .populate('articlesId', 'name price -_id')
  .populate('bundlesId', 'name price -_id')
  .populate('placeToShip', 'name -_id')
  .exec((err, order) => {
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
        }).then(customer => (
          Stripe.charges.create({
            amount: price,
            currency: 'eur',
            customer: customer.id,
          })
        )).then((charge) => {
          user.tokens.stripe = charge.customer;
          user.save((_err) => {
            if (_err) {
              console.log('FUCKING ERROR RIGHT THERE:', _err);
            }
          });
        });
      } else {
        Stripe.charges.create({
          amount: price,
          currency: 'eur',
          customer: user.tokens.stripe,
        });
      }
    });

    /**
     * Apres le paiement, je récupère mon panier avec les id via populate et je crée sur le serveur
     * smtp  (proxy)
     */

    const { name, surname } = req.user;
    const { articlesId, articlesNumber, bundlesId, bundlesNumber, placeToShip, amount } = order;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PWD,
      },
    });
    const mailOptions = {
      from: 'WorkEat',
      to: req.user.username,
      subject: 'WorkEat - Facture!', // Subject line
      text: `
      Merci pour votre commande ${surname} ${name} !

      Votre commande se constitue de :

        ${articlesId.map((article, idx) => `- ${article.name} | ${articlesNumber[idx]} x ${article.price}€ = ${articlesNumber[idx] * article.price}€
        `).join('')}

        ${bundlesId.length ? '____' : ''}

        ${bundlesId.map((bundle, idx) => `- ${bundle.name} | ${bundlesNumber[idx]} x ${bundle.price}€ = ${bundlesNumber[idx] * bundle.price}€
        `).join('')}

      Votre commande sera livré à l'endroit suivant : ${placeToShip.name}

      Pour un total de ${amount}€
      `,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).send('Vous avez été débité mais l\'email n\'est pas parti!');
      }
      return res.status(200).send(`Merci pour votre paiement de ${amount}€. Un mail de récapitulatif vous à été envoyé à l'addresse ${req.user.username}`);
    });
  });
};
