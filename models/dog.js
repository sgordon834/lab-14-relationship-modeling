'use strict';

const mongoose = require('mongoose');
const Breed = require('./breed');

const dogSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  favoriteFood: {type: String, default: 'Mighty Bone'},
  breed:{ type: mongoose.Schema.Types.ObjectId, ref: 'Breed' }
});

dogSchema.pre('save', function(done){
  
  
  Breed.findById(this.breed)
    .then( breed => {
      if (! breed) {
        let newBreed = new Breed({});
        return newBreed.save();
      }   
      else { return breed; }
    })
    .then( breed => this.breed = breed._id )
    .then( () => done() )
    .catch(done);
});

dogSchema.pre('findOne', function(){
  this.populate({
    path:'breed',
  });
});


module.exports = mongoose.model('Dog', dogSchema);
