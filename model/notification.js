const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const Notification = new Schema({
    notification: {
        type: String
    },
    joined: { type: Date, default: Date.now }
 },{
 collection: 'notifications'
 });

 module.exports = mongoose.model('Notification', Notification);