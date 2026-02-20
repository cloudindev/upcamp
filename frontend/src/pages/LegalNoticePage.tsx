import LandingNavbar from '../components/landing/LandingNavbar';
import Footer from '../components/landing/Footer';

export default function LegalNoticePage() {
    return (
        <div className="min-h-screen bg-surface font-sans">
            <LandingNavbar />
            <div className="pt-32 pb-20 container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-3xl font-bold text-text-primary mb-8">Aviso Legal</h1>
                <div className="prose prose-lg text-text-secondary">
                    <p>
                        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE), a continuación se exponen los datos identificativos de la empresa:
                    </p>
                    <p className="mt-4">
                        <strong>Denominación social:</strong> UPCAMP Hospitality S.L.<br />
                        <strong>Domicilio social:</strong> [Dirección de la empresa]<br />
                        <strong>Correo electrónico:</strong> contacto@upcamp.es<br />
                        <strong>Teléfono:</strong> [Teléfono de contacto]
                    </p>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Finalidad de la página web</h2>
                    <p>
                        La finalidad de esta página web es ofrecer información sobre el software de gestión para campings desarrollado por UPCAMP Hospitality S.L., así como permitir el registro y acceso a la plataforma.
                    </p>
                    <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Legislación</h2>
                    <p>
                        Con carácter general las relaciones entre UPCAMP Hospitality S.L. con los Usuarios de sus servicios telemáticos, presentes en este sitio web, se encuentran sometidas a la legislación y jurisdicción españolas.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
