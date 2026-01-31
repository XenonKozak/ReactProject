import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Calendar, Clock, Ticket } from 'lucide-react';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/bookings');
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const [confirmingId, setConfirmingId] = useState(null);

    const handleRefund = async (id) => {
        if (confirmingId === id) {
            // User confirmed
            setConfirmingId(null);

            // Optimistic update
            const previousBookings = [...bookings];
            setBookings(bookings.filter(b => b._id !== id));

            try {
                await axios.delete(`http://localhost:5000/api/bookings/${id}`);
            } catch (err) {
                // Revert on failure
                setBookings(previousBookings);
                alert('Błąd podczas zwrotu: ' + err.message);
            }
        } else {
            // First click - ask for confirmation
            setConfirmingId(id);

            // Auto-reset confirmation after 3 seconds
            setTimeout(() => setConfirmingId(null), 3000);
        }
    };

    if (loading) return <div className="text-center mt-20 text-white">Ładowanie rezerwacji...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-cinema-accent mb-8 border-b border-gray-700 pb-4">Moje Rezerwacje</h1>

            {bookings.length === 0 ? (
                <div className="text-center text-gray-400 py-12 bg-cinema-800 rounded-lg">
                    <p className="text-xl">Brak aktywnych rezerwacji.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map(booking => (
                        <div key={booking._id} className="bg-cinema-800 rounded-lg p-6 shadow-lg border border-cinema-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:bg-gray-800">
                            <div className="space-y-2 flex-grow">
                                <h3 className="text-xl font-bold text-white">{booking.movieId?.title || 'Unknown Movie'}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4 text-cinema-accent" />
                                        <span>{booking.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-cinema-accent" />
                                        <span>{booking.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Ticket className="w-4 h-4 text-cinema-accent" />
                                        <span>{booking.seats.join(', ')}</span>
                                    </div>
                                </div>
                                <div className="text-lg font-semibold text-white">
                                    Cena: <span className="text-cinema-accent">{booking.totalPrice} zł</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleRefund(booking._id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all w-full md:w-auto justify-center ${confirmingId === booking._id ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                            >
                                <Trash2 className={`w-4 h-4 ${confirmingId === booking._id ? 'hidden' : 'block'}`} />
                                <span className={confirmingId === booking._id ? 'block' : 'hidden'}>⚠️</span>
                                {confirmingId === booking._id ? 'Potwierdź?' : 'Zwróć bilet'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
