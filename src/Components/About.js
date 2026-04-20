import React from 'react';
import trainingImg from '../Images/training.png';

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="about-grid">
          <div className="about-img fade-in">
            <img src={trainingImg} alt="Salem Boxing Club Training" />
          </div>
          <div className="about-text fade-in">
            <span className="section-tag">About Us</span>
            <h2 className="section-title">CHAMPIONS ARE MADE HERE</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Salem Boxing Club stands out as a premier destination for boxing enthusiasts and fitness seekers alike. 
              Nestled in the vibrant environment of Nirmal Skywin Mall, this club offers a welcoming atmosphere that 
              encourages individuals of all skill levels, from complete novices to seasoned boxers, to embark on 
              their boxing journeys.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Led by the highly regarded <strong>Mr. Samidurai</strong>, our coaching staff is dedicated to 
              discipline, skill-building, and fitness maintenance. Whether you're looking for self-defense training 
              or a lifestyle change, we provide the ultimate environment for growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
