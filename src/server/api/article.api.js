const mongoose = require('mongoose');
const Article = require('../models/article.model');
const fs = require('fs');
const genId = require('shortid');

mongoose.Promise = Promise;

exports.list = (req, res) => {
  Article.find({}).populate("author", "name surname -_id").exec((err, articles) => {
    if(err) {
      return res.status(400).send("Problem BDD");
    }
    res.status(200).send(articles);
  });
};
exports.listOne = (req, res) => {
  const { id } = req.params;
}
exports.create = (req, res) => {
  const { title, thumbnail, text } = req.body;
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('thumbnail', 'Thumbnail is required').notEmpty();
  req.checkBody('text', 'Text is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }
  const image = thumbnail;
  const base64data = image.replace(/^data:image\/\w+;base64,/, '');
  const id = genId.generate();
  const fileName = `public/uploads/articles/${id}-${Date.now()}.jpg`;

  const article = new Article({
    title,
    thumbnail: fileName,
    text,
    author: req.user._id,
  });



  Article.findOne({ title }, (err, existingArticle) => {
    if(existingArticle) {
      return res.status(500).send("Article déjà existant !");
    }

    article.save(err => {
      if(err) {
        console.log(err);
      }
      fs.writeFile(fileName, base64data, { encoding: 'base64' }, (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.status(200).send("Article créé");
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
