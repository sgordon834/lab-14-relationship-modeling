'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const Breed = require(__dirname + '/../models/breed.js');

const breedRouter = module.exports = express.Router();


breedRouter.post('/breeds', jsonParser, function(req, res, next) {
  
  let newBreed = new Breed (req.body);
  newBreed.save()
    .then( list => res.json(list))
    .catch(next);
});

breedRouter.get('/breeds', (req, res, next) => {
  let findObj = req.query || {};
  Breed.find(findObj)
    .then(breed => res.send(breed))
    .catch(err => next({error: err}));
});

breedRouter.get('/breeds/:id', (req, res, next) => {
  Breed.findOne({_id: req.params.id})
    .then(breed => res.send(breed))
    .catch(err => next({error: err}));
});

breedRouter.put('/breeds/:id', jsonParser, function(req, res, next) {

  Breed.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then( breed => res.json(breed))
    .catch( err => {
      if (err.name === 'ValidationError') return next(err);
      next(createError(404, err.message));
    });
});

breedRouter.delete('/breeds/:id', function(req, res, next) {
  

  Breed.findByIdAndRemove(req.params.id)
    .then( () => res.status(204).send())
    .catch( err => next(createError(404, err.message)));
});