import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="landing-header">
            <div className="header-content">
                <div className="logo-container">
                    <div className="logo-icon">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="2" width="36" height="36" rx="8" stroke="#ff9800" strokeWidth="3" fill="none" />
                            <path d="M10 15 L18 15 M10 20 L25 20 M10 25 L22 25" stroke="#ff9800" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="30" cy="15" r="3" fill="#fb8c00" />
                            <circle cx="28" cy="25" r="2.5" fill="#ffb74d" />
                        </svg>
                    </div>
                    <h1 className="logo-text">
                        Collab<span className="logo-highlight">Space</span>
                    </h1>
                </div>
                <p className="tagline">Real-time collaborative whiteboard for teams</p>
            </div>
            <div className="header-glow"></div>
        </header>
    );
};

export default Header;
