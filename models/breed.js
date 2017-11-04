'use strict';

const mongoose = require('mongoose');
// const Dog = require('./dog');

const breedSchema = mongoose.Schema({
  breed: { type:String, require:true },
  // timestamp: { type: Date, required: true },
  
});

module.exports = mongoose.model('Breed', breedSchema);


// Breed.findByIdAndAddDog = function(id, dog) {
  
//   return Breed.findById(id)
//     .catch( err => Promise.reject(createError(404, err.message)))
//     .then( breed => {
//       dog.breedDog = breed._id;
//       this.tempBreed = breed;
//       return new Dog (dog).save();
//     })
//     .then( dog => {
//       this.tempBreed.dogs.push(dog._id);
//       this.tempDog = dog;
//       return this.tempBreed.save();
//     })
//     .then( () => {
//       return this.tempDog;
//     });
// };

