export default function ReservationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Reservations</h1>
                    <p className="text-text-secondary">Manage all bookings and reservations</p>
                </div>
                <button className="btn btn-primary">
                    + New Reservation
                </button>
            </div>

            <div className="card">
                <p className="text-text-secondary">Reservations list will be implemented here...</p>
            </div>
        </div>
    );
}
