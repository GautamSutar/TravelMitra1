const express = require("express");
const router = express.Router();
const { IconicPersons, AllPersonality, DeleteIconic } = require('../controllers/iconicPersonality');

router.post('/person', IconicPersons);
router.get('/getPerson', AllPersonality);
router.delete('/deleteIconic', DeleteIconic);

module.exports = router;

