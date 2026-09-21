import React, { useState, useEffect } from 'react';
import DataService from '../services/dataService';
import { Calendar, Clock, MapPin, Trophy, FileText, Download, X, ExternalLink, Sparkles, Send } from 'lucide-react';

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedBrochure, setSelectedBrochure] = useState(null);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await DataService.getAll('matches');
      setMatches(data || []);
    } catch (err) {
      console.error('Failed to load matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches = filter === 'All' 
    ? matches 
    : matches.filter(m => m.status === filter);

  return (
    <section id="matches" className="section-padding matches-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-tag">
            <Trophy size={14} /> Tournament & Championship Schedules
          </span>
          <h2 className="section-title">
            UPCOMING <span className="text-gradient">MATCHES & TOURNAMENTS</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Official state boxing meets, district championship bouts, and tournament announcements. View official flyers and register online.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
            {['All', 'Upcoming', 'Registrations Open', 'Completed'].map((status) => (
              <button
                key={status}
                className={`filter-btn ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-secondary)' }}>
            <div className="pulse-glow" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🥊</div>
            Loading tournaments and fixtures...
          </div>
        ) : filteredMatches.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
            No tournaments found under this filter. Check back soon for new schedules!
          </div>
        ) : (
          <div className="matches-grid">
            {filteredMatches.map((match) => (
              <div key={match.id} className="tournament-card">
                <div>
                  {/* Top Status & Event Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '8px' }}>
                    <span className="tournament-event-badge">
                      <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {match.event_name || 'Boxing Tournament'}
                    </span>
                    <span className={`match-badge ${
                      match.status === 'Registrations Open' ? 'badge-live' : 
                      match.status === 'Completed' ? 'badge-completed' : 'badge-upcoming'
                    }`}>
                      {match.status}
                    </span>
                  </div>

                  {/* Tournament Title */}
                  <h3 className="tournament-title">
                    {match.title}
                  </h3>

                  {/* Date, Time, Venue, Category Metadata */}
                  <div className="tournament-meta-box">
                    <div className="tournament-meta-row">
                      <div className="tournament-meta-icon"><Calendar size={16} /></div>
                      <div>
                        <div className="meta-label">Date & Day</div>
                        <div className="meta-value">{match.match_date}</div>
                      </div>
                    </div>

                    <div className="tournament-meta-row">
                      <div className="tournament-meta-icon"><Clock size={16} /></div>
                      <div>
                        <div className="meta-label">Timing</div>
                        <div className="meta-value">{match.match_time}</div>
                      </div>
                    </div>

                    <div className="tournament-meta-row" style={{ gridColumn: 'span 2' }}>
                      <div className="tournament-meta-icon"><MapPin size={16} /></div>
                      <div>
                        <div className="meta-label">Venue Location</div>
                        <div className="meta-value">{match.venue}</div>
                      </div>
                    </div>

                    <div className="tournament-meta-row" style={{ gridColumn: 'span 2' }}>
                      <div className="tournament-meta-icon"><Trophy size={16} /></div>
                      <div>
                        <div className="meta-label">Weight Class & Divisions</div>
                        <div className="meta-value" style={{ color: 'var(--gold)' }}>
                          {match.category || match.weight_category || 'All Weight Divisions'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {match.description && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: '1.6', marginBottom: '20px' }}>
                      {match.description}
                    </p>
                  )}
                </div>

                {/* Bottom Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', flexWrap: 'wrap' }}>
                  {(match.brochure_url || match.image_url || match.event_image) && (
                    <button
                      type="button"
                      onClick={() => setSelectedBrochure({ title: match.title, url: match.brochure_url || match.image_url || match.event_image })}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '11px 12px', fontSize: '0.78rem', borderColor: 'rgba(255, 0, 60, 0.4)' }}
                    >
                      <FileText size={14} color="var(--primary)" /> View Flyer
                    </button>
                  )}

                  <a
                    href={match.registration_link || match.tickets_link || `https://wa.me/919500273164?text=Hi%20Salem%20Boxing%20Club,%20I%20want%20to%20register%20or%20inquire%20for%20${encodeURIComponent(match.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ flex: 1, padding: '11px 12px', fontSize: '0.78rem' }}
                  >
                    <Send size={13} /> Inquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Brochure Lightbox Modal */}
        {selectedBrochure && (
          <div className="lightbox-overlay" onClick={() => setSelectedBrochure(null)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
              <button className="lightbox-close-btn" onClick={() => setSelectedBrochure(null)} aria-label="Close modal">
                <X size={20} />
              </button>

              <div style={{ marginBottom: '14px', textAlign: 'center' }}>
                <h3 style={{ color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: '1.15rem', marginBottom: '4px' }}>
                  Official Tournament Brochure
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{selectedBrochure.title}</p>
              </div>

              <div style={{ textAlign: 'center', background: '#090A0E', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                <img 
                  src={selectedBrochure.url} 
                  alt="Tournament Brochure" 
                  style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: '6px', margin: '0 auto' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                <a 
                  href={selectedBrochure.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '10px 18px' }}
                >
                  <ExternalLink size={13} /> Open Full Size
                </a>
                <a 
                  href={selectedBrochure.url} 
                  download="tournament_brochure.jpg"
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '10px 18px' }}
                >
                  <Download size={13} /> Download Flyer
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingMatches;
