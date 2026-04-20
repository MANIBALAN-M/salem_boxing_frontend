import React, { useState } from 'react';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: 'Beginner',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! Our team will contact you shortly.');
    console.log('Form Submitted:', formData);
    // Reset form
    setFormData({ name: '', phone: '', email: '', experience: 'Beginner', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="join" className="join-section section-padding" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">Join the Elite</span>
          <h2 className="section-title">SEND YOUR QUERY</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Ready to start your journey? Fill out the form below and we'll get back to you with membership details and training schedules.
          </p>
        </div>

        <div className="contact-info" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} className="join-form">
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--primary)', fontWeight: '700' }}>Full Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name" 
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--primary)', fontWeight: '700' }}>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91" 
                  style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--primary)', fontWeight: '700' }}>Email Id</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourname@gmail.com" 
                  style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--primary)', fontWeight: '700' }}>Experience Level</label>
              <select 
                name="experience" 
                value={formData.experience}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}
              >
                <option value="Beginner" style={{ background: '#0A0A0A' }}>Beginner / No Experience</option>
                <option value="Intermediate" style={{ background: '#0A0A0A' }}>Intermediate (Some Boxing/MMA)</option>
                <option value="Advanced" style={{ background: '#0A0A0A' }}>Advanced / Professional</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--primary)', fontWeight: '700' }}>Your Message / Goal</label>
              <textarea 
                name="message" 
                rows="4" 
                value={formData.message}
                onChange={handleChange}
                placeholder="What are your fitness goals?" 
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px', resize: 'none' }}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px' }}>SUBMIT QUERY</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
