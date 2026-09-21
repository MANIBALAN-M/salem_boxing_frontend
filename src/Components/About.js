import React from 'react';
import trainingImg from '../Images/training.png';
import { ShieldCheck, Target, Award, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding" style={{ background: '#0C0E14' }}>
      <div className="container">
        <div className="about-grid">
          {/* Image & Coach Highlight Card */}
          <div className="about-img">
            <img src={trainingImg} alt="Salem Boxing Club Training Arena" />
            <div className="about-coach-badge">
              <div style={{ color: 'var(--gold)', fontWeight: '800', fontFamily: 'Orbitron', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Award size={16} /> HEAD COACH: MR. SAMIDURAI
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.4' }}>
                Dedicated to forging champions with state-level technical expertise and ring discipline.
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="about-text">
            <span className="section-tag">
              <ShieldCheck size={14} /> About The Club
            </span>
            <h2 className="section-title">
              WHERE PASSION MEETS <br />
              <span className="text-gradient">PURE DISCIPLINE</span>
            </h2>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '18px', fontSize: '1rem', lineHeight: '1.7' }}>
              Salem Boxing Club stands out as the premier combat training academy in Salem. 
              Nestled on the 3rd floor of <strong>Nirmal Skywin Mall</strong>, the club delivers a high-octane, 
              supportive environment designed for athletes of all skill levels—from absolute beginners to tournament-ready fighters.
            </p>

            <div className="about-features-grid">
              <div className="about-feature-box">
                <Target size={22} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '0.95rem', color: '#FFF', marginBottom: '4px' }}>Real Fight Technique</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Authentic footwork, defensive slips, explosive combinations, and heavy bag mastery.
                </p>
              </div>

              <div className="about-feature-box">
                <ShieldCheck size={22} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '0.95rem', color: '#FFF', marginBottom: '4px' }}>Zero Judgment Space</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Safe, ego-free training environment for youth, women, and working professionals.
                </p>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '26px', lineHeight: '1.6' }}>
              Led by veteran trainer <strong>Mr. Samidurai</strong> and certified trainers, our structured curriculum 
              develops mental resilience, explosive power, and injury-free athletic transformation.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#schedule" className="btn-secondary">
                View Training Batches &rarr;
              </a>
              <a href="#join" className="btn-primary">
                Book Free Trial <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
