const express = require("express");
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/place', require('./placeRoutes'));
router.use('/trip', require('./tripRoutes'));
router.use('/pic', require('./profileRoutes'));
router.use('/budget', require('./budgetRoutes'));
router.use("/rate-comment", require("./commentRoutes"));
router.use('/event', require('./eventRoutes'));
router.use('/personalities', require('./personalityRoutes'));
router.use('/hidden', require('./hiddenGemsRoutes'));
router.use('/fest', require('./festivalRoutes'));
router.use('/hotel', require('./hotelRoutes'));
router.use('/hotel-book', require('./hotelBooking'));
router.use("/hotel-details", require("./hotelDetails"));
router.use("/comment-likes", require("./comment_Likes"));


module.exports = router;
