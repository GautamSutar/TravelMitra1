const User = require('../models/User'); // Import the User model
const path = require('path');

// Upload profile picture (POST)
const uploadProfilePicture = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from JWT
        // console.log("useridUpload : ",userId);
        // Normalize the file path and construct the full URL for the uploaded profile picture
        const profilePictureUrl = `http://localhost:5000/${req.file.path.replace(/\\/g, '/')}`;

        // Update the user's profile picture URL in the database
        await User.findByIdAndUpdate(userId, { profilePicture: profilePictureUrl });

        // Return the profile picture URL in the response
        res.status(200).json({ message: 'Profile picture uploaded successfully!', profilePictureUrl });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ error: 'Error uploading profile picture.' });
    }
};

// Fetch user profile (GET)
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Get the user ID from JWT
        // console.log("userid",userId);
        const user = await User.findById(userId).select('profilePicture'); // Select only the profile picture field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // console.log(user.profilePicture);
        res.status(200).json({ profilePicture: user.profilePicture.replace(/\\/g, '/') });
    } catch (error) {
        console.log("🔴 Error in file uploadsControllers of getuserProfileCode: ", error)
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Error fetching user profile.' });
    }
};




module.exports = { uploadProfilePicture, getUserProfile };
