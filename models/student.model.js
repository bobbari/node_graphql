const mongoose = require('mongoose');
const Schema = mongoose.Schema
const studentSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        max:50
    },
    lastName:{
        type: String,
        required: true,
        max:50
    },
    email : {
        type: String,
        required: true,
        max:50
    },
    Phone:{
        type: Number,
        required: true,
        maxLength:13
    },
    address:{
        type: String,
    },
    meeting_time:{
        type: Date,
        default: new Date
    }

})

module.exports = mongoose.model('students',studentSchema);