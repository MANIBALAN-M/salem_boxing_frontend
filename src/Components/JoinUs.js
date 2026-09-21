import React, { useState } from 'react';
import DataService from '../services/dataService';
import { Send, CheckCircle2, Flame, MessageSquare } from 'lucide-react';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: 'Beginner',
    interest_program: 'Pro Combat Boxing',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      await DataService.create('queries', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        experience: formData.experience,
        interest_program: formData.interest_program,
        message: formData.message,
        status: 'New',
        notes: ''
      });

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        experience: 'Beginner',
        interest_program: 'Pro Combat Boxing',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting query:', err);
      setErrorMessage('Could not save your query online, but our team is ready on WhatsApp!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="join" className="join-section section-padding" style={{ background: '#090A0E' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-tag">
            <Flame size={14} /> Start Your Transformation
          </span>
          <h2 className="section-title">
            CLAIM YOUR <span className="text-gradient">FREE TRIAL SESSION</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Ready to lace up the gloves? Fill out the inquiry below and Coach Samidurai's team will contact you with batch slots and membership passes.
          </p>
        </div>

        <div className="contact-info" style={{ maxWidth: '680px', margin: '0 auto', background: 'rgba(18, 20, 27, 0.85)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '32px 24px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 10px' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle2 size={38} />
              </div>
              <h3 style={{ fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '8px' }}>
                Trial Request Received!
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '22px', lineHeight: '1.6', fontSize: '0.92rem' }}>
                Your trial booking has been logged. Our coaches will contact you via WhatsApp or phone with batch timings and wrap guidelines.
              </p>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/919500273164?text=Hi%20Salem%20Boxing%20Club,%20I%20just%20submitted%20my%20trial%20query%20online!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ background: '#25D366', borderColor: '#25D366', fontSize: '0.84rem' }}
                >
                  <MessageSquare size={15} /> Chat On WhatsApp Now
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                  style={{ fontSize: '0.84rem' }}
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="join-form">
              {errorMessage && (
                <div style={{ background: 'rgba(255, 0, 60, 0.2)', border: '1px solid var(--primary)', padding: '12px', borderRadius: 'var(--radius-sm)', color: '#FFF', marginBottom: '18px', fontSize: '0.88rem' }}>
                  {errorMessage}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name" 
                  className="form-control"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 95002-XXXXX" 
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@domain.com" 
                    className="form-control"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Experience Level</label>
                  <select 
                    name="experience" 
                    value={formData.experience}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Beginner">Beginner (No Prior Boxing)</option>
                    <option value="Intermediate">Intermediate (Some Martial Arts/Gym)</option>
                    <option value="Advanced">Advanced (Tournament Fighter)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Program of Interest</label>
                  <select 
                    name="interest_program" 
                    value={formData.interest_program}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Pro Combat Boxing">Pro Combat Boxing</option>
                    <option value="MMA & Striking Conditioning">MMA & Conditioning</option>
                    <option value="Kids & Youth Boxing">Kids & Youth Boxing</option>
                    <option value="Women Self Defense & Kick-Fit">Women Self Defense & Kick-Fit</option>
                    <option value="1-on-1 Personal Training">1-on-1 Personal Training</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Fitness Goal / Message</label>
                <textarea 
                  name="message" 
                  rows="3" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="e.g. Weight loss, learning sparring technique, evening batch timing preference..." 
                  className="form-control"
                  style={{ resize: 'none' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={submitting}
                style={{ width: '100%', padding: '15px', fontSize: '0.9rem' }}
              >
                {submitting ? 'Submitting Application...' : <><Send size={16} /> CONFIRM TRIAL APPLICATION</>}
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                🔒 Your details are stored securely in Supabase and only accessible by Salem Boxing Club staff.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
