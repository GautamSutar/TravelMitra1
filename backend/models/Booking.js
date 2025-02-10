const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true }, // ✅ Added userName
    userEmail: { type: String, required: true }, // ✅ Added userEmail
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    hotelName: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true }, 
    checkInDate: { type: Date, required: true }, // ✅ Added check-in date
    checkOutDate: { type: Date, required: true }, // ✅ Added check-out date
    numberOfAdults: { type: Number, required: true }, // ✅ Added number of adults
    numberOfChildren: { type: Number, required: true }, // ✅ Added number of children
    numberOfPets: { type: Number, required: true }, // ✅ Added number of pets
    rooms: {
        standard: { type: Number, default: 0 }, // ✅ Added standard rooms
        deluxe: { type: Number, default: 0 }, // ✅ Added deluxe rooms
        suite: { type: Number, default: 0 }, // ✅ Added suite rooms
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
