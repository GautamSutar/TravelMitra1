const express = require("express");
const router = express.Router();
const authenticateUser = require('../middleware/auth');
const { registerUser, verifyOtp, loginUser, allUser, refreshToken  } = require('../controllers/authController');
const { logoutUser, checkBlacklist } = require('../controllers/logoutController');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser);
router.get('/getAllUser', allUser);
router.post("/refresh-token", refreshToken);
router.get('/protected-route', authenticateUser, checkBlacklist, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route.' });
});

module.exports = router;
