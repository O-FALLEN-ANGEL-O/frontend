import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/logo192.png" alt="Vitvara" />
              <h3>Vitvara Technologies</h3>
            </div>
            <p>One stop for Software Development & Educational Support</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="#" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Software Development</li>
              <li>Educational Support</li>
              <li>ATL Lab Setup</li>
              <li>Training & Workshops</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p><FontAwesomeIcon icon={faEnvelope} /> support@vitvara.in</p>
              <p><FontAwesomeIcon icon={faPhone} /> +91 8548866226</p>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Mangalore, Karnataka</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Vitvara Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;