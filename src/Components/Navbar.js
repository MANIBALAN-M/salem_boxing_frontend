import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DataService from '../services/dataService';
import { Menu, X, Bell } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const list = await DataService.getAll('announcements');
        const active = list.find(a => a.is_active);
        if (active) setAnnouncement(active);
      } catch (e) {}
    };
    fetchAnnouncement();
  }, []);

  return (
    <header className={`site-header-wrapper ${scrolled ? 'scrolled-header' : ''}`}>
      {/* Top Announcement Bar */}
      {announcement && (
        <div className="announcement-bar">
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span className="announcement-badge">
              <Bell size={11} style={{ display: 'inline', marginRight: '4px' }} />
              {announcement.badge || 'Alert'}
            </span>
            <span className="announcement-text">{announcement.title}: {announcement.message}</span>
            <a 
              href={announcement.link_url || '#join'} 
              className="announcement-link"
            >
              Learn More &rarr;
            </a>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo">
            <img 
              src={`${process.env.PUBLIC_URL}/SBC logo.png`} 
              alt="Salem Boxing Club" 
              className="logo-icon-main" 
            />
            <div className="logo-text-group">
              <span className="logo-main">SALEM <span>BOXING</span></span>
              <span className="logo-sub">Club & Combat Academy</span>
            </div>
          </Link>

          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-item">Home</Link>
            <a href="/#about" className="nav-item">About</a>
            <a href="/#why-us" className="nav-item">Why Us</a>
            <a href="/#matches" className="nav-item">Matches</a>
            <a href="/#achievements" className="nav-item">Achievements</a>
            <a href="/#programs" className="nav-item">Programs</a>
            <a href="/#schedule" className="nav-item">Schedule</a>
            <a href="/#gallery" className="nav-item">Gallery</a>
            <a href="/#pricing" className="nav-item">Pricing</a>
            <a href="/#contact" className="nav-item">Contact</a>

            {/* <Link to="/admin" className="admin-nav-link" title="Admin Control Suite">
              <Shield size={13} /> Admin
            </Link> */}

            <a href="/#join" className="btn-primary join-nav-btn">
              Free Trial
            </a>
          </div>

          <button 
            className="hamburger" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={26} color="#FFF" /> : <Menu size={26} color="#FFF" />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
