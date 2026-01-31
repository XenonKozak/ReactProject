import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import MyBookings from './pages/MyBookings';
import AddMovie from './pages/AddMovie';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-cinema-900 text-white">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/book/:movieId" element={<BookingPage />} />
                        <Route path="/my-bookings" element={<MyBookings />} />
                        <Route path="/add-movie" element={<AddMovie />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
