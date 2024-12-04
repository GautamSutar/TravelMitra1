const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Number, required: true, min: 0 },
});

const hotelSchema = new mongoose.Schema({
    image: String,
    name: String,
    rankingPosition: Number,
    priceLevel: String,
    rating: Number,
    phone: String,
    address: String,
    email: String,
    numberOfReviews: Number,
    rooms: [roomSchema]
});

module.exports = mongoose.model('Hotel', hotelSchema);