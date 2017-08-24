/* eslint newline-per-chained-call: "off" */

const Livreur = require('../models/livreur.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Order = require('../models/order.model');
const moment = require('moment');
const jwtDecode = require('jwt-decode');
// const Places = require('../models/places.model');

exports.create = async (req, res) => {
  req.checkBody('email', 'Email is required').notEmpty().isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('placesToGo', 'At least one place is required').notEmpty().isArray();

  const { email, password, placesToGo } = req.body;
  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newLivreur = new Livreur({
    email,
    password: hash,
    placesToGo,
  });

  try {
    const livreur = await Livreur.findOne({ email });

    if (livreur) {
      return res.status(400).send('Livreur existe déjà');
    }

    newLivreur.save((err) => {
      if (err) {
        return res.status(500).send('Server error');
      }
      res.status(200).send(`Livreur crée! ${newLivreur.email}`);
    });
  } catch (e) {
    return res.status(500).send(`Server error : ${e}`);
  }
};

exports.login = async (req, res) => {
  req.checkBody('email', 'Email is required').notEmpty().isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

  const { email, password } = req.body;
  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
    return;
  }

  try {
    const livreur = await Livreur.findOne({ email }).populate('placesToGo', 'name geolocation');
    const isMatching = livreur.validatePassword(password, livreur.password);
    const payload = {
      email: livreur.email,
      positions: livreur.placesToGo,
    };

    if (isMatching) {
      const token = jwt.sign(payload, process.env.JWT_MOBILE_SECRET);
      return res.status(200).send({ token });
    }

    return res.status(400).send({ message: 'Mauvais mot de passe / email' });
  } catch (e) {
    res.status(500).send('Server error');
  }
};

exports.getCommands = async (req, res) => {
  // Decode the passed token to get livreur possible destination, so ww
  // can send him the right places to go
  const token = req.headers.authorization.replace('Bearer ', '');
  const { positions } = jwtDecode(token);

  try {
    const date = moment().subtract('2', 'day').toISOString();

    const articleFields = 'name price';
    const commands =
      await Order
        .find({})
        .where('placeToShip').in(positions.map(pos => pos._id))
        .where('finished').equals(true)
        .where('orderedAt').gt(date)
        .populate('placeToShip', 'name')
        .populate('orderedBy', 'name surname phoneNumber')
        .populate('articles', articleFields)
        .populate('bundles.bundle', articleFields)
        .populate('bundles.entree', articleFields)
        .populate('bundles.plat', articleFields)
        .populate('bundles.dessert', articleFields)
        .populate('bundles.boisson', articleFields);

    if (!commands.length) {
      // Does not work on Postman.. ??
      return res.status(204).send({
        message: 'Aucune commande ne vous à été assigné',
      });
    }

    return res.status(200).send(commands);
  } catch (e) {
    res.status(500).send('Server error ');
  }
};

exports.check = async (req, res) => {
  const { commandId } = req.params;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(commandId, { isDistribued: true }, { new: true });

    if (!updatedOrder) {
      return res.status(404).send({
        message: 'Ce produit n\'existe pas (???)',
      });
    }

    res.send({
      message: 'Produit délivré!',
      updatedOrder,
    });
  } catch (e) {
    res.status(500).send(`Server error ${e}`);
  }
};
