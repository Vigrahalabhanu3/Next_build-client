import { useNavigate } from 'react-router-dom';
import '../styles/notFound.css';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <div className="not-found-content">
                <div className="not-found-icon">&#9888;</div>
                <h1 className="not-found-title">404 - Page Not Found</h1>
                <p className="not-found-text">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="not-found-actions">
                    <button 
                        className="not-found-btn primary" 
                        onClick={() => navigate('/')}
                    >
                        Go Home
                    </button>
                    <button 
                        className="not-found-btn secondary" 
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
