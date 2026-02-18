export default function GuestVehiclesTab({ guest }: { guest: any }) {
    return (
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-medium text-text-primary">Vehículos y Mascotas</h3>
                    <p className="text-sm text-text-secondary">Gestiona los vehículos autorizados y mascotas.</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-secondary text-sm">Añadir Vehículo</button>
                    <button className="btn btn-secondary text-sm">Añadir Mascota</button>
                </div>
            </div>

            {guest?.vehicles?.length > 0 ? (
                <div className="grid gap-4">
                    {guest.vehicles.map((vehicle: any) => (
                        <div key={vehicle.id} className="bg-surface border border-outline p-4 rounded-xl flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${vehicle.type === 'pet' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                                    {vehicle.type === 'pet' ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium text-text-primary">
                                        {vehicle.type === 'pet' ? vehicle.name : `${vehicle.brand} ${vehicle.model}`}
                                    </p>
                                    <div className="text-sm text-text-secondary">
                                        {vehicle.type === 'pet' ? `${vehicle.breed} - Chip: ${vehicle.chipNumber || 'N/A'}` : `Matrícula: ${vehicle.plate}`}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-text-secondary hover:text-upcamp-blue hover:bg-blue-50 rounded-lg transition-colors">Editar</button>
                                <button className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-text-secondary italic text-center py-8">No hay vehículos ni mascotas registrados.</p>
            )}
        </div>
    );
}
