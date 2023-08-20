const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const Booking = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    start: {
        type: String
    },
    trainname: {
        type: String
    },
    time: {
        type: String
    },
    end: {
        type: String
    },
    date: {
        type: String, // Change the type to String
        set: function (value) {
            if (value instanceof Date) {
                return value.toISOString().split('T')[0]; // Format the date as "YYYY-MM-DD"
            }
            return value;
        }
    },
    Pay: {
        type: Number,
      },
    
    joined: { type: Date, default: Date.now }
 },{
 collection: 'bookings'
 });

 module.exports = mongoose.model('Booking', Booking);