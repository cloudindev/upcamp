import LandingNavbar from '../components/landing/LandingNavbar';
import Footer from '../components/landing/Footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-surface font-sans">
            <LandingNavbar />
            <div className="pt-32 pb-20 container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-3xl font-bold text-text-primary mb-8">Condiciones Generales de Uso (CGU)</h1>
                <div className="prose prose-lg text-text-secondary">
                    <p>
                        Estas Condiciones Generales de Uso regulan el acceso y la utilización del sitio web, incluyendo los contenidos y servicios puestos a disposición de los usuarios en y/o a través del sitio web.
                    </p>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Aceptación</h2>
                    <p>
                        El acceso y/o uso de este sitio web atribuye la condición de usuario, que acepta, desde dicho acceso y/o uso, las presentes Condiciones Generales de Uso.
                    </p>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Uso del sitio web</h2>
                    <p>
                        El usuario asume la responsabilidad del uso del sitio web. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. En dicho registro el usuario será responsable de aportar información veraz y lícita.
                    </p>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Propiedad intelectual e industrial</h2>
                    <p>
                        UPCAMP Hospitality S.L. por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma. Todos los derechos reservados.
                    </p>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Exclusión de garantías y responsabilidad</h2>
                    <p>
                        UPCAMP Hospitality S.L. no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
