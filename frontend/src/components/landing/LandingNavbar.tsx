
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/upcamp-logo.png"
                            alt="UPCAMP"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-base font-semibold uppercase tracking-[0.005em] text-[rgb(21,57,106)] hover:text-upcamp-blue transition-colors">Características</a>
                    <a href="#pricing" className="text-base font-semibold uppercase tracking-[0.005em] text-[rgb(21,57,106)] hover:text-upcamp-blue transition-colors">Precios</a>
                </div>

                {/* Usage Buttons (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/login" className="px-5 py-2.5 border border-text-primary/20 rounded-button text-sm font-bold uppercase tracking-wide text-text-primary hover:border-upcamp-blue hover:text-upcamp-blue transition-all">
                        Iniciar Sesión
                    </Link>
                    <Link
                        to="/register"
                        className="bg-upcamp-blue text-white px-5 py-2.5 rounded-button text-sm font-bold uppercase tracking-wide hover:bg-upcamp-blue-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Empezar gratis
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-text-primary"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-surface border-b border-outline shadow-lg p-4 flex flex-col gap-4 animate-fade-in-down">
                    <a
                        href="#features"
                        className="text-base font-semibold uppercase tracking-[0.005em] text-[rgb(21,57,106)] hover:text-upcamp-blue py-2 border-b border-outline/50"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Características
                    </a>
                    <a
                        href="#pricing"
                        className="text-base font-semibold uppercase tracking-[0.005em] text-[rgb(21,57,106)] hover:text-upcamp-blue py-2 border-b border-outline/50"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Precios
                    </a>
                    <div className="flex flex-col gap-3 mt-2">
                        <Link
                            to="/login"
                            className="text-center w-full py-2.5 font-bold uppercase tracking-wide text-text-primary border border-outline rounded-button"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            to="/register"
                            className="text-center w-full py-2.5 bg-upcamp-blue text-white font-bold uppercase tracking-wide rounded-button shadow-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Empezar gratis
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
