
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-upcamp-cyan to-upcamp-blue rounded-lg px-3 py-1.5 shadow-md">
                        <span className="text-white font-bold text-lg tracking-wider">UPCAMP</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-text-secondary hover:text-upcamp-blue transition-colors">Características</a>
                    <a href="#pricing" className="text-sm font-medium text-text-secondary hover:text-upcamp-blue transition-colors">Precios</a>
                    <a href="#about" className="text-sm font-medium text-text-secondary hover:text-upcamp-blue transition-colors">Nosotros</a>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-semibold text-text-primary hover:text-upcamp-blue transition-colors">
                        Iniciar Sesión
                    </Link>
                    <Link
                        to="/register"
                        className="bg-upcamp-blue text-white px-5 py-2.5 rounded-button text-sm font-semibold hover:bg-upcamp-blue-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Registrar Camping
                    </Link>
                </div>
            </div>
        </nav>
    );
}
