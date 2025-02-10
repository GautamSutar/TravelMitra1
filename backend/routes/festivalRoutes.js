const express = require("express");
const router = express.Router();
const { createFestival, getFestivals } = require('../controllers/festivalController');

router.post('/createFestival', createFestival);
router.get('/getFestival', getFestivals);

module.exports = router;

