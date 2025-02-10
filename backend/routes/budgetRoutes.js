const express = require("express");
const router = express.Router();
const { TravelMitraPlanning, YourPlaces, checkPlaceTypes } = require('../controllers/budgetPlan');

router.post('/travelMitra', TravelMitraPlanning);
router.post('/yourPlace', YourPlaces);
router.get('/checkPlace', checkPlaceTypes);

module.exports = router;
