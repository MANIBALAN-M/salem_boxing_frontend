import React from 'react';
import heroImg from '../Images/hero.png';
import { Flame, Trophy, ArrowRight, MessageSquare } from 'lucide-react';

const Hero = () => {
  return (
    <header className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="Salem Boxing Club Arena" />
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-tagline">
            <Flame size={16} /> Premier Combat Sports & Boxing Academy
          </div>

          <h1>
            FORGE YOUR <br />
            <span className="text-gradient">CHAMPION MINDSET</span>
          </h1>

          <p>
            Salem's top-ranked boxing and combat sports academy at Nirmal Skywin Mall. 
            Master the sweet science of boxing, build explosive athleticism, and achieve peak physical conditioning.
          </p>

          <div className="hero-cta-group">
            <a href="#join" className="btn-primary">
              Book Free Trial <ArrowRight size={16} />
            </a>
            <a href="#matches" className="btn-secondary">
              <Trophy size={16} /> Upcoming Matches
            </a>
            <a 
              href="https://wa.me/919500273164?text=Hi%20Salem%20Boxing%20Club,%20I%20want%20to%20know%20about%20admissions" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
              style={{ borderColor: 'rgba(37, 211, 102, 0.4)', color: '#25D366' }}
            >
              <MessageSquare size={16} /> WhatsApp Us
            </a>
          </div>

          {/* Real-time Gym Stats */}
          <div className="hero-stats-strip">
            <div className="hero-stat-item">
              <div className="stat-number">15<span>+</span></div>
              <div className="stat-label">Years Legacy</div>
            </div>
            <div className="hero-stat-item">
              <div className="stat-number">500<span>+</span></div>
              <div className="stat-label">Warriors Trained</div>
            </div>
            <div className="hero-stat-item">
              <div className="stat-number">24<span>+</span></div>
              <div className="stat-label">State Medals</div>
            </div>
            <div className="hero-stat-item">
              <div className="stat-number">6<span>+</span></div>
              <div className="stat-label">Pro Coaches</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
