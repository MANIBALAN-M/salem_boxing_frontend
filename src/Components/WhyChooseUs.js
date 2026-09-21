import React from 'react';
import { Dumbbell, Users, Trophy, Clock, ShieldCheck, Flame, ArrowRight } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Dumbbell size={26} />,
      title: 'State-of-the-Art Arena',
      description: 'Train with authentic boxing rings, premium heavy bags, speedballs, and specialized combat conditioning gear at Nirmal Skywin Mall.'
    },
    {
      icon: <Users size={26} />,
      title: 'Championship Coaching',
      description: 'Learn directly from Mr. Samidurai and certified fight mentors with decades of amateur and state championship experience.'
    },
    {
      icon: <Trophy size={26} />,
      title: 'Proven Track Record',
      description: 'Our club has produced multiple state champions, inter-district gold medalists, and tournament winners across all divisions.'
    },
    {
      icon: <Clock size={26} />,
      title: 'Flexible Schedule',
      description: 'Morning batches from 5:30 AM and evening batches up to 9:30 PM fit easily into working and student lifestyles.'
    },
    {
      icon: <ShieldCheck size={26} />,
      title: 'Safe & Supportive Space',
      description: 'Safety first. Structured fundamentals, proper wraps, headgear sparring protocols, and a zero-ego encouraging brotherhood.'
    },
    {
      icon: <Flame size={26} />,
      title: 'Explosive Fat Burn',
      description: 'Burn up to 700+ calories per session while mastering footwork, power combinations, and real street self-defense.'
    }
  ];

  return (
    <section className="section-padding" style={{ background: '#0C0E14' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-tag">
            <ShieldCheck size={16} /> The Salem Boxing Advantage
          </span>
          <h2 className="section-title">
            WHY TRAIN AT <span className="text-gradient">SALEM BOXING CLUB</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We provide more than just boxing workouts. We build mental toughness, athletic agility, and champion character.
          </p>
        </div>

        <div className="why-choose-grid">
          {features.map((item, idx) => (
            <div key={idx} className="why-card">
              <div className="why-icon-bubble">
                {item.icon}
              </div>
              <h3 className="why-title">{item.title}</h3>
              <p className="why-desc">{item.description}</p>
            </div>
          ))}

          {/* Action Card */}
          <div className="why-card cta-card">
            <span className="section-tag" style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(0,0,0,0.2)', color: '#000', marginBottom: '8px' }}>
              ⚡ Start Today
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#000', marginBottom: '8px', fontFamily: 'Orbitron' }}>
              READY TO STEP IN THE RING?
            </h3>
            <p style={{ color: 'rgba(0,0,0,0.85)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.5' }}>
              Join Salem Boxing Club today and claim your free 1-on-1 assessment and trial session with our coaches.
            </p>
            <a 
              href="#join" 
              className="btn-primary" 
              style={{ background: '#000', color: '#FFF', width: '100%', fontSize: '0.85rem' }}
            >
              Book Free Trial <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
