// Import modules
const mongoose = require('mongoose');
require('dotenv').config();

// Import seed file
const dbSeed = require(`./seeds/cars.js`);

// Import model file
const Car = require(`./models/car.js`);


// Mongoose DB connection
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let db = mongoose.connection;

db.on('error', function(error){
  console.log(`Error: ${error.message}`)
});

db.once('open', function() {
  console.log('Connected to data base...');

});

Car.insertMany(dbSeed, function(error, car) {
  console.log('Data imported...')
  mongoose.connection.close();
});