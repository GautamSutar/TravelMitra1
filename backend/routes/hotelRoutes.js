const express = require("express");
const router = express.Router();

const { getHotels } = require('../controllers/hotelController');
const { CreatingBooking } = require("../controllers/bookingController");
const authenticateUser = require("../middleware/auth");

router.get('/getHotel', authenticateUser, getHotels); // To get all hotels

router.post("/create", authenticateUser, CreatingBooking); // Route for creating a booking

module.exports = router;

