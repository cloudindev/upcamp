
export default function PricingSection() {
    return (
        <section id="pricing" className="py-20 bg-surface-variant">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                        Precios Transparentes
                    </h2>
                    <p className="text-text-secondary text-lg">
                        Planes adaptados al tamaño de tu camping. Sin costes ocultos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* BASIC PLAN */}
                    <div className="bg-surface rounded-2xl shadow-xl border border-outline p-8 flex flex-col relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl">
                        <h3 className="text-xl font-bold text-text-primary mb-2">PLAN BASIC</h3>
                        <p className="text-text-secondary mb-6 text-sm">Hasta 120 unidades</p>

                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-4xl font-bold text-text-primary">79€</span>
                            <span className="text-text-secondary font-medium">/ mes</span>
                        </div>
                        <div className="mb-8 text-sm text-upcamp-cyan font-semibold">
                            + 1€ por unidad ocupada
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {['Reservas online', 'Motor de reservas', 'Check-in digital', 'Facturación básica', 'Soporte estándar', 'Reportes avanzados', 'Control de parcelas fijas'].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-upcamp-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-text-primary text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="/register?plan=basic"
                            className="w-full py-3 text-center bg-surface-variant text-text-primary border border-outline rounded-button font-bold hover:bg-upcamp-cyan hover:text-white hover:border-transparent transition-all"
                        >
                            Empezar Basic
                        </a>
                    </div>

                    {/* PRO PLAN */}
                    <div className="bg-surface rounded-2xl shadow-xl border-2 border-upcamp-cyan p-8 flex flex-col relative overflow-hidden transform md:-translate-y-4">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-upcamp-cyan to-upcamp-blue" />
                        <div className="absolute top-4 right-4 bg-upcamp-cyan text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                            Popular
                        </div>

                        <h3 className="text-xl font-bold text-text-primary mb-2">PLAN PRO</h3>
                        <p className="text-text-secondary mb-6 text-sm">121 – 300 unidades</p>

                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-5xl font-bold text-text-primary">149€</span>
                            <span className="text-text-secondary font-medium">/ mes</span>
                        </div>
                        <div className="mb-8 text-sm text-upcamp-cyan font-semibold">
                            + 0,80€ por unidad ocupada
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {['Reservas online', 'Motor de reservas', 'Check-in digital', 'Facturación básica', 'Soporte estándar', 'Reportes avanzados', 'Control de parcelas fijas'].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-upcamp-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-text-primary text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="/register?plan=pro"
                            className="w-full py-4 text-center bg-upcamp-blue text-white rounded-button font-bold hover:bg-upcamp-blue-dark transition-colors shadow-lg shadow-upcamp-blue/30"
                        >
                            Empezar Pro
                        </a>
                    </div>

                    {/* ENTERPRISE PLAN */}
                    <div className="bg-surface rounded-2xl shadow-xl border border-outline p-8 flex flex-col relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl">
                        <h3 className="text-xl font-bold text-text-primary mb-2">PLAN ENTERPRISE</h3>
                        <p className="text-text-secondary mb-6 text-sm">+300 unidades</p>

                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-4xl font-bold text-text-primary">249€</span>
                            <span className="text-text-secondary font-medium">/ mes</span>
                        </div>
                        <div className="mb-8 text-sm text-upcamp-cyan font-semibold">
                            + 0,60€ por unidad ocupada
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {['Reservas online', 'Motor de reservas', 'Check-in digital', 'Facturación básica', 'Soporte estándar', 'Reportes avanzados', 'Control de parcelas fijas'].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-upcamp-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-text-primary text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="/register?plan=enterprise"
                            className="w-full py-3 text-center bg-surface-variant text-text-primary border border-outline rounded-button font-bold hover:bg-text-primary hover:text-white hover:border-transparent transition-all"
                        >
                            Empezar Enterprise
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
