const express = require("express");
const router = express.Router();
const { CreateHiddenGems, AllHidden, DeleteHiddenGems, Detail } = require('../controllers/hiddenGems');

router.post('/hiddenGems', CreateHiddenGems);
router.get('/getHiddenGems', AllHidden);
router.delete('/deleteHIddenGems', DeleteHiddenGems);
router.post('/detail', Detail);

module.exports = router;

