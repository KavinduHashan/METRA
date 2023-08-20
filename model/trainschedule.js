const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const Schedules = new Schema({
    trainname: {
        type: String
    },
    start: {
        type: String,
    },
    end: {
        type: String
    },
    date: {
        type: String, 
        set: function (value) {
            if (value instanceof Date) {
                return value.toISOString().split('T')[0]; 
            }
            return value;
        }
    },
    time: {
        type: String
    },
    price: {
        type: Number
    },
    joined: { type: Date, default: Date.now }
 },{
 collection: 'schedules'
 });
 
 module.exports = mongoose.model('Schedules', Schedules);