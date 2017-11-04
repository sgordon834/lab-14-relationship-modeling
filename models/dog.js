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
    .then( mutt => {
      if (! mutt) {
        let newMutt = new Breed({dog: this._id, breed: ''});
        return newMutt.save();
      }   
      else { return mutt; }
    })
    .then( mutt => {
      this.breed = mutt._id;
      done();
    })
    .catch(done);
});

dogSchema.pre('findOne', function(done){
  this.populate({

    path:'breed',
  });
  done();
});


const Dog = module.exports = mongoose.model('Dog', dogSchema);
