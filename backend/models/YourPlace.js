
// const mongoose = require('mongoose');

// const TripPlanSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     type: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     historical_importance: String,
//     venue: {
//         address: String,
//         city: String,
//         country: String,
//         coordinates: {
//             latitude: Number,
//             longitude: Number
//         }
//     },
//     photos: [{
//         url: String,
//         caption: String
//     }],
//     timing: {
//         opening_time: String,
//         closing_time: String
//     }
// });

// const TripPlan = mongoose.model('TripPlan', TripPlanSchema);

// module.exports = TripPlan;


const mongoose = require('mongoose');
const TripPlanSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rankingPosition: {
        type: Number,
        required: true
    },
    priceLevel: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null
    },
    webUrl: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    rankingDenominator: {
        type: Number,
        required: true
    },
    rankingString: {
        type: String,
        required: true
    },
    numberOfReviews: {
        type: Number,
        required: true
    },
    dummyPrice: {
        type: String,
        required: true
    }

});

const TripPlan = mongoose.model('TripPlan', TripPlanSchema);
module.exports = TripPlan;




















