const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one movie
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a movie
router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        duration: req.body.duration,
        poster: req.body.poster,
        description: req.body.description,
        showtimes: req.body.showtimes
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// SEED movies (for testing)
router.post('/seed', async (req, res) => {
    const sampleMovies = [
        {
            title: "Interstellar",
            genre: "Sci-Fi / Drama",
            duration: 169,
            poster: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
            description: "Grupa badaczy wyrusza w podróż przez tunel czasoprzestrzenny, by znaleźć nowy dom dla ludzkości.",
            showtimes: ["16:00", "19:30", "23:00"]
        },
        {
            title: "Diuna: Część Druga",
            genre: "Sci-Fi",
            duration: 166,
            poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
            description: "Paul Atreides jednoczy się z Chani i Fremenami, by dokonać zemsty na spiskowcach, którzy zniszczyli jego rodzinę.",
            showtimes: ["14:00", "17:30", "21:00"]
        },
        {
            title: "Blade Runner 2049",
            genre: "Sci-Fi / Neo-Noir",
            duration: 164,
            poster: "https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png",
            description: "Młody łowca androidów odkrywa długo skrywaną tajemnicę, która może pogrążyć resztki społeczeństwa w chaosie.",
            showtimes: ["18:00", "21:30"]
        },
        {
            title: "Oppenheimer",
            genre: "Biograficzny",
            duration: 180,
            poster: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
            description: "Historia amerykańskiego naukowca J. Roberta Oppenheimera i jego roli w stworzeniu bomby atomowej.",
            showtimes: ["15:00", "19:00"]
        }
    ];

    try {
        await Movie.deleteMany({});
        const newMovies = await Movie.insertMany(sampleMovies);
        res.status(201).json(newMovies);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// DELETE a movie
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

