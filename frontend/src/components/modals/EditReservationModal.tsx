import { useState, useEffect } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { format, differenceInDays, addDays, parseISO } from 'date-fns';

interface Guest {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}

interface Unit {
    id: string;
    name: string;
    unitType: {
        name: string;
        basePrice?: number;
    };
    zone: {
        name: string;
    };
}

interface ReservationData {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
    totalAmount: number;
    paidAmount: number;
    status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
    notes?: string;
    guest: {
        id: string;
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
        documentType?: string;
        documentNumber?: string;
    };
    unit: Unit;
    createdAt: string;
    folio?: {
        folioNumber: string;
    };
}

interface EditReservationModalProps {
    isOpen: boolean;
    reservation: ReservationData | null;
    onClose: () => void;
    onSubmit: (id: string, data: UpdateReservationData) => Promise<void>;
}

export interface UpdateReservationData {
    guestId?: string;
    checkInDate?: string;
    checkOutDate?: string;
    adults?: number;
    children?: number;
    totalAmount?: number;
    paidAmount?: number;
    status?: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
    notes?: string;
}

export default function EditReservationModal({
    isOpen,
    reservation,
    onClose,
    onSubmit,
}: EditReservationModalProps) {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paidAmount, setPaidAmount] = useState(0);
    const [status, setStatus] = useState<'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'>('pending');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Guest selection/creation
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [guestSearchQuery, setGuestSearchQuery] = useState('');
    const [showGuestSearch, setShowGuestSearch] = useState(false);
    const [showCreateGuest, setShowCreateGuest] = useState(false);
    const [newGuest, setNewGuest] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    // Mock guests for now - will be replaced with API call
    const mockGuests: Guest[] = [
        { id: '1', firstName: 'Carlos', lastName: 'García López', email: 'carlos.garcia@email.com', phone: '+34 600 111 222' },
        { id: '2', firstName: 'María', lastName: 'Martínez Ruiz', email: 'maria.martinez@email.com', phone: '+34 600 222 333' },
        { id: '3', firstName: 'Juan', lastName: 'Pérez Sánchez', email: 'juan.perez@email.com', phone: '+34 600 333 444' },
    ];

    const filteredGuests = mockGuests.filter(g =>
        `${g.firstName} ${g.lastName} ${g.email}`.toLowerCase().includes(guestSearchQuery.toLowerCase())
    );

    // Calculate nights and balance
    const nights = checkInDate && checkOutDate ? differenceInDays(new Date(checkOutDate), new Date(checkInDate)) : 0;
    const balance = totalAmount - paidAmount;

    // Pre-fill form when reservation changes
    useEffect(() => {
        if (isOpen && reservation) {
            setCheckInDate(reservation.checkInDate);
            setCheckOutDate(reservation.checkOutDate);
            setAdults(reservation.adults);
            setChildren(reservation.children);
            setTotalAmount(reservation.totalAmount);
            setPaidAmount(reservation.paidAmount);
            setStatus(reservation.status);
            setNotes(reservation.notes || '');
            setSelectedGuest({
                id: reservation.guest.id,
                firstName: reservation.guest.firstName,
                lastName: reservation.guest.lastName,
                email: reservation.guest.email || '',
                phone: reservation.guest.phone,
            });
            setGuestSearchQuery(`${reservation.guest.firstName} ${reservation.guest.lastName}`);
            setShowGuestSearch(false);
            setShowCreateGuest(false);
        }
    }, [isOpen, reservation]);

    // Close on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen || !reservation) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedGuest) {
            alert('Please select a guest');
            return;
        }

        if (nights <= 0) {
            alert('Check-out date must be after check-in date');
            return;
        }

        setIsSubmitting(true);
        try {
            const updates: UpdateReservationData = {};

            // Only include changed fields
            if (selectedGuest.id !== reservation.guest.id) updates.guestId = selectedGuest.id;
            if (checkInDate !== reservation.checkInDate) updates.checkInDate = checkInDate;
            if (checkOutDate !== reservation.checkOutDate) updates.checkOutDate = checkOutDate;
            if (adults !== reservation.adults) updates.adults = adults;
            if (children !== reservation.children) updates.children = children;
            if (totalAmount !== reservation.totalAmount) updates.totalAmount = totalAmount;
            if (paidAmount !== reservation.paidAmount) updates.paidAmount = paidAmount;
            if (status !== reservation.status) updates.status = status;
            if (notes !== (reservation.notes || '')) updates.notes = notes;

            await onSubmit(reservation.id, updates);
            onClose();
        } catch (error) {
            console.error('Error updating reservation:', error);
            alert('Error updating reservation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCreateGuest = () => {
        // Mock creating a guest - will be replaced with API call
        const guest: Guest = {
            id: `new-${Date.now()}`,
            firstName: newGuest.firstName,
            lastName: newGuest.lastName,
            email: newGuest.email,
            phone: newGuest.phone,
        };
        setSelectedGuest(guest);
        setShowCreateGuest(false);
        setShowGuestSearch(false);
        setGuestSearchQuery(`${guest.firstName} ${guest.lastName}`);
    };

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'checked_in': return 'bg-green-100 text-green-800 border-green-300';
            case 'checked_out': return 'bg-gray-100 text-gray-800 border-gray-300';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-text-primary">Editar Reserva</h2>
                    <button
                        onClick={onClose}
                        className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Current Reservation Info (Read-only) */}
                    <div className="bg-surface p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                            Información Actual
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div>
                                <span className="text-text-secondary">ID Reserva:</span>
                                <p className="font-medium text-text-primary">#{reservation.id.slice(0, 8)}</p>
                            </div>
                            <div>
                                <span className="text-text-secondary">Unidad:</span>
                                <p className="font-medium text-text-primary">{reservation.unit.name}</p>
                            </div>
                            <div>
                                <span className="text-text-secondary">Zona:</span>
                                <p className="font-medium text-text-primary">{reservation.unit.zone.name}</p>
                            </div>
                            {reservation.folio && (
                                <div>
                                    <span className="text-text-secondary">Folio:</span>
                                    <p className="font-medium text-text-primary">{reservation.folio.folioNumber}</p>
                                </div>
                            )}
                            <div>
                                <span className="text-text-secondary">Creada:</span>
                                <p className="font-medium text-text-primary">
                                    {format(parseISO(reservation.createdAt), 'dd/MM/yyyy')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Guest Selection */}
                    <div className="bg-surface p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                            Huésped
                        </h3>

                        {!showGuestSearch && !showCreateGuest ? (
                            <>
                                {/* Current guest display */}
                                <div className="bg-upcamp-cyan bg-opacity-10 border border-upcamp-cyan rounded-lg p-3 mb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium text-text-primary">
                                                {selectedGuest?.firstName} {selectedGuest?.lastName}
                                            </div>
                                            <div className="text-sm text-text-secondary">
                                                {selectedGuest?.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowGuestSearch(true)}
                                    className="w-full px-4 py-2 border-2 border-dashed border-outline rounded-lg text-text-secondary hover:text-upcamp-cyan hover:border-upcamp-cyan transition-colors"
                                >
                                    Cambiar Huésped
                                </button>
                            </>
                        ) : showGuestSearch && !showCreateGuest ? (
                            <>
                                {/* Search existing guests */}
                                <div className="relative mb-3">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                                    <input
                                        type="text"
                                        value={guestSearchQuery}
                                        onChange={(e) => setGuestSearchQuery(e.target.value)}
                                        placeholder="Buscar huésped por nombre o email..."
                                        className="w-full pl-10 pr-4 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                    />
                                </div>

                                {/* Guest results */}
                                {guestSearchQuery && (
                                    <div className="mb-3 max-h-40 overflow-y-auto border border-outline rounded-lg">
                                        {filteredGuests.length > 0 ? (
                                            filteredGuests.map((guest) => (
                                                <button
                                                    key={guest.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedGuest(guest);
                                                        setGuestSearchQuery(`${guest.firstName} ${guest.lastName}`);
                                                        setShowGuestSearch(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 hover:bg-surface-variant transition-colors border-b border-outline last:border-b-0"
                                                >
                                                    <div className="font-medium text-text-primary">
                                                        {guest.firstName} {guest.lastName}
                                                    </div>
                                                    <div className="text-sm text-text-secondary">
                                                        {guest.email} {guest.phone && `· ${guest.phone}`}
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-3 text-text-secondary text-sm">
                                                No se encontraron huéspedes
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateGuest(true)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-outline rounded-lg text-text-secondary hover:text-upcamp-cyan hover:border-upcamp-cyan transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Crear Nuevo
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowGuestSearch(false)}
                                        className="flex-1 px-4 py-2 border border-outline text-text-primary rounded-lg hover:bg-surface-variant transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Create new guest form */}
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-text-primary mb-1">
                                                Nombre *
                                            </label>
                                            <input
                                                type="text"
                                                value={newGuest.firstName}
                                                onChange={(e) => setNewGuest({ ...newGuest, firstName: e.target.value })}
                                                className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-primary mb-1">
                                                Apellidos *
                                            </label>
                                            <input
                                                type="text"
                                                value={newGuest.lastName}
                                                onChange={(e) => setNewGuest({ ...newGuest, lastName: e.target.value })}
                                                className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={newGuest.email}
                                            onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-1">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            value={newGuest.phone}
                                            onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleCreateGuest}
                                            className="flex-1 bg-upcamp-cyan text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                                        >
                                            Crear Huésped
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowCreateGuest(false);
                                                setShowGuestSearch(true);
                                            }}
                                            className="flex-1 border border-outline text-text-primary px-4 py-2 rounded-lg hover:bg-surface-variant transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Dates & Guests */}
                    <div className="bg-surface p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                            Fechas y Huéspedes
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Check-in *
                                </label>
                                <input
                                    type="date"
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Check-out *
                                </label>
                                <input
                                    type="date"
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    min={checkInDate ? format(addDays(new Date(checkInDate), 1), 'yyyy-MM-dd') : ''}
                                    className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Noches
                                </label>
                                <input
                                    type="text"
                                    value={nights}
                                    readOnly
                                    className="w-full px-3 py-2 bg-gray-100 border border-outline rounded-lg text-text-secondary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Adultos *
                                </label>
                                <input
                                    type="number"
                                    value={adults}
                                    onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1"
                                    className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Niños
                                </label>
                                <input
                                    type="number"
                                    value={children}
                                    onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                                    min="0"
                                    className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-surface p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                            Estado
                        </h3>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan ${getStatusColor(status)}`}
                        >
                            <option value="pending">Pendiente</option>
                            <option value="confirmed">Confirmada</option>
                            <option value="checked_in">Check-in Realizado</option>
                            <option value="checked_out">Check-out Realizado</option>
                            <option value="cancelled">Cancelada</option>
                        </select>
                    </div>

                    {/* Financial Information */}
                    <div className="bg-surface p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                            Información Financiera
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Total *
                                </label>
                                <input
                                    type="number"
                                    value={totalAmount}
                                    onChange={(e) => setTotalAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Pagado
                                </label>
                                <input
                                    type="number"
                                    value={paidAmount}
                                    onChange={(e) => setPaidAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                                    min="0"
                                    max={totalAmount}
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                />
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="font-semibold text-text-primary">Pendiente:</span>
                                <span className={`font-semibold text-lg ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    €{balance.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-surface p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                            Notas
                        </h3>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan resize-none"
                            placeholder="Notas adicionales sobre la reserva..."
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-outline text-text-primary rounded-lg hover:bg-surface-variant transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !selectedGuest}
                            className="flex-1 px-6 py-3 bg-upcamp-cyan text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
