const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

const userSchema =  new Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model( "user", userSchema);