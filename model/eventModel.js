const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventVenue: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
}
});

module.exports = mongoose.model("Event", eventSchema);
