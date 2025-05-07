import React from 'react';
import { Camera, BookOpen, Award } from 'lucide-react';
import './HeaderComponent.css';

export const HeaderComponent = () => {
  return (
    <header className="shutter-header">
      <div className="header-container">
        <div className="logo-container">
          <Camera className="logo-icon" />
          <h1 className="logo-text">Shutter Space</h1>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-links">
            <li className="nav-item">
              <a href="#" className="nav-link active">Home</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Explore</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <BookOpen size={16} className="nav-icon" />
                Learning Plans
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <Award size={16} className="nav-icon" />
                Challenges
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="user-menu">
          <div className="profile-pic-small">
            <img src="https://i.pravatar.cc/150?img=33" alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;