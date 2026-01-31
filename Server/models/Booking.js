const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    userMap: {
        name: String,
        email: String
    },
    date: {
        type: String, // YYYY-MM-DD
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: [{
        type: String, // e.g., "A1", "B5"
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
