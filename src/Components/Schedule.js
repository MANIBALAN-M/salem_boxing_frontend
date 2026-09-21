import React, { useState, useEffect } from 'react';
import DataService from '../services/dataService';
import { CalendarDays, Clock, User, MapPin } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [activeDay, setActiveDay] = useState('Monday');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      const data = await DataService.getAll('schedules');
      setSchedules(data || []);
    } catch (err) {
      console.error('Failed to load schedules:', err);
    } finally {
      setLoading(false);
    }
  };

  const daySchedules = schedules.filter(s => s.day_of_week === activeDay);

  return (
    <section id="schedule" className="section-padding" style={{ background: '#0C0E14' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span className="section-tag">
            <CalendarDays size={16} /> Timetable & Batches
          </span>
          <h2 className="section-title">
            WEEKLY TRAINING <span className="text-gradient">SCHEDULE</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Flexible morning and evening batches designed to fit student schedules and working professionals.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="schedule-tabs" style={{ justifyContent: 'center' }}>
          {DAYS.map((day) => (
            <button
              key={day}
              className={`day-tab-btn ${activeDay === day ? 'active' : ''}`}
              onClick={() => setActiveDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Loading timetable...
          </div>
        ) : daySchedules.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No scheduled classes for {activeDay}. Special open training and sparring available upon request.
          </div>
        ) : (
          <div className="slots-grid">
            {daySchedules.map((slot) => (
              <div key={slot.id} className="slot-card">
                <div>
                  <div className="slot-time">
                    <Clock size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    {slot.time_slot}
                  </div>
                  <div className="slot-program">{slot.program_title}</div>
                  <div className="slot-coach">
                    <User size={14} style={{ display: 'inline', marginRight: '4px', color: 'var(--primary)' }} />
                    Coach: <strong>{slot.trainer_name}</strong>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Location: {slot.room || 'Main Ring'}
                  </div>
                </div>

                <a 
                  href="#join" 
                  className="btn-outline-danger"
                  style={{ fontSize: '0.75rem', padding: '8px 16px', whiteSpace: 'nowrap' }}
                >
                  Join Batch
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Schedule Highlights */}
        <div 
          style={{ 
            marginTop: '36px', 
            textAlign: 'center', 
            padding: '16px 24px', 
            background: 'rgba(255, 0, 60, 0.08)',
            border: '1px dashed rgba(255, 0, 60, 0.3)',
            borderRadius: 'var(--radius-sm)',
            color: '#E5E7EB',
            fontSize: '0.9rem'
          }}
        >
          🥊 <strong>Custom 1-on-1 Sessions:</strong> Personal boxing coaching slots available outside standard batch timings by booking with Coach Samidurai.
        </div>
      </div>
    </section>
  );
};

export default Schedule;
