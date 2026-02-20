import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reservationService } from '../services/reservationService';
import AddBookingModal from '../components/modals/AddBookingModal';

export default function DashboardPage() {
    const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);

    // Mock data as fallback
    const mockStats = {
        totalBookings: 124,
        currentOccupancy: 82,
        arrivalsToday: 18,
        monthlyRevenue: 12450,
        weeklyOccupancy: [
            { day: 'Lun', percentage: 65 },
            { day: 'Mar', percentage: 72 },
            { day: 'Mié', percentage: 96 },
            { day: 'Jue', percentage: 88 },
            { day: 'Vie', percentage: 75 },
            { day: 'Sáb', percentage: 45 },
            { day: 'Dom', percentage: 58 },
        ],
    };

    // Fetch dashboard stats
    const { data: apiStats } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: () => reservationService.getDashboardStats(),
        refetchInterval: 30000, // Refresh every 30 seconds
        retry: 1,
    });

    // Use API data if available, otherwise use mock data
    const stats = apiStats || mockStats;

    const handleAddBooking = (data: any) => {
        console.log('New booking:', data);
        // TODO: Implement actual booking creation
    };

    return (
        <div className="space-y-6">
            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Panel de Control</h1>
                    <p className="text-text-secondary">Planifica, prioriza y gestiona las operaciones de tu camping con facilidad.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

                    <button
                        onClick={() => setIsAddBookingOpen(true)}
                        className="w-full sm:w-auto justify-center btn btn-primary px-6 py-2.5 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nueva Reserva
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 - Gradient Blue */}
                <div className="bg-gradient-to-br from-upcamp-blue via-upcamp-blue to-upcamp-blue-dark rounded-3xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold uppercase tracking-wide opacity-90">RESERVAS TOTALES</p>
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-5xl font-bold mb-3">{stats?.totalBookings || 0}</p>
                    <div className="flex items-center gap-1 text-sm opacity-90">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        <span>+12% del mes pasado</span>
                    </div>
                </div>

                {/* Card 2 - Occupancy */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">OCUPACIÓN ACTUAL</p>
                        <div className="w-10 h-10 bg-upcamp-cyan/10 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-upcamp-cyan" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-5xl font-bold text-text-primary mb-2">{stats?.currentOccupancy || 0}%</p>
                    <p className="text-sm text-upcamp-cyan font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Rango Óptimo
                    </p>
                </div>

                {/* Card 3 - Arrivals */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">LLEGADAS HOY</p>
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-5xl font-bold text-text-primary mb-2">{stats?.arrivalsToday || 0}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Esperados hoy
                    </p>
                </div>

                {/* Card 4 - Revenue */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">INGRESOS MENSUALES</p>
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-5xl font-bold text-text-primary mb-2">€{stats?.monthlyRevenue?.toLocaleString() || 0}</p>
                    <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        +8.4%
                    </p>
                </div>
            </div>

            {/* Analytics Chart + Right Column */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Analytics Chart - 2/3 width */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-text-primary">Análisis del Camping</h2>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                                <option>Últimos 7 Días</option>
                                <option>Últimos 30 Días</option>
                                <option>Este Mes</option>
                            </select>
                        </div>

                        {/* Pill-shaped bar chart */}
                        <div className="flex items-end justify-between gap-4 h-64">
                            {stats?.weeklyOccupancy?.map((day, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center gap-3">
                                    <div className="relative w-full flex items-end justify-center" style={{ height: '200px' }}>
                                        <div
                                            className={`w-full rounded-full transition-all duration-500 ${day.percentage >= 70
                                                ? 'bg-gradient-to-t from-upcamp-blue to-upcamp-blue-light'
                                                : day.percentage >= 50
                                                    ? 'bg-gradient-to-t from-upcamp-cyan to-upcamp-cyan-light'
                                                    : 'bg-gray-300'
                                                }`}
                                            style={{ height: `${day.percentage}%` }}
                                        >
                                            {day.percentage >= 70 && (
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                                                    {day.percentage}%
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-text-secondary font-medium">{day.day}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Occupancy Target */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-text-primary mb-4">Objetivo de Ocupación</h2>
                        <div className="flex items-center justify-center mb-4">
                            <div className="relative w-40 h-40">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="#E5E7EB"
                                        strokeWidth="12"
                                        fill="none"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="url(#gradient)"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeDasharray="439.6"
                                        strokeDashoffset={439.6 - (439.6 * (stats?.currentOccupancy || 0)) / 100}
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#26D0CE" />
                                            <stop offset="100%" stopColor="#3949AB" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-4xl font-bold text-text-primary">{stats?.currentOccupancy || 0}%</p>
                                    <p className="text-xs text-text-secondary uppercase">Alcanzado</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-upcamp-cyan"></div>
                                <span className="text-text-secondary">Reservado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                <span className="text-text-secondary">Disponible</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Booking Modal */}
            <AddBookingModal
                isOpen={isAddBookingOpen}
                onClose={() => setIsAddBookingOpen(false)}
                onSubmit={handleAddBooking}
            />
        </div>
    );
}
