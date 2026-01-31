const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    poster: {
        type: String, // URL to image
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 25 // standard ticket price
    },
    showtimes: [{
        type: String // e.g., "14:30", "18:00"
    }]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
