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
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    ticket_price: {
        type: String,
        required: true
    },
    registration_link: {
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
    address: {
        type: String,
        required: false // Address is now optional
    }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
