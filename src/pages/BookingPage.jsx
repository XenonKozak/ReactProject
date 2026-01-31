import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SeatSelector from '../components/SeatSelector';
import { Calendar, Clock, CreditCard } from 'lucide-react';

const BookingPage = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
                setMovie(res.data);
                if (res.data.showtimes.length > 0) setSelectedTime(res.data.showtimes[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMovie();
    }, [movieId]);

    useEffect(() => {
        if (!selectedTime) return;
        const fetchOccupied = async () => {
            try {
                // For demo, stick to today's date
                const today = new Date().toISOString().split('T')[0];
                const res = await axios.get(`http://localhost:5000/api/bookings/${movieId}?date=${today}&time=${selectedTime}`);
                setOccupiedSeats(res.data.occupiedSeats || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOccupied();
    }, [movieId, selectedTime]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBooking = async () => {
        setIsSubmitting(true);
        try {
            const today = new Date().toISOString().split('T')[0];
            await axios.post('http://localhost:5000/api/bookings', {
                movieId: movieId,
                userMap: { name: "Guest User", email: "guest@example.com" }, // Simplified for demo
                date: today,
                time: selectedTime,
                seats: selectedSeats,
                totalPrice: selectedSeats.length * movie.price
            });
            setBookingSuccess(true);
            // navigate('/'); // Optionally redirect
        } catch (err) {
            alert('Booking failed: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!movie) return <div className="text-center mt-20">Ładowanie...</div>;

    if (bookingSuccess) return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-4xl font-bold text-white">Rezerwacja potwierdzona!</h2>
            <p className="text-gray-300 text-xl">Miłego seansu {movie.title}</p>
            <div className="bg-cinema-800 p-6 rounded-lg text-left inline-block mt-4 border border-cinema-700">
                <p><strong>Miejsca:</strong> {selectedSeats.join(', ')}</p>
                <p><strong>Godzina:</strong> {selectedTime}</p>
                <p><strong>Razem:</strong> {selectedSeats.length * movie.price} zł</p>
            </div>
            <button onClick={() => navigate('/')} className="mt-8 bg-cinema-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105">
                Powrót do filmów
            </button>
        </div>
    );

    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
                <div className="bg-cinema-800 p-6 rounded-lg shadow-xl border border-cinema-700">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Calendar className="text-cinema-accent" /> Wybierz miejsca
                    </h2>
                    <SeatSelector
                        selectedSeats={selectedSeats}
                        onSeatSelect={setSelectedSeats}
                        occupiedSeats={occupiedSeats}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-cinema-800 p-6 rounded-lg shadow-xl border border-cinema-700 sticky top-24">
                    <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover rounded-lg mb-4 shadow-md" />
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-400 mb-4">{movie.genre} | {movie.duration} min</p>

                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2 text-gray-300">Wybierz godzinę</label>
                        <div className="flex flex-wrap gap-2">
                            {movie.showtimes.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`px-4 py-2 rounded border transition-all ${selectedTime === time ? 'bg-cinema-accent border-cinema-accent text-white' : 'border-gray-600 text-gray-300 hover:border-cinema-accent'}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4 space-y-2">
                        <div className="flex justify-between">
                            <span>Bilety ({selectedSeats.length})</span>
                            <span>{selectedSeats.length * movie.price} zł</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-cinema-accent">
                            <span>Suma</span>
                            <span>{selectedSeats.length * movie.price} zł</span>
                        </div>
                    </div>

                    <button
                        onClick={handleBooking}
                        disabled={selectedSeats.length === 0 || isSubmitting}
                        className={`w-full mt-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${selectedSeats.length === 0 || isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-cinema-accent hover:bg-red-600 animate-pulse-slow'}`}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                        ) : (
                            <CreditCard className="w-5 h-5" />
                        )}
                        {isSubmitting ? 'Przetwarzanie...' : 'Potwierdź rezerwację'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
