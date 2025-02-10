const express = require("express");
const router = express.Router();
const { addTripPlan, removeTripPlan, getTripPlans, DeleteAllTrip } = require('../controllers/tripPlanController');

router.post('/addingTrip', addTripPlan);
router.delete('/deletingTrip/:id', removeTripPlan);
router.get('/allPlannedTrip', getTripPlans);
router.delete('/deleteTrip', DeleteAllTrip);

module.exports = router;

