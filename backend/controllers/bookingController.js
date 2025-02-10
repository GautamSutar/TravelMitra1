const Booking = require("../models/Booking");
// Create a new booking
const CreatingBooking = async (req, res) => {
    const { 
        hotelId, 
        hotelName, 
        price, 
        rating,
        image, 
        userId,
        userName, 
        userEmail,
        checkInDate, 
        checkOutDate, 
        numberOfAdults, 
        numberOfChildren, 
        numberOfPets, 
        rooms 
    } = req.body; // ✅ Collecting all required details from request

    try {
        
        console.log("All hotel fiedl: ",hotelId, 
        hotelName, 
        price, 
        rating, 
        image, 
        userId,
        userName, 
        userEmail,
        checkInDate, 
        checkOutDate, 
        numberOfAdults, 
        numberOfChildren, 
        numberOfPets, 
        rooms  );

        if (!hotelId || !hotelName || !price || !rating || !image || !checkInDate || !checkOutDate || 
            !numberOfAdults || !numberOfChildren  || !numberOfPets || !rooms) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newBooking = new Booking({
            userId,
            userName,
            userEmail,
            hotelId,
            hotelName,
            price,
            rating,
            image, // Store image
            userId,
            userName, 
            userEmail,
            checkInDate,
            checkOutDate,
            numberOfAdults,
            numberOfChildren,
            numberOfPets,
            rooms: {
                standard: rooms?.standard || 0,
                deluxe: rooms?.deluxe || 0,
                suite: rooms?.suite || 0,
            }
        });

        await newBooking.save();
        res.status(201).json({ message: "Hotel booking stored successfully in the database", newBooking });

    } catch (error) {  
        console.log("file(Backend): bookingController.js, Error in storing  booking details:", error);
        res.status(500).json({ message: "Error in booking", error });
    }
};


// Get booking details by userId and hotelId
const getBookingDetails = async (req, res) => {
    try {
        const { userId, hotelId } = req.query; // Get userId and hotelId from query params

        if (!userId || !hotelId) {
            return res.status(400).json({ message: "User ID and Hotel ID are required" });
        }

        // Find booking based on userId and hotelId and populate user and hotel details
        const booking = await Booking.findOne({ userId, hotelId })
            .populate("userId", "name email") // Populate user details (name, email)
            .populate("hotelId"); // Populate hotel details if needed

        if (!booking) {
            return res.status(404).json({ message: "No booking found for this user and hotel" });
        }

        res.status(200).json({ message: "Booking details retrieved successfully", booking });
    } catch (error) {
        console.error("Error fetching booking details:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { CreatingBooking, getBookingDetails };
