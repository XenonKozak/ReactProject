import { useState } from 'react';

const SeatSelector = ({ selectedSeats, onSeatSelect, occupiedSeats = [] }) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 8;

    const toggleSeat = (seatId) => {
        if (occupiedSeats.includes(seatId)) return;

        if (selectedSeats.includes(seatId)) {
            onSeatSelect(selectedSeats.filter(id => id !== seatId));
        } else {
            onSeatSelect([...selectedSeats, seatId]);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-8">
            <div className="w-full max-w-lg bg-gray-800 h-4 rounded-t-lg shadow-[0_10px_20px_rgba(255,255,255,0.1)] mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                <div className="text-center text-xs text-gray-400 mt-1">EKRAN</div>
            </div>

            <div className="grid gap-4">
                {rows.map(row => (
                    <div key={row} className="flex gap-4 justify-center">
                        {Array.from({ length: seatsPerRow }).map((_, idx) => {
                            const seatId = `${row}${idx + 1}`;
                            const isOccupied = occupiedSeats.includes(seatId);
                            const isSelected = selectedSeats.includes(seatId);

                            let seatClass = "seat-available";
                            if (isOccupied) seatClass = "seat-occupied";
                            else if (isSelected) seatClass = "seat-selected";

                            return (
                                <div
                                    key={seatId}
                                    onClick={() => toggleSeat(seatId)}
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-t-lg flex items-center justify-center text-xs font-bold transition-all duration-200 ${seatClass}`}
                                    title={`Seat ${seatId}`}
                                >
                                    {seatId}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="flex gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    <span>Wolne</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-cinema-accent rounded"></div>
                    <span>Wybrane</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-cinema-800 rounded opacity-50"></div>
                    <span>Zajęte</span>
                </div>
            </div>
        </div>
    );
};

export default SeatSelector;
