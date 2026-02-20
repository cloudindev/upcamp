
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-surface-variant border-t border-outline py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img
                            src="/upcamp-logo.png"
                            alt="UPCAMP Hospitality"
                            className="h-8 w-auto object-contain"
                        />
                    </div>

                    <div className="text-sm text-text-secondary">
                        © {new Date().getFullYear()} UPCAMP. Todos los derechos reservados.
                    </div>

                    <div className="flex gap-6 text-xs">
                        <Link to="/legal" className="text-text-muted hover:text-upcamp-blue transition-colors">
                            Aviso Legal
                        </Link>
                        <Link to="/privacy" className="text-text-muted hover:text-upcamp-blue transition-colors">
                            Política de Privacidad
                        </Link>
                        <Link to="/cookies" className="text-text-muted hover:text-upcamp-blue transition-colors">
                            Cookies
                        </Link>
                        <Link to="/terms" className="text-text-muted hover:text-upcamp-blue transition-colors">
                            CGU
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
