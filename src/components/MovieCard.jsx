import { Link } from 'react-router-dom';
import { Clock, Trash } from 'lucide-react';

const MovieCard = ({ movie, onDelete }) => {
    return (
        <div className="bg-cinema-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group relative">
            <div className="relative h-96 overflow-hidden">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-900 to-transparent opacity-90" />

                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigating to details
                            onDelete(movie._id);
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 z-10 transition-colors shadow-lg"
                        title="Usuń film"
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cinema-accent transition-colors">{movie.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{movie.genre}</p>
                    <div className="flex items-center text-gray-400 text-xs gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{movie.duration} min</span>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-cinema-800 border-t border-cinema-700">
                <Link
                    to={`/book/${movie._id}`}
                    className="block w-full text-center bg-cinema-accent hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Zarezerwuj bilety
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;
