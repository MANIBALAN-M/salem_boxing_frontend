import React from 'react';
import trainingImg from '../Images/training.png';
import { ShieldCheck, Target } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding" style={{ background: '#0C0E14' }}>
      <div className="container">
        <div className="about-grid">
          <div className="about-img">
            <img src={trainingImg} alt="Salem Boxing Club Training Arena" />
            <div 
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                background: 'rgba(9, 10, 14, 0.9)',
                padding: '16px 20px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <div style={{ color: 'var(--gold)', fontWeight: '800', fontFamily: 'Orbitron', fontSize: '0.9rem' }}>
                ⭐ HEAD COACH: MR. SAMIDURAI
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                Dedicated to developing champions with state-level technical expertise.
              </div>
            </div>
          </div>

          <div className="about-text">
            <span className="section-tag">About The Club</span>
            <h2 className="section-title">
              WHERE PASSION MEETS <br />
              <span className="text-gradient">PURE DISCIPLINE</span>
            </h2>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '18px', fontSize: '1.02rem', lineHeight: '1.7' }}>
              Salem Boxing Club stands out as a premier destination for boxing enthusiasts and fitness seekers alike. 
              Nestled in the vibrant environment of <strong>Nirmal Skywin Mall, Salem</strong>, this club offers a welcoming, 
              high-energy atmosphere that encourages individuals of all skill levels—from complete novices to tournament-ready fighters.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                <Target size={22} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '0.95rem', color: '#FFF', marginBottom: '4px' }}>Real Fight Technique</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Authentic footwork, slips, combinations, and bag mastery.</p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                <ShieldCheck size={22} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '0.95rem', color: '#FFF', marginBottom: '4px' }}>Zero Judgment Space</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Safe training environment for men, women, and youngsters.</p>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '28px' }}>
              Led by the highly regarded <strong>Mr. Samidurai</strong> and certified coaches, our staff is dedicated to 
              building mental resilience, explosive power, and injury-free athletic transformation.
            </p>

            <a href="#schedule" className="btn-secondary">
              View Training Batches &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
