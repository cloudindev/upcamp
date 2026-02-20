import { X, Edit } from 'lucide-react';
import { ReservationDetails, ReservationStatus } from '../../types/planning.types';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import EditReservationModal, { UpdateReservationData } from './EditReservationModal';

interface ReservationDetailsModalProps {
    isOpen: boolean;
    reservationId: string | null;
    reservationData: ReservationDetails | null;
    isLoading: boolean;
    onClose: () => void;
    onUpdate?: (id: string, data: UpdateReservationData) => Promise<void>;
}

const statusColors: Record<ReservationStatus, { bg: string; text: string; label: string }> = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pendiente' },
    confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmada' },
    checked_in: { bg: 'bg-cyan-100', text: 'text-cyan-800', label: 'Check-in Realizado' },
    checked_out: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Check-out Realizado' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelada' },
};

export default function ReservationDetailsModal({
    isOpen,
    reservationId,
    reservationData,
    isLoading,
    onClose,
    onUpdate,
}: ReservationDetailsModalProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

    if (!isOpen || !reservationId) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between z-10">
                    <h2 className="text-2xl font-bold text-text-primary">Detalles de Reserva</h2>
                    <button
                        onClick={onClose}
                        className="text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Cerrar"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-upcamp-cyan"></div>
                        </div>
                    ) : reservationData ? (
                        <div className="space-y-6">
                            {/* Status Badge */}
                            <div className="flex items-center gap-3">
                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[reservationData.status].bg} ${statusColors[reservationData.status].text}`}
                                >
                                    {statusColors[reservationData.status].label}
                                </span>
                                <span className="text-sm text-text-secondary">
                                    ID: {reservationData.id.slice(0, 8)}...
                                </span>
                            </div>

                            {/* Guest Information */}
                            {reservationData.guest && (
                                <div className="bg-surface p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-text-primary mb-3">
                                        Información del Huésped
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-text-secondary">Nombre:</span>
                                            <p className="font-medium text-text-primary">
                                                {reservationData.guest.firstName} {reservationData.guest.lastName}
                                            </p>
                                        </div>
                                        {reservationData.guest.email && (
                                            <div>
                                                <span className="text-text-secondary">Email:</span>
                                                <p className="font-medium text-text-primary">
                                                    {reservationData.guest.email}
                                                </p>
                                            </div>
                                        )}
                                        {reservationData.guest.phone && (
                                            <div>
                                                <span className="text-text-secondary">Teléfono:</span>
                                                <p className="font-medium text-text-primary">
                                                    {reservationData.guest.phone}
                                                </p>
                                            </div>
                                        )}
                                        {reservationData.guest.documentNumber && (
                                            <div>
                                                <span className="text-text-secondary">Documento:</span>
                                                <p className="font-medium text-text-primary">
                                                    {reservationData.guest.documentType}{' '}
                                                    {reservationData.guest.documentNumber}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Reservation Details */}
                            <div className="bg-surface p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-text-primary mb-3">
                                    Detalles de la Reserva
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-text-secondary">Check-in:</span>
                                        <p className="font-medium text-text-primary">
                                            {format(new Date(reservationData.checkInDate), 'dd/MM/yyyy')}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-text-secondary">Check-out:</span>
                                        <p className="font-medium text-text-primary">
                                            {format(new Date(reservationData.checkOutDate), 'dd/MM/yyyy')}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-text-secondary">Noches:</span>
                                        <p className="font-medium text-text-primary">
                                            {reservationData.nights}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-text-secondary">Huéspedes:</span>
                                        <p className="font-medium text-text-primary">
                                            {reservationData.adults} adultos, {reservationData.children} niños
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Unit Information */}
                            {reservationData.unit && (
                                <div className="bg-surface p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-text-primary mb-3">
                                        Alojamiento Asignado
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-text-secondary">Unidad:</span>
                                            <p className="font-medium text-text-primary">
                                                {reservationData.unit.name}
                                            </p>
                                        </div>
                                        {reservationData.unit.unitType && (
                                            <div>
                                                <span className="text-text-secondary">Tipo:</span>
                                                <p className="font-medium text-text-primary">
                                                    {reservationData.unit.unitType.name}
                                                </p>
                                            </div>
                                        )}
                                        {reservationData.unit.zone && (
                                            <div>
                                                <span className="text-text-secondary">Zona:</span>
                                                <p className="font-medium text-text-primary">
                                                    {reservationData.unit.zone.name}
                                                </p>
                                            </div>
                                        )}
                                        {reservationData.unit.unitType && (
                                            <div>
                                                <span className="text-text-secondary">Capacidad:</span>
                                                <p className="font-medium text-text-primary">
                                                    {reservationData.unit.unitType.maxOccupancy} personas
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Financial Information */}
                            <div className="bg-surface p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-text-primary mb-3">
                                    Información Financiera
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Total:</span>
                                        <span className="font-medium text-text-primary">
                                            €{Number(reservationData.totalAmount).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Pagado:</span>
                                        <span className="font-medium text-green-600">
                                            €{Number(reservationData.paidAmount).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-gray-200">
                                        <span className="font-semibold text-text-primary">Pendiente:</span>
                                        <span className="font-semibold text-text-primary">
                                            €{(Number(reservationData.totalAmount) - Number(reservationData.paidAmount)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Folio Details */}
                                {reservationData.folio && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="text-xs text-text-secondary mb-2">
                                            Folio: {reservationData.folio.folioNumber}
                                        </p>
                                        {reservationData.folio.charges.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-xs font-medium text-text-primary mb-1">
                                                    Cargos:
                                                </p>
                                                <div className="space-y-1">
                                                    {reservationData.folio.charges.map((charge) => (
                                                        <div
                                                            key={charge.id}
                                                            className="flex justify-between text-xs"
                                                        >
                                                            <span className="text-text-secondary">
                                                                {charge.description}
                                                            </span>
                                                            <span className="text-text-primary">
                                                                €{charge.amount.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {reservationData.folio.payments.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-xs font-medium text-text-primary mb-1">
                                                    Pagos:
                                                </p>
                                                <div className="space-y-1">
                                                    {reservationData.folio.payments.map((payment) => (
                                                        <div
                                                            key={payment.id}
                                                            className="flex justify-between text-xs"
                                                        >
                                                            <span className="text-text-secondary">
                                                                {payment.paymentMethod}
                                                            </span>
                                                            <span className="text-green-600">
                                                                €{payment.amount.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Check-in Information */}
                            {reservationData.checkIn && (
                                <div className="bg-surface p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-text-primary mb-3">
                                        Información de Check-in
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-text-secondary">Fecha y hora:</span>
                                            <p className="font-medium text-text-primary">
                                                {format(
                                                    new Date(reservationData.checkIn.checkedInAt),
                                                    'dd/MM/yyyy HH:mm'
                                                )}
                                            </p>
                                        </div>
                                        {reservationData.checkIn.vehicles && Array.isArray(reservationData.checkIn.vehicles) && reservationData.checkIn.vehicles.length > 0 && (
                                            <div>
                                                <span className="text-text-secondary">Vehículos:</span>
                                                <p className="font-medium text-text-primary">
                                                    {reservationData.checkIn.vehicles.map((v: any) => v.plate || v).join(', ')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Notes */}
                            {reservationData.notes && (
                                <div className="bg-surface p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-text-primary mb-3">Notas</h3>
                                    <p className="text-sm text-text-primary">{reservationData.notes}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-text-secondary">
                            No se pudo cargar la información de la reserva
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {reservationData && (
                    <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200">
                        <div className="flex gap-3">
                            <button onClick={onClose} className="flex-1 btn btn-outline">
                                Cerrar
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex-1 btn btn-primary flex items-center justify-center gap-2"
                            >
                                <Edit className="w-4 h-4" />
                                Editar Reserva
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Reservation Modal */}
            {onUpdate && (
                <EditReservationModal
                    isOpen={isEditModalOpen}
                    reservation={reservationData}
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={onUpdate}
                />
            )}
        </div>
    );
}
