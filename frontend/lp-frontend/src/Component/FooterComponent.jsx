import React from 'react';
import { Camera, Instagram, Twitter, Facebook, Github } from 'lucide-react';
import './FooterComponent.css';

export const FooterComponent = () => {
  return (
    <footer className="shutter-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Camera className="footer-logo-icon" />
              <span className="footer-logo-text">Shutter Space</span>
            </div>
            <p className="footer-tagline">Share your photography journey</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h3 className="footer-heading">Explore</h3>
              <ul className="footer-menu">
                <li><a href="#">Trending</a></li>
                <li><a href="#">Discover</a></li>
                <li><a href="#">Learning Plans</a></li>
                <li><a href="#">Challenges</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-heading">Community</h3>
              <ul className="footer-menu">
                <li><a href="#">Photographers</a></li>
                <li><a href="#">Groups</a></li>
                <li><a href="#">Events</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-heading">Support</h3>
              <ul className="footer-menu">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">All rights reserved by Shutter Space (2024)</p>
          
          <div className="social-links">
            <a href="#" className="social-link">
              <Instagram size={16} />
            </a>
            <a href="#" className="social-link">
              <Twitter size={16} />
            </a>
            <a href="#" className="social-link">
              <Facebook size={16} />
            </a>
            <a href="#" className="social-link">
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;