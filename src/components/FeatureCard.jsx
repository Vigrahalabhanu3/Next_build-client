function FeatureCard({ icon, title, description }) {
    return (
        <div className="feature-card">
            <div className="feature-card-step">{icon}</div>
            <h3 className="feature-card-title">{title}</h3>
            <p className="feature-card-desc">{description}</p>
        </div>
    );
}

export default FeatureCard;