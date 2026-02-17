
export default function PricingSection() {
    return (
        <section id="pricing" className="py-20 bg-surface-variant">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                        Precios Transparentes
                    </h2>
                    <p className="text-text-secondary text-lg">
                        Una cuota base accesible y pagas solo por lo que utilizas. Sin costes ocultos.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Base Plan */}
                    <div className="bg-surface rounded-2xl shadow-xl border border-outline p-8 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-upcamp-cyan to-upcamp-blue" />

                        <h3 className="text-xl font-bold text-text-primary mb-2">Cuota Base</h3>
                        <p className="text-text-secondary mb-6">Acceso completo a la plataforma SaaS</p>

                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-bold text-text-primary">145€</span>
                            <span className="text-text-secondary font-medium">/ mes</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {['Panel de Control Avanzado', 'Gestión de Reservas', 'Facturación Automática', 'CRM de Huéspedes', 'Soporte Prioritario'].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-upcamp-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-text-primary font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="/register"
                            className="w-full py-4 text-center bg-upcamp-blue text-white rounded-button font-bold hover:bg-upcamp-blue-dark transition-colors"
                        >
                            Comenzar Ahora
                        </a>
                    </div>

                    {/* Usage Costs */}
                    <div className="bg-surface rounded-2xl shadow-card border border-outline p-8 flex flex-col">
                        <h3 className="text-xl font-bold text-text-primary mb-2">Costes Variables</h3>
                        <p className="text-text-secondary mb-6">Paga solo por la ocupación real</p>

                        <div className="space-y-6 flex-1">
                            <div className="flex items-center justify-between p-4 bg-surface-variant rounded-xl border border-outline">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold text-text-primary">Alojamiento</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-text-primary">5€</span>
                                    <span className="text-xs text-text-secondary block">/ mes por unidad</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-surface-variant rounded-xl border border-outline">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold text-text-primary">Parcela</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-text-primary">4€</span>
                                    <span className="text-xs text-text-secondary block">/ mes por unidad</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-surface-variant rounded-xl border border-outline">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold text-text-primary">Parcela Fija</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-text-primary">3€</span>
                                    <span className="text-xs text-text-secondary block">/ mes por unidad</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-text-secondary">
                                * Los precios no incluyen IVA. Facturación mensual automatizada.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
