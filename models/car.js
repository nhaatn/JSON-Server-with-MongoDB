const mongoose = require('mongoose');

// Make schema
const carSchema = new mongoose.Schema(
  {
    id: {
      type: Number, 
      required: true
    },
    make: {
      type: String, 
      required: true
    },
    description: {
      type: String, 
      required: true
    }
  }
);

module.exports = mongoose.model('car', carSchema);