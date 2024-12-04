const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');


const authenticateUser = require('../middleware/auth');

const { SearchPlaces, CreatePlace, DeleteAllPlace } = require('../controllers/categoryFind');

const { registerUser, verifyOtp, loginUser, allUser } = require('../controllers/authController'); // Ensure correct path

const { addTripPlan, removeTripPlan, getTripPlans, DeleteAllTrip } = require('../controllers/tripPlanController');

const { uploadProfilePicture, getUserProfile } = require('../controllers/uploadsController');

const { logoutUser, checkBlacklist } = require('../controllers/logoutController');

const { TravelMitraPlanning, YourPlaces, checkPlaceTypes } = require('../controllers/budgetPlan');

const { addCommentAndRating, getPlaceWithComment_Rating, deleteCommentRating } = require('../controllers/commentRating_etc');

const { CreateEvent, AllEvent } = require('../controllers/eventController');

const { IconicPersons, AllPersonality, DeleteIconic } = require('../controllers/iconicPersonality');

const { CreateHiddenGems, AllHidden, DeleteHiddenGems, Detail } = require('../controllers/hiddenGems');

const { createFestival, getFestivals } = require('../controllers/festivalController');

const { getHotels } = require('../controllers/hotelController');





// Profile Picture Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Define unique filename
    },
});

const upload = multer({ storage });




// create and search place
router.post("/createplace", CreatePlace);
router.get("/searchplace", SearchPlaces);
router.delete('/deleteAll', DeleteAllPlace);

// add trip, delete trip, planned trip
router.post('/addingTrip', addTripPlan);
router.delete('/deletingTrip/:id', removeTripPlan);
router.get('/allPlannedTrip', getTripPlans);
router.delete('/deleteTrip', DeleteAllTrip);

// register, login, logout, get all,  
router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser);
router.get('/getAllUser', allUser);

router.get('/protected-route', authenticateUser, checkBlacklist, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route.' });
});


// router.post('/upload-profile-pic', auth, upload.single('profilePicture'), uploadProfilePicture);
router.post('/upload-profile-pic', authenticateUser, upload.single('profilePicture'), uploadProfilePicture);
router.get('/displayprofile', authenticateUser, getUserProfile);



// budget route 

router.post('/travelMitra', TravelMitraPlanning);
router.post('/yourPlace', YourPlaces);
router.get('/checkPlace', checkPlaceTypes);


// comment route 
router.post('/createComment/:placeId', authenticateUser, addCommentAndRating);
router.get('/getComment-rating/:placeId', getPlaceWithComment_Rating);
router.delete('/deletecomment/:placeId/:commentId', authenticateUser, deleteCommentRating);




// Events 
router.post('/createEvent', CreateEvent);
router.get('/getEvent', AllEvent);

// Iconic Personality
router.post('/person', IconicPersons);
router.get('/getPerson', AllPersonality);
router.delete('/deleteIconic', DeleteIconic);


// Iconic Personality
router.post('/hiddenGems', CreateHiddenGems);
router.get('/getHiddenGems', AllHidden);
router.delete('/deleteHIddenGems', DeleteHiddenGems);
router.post('/detail', Detail);


//  Festival 
router.post('/ceateFetival', createFestival);
router.get('/getFestival', getFestivals)

// Hotel 
router.get('/getdata', getHotels);




module.exports = router;



