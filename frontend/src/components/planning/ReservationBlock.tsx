import { PlanningReservation, ReservationStatus } from '../../types/planning.types';
import { format } from 'date-fns';

interface ReservationBlockProps {
    reservation: PlanningReservation;
    startDate: Date;
    columnWidth: number;
    onClick?: () => void;
}

const statusColors: Record<ReservationStatus, string> = {
    pending: 'bg-amber-400 hover:bg-amber-500',
    confirmed: 'bg-green-500 hover:bg-green-600',
    checked_in: 'bg-upcamp-cyan hover:bg-upcamp-cyan-hover',
    checked_out: 'bg-gray-400 hover:bg-gray-500',
    cancelled: 'bg-red-400 hover:bg-red-500',
};

export default function ReservationBlock({
    reservation,
    startDate,
    columnWidth,
    onClick,
}: ReservationBlockProps) {
    const checkIn = new Date(reservation.checkInDate);
    const checkOut = new Date(reservation.checkOutDate);

    // Calculate position and width
    const daysSinceStart = Math.floor((checkIn.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const left = daysSinceStart * columnWidth;
    const width = reservation.nights * columnWidth;

    const colorClass = statusColors[reservation.status] || 'bg-gray-400';

    return (
        <div
            className={`absolute top-1 bottom-1 ${colorClass} rounded text-white text-xs px-2 py-1 cursor-pointer transition-all overflow-hidden group`}
            style={{
                left: `${left}px`,
                width: `${width}px`,
            }}
            onClick={onClick}
            title={`${reservation.guest.name} - ${reservation.nights} nights`}
        >
            <div className="flex flex-col h-full justify-center">
                <div className="font-medium truncate">{reservation.guest.name}</div>
                <div className="text-xs opacity-90 truncate">
                    {reservation.nights}n · ${reservation.totalAmount}
                </div>
            </div>

            {/* Tooltip on hover */}
            <div className="absolute hidden group-hover:block bg-gray-900 text-white p-3 rounded-lg shadow-lg z-50 min-w-[250px] -top-2 left-0 transform -translate-y-full">
                <div className="font-medium mb-2">{reservation.guest.name}</div>
                <div className="space-y-1 text-xs">
                    <div>Check-in: {format(checkIn, 'MMM d, yyyy')}</div>
                    <div>Check-out: {format(checkOut, 'MMM d, yyyy')}</div>
                    <div>Nights: {reservation.nights}</div>
                    <div>Guests: {reservation.adults} adults, {reservation.children} children</div>
                    <div>Total: ${reservation.totalAmount}</div>
                    <div>Paid: ${reservation.paidAmount}</div>
                    <div className="pt-1 border-t border-gray-700">
                        Status: <span className="capitalize">{reservation.status.replace('_', ' ')}</span>
                    </div>
                    {reservation.notes && (
                        <div className="pt-1 border-t border-gray-700">
                            Notes: {reservation.notes}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
