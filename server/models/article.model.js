const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  writtenAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Article', articleSchema);
