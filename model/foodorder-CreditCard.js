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
    price: {
        type: Number
    },
    joined: { type: Date, default: Date.now }
 },{
 collection: 'foodorders-CreditCard'
 });
 
 module.exports = mongoose.model('Food', Food);