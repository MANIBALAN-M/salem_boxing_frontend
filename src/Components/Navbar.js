import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoIcon from '../Images/logo-element.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <img src={logoIcon} alt="Logo" className="logo-icon" />
          <span className="logo-text">SALEM BOXING CLUB</span>
        </Link>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item">Home</Link>
          <a href="/#about" className="nav-item">About</a>
          <a href="/#gallery" className="nav-item">Gallery</a>
          {/* <a href="/#join" className="nav-item">Join Us</a> */}
          <a href="/#contact" className="nav-item">Contact</a>

          <Link to="/join" className="btn-primary join-btn-nav">Join Now</Link>
        </div>

        <div className={`hamburger ${isOpen ? 'toggle' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
