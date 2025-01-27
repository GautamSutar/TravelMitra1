const mongoose = require('mongoose');
const validator = require('validator');
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['technical', 'non-technical'],
        required: true
    },
    category: {
        type: String,
        enum: ['cultural', 'adventure', 'food', 'drink', 'workshops'],
        required: true,
    },
    organiserInformation: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    ticket_price: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true,
        validate: {
            validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
            message: props => `${props.value} is not a valid URL!`
        }
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    address: {
        type: String,
        required: false // Address is now optional
    }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
