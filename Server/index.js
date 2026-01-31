require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Cinema Booking API is running...');
});

// Import Routes
const movieRoutes = require('./routes/movies');
const bookingRoutes = require('./routes/bookings');

app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
