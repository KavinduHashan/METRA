const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 // List of columns for Employee schema
 const Canteen = new Schema({
    foodname: {
        type: String
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number
    },
    joined: { type: Date, default: Date.now }
 },{
 collection: 'canteens'
 });

 module.exports = mongoose.model('Canteen', Canteen);