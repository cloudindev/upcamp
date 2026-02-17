
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PricingSection from '../components/landing/PricingSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-surface font-sans selection:bg-upcamp-cyan/20 selection:text-upcamp-blue-dark">
            <LandingNavbar />
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <Footer />
        </div>
    );
}
