const mongoose = require('mongoose');
const validator = require('validator');
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: ["technical", "non-technical"],
      required: false,
    },
    category: {
      type: String,
      enum: ["cultural", "adventure", "food", "drink", "workshops"],
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    start: {
      type: String,
      required: false,
    },
    end: {
      type: String,
      required: false,
    },
    ticket_price: {
      type: String,
      required: false,
    },
    image_url: {
      type: String,
      required: false,
      validate: {
        validator: (v) =>
          validator.isURL(v, {
            protocols: ["http", "https"],
            require_protocol: true,
          }),
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: false,
    },
    registration_link: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false, // Address is now optional
    },

    // Likes array - user who like the event
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Comments array - Stores user comments

    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
        },
        comment: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
