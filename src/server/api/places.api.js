const mongoose = require('mongoose');
const Place = require('../models/places.model');
mongoose.Promise = Promise;

exports.list = (req, res) => {
  Place.find({}, (err, places) => {
    if(err) {
      return res.status(500).send('Database error !');
    }

    return res.status(200).send(places);
  });
};
exports.create = (req, res) => {
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('geolocation', 'Geolocation required').notEmpty().isArray();
  req.checkBody('description', 'Description is required').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  var place = new Place({
    name: req.body.name,
    geolocation: req.body.geolocation,
    description: req.body.description
  });

  Place.findOne({name: req.body.name}, (err, existingPlace) => {
    if(existingPlace){
      return res.status(500).send('This place already exists...');
    }

    place.save(err => {
      if(err) {
        console.log(err);
        return res.status(500).send('Database error, please try again!');
      }

      res.status(200).send('Place created !');
    });
  });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Place.findByIdAndRemove(id, (err, place) => {
    if(err) {
      res.status(500).send('Database error, cannot delete place');
    }

    return res.status(200).send(`Place ${place.name} deleted`);
  });
}; 
