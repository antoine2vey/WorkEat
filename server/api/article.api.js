const mongoose = require('mongoose');
const Article = require('../models/article.model');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const gm = require('gm').subClass({ imageMagick: true });
const genId = require('shortid');

mongoose.Promise = Promise;

exports.list = (req, res) => {
  Article.find({}).populate('author', 'name surname -_id').exec((err, articles) => {
    if (err) {
      return res.status(400).send('Problem BDD');
    }
    res.status(200).send(articles);
  });
};

exports.getOne = async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);

  res.status(200).send(article);
};

exports.create = (req, res) => {
  const { title, thumbnail, banner, text } = req.body;

  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('thumbnail', 'Thumbnail is required').notEmpty();
  req.checkBody('banner', 'Banner is required').notEmpty();
  req.checkBody('text', 'Text is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  const image = thumbnail;
  const base64data = image.replace(/^data:image\/\w+;base64,/, '');
  const id = genId.generate();
  const fileName = `uploads/articles/${id}.${Date.now()}.png`;

  const background = banner;
  const data = background.replace(/^data:image\/\w+;base64,/, '');
  const _id = genId.generate();
  const backgroundFileName = `uploads/articles/${_id}.${Date.now()}.png`;

  const article = new Article({
    title,
    thumbnail: fileName,
    banner: backgroundFileName,
    text: sanitizeHtml(text),
    author: req.user.id,
  });

  Article.findOne({ title }, (err, existingArticle) => {
    if (existingArticle) {
      return res.status(500).send('Article déjà existant !');
    }

    article.save((err) => {
      if (err) {
        console.log(err);
      }

      const thumb = new Buffer(base64data, 'base64');
      const banner = new Buffer(data, 'base64');
      gm(thumb, fileName)
        .resize('500', '700', '^')
        .gravity('Center')
        .crop('500', '700')
        .write(`public/${fileName}`, (err) => {
          if (err) {
            return console.log('image magick err', err);
          }
        });

      gm(banner, backgroundFileName)
        .resize('2000', '1000', '^')
        .gravity('Center')
        .crop('2000', '1000')
        .write(`public/${backgroundFileName}`, (err) => {
          if (err) {
            return console.log('image magick err', err);
          }
        });

      res.status(200).send(article);
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Article.findByIdAndRemove(id, (err, article) => {
    if (err) {
      return res.status(500).send('Database error, cannot delete product');
    }

    // delete image if successful request
    fs.unlink(article.thumbnail, (err) => {
      if (err) {
        console.log(err);
      }
    });

    return res.status(200).send('Article deleted!');
  });
};
