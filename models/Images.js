const mongoose = require('../db/connection'); 

const imageSchema = new mongoose.Schema ({
  url: String,
  description: String
});

module.exports = imageSchema