const mongoose = require('../../db/connection'); 

const weaponSchema = require('./Weapons');
const imageSchema = require('./Images')
    
const apcSchema = new mongoose.Schema({
    model: {
      type: String,
      required: true
    },
    country: {
        type: String,
        required: true
    },
    capacity: {
        type: number,
        required: true
    },
    secondary: [weaponSchema],
    images: [imageSchema]
  });
  
  const APC = mongoose.model('APC', apcSchema);
  module.exports = APC;
