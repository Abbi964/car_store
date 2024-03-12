import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    purpose : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    time : {
        type : Number,
        required : true 
    },
    phone : {
        type : Number,
        required : true
    }  
},{timestamps: true})

module.exports = mongoose.model('Appointment',appointmentSchema)