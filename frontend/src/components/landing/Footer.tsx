
export default function Footer() {
    return (
        <footer className="bg-surface-variant border-t border-outline py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-upcamp-cyan to-upcamp-blue flex items-center justify-center text-white font-bold text-xs">
                            UP
                        </div>
                        <span className="font-bold text-text-primary">UPCAMP Hospitality</span>
                    </div>

                    <div className="text-sm text-text-secondary">
                        © {new Date().getFullYear()} UPCAMP. Todos los derechos reservados.
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="text-text-muted hover:text-upcamp-blue transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-text-muted hover:text-upcamp-blue transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
