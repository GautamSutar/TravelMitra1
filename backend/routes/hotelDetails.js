const express = require("express");
const { getUserBookingDetails } = require("../controllers/bookingDetailsController"); // ✅ Import Controller Function
const authenticateUser = require("../middleware/auth"); // ✅ Import Authentication Middleware
const router = express.Router();

// Define route to fetch user bookings
router.get("/booking/:userId", authenticateUser, getUserBookingDetails); // ✅ Route with Authentication Middleware

module.exports = router;
