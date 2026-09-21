import React, { useState, useEffect } from 'react';
import DataService from '../services/dataService';
import { Award, Star, Flame, X, Eye } from 'lucide-react';
import defaultBoxerImg from '../Images/training.png';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedal, setSelectedMedal] = useState('All');
  const [previewPhoto, setPreviewPhoto] = useState(null);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      const data = await DataService.getAll('achievements');
      setAchievements(data || []);
    } catch (err) {
      console.error('Failed to load achievements:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMedalBadge = (type) => {
    switch (type) {
      case 'Gold':
        return (
          <span className="medal-pill gold-pill">
            🥇 Gold Medal
          </span>
        );
      case 'Silver':
        return (
          <span className="medal-pill silver-pill">
            🥈 Silver Medal
          </span>
        );
      case 'Bronze':
        return (
          <span className="medal-pill bronze-pill">
            🥉 Bronze Medal
          </span>
        );
      case 'Trophy':
      default:
        return (
          <span className="medal-pill trophy-pill">
            🏆 Championship Trophy
          </span>
        );
    }
  };

  const filteredAchievements = selectedMedal === 'All'
    ? achievements
    : achievements.filter(a => a.medal_type === selectedMedal);

  return (
    <section id="achievements" className="section-padding achievements-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-tag">
            <Award size={14} /> Champions Hall of Fame
          </span>
          <h2 className="section-title">
            PROVEN <span className="text-gold-gradient">LEGACY & VICTORIES</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Meet our champion athletes and medal winners who have brought glory to Salem Boxing Club in state and national competitions.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
            {['All', 'Gold', 'Silver', 'Bronze', 'Trophy'].map((medal) => (
              <button
                key={medal}
                className={`filter-btn ${selectedMedal === medal ? 'active' : ''}`}
                onClick={() => setSelectedMedal(medal)}
              >
                {medal === 'All' ? 'All Accolades' : `${medal} Medals`}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Banner */}
        <div 
          style={{
            background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.12), rgba(255, 0, 60, 0.12))',
            border: '1px solid rgba(255, 184, 0, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '36px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'var(--gold)', color: '#000', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '2px' }}>
                Salem's Most Decorated Boxing Academy
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                Over 24+ medals secured across State, University & National Boxing Tournaments.
              </p>
            </div>
          </div>
          <a href="#join" className="btn-secondary" style={{ borderColor: 'var(--gold)', color: 'var(--gold)', fontSize: '0.8rem', padding: '10px 18px' }}>
            <Star size={14} /> Train Under Champions
          </a>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-secondary)' }}>
            <div className="pulse-glow" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🏆</div>
            Loading Hall of Fame champions...
          </div>
        ) : filteredAchievements.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
            No achievements found for this category.
          </div>
        ) : (
          <div className="achievements-grid">
            {filteredAchievements.map((item) => {
              const photo = item.athlete_photo || item.image_url || defaultBoxerImg;
              return (
                <div key={item.id} className="boxer-achievement-card">
                  {/* Boxer Photo Banner with Zoom Click */}
                  <div 
                    className="boxer-photo-wrapper"
                    onClick={() => setPreviewPhoto({ name: item.athlete_name, title: item.title, photo })}
                    title="Click to view full photo"
                  >
                    <img src={photo} alt={item.athlete_name} className="boxer-photo-img" />
                    <div className="boxer-photo-overlay">
                      <span><Eye size={13} style={{ display: 'inline', marginRight: '4px' }} /> View Boxer</span>
                    </div>
                    <span className="boxer-year-badge">{item.year}</span>
                  </div>

                  {/* Card Details */}
                  <div className="boxer-card-body">
                    <div style={{ marginBottom: '10px' }}>
                      {getMedalBadge(item.medal_type)}
                    </div>

                    <h3 className="boxer-name">
                      🥊 {item.athlete_name}
                    </h3>

                    <div className="achievement-title-text">
                      {item.title}
                    </div>

                    <div className="boxer-event-meta">
                      <span>📍 {item.event_name}</span>
                      <span>⚖️ {item.category}</span>
                    </div>

                    <p className="achievement-desc">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Boxer Photo Preview Modal */}
        {previewPhoto && (
          <div className="lightbox-overlay" onClick={() => setPreviewPhoto(null)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', textAlign: 'center' }}>
              <button className="lightbox-close-btn" onClick={() => setPreviewPhoto(null)} aria-label="Close photo preview">
                <X size={20} />
              </button>
              <img 
                src={previewPhoto.photo} 
                alt={previewPhoto.name} 
                style={{ maxWidth: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: '10px', border: '1px solid var(--border-light)', margin: '0 auto' }} 
              />
              <div style={{ marginTop: '14px' }}>
                <h3 style={{ color: '#FFF', fontFamily: 'Orbitron', fontSize: '1.2rem' }}>{previewPhoto.name}</h3>
                <p style={{ color: 'var(--gold)', fontSize: '0.88rem', marginTop: '4px' }}>{previewPhoto.title}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
