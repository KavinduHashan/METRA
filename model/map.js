const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the location schema
const locationSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  joined: { type: Date, default: Date.now }
});

// Define the location model
const Location = mongoose.model('Location', locationSchema);

module.exports=Location;