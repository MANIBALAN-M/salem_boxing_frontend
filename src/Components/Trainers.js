import React, { useState, useEffect } from 'react';
import DataService from '../services/dataService';
import { Users, Award } from 'lucide-react';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    try {
      setLoading(true);
      const data = await DataService.getAll('trainers');
      setTrainers(data || []);
    } catch (err) {
      console.error('Failed to load trainers:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="trainers" className="section-padding" style={{ background: '#090A0E' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">
            <Users size={16} /> Coaching Staff
          </span>
          <h2 className="section-title">
            MEET THE <span className="text-gradient">MASTER COACHES</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Learn from seasoned fight veterans committed to technique, iron discipline, and relentless championship standards.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Loading coaching staff...
          </div>
        ) : (
          <div className="programs-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
            {trainers.map((coach) => (
              <div key={coach.id} className="program-card" style={{ padding: '36px 30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div 
                    style={{ 
                      width: '64px', 
                      height: '64px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #FF003C, #1E222D)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      border: '2px solid rgba(255, 0, 60, 0.4)',
                      flexShrink: 0
                    }}
                  >
                    🥊
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '4px' }}>{coach.name}</h3>
                    <div style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem' }}>{coach.role}</div>
                  </div>
                </div>

                <div 
                  style={{ 
                    background: 'rgba(0,0,0,0.3)', 
                    padding: '12px 16px', 
                    borderRadius: 'var(--radius-sm)', 
                    fontSize: '0.85rem', 
                    marginBottom: '18px',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ color: 'var(--gold)', fontWeight: '700', marginBottom: '4px' }}>
                    <Award size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    {coach.fight_record || 'State & National Boxing Veteran'}
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    <strong>Experience:</strong> {coach.experience_years}
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  {coach.bio}
                </p>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: '16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <strong>Specialty:</strong> {coach.specialty}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Trainers;
