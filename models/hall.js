const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hallSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    amenities: [{
        type: String
    }],
    images: [{
        type: String
    }],
    price: {
        type: Number,
        required: true
    },
    isAvailable:{
        type:Boolean,
        default:true
    }
    ,
    availability: [{
        type: Date
    }]
});

module.exports = mongoose.model("Hall", hallSchema);
