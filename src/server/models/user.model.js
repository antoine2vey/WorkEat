const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  codePostal: {
    type: Number,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isLivreur: {
    type: Boolean,
    default: false,
  },
  isPrestataire: {
    type: Boolean,
    default: false,
  },
  tokens: {
    stripe: String,
  },
});

accountSchema.methods.validatePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash); // boolean return
};

module.exports = mongoose.model('User', accountSchema);
