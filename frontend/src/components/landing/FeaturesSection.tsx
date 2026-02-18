
export default function FeaturesSection() {
    const features = [
        {
            title: "Reservas online",
            description: "Permite a tus clientes reservar directamente desde tu web en cualquier momento, aumentando tus ventas directas sin comisiones.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            ),
            color: "text-upcamp-cyan",
            bg: "bg-upcamp-cyan/10"
        },
        {
            title: "Motor de reservas",
            description: "Potente motor que gestiona disponibilidad, tarifas y estancias mínimas en tiempo real, evitando overbooking.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: "text-upcamp-blue",
            bg: "bg-upcamp-blue/10"
        },
        {
            title: "Check-in digital",
            description: "Agiliza la llegada de tus huéspedes permitiéndoles registrarse online antes de llegar, reduciendo colas en recepción.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 17h.01M8 11h16a2 2 0 012 2v5a2 2 0 01-2 2h-4l-4 4-4-4H6a2 2 0 01-2-2v-5a2 2 0 012-2h1" />
                </svg>
            ),
            color: "text-green-600",
            bg: "bg-green-100"
        },
        {
            title: "Facturación básica",
            description: "Genera facturas, tickets y gestiona cobros de forma sencilla. Cumple con la normativa sin complicaciones.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: "text-amber-600",
            bg: "bg-amber-100"
        },
        {
            title: "Soporte estándar",
            description: "Equipo de soporte disponible para ayudarte a resolver dudas y sacar el máximo partido a la plataforma.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            color: "text-purple-600",
            bg: "bg-purple-100"
        },
        {
            title: "Reportes avanzados",
            description: "Visualiza la ocupación, ingresos y tendencias con gráficos detallados para tomar mejores decisiones.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: "text-indigo-600",
            bg: "bg-indigo-100"
        },
        {
            title: "Control de parcelas fijas",
            description: "Gestiona contratos de larga estancia, lecturas de contadores y facturación recurrente para residentes.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            color: "text-teal-600",
            bg: "bg-teal-100"
        }
    ];

    return (
        <section id="features" className="py-20 bg-surface">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                        Todo lo que Necesitas para <span className="text-upcamp-cyan">Gestionar tu camping</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Una suite completa de herramientas diseñadas para simplificar cada aspecto de tu camping.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-surface-variant rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover group border border-transparent hover:border-upcamp-cyan/20">
                            <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-text-primary mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
