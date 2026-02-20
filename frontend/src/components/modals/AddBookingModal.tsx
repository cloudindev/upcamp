import { useState } from 'react';

interface AddBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export default function AddBookingModal({ isOpen, onClose, onSubmit }: AddBookingModalProps) {
    const [formData, setFormData] = useState({
        guestName: '',
        guestEmail: '',
        checkInDate: '',
        checkOutDate: '',
        unitType: 'parcela',
        guests: 2,
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-text-primary">Nueva Reserva</h2>
                        <button
                            onClick={onClose}
                            className="text-text-secondary hover:text-text-primary"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Guest Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Información del Huésped</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    value={formData.guestName}
                                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                                    className="input"
                                    placeholder="Juan García"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.guestEmail}
                                    onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                                    className="input"
                                    placeholder="juan@email.com"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Reservation Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Detalles de la Reserva</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Fecha de Entrada
                                </label>
                                <input
                                    type="date"
                                    value={formData.checkInDate}
                                    onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                                    className="input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Fecha de Salida
                                </label>
                                <input
                                    type="date"
                                    value={formData.checkOutDate}
                                    onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                                    className="input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Tipo de Alojamiento
                                </label>
                                <select
                                    value={formData.unitType}
                                    onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                                    className="input"
                                >
                                    <option value="parcela">Parcela Estándar</option>
                                    <option value="bungalow">Bungalow 4 pax</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Número de Huéspedes
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="6"
                                    value={formData.guests}
                                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                    className="input"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 btn btn-primary py-3"
                        >
                            Crear Reserva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
