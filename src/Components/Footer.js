import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageSquare, MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#050608', borderTop: '1px solid var(--border-light)', padding: '50px 0 24px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '36px' }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img 
                src={`${process.env.PUBLIC_URL}/SBC logo.png`} 
                alt="Salem Boxing Club" 
                style={{ width: '42px', height: '42px', objectFit: 'contain' }} 
              />
              <div>
                <div style={{ fontFamily: 'Orbitron', fontWeight: '900', color: '#FFF', fontSize: '1.1rem' }}>
                  SALEM <span style={{ color: 'var(--primary)' }}>BOXING</span>
                </div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Club & Combat Academy
                </div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Salem's premier combat boxing training facility and state championship academy founded by Mr. Samidurai at Nirmal Skywin Mall.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a 
                href="https://wa.me/919500273164" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', padding: '7px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(37, 211, 102, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', textDecoration: 'none' }}
              >
                <MessageSquare size={13} /> WhatsApp
              </a>
              <a 
                href="tel:+919500273164" 
                style={{ background: 'rgba(255, 0, 60, 0.15)', color: 'var(--primary)', padding: '7px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 0, 60, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', textDecoration: 'none' }}
              >
                <Phone size={13} /> Call Us
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '0.95rem', marginBottom: '14px', fontFamily: 'Orbitron' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', lineHeight: '2' }}>
              <li><a href="/#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>About Club</a></li>
              <li><a href="/#why-us" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Why Choose Us</a></li>
              <li><a href="/#matches" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Upcoming Matches & Flyers</a></li>
              <li><a href="/#achievements" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Champions Hall of Fame</a></li>
              <li><a href="/#programs" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Training Disciplines</a></li>
              <li><a href="/#schedule" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Weekly Batches Timetable</a></li>
              <li><a href="/#pricing" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Membership Passes</a></li>
            </ul>
          </div>

          {/* Reach Us */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '0.95rem', marginBottom: '14px', fontFamily: 'Orbitron' }}>Contact & Address</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <MapPin size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>3rd Floor, Nirmal Skywin Mall, 9, Rajaji Rd, Peramanur, Salem - 636007, Tamil Nadu</span>
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={14} color="var(--primary)" />
              <a href="tel:+919500273164" style={{ color: '#FFF', textDecoration: 'none' }}>+91 95002-73164</a>
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={14} color="var(--primary)" />
              <span>Mon - Sat: 5:30 AM – 9:30 PM</span>
            </p>
          </div>

          {/* Admin Suite Link */}
          {/* <div>
            <h4 style={{ color: '#FFF', fontSize: '0.95rem', marginBottom: '14px', fontFamily: 'Orbitron' }}>Management Suite</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '14px', lineHeight: '1.5' }}>
              Coach & Admin portal to manage tournament schedules, medals, boxer photos, programs, and lead inquiries.
            </p>
            <Link 
              to="/admin" 
              className="btn-secondary"
              style={{ padding: '9px 16px', fontSize: '0.78rem', color: 'var(--gold)', borderColor: 'rgba(255, 184, 0, 0.4)' }}
            >
              <Shield size={13} /> Open Admin Panel <ArrowUpRight size={13} />
            </Link>
          </div> */}
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Salem Boxing Club. All Rights Reserved. Built for champions.
          </p>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Nirmal Skywin Mall • Salem</span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action Button */}
      <a 
        href="https://wa.me/919500273164?text=Hi%20Salem%20Boxing%20Club,%20I%20am%20interested%20in%20boxing%20training" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={26} />
      </a>
    </footer>
  );
};

export default Footer;
