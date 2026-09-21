import React, { useState } from 'react';
import { Activity, Flame, ArrowRight } from 'lucide-react';

const BmiCalculator = () => {
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [gender, setGender] = useState('Male');

  const calculateBmi = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return { bmi: '0', category: 'Unknown', weightClass: 'N/A', caloriesBurn: '0' };

    const bmiVal = (w / (h * h)).toFixed(1);

    let weightClass = 'Lightweight';
    if (w < 52) weightClass = 'Flyweight (< 52 kg)';
    else if (w < 57) weightClass = 'Featherweight (52-57 kg)';
    else if (w < 63) weightClass = 'Lightweight (57-63 kg)';
    else if (w < 69) weightClass = 'Welterweight (63-69 kg)';
    else if (w < 75) weightClass = 'Middleweight (69-75 kg)';
    else if (w < 81) weightClass = 'Light Heavyweight (75-81 kg)';
    else if (w < 91) weightClass = 'Heavyweight (81-91 kg)';
    else weightClass = 'Super Heavyweight (91+ kg)';

    let category = 'Normal Weight';
    if (bmiVal < 18.5) category = 'Underweight';
    else if (bmiVal < 25) category = 'Healthy / Fit Athlete';
    else if (bmiVal < 30) category = 'Overweight';
    else category = 'High Body Mass';

    const caloriesBurn = Math.round(w * 10.5);

    return { bmi: bmiVal, category, weightClass, caloriesBurn };
  };

  const { bmi, category, weightClass, caloriesBurn } = calculateBmi();

  return (
    <section id="calculator" className="section-padding" style={{ background: '#07080B' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span className="section-tag">
            <Activity size={16} /> Boxing Fitness Tool
          </span>
          <h2 className="section-title">
            CALCULATE YOUR <span className="text-gradient">BOXING WEIGHT CLASS</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Find your ideal fighting category and estimated workout calorie expenditure at Salem Boxing Club.
          </p>
        </div>

        <div className="bmi-calculator-wrapper">
          <div className="bmi-grid">
            {/* Input Form */}
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '24px' }}>
                Enter Your Stats
              </h3>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                {['Male', 'Female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`btn-secondary ${gender === g ? 'btn-primary' : ''}`}
                    style={{ flex: 1, padding: '10px' }}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label className="form-label">Height (in Centimeters): {height} cm</label>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
                <input
                  type="number"
                  className="form-control"
                  style={{ marginTop: '10px' }}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Height in cm"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Weight (in Kilograms): {weight} kg</label>
                <input
                  type="range"
                  min="30"
                  max="150"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
                <input
                  type="number"
                  className="form-control"
                  style={{ marginTop: '10px' }}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Weight in kg"
                />
              </div>
            </div>

            {/* Results Display */}
            <div className="bmi-result-card">
              <span className="boxing-category-tag">
                🎯 {category}
              </span>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your Body Mass Index (BMI)</div>
              <div className="bmi-value">{bmi}</div>

              <div 
                style={{ 
                  background: 'rgba(255, 0, 60, 0.12)', 
                  border: '1px solid rgba(255, 0, 60, 0.3)',
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '20px'
                }}
              >
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Combat Boxing Division
                </div>
                <div style={{ fontSize: '1.25rem', fontFamily: 'Orbitron', fontWeight: '800', color: '#FFFFFF', marginTop: '4px' }}>
                  {weightClass}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--gold)', fontWeight: '700', marginBottom: '24px' }}>
                <Flame size={20} />
                <span>Burns ~{caloriesBurn} kcal / boxing session</span>
              </div>

              <a href="#join" className="btn-primary" style={{ width: '100%' }}>
                Start Training In Your Class <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BmiCalculator;
