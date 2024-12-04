const mongoose = require('mongoose');
const Schema = mongoose.Schema;  // Import Schema directly

const placeSchema = new Schema({
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
    },
    comments: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'User' },
            username: String,
            rating: { type: Number, min: 1, max: 5 },
            comment: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Place', placeSchema);
