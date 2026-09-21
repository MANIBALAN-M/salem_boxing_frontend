import React from 'react';
import { MapPin, Clock, Phone, MessageSquare, ExternalLink } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding contact-section" style={{ background: '#07080B' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">
            <MapPin size={16} /> Location & Hours
          </span>
          <h2 className="section-title">
            VISIT OUR <span className="text-gradient">TRAINING ARENA</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Conveniently situated on the 3rd floor of Nirmal Skywin Mall with parking and locker room facilities.
          </p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon"><MapPin size={28} /></div>
              <div className="info-text">
                <h4>Club Address</h4>
                <p>3rd Floor, Nirmal Skywin Mall, 9, Rajaji Rd, Peramanur, Salem, Tamil Nadu 636007, India</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon"><Clock size={28} /></div>
              <div className="info-text">
                <h4>Training Hours</h4>
                <p><strong>Monday - Saturday:</strong> 05:30 AM – 10:00 AM & 04:30 PM – 09:30 PM</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sunday: Special Championship Sparring / Pre-booked slots</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Phone size={28} /></div>
              <div className="info-text">
                <h4>Coach Direct Hotline</h4>
                <p><a href="tel:+919500273164" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: '700' }}>+91 95002-73164</a></p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '30px', flexWrap: 'wrap' }}>
              <a 
                href="https://wa.me/919500273164?text=Hi%20Salem%20Boxing%20Club,%20I%20would%20like%20to%20visit%20the%20gym" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
                style={{ background: '#25D366', borderColor: '#25D366', fontSize: '0.85rem' }}
              >
                <MessageSquare size={16} /> WhatsApp Inquiry
              </a>
              <a 
                href="tel:+919500273164" 
                className="btn-secondary"
                style={{ fontSize: '0.85rem' }}
              >
                <Phone size={16} /> Direct Call
              </a>
            </div>
          </div>

          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15630.0776495!2d78.1477755!3d11.667911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1e0c5d2abc1%3A0x69c64554489b0dc5!2sSalem%20BoXing%20Club!5e0!3m2!1sen!2sin!4v1713597144000!5m2!1sen!2sin" 
              allowFullScreen="" 
              title="Salem Boxing Club Location at Nirmal Skywin Mall"
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            <div style={{ padding: '16px', background: 'rgba(18, 20, 27, 0.95)', textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Nirmal Skywin Mall, Salem</span>
              <a 
                href="https://maps.app.goo.gl/5YJMqCcMfg2bkpTu8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-outline-danger"
                style={{ fontSize: '0.75rem', padding: '6px 14px' }}
              >
                Open Google Maps <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
