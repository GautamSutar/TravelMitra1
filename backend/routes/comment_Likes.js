const express = require("express");
const {
  toggleLike,
  commentHandler,
  deleteComment,
  clearAllLikes,
} = require("../controllers/comment_Likes_Controller");
const router = express.Router();

router.post("/like/:eventId", toggleLike);
router.post("/comment/:eventId", commentHandler);
router.delete("/delete-comment/:eventId/:commentId", deleteComment);
router.delete("/delete-like", clearAllLikes);
module.exports = router;
