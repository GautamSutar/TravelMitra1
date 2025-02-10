const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/auth");

const { CreatingBooking, getBookingDetails } = require("../controllers/bookingController");

router.post("/create", authenticateUser, CreatingBooking); // Route for creating a booking

// Route to get booking details by userId and hotelId
router.get("/getBooking/:userId/:hotelId", getBookingDetails);

module.exports = router;

