const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        required: true
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});

module.exports = mongoose.model("User", userSchema);
