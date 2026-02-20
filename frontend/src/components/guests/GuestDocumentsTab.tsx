export default function GuestDocumentsTab({ guest }: { guest: any }) {
    return (
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-medium text-text-primary">Documentos</h3>
                    <p className="text-sm text-text-secondary">Contratos, fichas de policía y otros archivos.</p>
                </div>
                <button className="btn btn-secondary text-sm">Subir Documento</button>
            </div>

            {guest?.documents?.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                    {guest.documents.map((doc: any) => (
                        <div key={doc.id} className="bg-surface border border-outline p-4 rounded-xl flex items-center gap-4 hover:bg-surface-variant transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-text-primary truncate">{doc.description || doc.type}</p>
                                <p className="text-xs text-text-secondary">Subido el {new Date(doc.createdAt).toLocaleDateString()}</p>
                            </div>
                            <button className="text-text-secondary hover:text-upcamp-blue">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-text-secondary italic text-center py-8">No hay documentos subidos.</p>
            )}
        </div>
    );
}
