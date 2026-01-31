import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-cinema-800 border-b border-cinema-700 py-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-cinema-accent font-bold text-2xl hover:text-white transition-colors">
                    <Film className="w-8 h-8" />
                    <span>KinoGdańsk</span>
                </Link>
                <div className="space-x-4 flex items-center">
                    <Link to="/" className="text-gray-300 hover:text-cinema-accent transition-colors font-semibold">Filmy</Link>
                    <Link to="/add-movie" className="text-gray-300 hover:text-cinema-accent transition-colors font-semibold">Dodaj Film</Link>
                    <Link to="/my-bookings" className="text-gray-300 hover:text-cinema-accent transition-colors font-semibold">Moje Rezerwacje</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
