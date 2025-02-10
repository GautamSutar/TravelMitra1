const mongoose = require("mongoose");
const YourHotelDetailsSchema = new mongoose.Schema({
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    numberOfAdults: {
        type: Number,
        required: true,
        min: 1, // at least 1 adult required
    },
    numberOfChildren: {
        type: Number,
        default: 0,
    },
    numberOfPets: {
        type: Number,
        default: 0;
    },
    rooms: {
        standard: {
            type: Number,
            default: 0
        },
        deluxe: {
            type: Number,
            default: 0
        },
        suite: {
            type: Number,
            default: 0,
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //Assuming You Have a user model
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model("YourHotelDetails", YourHotelDetailsSchema);
