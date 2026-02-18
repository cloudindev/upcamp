
export default function HeroSection() {
    return (
        <section className="relative pt-20 pb-16 lg:pt-44 lg:pb-32 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                <div className="absolute top-[-5%] right-[-10%] w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-upcamp-cyan/10 rounded-full blur-[60px] lg:blur-[100px]" />
                <div className="absolute bottom-[-5%] left-[-10%] w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-upcamp-blue/10 rounded-full blur-[60px] lg:blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-upcamp-cyan/10 text-upcamp-cyan-dark text-xs font-semibold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-upcamp-cyan" />
                            Gestión de Campings de Última Generación
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-text-primary leading-[1.1]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-upcamp-cyan to-upcamp-blue">
                                Software gestión campings
                            </span>
                        </h1>

                        <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
                            El PMS más sencillo para optimizar tus reservas, gestionar la ocupación y atender a tus huéspedes. Pruébalo ahora, la aplicación más sencilla para gestores de campings.
                        </p>

                        <div className="flex flex-col gap-2 pt-4">
                            <a
                                href="/register"
                                className="w-full sm:w-auto px-8 py-4 bg-upcamp-cyan text-white rounded-button font-bold text-lg shadow-lg shadow-upcamp-cyan/30 hover:shadow-xl hover:-translate-y-1 transition-all text-center"
                            >
                                Pruébalo ahora
                            </a>
                            <p className="text-xs text-text-muted ml-1">
                                gratis durante 20 días
                            </p>
                        </div>

                        <div className="flex items-center gap-4 pt-8 border-t border-outline/50">
                            <div className="flex -space-x-3">
                                {[
                                    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=64&h=64&fit=crop&auto=format",
                                    "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?w=64&h=64&fit=crop&auto=format",
                                    "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=64&h=64&fit=crop&auto=format",
                                    "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=64&h=64&fit=crop&auto=format"
                                ].map((src, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-surface overflow-hidden">
                                        <img src={src} alt={`Camping ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-medium text-text-secondary">
                                Con la confianza de <span className="text-text-primary font-bold">500+ campings premium</span>
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                            <img
                                src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Vista Previa Panel"
                                className="w-full h-auto object-cover"
                            />

                            {/* Floating UI Elements Mockup */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-text-primary">Ocupación en Tiempo Real</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">94% Lleno</span>
                                </div>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-12 flex-1 rounded-lg ${i > 5 ? 'bg-surface-variant' : 'bg-upcamp-cyan/30'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative blobs behind image */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-upcamp-cyan/20 rounded-full blur-2xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-upcamp-blue/20 rounded-full blur-2xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
