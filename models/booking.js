const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'Hall',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default:Date.now()
    },
    additionalOptions: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['pending', 'approved'],
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    startDate:{
        type:String
    },
    endDate:{
        type:String
    },
    eventName:{
        type:String
    },
    hallName:{
        type:String
    },
    hallImage:{
        type:String
    },
    userName:{
        type:String
    }
    
});

module.exports = mongoose.model("Booking", bookingSchema);
