const mongoose = require('mongoose');
const Livreur = require('../models/livreur.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
      res.status(200).send('Livreur crée! ' + newLivreur.email);
    });
  } catch (e) {
    return res.status(500).send('Server error ' + e);
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
    const livreur = await Livreur.findOne({ email });
    const isMatching = livreur.validatePassword(password, livreur.password);
    const payload = {
      email: livreur.email,
    };

    if (isMatching) {
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.status(200).send(token);
    }

    return res.status(400).send({ message: 'Mauvais mot de passe / email' });
  } catch (e) {
    res.status(500).send('Server error');
  }
};

