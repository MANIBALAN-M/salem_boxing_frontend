import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="cta-banner-section">
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <span className="section-tag" style={{ background: 'rgba(0, 0, 0, 0.4)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.25)', marginBottom: '16px' }}>
          🥊 Take Action Today
        </span>
        <h2 className="cta-banner-title">
          READY TO BECOME A WARRIOR?
        </h2>
        <p className="cta-banner-subtitle">
          Join Salem Boxing Club at Nirmal Skywin Mall and start your journey to becoming stronger, faster, and invincible in the ring and in life.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a 
            href="#join" 
            className="btn-primary" 
            style={{ background: '#FFFFFF', color: 'var(--primary)', boxShadow: '0 8px 25px rgba(0,0,0,0.3)', padding: '16px 36px', fontSize: '0.95rem' }}
          >
            Claim Free Trial <ArrowRight size={18} />
          </a>
          <a 
            href="https://wa.me/919500273164?text=Hi%20Salem%20Boxing%20Club,%20I%20want%20to%20visit%20the%20gym%20and%20start%20training"
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary" 
            style={{ background: 'rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.7)', color: '#FFFFFF', padding: '16px 32px', fontSize: '0.95rem' }}
          >
            <MessageSquare size={18} color="#25D366" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
