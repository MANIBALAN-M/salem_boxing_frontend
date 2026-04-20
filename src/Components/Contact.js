import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <span className="section-tag" style={{ textAlign: 'center', display: 'block' }}>Visit Us</span>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>GET IN THE RING</h2>
        
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-text">
                <h4>Address</h4>
                <p>3rd floor, Nirmal skywin mall, 9, Rajaji Rd, Peramanur, Salem, Tamil Nadu 636007, India</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">⏰</div>
              <div className="info-text">
                <h4>Working Hours</h4>
                <p>Monday - Saturday: 05:30 A.M - 09:30 P.M</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-text">
                <h4>Call Us</h4>
                <p>+91 95002-73164</p>
              </div>
            </div>
          </div>

          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15630.0776495!2d78.1477755!3d11.667911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1e0c5d2abc1%3A0x69c64554489b0dc5!2sSalem%20BoXing%20Club!5e0!3m2!1sen!2sin!4v1713597144000!5m2!1sen!2sin" 
              allowFullScreen="" 
              title="Salem Boxing Club Location"
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
              <a 
                href="https://maps.app.goo.gl/5YJMqCcMfg2bkpTu8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: '0.7rem', padding: '10px 20px' }}
              >
                OPEN IN GOOGLE MAPS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
