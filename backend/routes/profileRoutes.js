const express = require("express");
const router = express.Router();
const multer = require('multer');
const authenticateUser = require('../middleware/auth');
const { uploadProfilePicture, getUserProfile } = require('../controllers/uploadsController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/upload-profile-pic', authenticateUser, upload.single('profilePicture'), uploadProfilePicture);
router.get('/displayprofile', authenticateUser, getUserProfile);

module.exports = router;

