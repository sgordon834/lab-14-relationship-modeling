'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Dog = require(__dirname + '/../models/dog');

const dogRouter = module.exports = express.Router();

dogRouter.post('/dogs', jsonParser, (req, res, next) => {
  let newDog = new Dog(req.body);
  newDog.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 500, message: 'error creating dogs', error: err}));
});

dogRouter.get('/dogs', (req, res, next) => {
  let findObj = req.query || {};
  Dog.find(findObj)
    .then(dogs => res.send(dogs))
    .catch(err => next({error: err}));
});

dogRouter.get('/dogs/:id', (req, res, next) => {
  Dog.findOne({_id: req.params.id})
    .then(dogs => res.send(dogs))
    .catch(err => next({error: err}));
});


dogRouter.put('/dogs/:id', jsonParser, (req, res, next) => {
  if(!req.params.id || Object.keys(req.body).length === 0 ) {
    next({statusCode:400, message: 'Bad Request'});
  }
  delete req.body._id;
  Dog.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(() => res.send('success!'))
    .catch(err => next({error: err}));
});

dogRouter.patch('/dogs/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  //$set will only update the supplied fields
  //instead of replacing the entire object
  Dog.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    .then(() => res.send('success!'))
    .catch(err => next({error: err}));
});

dogRouter.delete('/dogs/:id', (req, res, next) => {
  Dog.remove({_id: req.params.id})
    .then(() => res.send('dog successfully murdered'))
    .catch(err => next({error: err}));
});
