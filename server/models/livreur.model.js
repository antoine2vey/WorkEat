const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const livreurSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  placesToGo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Place',
    },
  ],
  currentCommand: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  currentPosition: Array,
});

livreurSchema.methods.validatePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = mongoose.model('Livreur', livreurSchema);
