import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DataService from '../services/dataService';
import { Menu, X, Bell, Shield, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const list = await DataService.getAll('announcements');
        const active = list.find(a => a.is_active);
        if (active) setAnnouncement(active);
      } catch (e) {
        console.error('Failed to load announcement:', e);
      }
    };
    fetchAnnouncement();
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className={`site-header-wrapper ${scrolled ? 'scrolled-header' : ''}`}>
        {/* Top Announcement Bar */}
        {announcement && (
          <div className="announcement-bar">
            <div className="container announcement-inner">
              <span className="announcement-badge">
                <Bell size={11} />
                {announcement.badge || 'Alert'}
              </span>
              <span className="announcement-text">
                <strong>{announcement.title}:</strong> {announcement.message}
              </span>
              <a 
                href={announcement.link_url || '#join'} 
                className="announcement-link"
                onClick={closeMenu}
              >
                Learn More &rarr;
              </a>
            </div>
          </div>
        )}

        {/* Main Navbar */}
        <nav className="navbar" role="navigation" aria-label="Main Navigation">
          <div className="container nav-container">
            <Link to="/" className="logo" onClick={closeMenu}>
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

            {/* Desktop & Mobile Slide-in Drawer */}
            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
              <Link to="/" className="nav-item" onClick={closeMenu}>Home</Link>
              <a href="/#about" className="nav-item" onClick={closeMenu}>About</a>
              <a href="/#why-us" className="nav-item" onClick={closeMenu}>Why Us</a>
              <a href="/#matches" className="nav-item" onClick={closeMenu}>Matches</a>
              <a href="/#achievements" className="nav-item" onClick={closeMenu}>Achievements</a>
              <a href="/#programs" className="nav-item" onClick={closeMenu}>Programs</a>
              <a href="/#schedule" className="nav-item" onClick={closeMenu}>Schedule</a>
              <a href="/#gallery" className="nav-item" onClick={closeMenu}>Gallery</a>
              <a href="/#pricing" className="nav-item" onClick={closeMenu}>Pricing</a>
              <a href="/#contact" className="nav-item" onClick={closeMenu}>Contact</a>

              <Link 
                to="/admin" 
                className="nav-item" 
                onClick={closeMenu}
                style={{ color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                title="Admin Control Suite"
              >
                <Shield size={13} /> Admin
              </Link>

              <a href="/#join" className="btn-primary join-nav-btn" onClick={closeMenu}>
                Free Trial <ArrowRight size={14} />
              </a>
            </div>

            {/* Hamburger Toggle */}
            <button 
              className="hamburger" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} color="#FFF" /> : <Menu size={24} color="#FFF" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      <div 
        className={`nav-backdrop ${isOpen ? 'active' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;
