import LandingNavbar from '../components/landing/LandingNavbar';
import Footer from '../components/landing/Footer';

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-surface font-sans">
            <LandingNavbar />
            <div className="pt-32 pb-20 container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-3xl font-bold text-text-primary mb-8">Política de Cookies</h1>
                <div className="prose prose-lg text-text-secondary">
                    <p>
                        Nuestro sitio web utiliza cookies para distinguirte de otros usuarios de nuestro sitio web. Esto nos ayuda a proporcionarte una buena experiencia cuando navegas por nuestro sitio web y también nos permite mejorar nuestro sitio.
                    </p>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">¿Qué es una cookie?</h2>
                    <p>
                        Una cookie es un pequeño archivo de letras y números que almacenamos en tu navegador o en el disco duro de tu ordenador si estás de acuerdo. Las cookies contienen información que se transfiere al disco duro de tu ordenador.
                    </p>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Tipos de cookies que utilizamos</h2>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Cookies estrictamente necesarias:</strong> Son cookies que son necesarias para el funcionamiento de nuestro sitio web. Incluyen, por ejemplo, cookies que te permiten iniciar sesión en áreas seguras de nuestro sitio web.</li>
                        <li><strong>Cookies analíticas/de rendimiento:</strong> Nos permiten reconocer y contar el número de visitantes y ver cómo se mueven los visitantes por nuestro sitio web cuando lo están usando.</li>
                        <li><strong>Cookies de funcionalidad:</strong> Se utilizan para reconocerte cuando vuelves a nuestro sitio web. Esto nos permite personalizar nuestro contenido para ti y recordar tus preferencias.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}
