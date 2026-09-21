import React, { useState, useEffect } from 'react';
import DataService from '../services/dataService';
import { Target, CheckCircle2, Flame, ArrowRight } from 'lucide-react';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const data = await DataService.getAll('programs');
      setPrograms(data || []);
    } catch (err) {
      console.error('Failed to load programs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="programs" className="section-padding" style={{ background: '#090A0E' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">
            <Target size={16} /> Elite Disciplines
          </span>
          <h2 className="section-title">
            OUR TRAINING <span className="text-gradient">PROGRAMS</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Tailored programs engineered for fitness enthusiasts, weight loss champions, beginners, and competitive fighters alike.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Loading programs...
          </div>
        ) : (
          <div className="programs-grid">
            {programs.map((prog) => (
              <div key={prog.id} className="program-card">
                <div className="program-top-meta">
                  <span className="intensity-pill">
                    <Flame size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {prog.intensity || 'High Intensity'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    ⏱ {prog.duration || '60 Mins'}
                  </span>
                </div>

                <h3 className="program-title">{prog.title}</h3>
                <div className="program-tagline">{prog.tagline}</div>
                <p className="program-desc">{prog.description}</p>

                <div style={{ marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <strong>Target Level:</strong> {prog.level}
                </div>

                {prog.benefits && prog.benefits.length > 0 && (
                  <ul className="program-benefits-list">
                    {prog.benefits.map((benefit, i) => (
                      <li key={i} className="program-benefit-item">
                        <CheckCircle2 size={16} className="benefit-check" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <a 
                  href={`/#join`} 
                  className="btn-primary" 
                  style={{ width: '100%', fontSize: '0.82rem', padding: '12px' }}
                >
                  Enroll In Program <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Programs;
