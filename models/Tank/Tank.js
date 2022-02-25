const mongoose = require('../../db/connection'); 

const weaponSchema = require('./Weapons');
const ammoSchema = require('./Ammo');
const imageSchema = require('./Images')
    
const tankSchema = new mongoose.Schema({
    model: {
      type: String,
      required: true
    },
    main: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    ammo: [ammoSchema], 
    secondary: [weaponSchema],
    images: [imageSchema]
  });
  
  const Tank = mongoose.model('Tank', tankSchema);
  module.exports = Tank;
