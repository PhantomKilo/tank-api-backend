const mongoose = require("../../db/connection");

const weaponSchema = require("./Weapons");
const ammoSchema = require("./Ammo");
const imageSchema = require("./Images");

const ifvSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  enteredService: {
    type: Number,
    required: true,
  },
  main: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  ammo: [ammoSchema],
  secondary: [weaponSchema],
  images: [imageSchema],
});

const IFV = mongoose.model("IFV", ifvSchema);
module.exports = IFV;
