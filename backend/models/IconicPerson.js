const mongoose = require('mongoose');
const validator = require('validator');

const iconicPersonSchema = new mongoose.Schema({
    name: {
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
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Event = mongoose.model('IconicPerson', iconicPersonSchema);
module.exports = Event;
