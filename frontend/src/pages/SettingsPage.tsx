import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('company');
    const { user } = useAuthStore();

    const menuItems = [
        {
            id: 'company',
            label: 'Datos empresa',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            id: 'email',
            label: 'Email',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: 'sms',
            label: 'SMS',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-text-primary">Configuración</h1>
                <p className="text-text-secondary">Gestiona la configuración de tu camping y notificaciones.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <nav className="flex flex-col">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors w-full text-left ${activeTab === item.id
                                        ? 'bg-upcamp-blue/10 text-upcamp-blue border-l-4 border-upcamp-blue'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[400px]">
                        {activeTab === 'company' && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-xl font-bold text-text-primary border-b pb-4">Datos de la Empresa</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Nombre del Camping</label>
                                        <input
                                            type="text"
                                            defaultValue={user?.tenant?.name || 'Demo Camping'}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upcamp-blue focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email de Contacto</label>
                                        <input
                                            type="email"
                                            defaultValue="info@democamping.com"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upcamp-blue focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Teléfono</label>
                                        <input
                                            type="tel"
                                            defaultValue="+34 123 456 789"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upcamp-blue focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">CIF / NIF</label>
                                        <input
                                            type="text"
                                            defaultValue="B12345678"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upcamp-blue focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Dirección</label>
                                        <input
                                            type="text"
                                            defaultValue="Calle Principal 123, Valencia, España"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upcamp-blue focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button className="btn btn-primary px-6 py-2">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'email' && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-xl font-bold text-text-primary border-b pb-4">Configuración de Email</h2>
                                <p className="text-gray-600">Configura las plantillas y credenciales para el envío de correos electrónicos.</p>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                Esta funcionalidad está en desarrollo. Próximamente podrás configurar SMTP y plantillas personalizadas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'sms' && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-xl font-bold text-text-primary border-b pb-4">Configuración de SMS</h2>
                                <p className="text-gray-600">Gestiona las notificaciones por SMS para tus clientes.</p>

                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-blue-700">
                                                Integra proveedores de SMS como Twilio o MessageBird para enviar recordatorios automáticos.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
