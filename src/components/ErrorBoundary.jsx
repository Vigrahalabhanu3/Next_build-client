import React from 'react';
import '../styles/notFound.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="not-found">
                    <div className="not-found-content">
                        <div className="not-found-icon">&#9888;</div>
                        <h1 className="not-found-title">Something went wrong</h1>
                        <p className="not-found-text">
                            An unexpected error occurred. Please refresh the page or try again later.
                        </p>
                        <div className="not-found-actions">
                            <button 
                                className="not-found-btn primary" 
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </button>
                            <button 
                                className="not-found-btn secondary" 
                                onClick={() => window.location.href = '/'}
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
