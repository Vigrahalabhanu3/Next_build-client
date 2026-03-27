import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import BuilderPage from './pages/BuilderPage.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="loading-state" style={{ minHeight: '100vh' }}>
                <div className="spinner" />
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="app-shell">
            <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/builder/:projectId"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <BuilderPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;