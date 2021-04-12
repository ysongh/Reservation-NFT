const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the event"]
    },
    location: {
        type: String
    },
    date: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: [true, "Please enter the price of the event"]
    },
    description: {
        type: String
    },
    poster: {
        type: String
    }
});

module.exports = mongoose.model('Event', EventSchema); 