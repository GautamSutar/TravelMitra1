const mongoose = require('mongoose');
const validator = require('validator');

const fetivalSchema = new mongoose.Schema({
    image: {  
        type: String,
        required: true,
        validate: {
            validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
            message: props => `${props.value} is not a valid URL!`
        }
    },
    title: {  
        type: String,
        required: true
    },
    description: {  
        type: String,
        required: true
    },
    link: {  
        type: String,
        required: true
    },
   
}, { timestamps: true });

const fetival = mongoose.model('fetival', fetivalSchema);

module.exports = fetival;
