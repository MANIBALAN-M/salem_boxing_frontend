import React, { useState, useEffect } from 'react';
import DataService from '../services/dataService';
import { CreditCard, Check, Sparkles, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const data = await DataService.getAll('plans');
      setPlans(data || []);
    } catch (err) {
      console.error('Failed to load plans:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="section-padding" style={{ background: '#090A0E' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">
            <CreditCard size={16} /> Transparent Memberships
          </span>
          <h2 className="section-title">
            MEMBERSHIP <span className="text-gradient">PACKAGES</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            No hidden charges. Choose a pass that fuels your fitness goals and gives you complete access to ring and coach time.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Loading plans...
          </div>
        ) : (
          <div className="pricing-grid">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`pricing-card ${plan.is_popular ? 'featured' : ''}`}
              >
                {plan.badge && (
                  <span className="pricing-badge">
                    <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {plan.badge}
                  </span>
                )}

                <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
                  {plan.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', minHeight: '40px' }}>
                  {plan.description}
                </p>

                <div className="plan-price-block">
                  <div className="plan-price">
                    ₹{plan.price.toLocaleString()}
                    <span> / {plan.duration}</span>
                  </div>
                </div>

                {plan.features && plan.features.length > 0 && (
                  <ul style={{ listStyle: 'none', marginBottom: '32px', flex: 1 }}>
                    {plan.features.map((feature, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#E5E7EB', marginBottom: '12px' }}>
                        <div style={{ background: 'rgba(255, 0, 60, 0.2)', color: 'var(--primary)', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check size={12} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={`https://wa.me/919500273164?text=Hi%20Salem%20Boxing%20Club,%20I%20am%20interested%20in%20enrolling%20for%20the%20${encodeURIComponent(plan.name)}%20(Rs.${plan.price})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={plan.is_popular ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', padding: '14px', fontSize: '0.85rem' }}
                >
                  Join This Plan <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
