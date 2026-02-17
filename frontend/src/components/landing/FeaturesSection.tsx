
export default function FeaturesSection() {
    const features = [
        {
            title: "Smart Booking Engine",
            description: "Intuitive multi-tenant booking system that syncs across all platforms. Reduce double bookings and automate confirmations effortlessly.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: "text-upcamp-cyan",
            bg: "bg-upcamp-cyan/10"
        },
        {
            title: "Guest Communication",
            description: "Automated SMS and email messaging for arrival instructions, park alerts, and feedback collection. Keep your guests informed 24/7.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            color: "text-upcamp-blue",
            bg: "bg-upcamp-blue/10"
        },
        {
            title: "Financial Analytics",
            description: "Real-time revenue tracking, automated invoicing, and occupancy reports. Make data-driven decisions to grow your business.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: "text-purple-600",
            bg: "bg-purple-100"
        }
    ];

    return (
        <section id="features" className="py-20 bg-surface">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                        Everything You Need to <span className="text-upcamp-cyan">Grow</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Powerful tools designed specifically for the unique challenges of campsite and outdoor hospitality management.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-surface-variant rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-card-hover group">
                            <div className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
