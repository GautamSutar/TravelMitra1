const mongoose = require('mongoose');
const validator = require('validator');

const hiddenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of strings for image URLs
        required: true,
        validate: {
            validator: (v) => v.every(url => validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true })),
            message: props => `${props.value} contains an invalid URL!`
        }
    },
    fullDescription: {
        type: String, // Removed enum constraint to allow full descriptions
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mapLink: {
        type: String,
        required: true,
        validate: {
            validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
            message: props => `${props.value} is not a valid URL!`
        }
    }
}, { timestamps: true });

const HiddenGems = mongoose.model('HiddenGems', hiddenSchema);
module.exports = HiddenGems;
