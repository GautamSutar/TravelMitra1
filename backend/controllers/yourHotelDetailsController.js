const yourHotelDetails = require('../models/yourHotelDetails');

exports.createBooking = async (req, res) => {
    try {
        const bookingData = { ...req.body, user: req.user.id };
        const booking = new yourHotelDetails(bookingData);
        await booking.save();
        res.status(201).json({ message: "booking successful", booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get all booking 
exports.getAllBooking = async(req.res) => {
    try {
        const booking = await yourHotelDetails.find().populate("user", "name email"); //populating user details 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single booking by id 
exports.getBookingById = async (req, res) => {
    try {
        const booking = await yourHotelDetails.findById(req.params.id).populate("user", "name email");
        if (!booking) {
            return res.status(404).json({ message: " Booking not found" });
        }
        res.status(200).json({ message: "Booking founded", booking });
    } catch (error) {
        console.log("This is not valid booking id:", error);
        res.status(500).json({ message: "Error in finding the booking", error });
    }
};

// Delete booking 
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await yourHotelDetails.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: ' Booking not found to delete' });
        }
    } catch (error) {
        console.log("Error in deleting the Booking:", error);
        res.status(500).json({ message: 'Error in deleting the booking', error });

    }
};