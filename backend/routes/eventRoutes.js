const express = require("express");
const router = express.Router();
const { CreateEvent, AllEvent } = require('../controllers/eventController');

router.post('/createEvent', CreateEvent);
router.get('/getEvent', AllEvent);

module.exports = router;

