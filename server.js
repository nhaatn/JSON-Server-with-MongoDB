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
  res.send(`<h1>Hello please add the following to your URL</h1>
  <p>add '/api/v0/cars' to get an array of cars</p>
  <h2>OR</h2>
  <p>add '/api/v0/cars/:id' to get a SPECIFIC car object based on the ID entered **Be sure to change ':id' to a number from 1-10**</p>`)
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