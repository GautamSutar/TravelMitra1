const mongoose = require("mongoose");
const eventInteractionSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // References the Event model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    likes: {
      type: Number,
      default: 0, // Default likes are 0
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const EventInteraction = mongoose.model(
  "EventInteraction",
  eventInteractionSchema
);

module.exports = EventInteraction;
