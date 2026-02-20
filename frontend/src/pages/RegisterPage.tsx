
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-surface-variant flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="bg-gradient-to-r from-upcamp-cyan to-upcamp-blue rounded-xl px-6 py-3 shadow-lg inline-block mb-8">
                    <span className="text-white font-bold text-xl tracking-wider">UPCAMP</span>
                </div>

                <h1 className="text-3xl font-bold text-text-primary mb-4">Registro de Tenant</h1>
                <p className="text-text-secondary mb-8">
                    Esta funcionalidad estará disponible pronto. Podrás registrar tu camping y comenzar a gestionar tus reservas.
                </p>

                <div className="flex flex-col gap-4">
                    <Link to="/" className="btn btn-primary shadow-lg">
                        Volver al Inicio
                    </Link>
                    <Link to="/login" className="text-upcamp-blue hover:underline font-medium">
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
