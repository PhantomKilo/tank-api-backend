const mongoose = require('../db/connection'); 

const weaponSchema = require('./Weapons');
const ammoSchema = require('./Ammo');
    
const tankSchema = new mongoose.Schema({
    model: {
      type: String,
      required: true
    },
    main: {
        type: String,
        required: true
    },
    ammo: [ammoSchema], 
    secondary: [weaponSchema]
  });
  
  const Tank = mongoose.model('Tank', tankSchema);
  module.exports = Tank;
