const mongoose = require('../db/connection'); 

const weaponSchema = new mongoose.Schema ({
  weapon: String,
  ammo: String,
  ammoAmount: Number
});

module.exports = weaponSchema