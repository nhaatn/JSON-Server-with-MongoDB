// Load modules/ dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Set port defaults
const PORT = process.env.PORT || 3000

// Import models
const Cars = require('./models/car.js');

// Invoke express into app
const app = express();

// Connect to the DB
mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => {
    console.log('Conected to database...')
    
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`)
    })
  })
  .catch((err) => {
    console.log(err);
  });


// Home page endpoint for when heroku is launched
app.get('/', (req, res) => {
  res.send(`<h1>Welcome!</h1><h2>Add '/api/v0/clubs' to the current endpoint/url to return an array of objects.</h2><h2>or</h2><p>Add '/api/v0/clubs/(any integer betweeen 1-12, inclusive of both numbers)' to return an object with the specified id.</p>`);
});

// JSON endpoint : array of cars
app.get('/api/v0/cars', (req, res) => {
  Cars.find()
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      console.log(err);
    })
});


// JSON endpoint : specified car object based on ID
app.get('/api/v0/cars/:id', (req, res) => {
  Cars.findOne({id: req.params.id}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});


// Middleware for 404 ERROR
app.use(function(req, res) {
  res.status(404).send('404 Error: File not found');
});