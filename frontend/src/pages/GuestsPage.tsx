import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { guestsApi } from '../services/guestsApi';

export default function GuestsPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const { data: guests, isLoading } = useQuery({
        queryKey: ['guests', searchTerm],
        queryFn: () => guestsApi.getAll({ search: searchTerm }),
    });

    const deleteMutation = useMutation({
        mutationFn: guestsApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guests'] });
            setOpenMenuId(null);
        },
    });

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-text-primary">Clientes</h1>
                <Link
                    to="/guests/new"
                    className="btn btn-primary flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Añadir Cliente
                </Link>
            </div>

            <div className="bg-surface rounded-xl shadow-sm border border-outline p-4">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, DNI, email..."
                        className="input pl-10 w-full md:w-80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="w-5 h-5 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-outline text-text-secondary text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">Cliente</th>
                                <th className="p-4 font-semibold">DNI/Pasaporte</th>
                                <th className="p-4 font-semibold">Contacto</th>
                                <th className="p-4 font-semibold">Fecha Registro</th>
                                <th className="p-4 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-text-secondary">Cargando...</td>
                                </tr>
                            ) : !guests || guests?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-text-secondary">No se encontraron clientes.</td>
                                </tr>
                            ) : (
                                guests?.map((guest: any) => (
                                    <tr key={guest.id} className="hover:bg-surface-variant transition-colors">
                                        <td className="p-4">
                                            <Link
                                                to={`/guests/${guest.id}`}
                                                className="font-medium text-text-primary hover:text-upcamp-blue transition-colors block"
                                            >
                                                {guest.firstName} {guest.lastName}
                                            </Link>
                                            {guest.nationality && <div className="text-xs text-text-secondary">{guest.nationality}</div>}
                                        </td>
                                        <td className="p-4 text-text-secondary">
                                            {guest.documentNumber || '-'}
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm text-text-primary">{guest.email}</div>
                                            <div className="text-xs text-text-secondary">{guest.phone}</div>
                                        </td>
                                        <td className="p-4 text-text-secondary text-sm">
                                            {new Date(guest.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right relative">
                                            <button
                                                onClick={(e) => toggleMenu(e, guest.id)}
                                                className="p-2 text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>

                                            {openMenuId === guest.id && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-outline py-1 z-10 animate-fade-in-down origin-top-right"
                                                    style={{ top: '100%', right: '1rem' }}
                                                >
                                                    <Link
                                                        to={`/guests/${guest.id}`}
                                                        className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface-variant hover:text-text-primary transition-colors text-left w-full"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(guest.id)}
                                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-surface-variant transition-colors text-left w-full"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
