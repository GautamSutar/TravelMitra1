const express = require("express");
const router = express.Router();
const authenticateUser = require('../middleware/auth');
const { addCommentAndRating, getPlaceWithComment_Rating, deleteCommentRating } = require('../controllers/commentRating_etc');

router.post('/createComment/:placeId', authenticateUser, addCommentAndRating);
router.get('/getComment-rating/:placeId', getPlaceWithComment_Rating);
router.delete('/deletecomment/:placeId/:commentId', authenticateUser, deleteCommentRating);

module.exports = router;

