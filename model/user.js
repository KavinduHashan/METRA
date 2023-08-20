const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 //const bcrypt = require('bcryptjs');
 // var crypto = require('crypto'); 
 
 // List of columns for Employee schema
 const Emp = new Schema({
    name: {
        type: String
    },
    nic: {
        type: Number,
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    joined: { type: Date, default: Date.now }
 },{
 collection: 'userdetails'
 });

 
//  Employee.pre('save', async function (next){
//     if(!this.isModified('password')){
//         next()
//     }
//     this.passowrd = await bcrypt.hash(this.passowrd, 10);
//  });
 
 module.exports = mongoose.model('user', Emp);