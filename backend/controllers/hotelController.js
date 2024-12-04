const Hotel = require('../models/Hotel');

// Fetch all hotels
const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({});
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotels', error });
    }
};

exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId); // Using Mongoose's findById method
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getHotels };