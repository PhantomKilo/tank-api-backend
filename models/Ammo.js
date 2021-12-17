const mongoose = require('../db/connection'); 

const ammoSchema = new mongoose.Schema ({
  designation: String,
  type: String,
  weight: Number
});

module.exports = ammoSchema