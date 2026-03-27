import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import { logout as logoutAPI } from '../services/auth.service.js';
import '../styles/navbar.css';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try { await logoutAPI(); } catch (error) { /* optional */ }
        logout();
        showToast('Logged out successfully', 'success');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/dashboard" className="navbar-brand">
                    <span className="navbar-brand-mark">&lt;/&gt;</span> NxtBuild
                </Link>
                <div className="navbar-links">
                    <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}>
                        My Projects
                    </Link>
                </div>
            </div>
            <div className="navbar-right">
                <div className="navbar-user-badge">
                    {user && user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <span className="navbar-username">{user && user.name ? user.name : ''}</span>
                <button className="navbar-logout" onClick={handleLogout}>Log out</button>
            </div>
        </nav>
    );
}

export default Navbar;