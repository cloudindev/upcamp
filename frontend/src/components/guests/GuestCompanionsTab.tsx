export default function GuestCompanionsTab({ guest }: { guest: any }) {
    return (
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-medium text-text-primary">Listado de Acompañantes</h3>
                    <p className="text-sm text-text-secondary">Gestiona las personas que acompañan al titular.</p>
                </div>
                <button className="btn btn-secondary text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Añadir Acompañante
                </button>
            </div>

            {guest?.companions?.length > 0 ? (
                <div className="grid gap-4">
                    {guest.companions.map((comp: any) => (
                        <div key={comp.id} className="bg-surface border border-outline p-4 rounded-xl flex justify-between items-center hover:bg-surface-variant transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-upcamp-blue/10 text-upcamp-blue flex items-center justify-center font-bold">
                                    {comp.firstName?.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-text-primary">{comp.firstName} {comp.lastName}</p>
                                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                                        <span>{comp.documentType}: {comp.documentNumber}</span>
                                        {comp.nationality && (
                                            <>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <span>{comp.nationality}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-text-secondary hover:text-upcamp-blue hover:bg-blue-50 rounded-lg transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-surface-variant/30 rounded-xl border border-dashed border-outline">
                    <p className="text-text-secondary mb-2">No hay acompañantes registrados.</p>
                    <button className="text-upcamp-blue hover:underline text-sm font-medium">
                        Añadir el primer acompañante
                    </button>
                </div>
            )}
        </div>
    );
}
