const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET bookings for a specific movie + date + time (to show unavailable seats)
router.get('/:movieId', async (req, res) => {
    try {
        const { date, time } = req.query;
        if (!date || !time) return res.status(400).json({ message: "Date and Time required" });

        const bookings = await Booking.find({
            movieId: req.params.movieId,
            date: date,
            time: time
        });

        // Flatten all seats from all bookings into a single array
        const occupiedSeats = bookings.flatMap(b => b.seats);
        res.json({ occupiedSeats });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all bookings (for My Bookings page - simplified for demo)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('movieId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new booking
router.post('/', async (req, res) => {
    const booking = new Booking({
        movieId: req.body.movieId,
        userMap: req.body.userMap,
        date: req.body.date,
        time: req.body.time,
        seats: req.body.seats,
        totalPrice: req.body.totalPrice
    });

    try {
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE booking (Refund)
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        await booking.deleteOne();
        res.json({ message: 'Booking cancelled successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
