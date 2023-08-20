const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const Food = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    seatnum: {
        type: Number
    },
    foodname: {
        type: String
    },
    quantity: {
        type: Number
    },
    pay: {
        type: Number,
    },
    price: {
        type: String,
        default: "Cash on Deliver"
    },
    joined: { type: Date, default: Date.now }
 },{
 collection: 'foodorders-Cash'
 });
 
 module.exports = mongoose.model('FoodCash', Food);