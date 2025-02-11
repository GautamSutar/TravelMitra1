const Booking = require("../models/Booking");

// Get all booking details for a user

const getUserBookingDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find all bookings associated with the given user ID
    const bookings = await Booking.find({ userId });
    if (bookings.length === 0) {
      // checking the lenght of bookings
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }
    res
      .status(200)
      .json({ message: "Booking details retrieved successfully", bookings });
  } catch {
      console.log("Error in backendFile (BookingDetailsController):", error);
    console.error("Error fetching booking details:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { getUserBookingDetails };
