const mongoose = require('mongoose');

// Make schema
const carSchema = new mongoose.Schema(
  
  {
    id:           Number,
    title:        String,
    description:  String,
  }
  
);

module.exports = mongoose.model('car', carSchema);