const mongoose = require('mongoose');

const mandatory = {
  required: true
};

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    mandatory,
  },
  geolocation: {
    type: Array,
    mandatory,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Place', placeSchema);
