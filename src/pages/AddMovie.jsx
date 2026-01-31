import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Film, Clock, AlignLeft, Calendar, Image as ImageIcon, DollarSign } from 'lucide-react';

const AddMovie = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        duration: '',
        poster: '',
        description: '',
        showtimes: '', // Comma separated string for input
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const movieData = {
            ...formData,
            duration: Number(formData.duration),
            showtimes: formData.showtimes.split(',').map(t => t.trim()), // Convert string to array
        };

        try {
            await axios.post('http://localhost:5000/api/movies', movieData);
            navigate('/');
        } catch (err) {
            alert('Błąd dodawania filmu: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-cinema-800 p-8 rounded-lg shadow-xl border border-cinema-700">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">Dodaj Nowy Film</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300 font-semibold">
                        <Film className="w-4 h-4 text-cinema-accent" /> Tytuł
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full bg-cinema-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cinema-accent focus:outline-none"
                        placeholder="np. Diuna: Część Trzecia"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                {/* Genre */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300 font-semibold">
                        <AlignLeft className="w-4 h-4 text-cinema-accent" /> Gatunek
                    </label>
                    <input
                        type="text"
                        name="genre"
                        required
                        className="w-full bg-cinema-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cinema-accent focus:outline-none"
                        placeholder="np. Sci-Fi / Akcja"
                        value={formData.genre}
                        onChange={handleChange}
                    />
                </div>

                {/* Duration */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300 font-semibold">
                        <Clock className="w-4 h-4 text-cinema-accent" /> Czas trwania (minuty)
                    </label>
                    <input
                        type="number"
                        name="duration"
                        required
                        min="1"
                        className="w-full bg-cinema-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cinema-accent focus:outline-none"
                        placeholder="np. 150"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </div>

                {/* Poster URL */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300 font-semibold">
                        <ImageIcon className="w-4 h-4 text-cinema-accent" /> URL Plakatu
                    </label>
                    <input
                        type="url"
                        name="poster"
                        required
                        className="w-full bg-cinema-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cinema-accent focus:outline-none"
                        placeholder="https://..."
                        value={formData.poster}
                        onChange={handleChange}
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300 font-semibold">
                        <AlignLeft className="w-4 h-4 text-cinema-accent" /> Opis
                    </label>
                    <textarea
                        name="description"
                        required
                        rows="4"
                        className="w-full bg-cinema-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cinema-accent focus:outline-none"
                        placeholder="Krótki opis fabuły..."
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Showtimes */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300 font-semibold">
                        <Calendar className="w-4 h-4 text-cinema-accent" /> Godziny seansów (po przecinku)
                    </label>
                    <input
                        type="text"
                        name="showtimes"
                        required
                        className="w-full bg-cinema-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cinema-accent focus:outline-none"
                        placeholder="16:00, 19:00, 22:00"
                        value={formData.showtimes}
                        onChange={handleChange}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cinema-accent hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Dodawanie...' : 'Dodaj Film'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddMovie;
