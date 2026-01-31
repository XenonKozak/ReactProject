import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Assuming backend runs on port 5000
                const response = await axios.get('http://localhost:5000/api/movies');
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten film?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/movies/${id}`);
            setMovies(movies.filter(movie => movie._id !== id));
        } catch (error) {
            console.error("Error deleting movie:", error);
            alert("Nie udało się usunąć filmu.");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cinema-accent"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <header className="text-center py-12">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                    Teraz w kinach
                </h1>
                <p className="text-gray-400 text-lg">Poczuj magię kina w najwyższej jakości.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default Home;
