import LandingNavbar from '../components/landing/LandingNavbar';
import Footer from '../components/landing/Footer';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-surface font-sans">
            <LandingNavbar />
            <div className="pt-32 pb-20 container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-3xl font-bold text-text-primary mb-8">Política de Privacidad</h1>
                <div className="prose prose-lg text-text-secondary">
                    <p>
                        En UPCAMP Hospitality S.L. nos comprometemos a proteger y respetar tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
                    </p>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Información que recopilamos</h2>
                    <p>
                        Podemos recopilar y procesar los siguientes datos sobre ti:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Información que proporcionas al rellenar formularios en nuestro sitio web, como al registrarte para usar nuestro servicio.</li>
                        <li>Detalles de tus visitas a nuestro sitio web y los recursos a los que accedes.</li>
                        <li>Información que nos proporcionas cuando te comunicas con nosotros por cualquier medio.</li>
                    </ul>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Uso de la información</h2>
                    <p>
                        Usamos la información que tenemos sobre ti de las siguientes maneras:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Para proporcionarte la información, productos y servicios que nos solicitas.</li>
                        <li>Para cumplir con nuestras obligaciones derivadas de cualquier contrato celebrado entre tú y nosotros.</li>
                        <li>Para notificarte sobre cambios en nuestro servicio.</li>
                    </ul>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Seguridad de los datos</h2>
                    <p>
                        Tomamos todas las medidas razonables para asegurar que tus datos sean tratados de forma segura y de acuerdo con esta política de privacidad.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
