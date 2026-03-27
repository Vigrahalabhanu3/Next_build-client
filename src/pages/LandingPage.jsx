import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';
import '../styles/landing.css';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <nav className="landing-nav">
                <span className="landing-logo">
                    <span className="landing-logo-mark">&lt;/&gt;</span> NxtBuild
                </span>
                <div className="landing-nav-right">
                    <button className="landing-nav-login" onClick={() => navigate('/login')}>
                        Log In
                    </button>
                    <button className="landing-nav-cta" onClick={() => navigate('/login')}>
                        Get Started
                    </button>
                </div>
            </nav>

            <section className="landing-hero">
                <div className="landing-hero-content">
                    <span className="landing-badge">AI-Powered Builder</span>
                    <h1 className="landing-hero-title">
                        Turn Your Ideas Into<br />
                        <span className="landing-hero-accent">Working Web Apps</span>
                    </h1>
                    <p className="landing-hero-subtitle">
                        Describe what you want to build in plain English. NxtBuild generates
                        clean, production-ready code instantly.
                    </p>

                    <div className="landing-prompt-box">
                        <div className="landing-prompt-input">
                            Build me a portfolio website with dark theme and project gallery...
                        </div>
                        <button className="landing-prompt-btn" onClick={() => navigate('/login')}>
                            Start Building
                        </button>
                    </div>

                    <div className="landing-stats">
                        <div className="landing-stat">
                            <span className="landing-stat-number">100%</span>
                            <span className="landing-stat-label">Free to Start</span>
                        </div>
                        <div className="landing-stat-divider"></div>
                        <div className="landing-stat">
                            <span className="landing-stat-number">HTML</span>
                            <span className="landing-stat-label">Clean Output</span>
                        </div>
                        <div className="landing-stat-divider"></div>
                        <div className="landing-stat">
                            <span className="landing-stat-number">AI</span>
                            <span className="landing-stat-label">Powered by Gemini</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-features">
                <h2 className="landing-section-title">How It Works</h2>
                <p className="landing-section-subtitle">Three simple steps from idea to working app</p>
                <div className="landing-features-grid">
                    <FeatureCard
                        icon="01"
                        title="Describe Your Vision"
                        description="Type what you want to build in plain English. Our AI understands layouts, features, and design preferences."
                    />
                    <FeatureCard
                        icon="02"
                        title="Watch It Build"
                        description="See your app come to life with a live preview. The AI generates clean HTML, CSS, and JavaScript in real-time."
                    />
                    <FeatureCard
                        icon="03"
                        title="Refine and Export"
                        description="Chat with AI to iterate on your design. Download the complete code and deploy it anywhere."
                    />
                </div>
            </section>

            <footer className="landing-footer">
                <div className="landing-footer-content">
                    <span className="landing-footer-logo">
                        <span className="landing-logo-mark">&lt;/&gt;</span> NxtBuild
                    </span>
                    <p className="landing-footer-text">Built with AI. Powered by Gemini.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;