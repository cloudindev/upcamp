import { useState, useEffect } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { format, differenceInDays, addDays } from 'date-fns';
import { PlanningUnit } from '../../types/planning.types';

interface Guest {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}

interface CreateReservationModalProps {
    isOpen: boolean;
    unit: PlanningUnit | null;
    initialDate: Date | null;
    onClose: () => void;
    onSubmit: (data: CreateReservationData) => Promise<void>;
}

export interface CreateReservationData {
    unitId: string;
    guestId: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
    totalAmount: number;
    paidAmount: number;
    status: 'pending' | 'confirmed';
    notes?: string;
}

export default function CreateReservationModal({
    isOpen,
    unit,
    initialDate,
    onClose,
    onSubmit,
}: CreateReservationModalProps) {
    const [checkOutDate, setCheckOutDate] = useState('');
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [paidAmount, setPaidAmount] = useState(0);
    const [status, setStatus] = useState<'pending' | 'confirmed'>('pending');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Guest selection/creation
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [guestSearchQuery, setGuestSearchQuery] = useState('');
    const [showCreateGuest, setShowCreateGuest] = useState(false);
    const [newGuest, setNewGuest] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        documentType: 'dni',
        documentNumber: '',
    });

    // Mock guests for now - will be replaced with API call
    const mockGuests: Guest[] = [
        { id: '1', firstName: 'Carlos', lastName: 'García López', email: 'carlos.garcia@email.com', phone: '+34 600 111 222' },
        { id: '2', firstName: 'María', lastName: 'Martínez Ruiz', email: 'maria.martinez@email.com', phone: '+34 600 222 333' },
    ];

    const filteredGuests = mockGuests.filter(g =>
        `${g.firstName} ${g.lastName} ${g.email}`.toLowerCase().includes(guestSearchQuery.toLowerCase())
    );

    // Calculate nights and total price
    const checkInDate = initialDate ? format(initialDate, 'yyyy-MM-dd') : '';
    const nights = checkInDate && checkOutDate ? differenceInDays(new Date(checkOutDate), new Date(checkInDate)) : 0;
    const basePrice = unit?.unitType?.basePrice ? Number(unit.unitType.basePrice) : 35;
    const totalAmount = nights > 0 ? basePrice * nights : 0;

    // Set default checkout date when modal opens
    useEffect(() => {
        if (isOpen && initialDate) {
            const defaultCheckOut = addDays(initialDate, 1);
            setCheckOutDate(format(defaultCheckOut, 'yyyy-MM-dd'));
        }
    }, [isOpen, initialDate]);

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

    if (!isOpen || !unit || !initialDate) return null;

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
            await onSubmit({
                unitId: unit.id,
                guestId: selectedGuest.id,
                checkInDate,
                checkOutDate,
                adults,
                children,
                totalAmount,
                paidAmount,
                status,
                notes: notes || undefined,
            });
            onClose();
        } catch (error) {
            console.error('Error creating reservation:', error);
            alert('Error creating reservation. Please try again.');
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
        setGuestSearchQuery(`${guest.firstName} ${guest.lastName}`);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-text-primary">Nueva Reserva</h2>
                    <button
                        onClick={onClose}
                        className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Reservation Info (Read-only) */}
                    <div className="bg-surface p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                            Información de la Reserva
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-text-secondary">Unidad:</span>
                                <p className="font-medium text-text-primary">{unit.name}</p>
                            </div>
                            <div>
                                <span className="text-text-secondary">Tipo:</span>
                                <p className="font-medium text-text-primary">{unit.unitType.name}</p>
                            </div>
                            <div>
                                <span className="text-text-secondary">Zona:</span>
                                <p className="font-medium text-text-primary">{unit.zone.name}</p>
                            </div>
                            <div>
                                <span className="text-text-secondary">Check-in:</span>
                                <p className="font-medium text-text-primary">
                                    {format(initialDate, 'dd/MM/yyyy')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Guest Selection */}
                    <div className="bg-surface p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                            Seleccionar Huésped
                        </h3>

                        {!showCreateGuest ? (
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

                                {/* Selected guest */}
                                {selectedGuest && (
                                    <div className="bg-upcamp-cyan bg-opacity-10 border border-upcamp-cyan rounded-lg p-3 mb-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-text-primary">
                                                    {selectedGuest.firstName} {selectedGuest.lastName}
                                                </div>
                                                <div className="text-sm text-text-secondary">
                                                    {selectedGuest.email}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedGuest(null)}
                                                className="text-text-secondary hover:text-text-primary"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Create new guest button */}
                                <button
                                    type="button"
                                    onClick={() => setShowCreateGuest(true)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-outline rounded-lg text-text-secondary hover:text-upcamp-cyan hover:border-upcamp-cyan transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                    Crear Nuevo Huésped
                                </button>
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
                                            onClick={() => setShowCreateGuest(false)}
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

                    {/* Pricing */}
                    <div className="bg-surface p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                            Información Financiera
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Precio base por noche:</span>
                                <span className="font-medium text-text-primary">€{basePrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Noches:</span>
                                <span className="font-medium text-text-primary">{nights}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="font-semibold text-text-primary">Total:</span>
                                <span className="font-semibold text-text-primary text-lg">
                                    €{totalAmount.toFixed(2)}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Pago inicial (opcional)
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
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-surface p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                            Información Adicional
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Estado
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as 'pending' | 'confirmed')}
                                    className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan"
                                >
                                    <option value="pending">Pendiente</option>
                                    <option value="confirmed">Confirmada</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Notas
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-upcamp-cyan resize-none"
                                    placeholder="Notas adicionales sobre la reserva..."
                                />
                            </div>
                        </div>
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
                            {isSubmitting ? 'Creando...' : 'Crear Reserva'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
