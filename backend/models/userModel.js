const mongoose = require('mongoose')
// import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    dob: {
        type: Date,
        required: [true, "Please enter the date!"]
    },
    phoneno: {
        type: String,
        required: [true, "Please enter number!"],
        trim: true
    },
    
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)