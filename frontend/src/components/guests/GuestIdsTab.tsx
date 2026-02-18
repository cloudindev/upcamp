export default function GuestIdsTab({ guest }: { guest: any }) {
    const people = [
        {
            id: guest.id,
            name: `${guest.firstName} ${guest.lastName}`,
            type: 'Titular',
            docType: guest.documentType,
            docNumber: guest.documentNumber,
            front: null, // Mock null
            back: null,
        },
        ...(guest.companions || []).map((c: any) => ({
            id: c.id,
            name: `${c.firstName} ${c.lastName}`,
            type: 'Acompañante',
            docType: c.documentType,
            docNumber: c.documentNumber,
            front: c.documentFront,
            back: c.documentBack,
        }))
    ];

    return (
        <div className="max-w-4xl space-y-6">
            <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">Identificación (DNI/Pasaporte)</h3>
                <p className="text-sm text-text-secondary mb-6">Estado de la documentación de identidad de todos los ocupantes.</p>
            </div>

            <div className="space-y-4">
                {people.map((person) => (
                    <div key={person.id} className="bg-surface border border-outline p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-text-primary">{person.name}</h4>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${person.type === 'Titular' ? 'bg-upcamp-blue/10 text-upcamp-blue' : 'bg-gray-100 text-gray-600'}`}>
                                        {person.type}
                                    </span>
                                </div>
                                <p className="text-sm text-text-secondary">{person.docType}: {person.docNumber}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${person.front && person.back ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {person.front && person.back ? (
                                        <>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            Completo
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                            Incompleto
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Front Side */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center min-h-[160px] bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                                {person.front ? (
                                    <img src={person.front} alt="Anverso" className="h-32 object-contain" />
                                ) : (
                                    <>
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                        <p className="text-sm font-medium text-text-primary">Subir Anverso</p>
                                        <p className="text-xs text-text-secondary">JPG, PNG o PDF</p>
                                    </>
                                )}
                            </div>

                            {/* Back Side */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center min-h-[160px] bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                                {person.back ? (
                                    <img src={person.back} alt="Reverso" className="h-32 object-contain" />
                                ) : (
                                    <>
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                        <p className="text-sm font-medium text-text-primary">Subir Reverso</p>
                                        <p className="text-xs text-text-secondary">JPG, PNG o PDF</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
