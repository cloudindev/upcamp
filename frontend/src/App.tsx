import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReservationsPage from './pages/ReservationsPage';
import PlanningPage from './pages/PlanningPage';
import GuestsPage from './pages/GuestsPage';
import GuestDetailPage from './pages/GuestDetailPage';
import InventoryPage from './pages/InventoryPage';

// Public Pages
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LegalNoticePage from './pages/LegalNoticePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiesPage from './pages/CookiesPage';
import TermsPage from './pages/TermsPage';

// Layout
import MainLayout from './components/layout/MainLayout';

function App() {
    const { isAuthenticated } = useAuthStore();

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/legal" element={<LegalNoticePage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/cookies" element={<CookiesPage />} />
                <Route path="/terms" element={<TermsPage />} />

                {/* Protected routes */}
                {/* Protected routes */}
                <Route
                    element={
                        isAuthenticated ? (
                            <MainLayout />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                >
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/reservations" element={<ReservationsPage />} />
                    <Route path="/planning" element={<PlanningPage />} />
                    <Route path="/guests" element={<GuestsPage />} />
                    <Route path="/guests/new" element={<GuestDetailPage />} />
                    <Route path="/guests/:id" element={<GuestDetailPage />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                </Route>

                {/* Catch all */}
                {/* If authenticated, go to dashboard. If not, go to landing page */}
                <Route
                    path="*"
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
