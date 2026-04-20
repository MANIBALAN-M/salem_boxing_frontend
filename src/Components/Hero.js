import React from 'react';
import heroImg from '../Images/hero.png';

const Hero = () => {
  return (
    <header className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="Boxing Training" />
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content fade-in">
          <span className="section-tag">Elite Fitness & Instruction</span>
          <h1 className="text-gradient">UNLEASH YOUR <br />INNER WARRIOR</h1>
          <p>
            Premium Boxing and Martial Arts training in Salem. 
            Transform your body, discipline your mind, and master the art of boxing.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">Get Started</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
