const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const mailer = require('../mailing').interface;
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

mongoose.Promise = Promise;

function getStripeAmount(amount) {
  return amount * 100;
}

// temp
exports.list = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return;
    }

    res.send(users);
  });
};

exports.updateAmount = (req, res) => {
  const { amount, token } = req.body;

  User.findById(req.user.id, (err, user) => {
    if (err) {
      return console.log('Error @ update amount', err);
    }

    if (req.query.method === 'paypal') {
      user.solde += parseInt(amount, 10);
      return user.save((_err) => {
        if (_err) {
          console.log('Database error @ update user', _err);
        }
        return res.send({ amount });
      });
    }

    if (!user.tokens.stripe) {
        // No token, we create a new customer first
      Stripe.customers.create({
        source: token,
        description: `${user.surname} ${user.name} ajoute ${getStripeAmount(amount)}€ de solde`,
        email: user.username,
      }).then(customer => (
        // Then we charge this customer with his id as token
        Stripe.charges.create({
          amount: getStripeAmount(amount),
          currency: 'eur',
          customer: customer.id,
        })
      )).then((charge) => {
        // Customer id becomes our token
        user.tokens.stripe = charge.customer;
        user.solde += parseInt(amount, 10);
        user.save((_err) => {
          if (_err) {
            console.log('Database error @ update user', _err);
          }

          res.send({ amount });
        });
      });
    } else {
      // We charge directly by the provided token!
      Stripe.charges.create({
        amount: getStripeAmount(amount),
        currency: 'eur',
        customer: user.tokens.stripe,
      });

      user.solde += parseInt(amount, 10);
      user.save((_err) => {
        if (_err) {
          console.log('Database error @ update user', _err);
        }

        res.send({ amount });
      });
    }
  });
};

exports.login = (req, res) => {
  req.checkBody('username', 'Email is required').notEmpty().isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(401).send('Username or password was left empty. Please complete both fields and re-submit.');
  }

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      throw new Error(err);
    }

    if (!user) {
      return res.status(401).send('User not found. Please check your entry and try again.');
    }

    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (isMatch) {
        req.logIn(user, (err) => {
          if (err) {
            return res.status(500).send('Error saving session.');
          }
          const payload = {
            id: user._id,
            isAdmin: user.isAdmin,
            isLivreur: user.isLivreur,
            isPrestataire: user.isPrestataire,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          return res.status(200).send({
            token,
            user: {
              username: user.username,
              name: user.name,
              surname: user.surname,
              codePostal: user.codePostal,
              address: user.address,
              phoneNumber: user.phoneNumber,
              town: user.town,
              solde: user.solde,
              position: user.position,
            },
          });
        });
      } else {
        res.status(401).send({ success: false, message: 'Auth fail' });
      }
    });
  });
};
exports.create = (req, res) => {
  req.checkBody('username', 'Email is required').notEmpty().isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('surname', 'Surname is required').notEmpty();
  req.checkBody('codePostal', 'Code postal is required').notEmpty().isInt();
  req.checkBody('town', 'Town is required').notEmpty();
  req.checkBody('address', 'Address is required').notEmpty();
  req.checkBody('phoneNumber', 'Phone number is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hash,
    name: req.body.name,
    surname: req.body.surname,
    codePostal: req.body.codePostal,
    position: req.body.position,
    town: req.body.town,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  });

  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (existingUser) {
      return res.status(400).send('That username already exists. Please try a different username.');
    }

    user.save((err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error saving new account (database error). Please try again.');
        return;
      }

      mailer.sendMail({
        from: 'WorkEat',
        to: user.username,
        subject: 'Création de votre compte',
        template: 'welcome',
        context: {
          hostUrl: `${req.protocol}://${req.hostname}`,
          name: user.surname,
          mailTo: 'antoine.2vey@gmail.com',
        },
      }, (err, response) => {
        if (err) {
          return console.log(err);
        }

        return console.log('mail sent!', response.response);
      });

      return res.status(200).send('Account created! Please login with your new account.');
    });
  });
};
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.user.id, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting account.');
      return;
    }

    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('Error deleting account.');
        console.log('Error deleting session: ', err);
        return;
      }
      res.status(200).send('Account successfully deleted.');
    });
  });
};
exports.update = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const query = {
    username: req.body.username,
    password: hash,
    name: req.body.name,
    surname: req.body.surname,
    codePostal: req.body.codePostal,
    position: req.body.position,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    town: req.body.town,
  };

  // We do pass the session userId
  User.findByIdAndUpdate(req.user.id, query, (err, doc) => {
    if (err) {
      return res.status(500).send({
        error: 'Email already exists',
      });
    }

    res.status(200).send({
      status: 'Account updated',
    });
  });
};
exports.logout = (req, res) => {
  if (!req.user) {
    res.status(400).send('User not logged in.');
  } else {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('Sorry. Server error in logout process.');
        console.log('Error destroying session: ', err);
        return;
      }

      res.status(200).send('Success logging user out!');
    });
  }
};
