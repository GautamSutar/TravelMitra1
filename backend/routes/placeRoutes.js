const express = require("express");
const router = express.Router();
const { SearchPlaces, CreatePlace, DeleteAllPlace } = require('../controllers/categoryFind');

router.post("/createplace", CreatePlace);
router.get("/searchplace", SearchPlaces);
router.delete('/deleteAll', DeleteAllPlace);

module.exports = router;
