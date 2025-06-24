import React from 'react';
import './Footer.css';
import logo from '../../../assest/Image/logo.png';
import { FaPaperPlane, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                {/* Footer row */}
                <div className="footer-row">
                    {/* Footer logo column */}
                    <div className="footer-col footer-logo">
                        <img src={logo} alt="Logo" className="footer_logo" />
                        <p className="footer-email">support@vitvara.in</p>
                        <div className="footer-social-icons">
                            <a href="https://www.facebook.com"><FaFacebookF className="social-icon" /></a>
                            <a href="https://www.twitter.com"><FaTwitter className="social-icon" /></a>
                            <a href="https://www.linkedin.com"><FaLinkedinIn className="social-icon" /></a>
                            <a href="https://www.youtube.com"><FaYoutube className="social-icon" /></a>
                        </div>
                    </div>
                    {/* Other footer columns */}
                    <div className="footer-col">
                        <h4>DO f Services</h4>
                        <ul>
                            <li><a href="#">Project Development</a></li>
                            <li><a href="#">Data Analysis</a></li>
                            <li><a href="#">Educational Support</a></li>
                            <li><a href="#">Career Guidance</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Community</h4>
                        <ul>
                            <li><a href="#">Digital Marketing</a></li>
                            <li><a href="#">Business Ideas</a></li>
                            <li><a href="#">Website designs</a></li>
                            <li><a href="#">Student Counseling</a></li>
                        </ul>
                    </div>
                    <div className="footer-col newsletter-col">
                        <h4>Newsletter</h4>
                        <p>Subscribe to our newsletter for updates</p>
                        <form className="newsletter-form">
                            <div className="input-with-icon">
                                <input type="text" className="newsletter-input" placeholder="Enter your email" />
                                <button type="submit" className="newsletter-btn"><FaPaperPlane /></button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr />
                {/* Footer bottom row */}
                <div className="footer-row footer-bottom">
                    <p>&copy; 2017 VITVARA Technologies., All Rights Reserved.</p>
                    <p>Designed by - <span className="footer-copyright">PDL</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;