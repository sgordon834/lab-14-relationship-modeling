'use strict';

const mongoose = require('mongoose');
// const Dog = require('./dog');

const breedSchema = new mongoose.Schema({
  breed: { type: String }
  // timestamp: { type: Date, required: true },
  
});

module.exports = mongoose.model('Breed', breedSchema);

