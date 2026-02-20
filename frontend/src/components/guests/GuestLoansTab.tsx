export default function GuestLoansTab({ guest }: { guest: any }) {
    return (
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-medium text-text-primary">Objetos en Préstamo</h3>
                    <p className="text-sm text-text-secondary">Gestiona los objetos prestados al cliente (adaptadores, raquetas, etc).</p>
                </div>
                <button className="btn btn-secondary text-sm">Prestar Objeto</button>
            </div>

            {guest?.loans?.length > 0 ? (
                <div className="grid gap-4">
                    {guest.loans.map((loan: any) => (
                        <div key={loan.id} className="bg-surface border border-outline p-4 rounded-xl flex justify-between items-center">
                            <div>
                                <p className="font-medium text-text-primary">{loan.item}</p>
                                <p className="text-sm text-text-secondary">
                                    Prestado el: {new Date(loan.loanDate).toLocaleDateString()}
                                    {loan.returnDate && ` - Devuelto: ${new Date(loan.returnDate).toLocaleDateString()}`}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${loan.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {loan.status === 'active' ? 'Prestado' : 'Devuelto'}
                                </span>
                                {loan.status === 'active' && (
                                    <button className="text-upcamp-blue hover:underline text-sm ml-2">Marcar Devuelto</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-text-secondary italic text-center py-8">No hay objetos prestados.</p>
            )}
        </div>
    );
}
