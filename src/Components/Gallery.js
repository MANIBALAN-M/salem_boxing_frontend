import React from 'react';
import img1 from '../Images/Salem-Boxing-Club_1.jpg';
import img2 from '../Images/Salem-Boxing-Club_2.jpg';
import img3 from '../Images/Salem-Boxing-Club_3.jpg';
import trainingImg from '../Images/training.png';
import heroImg from '../Images/hero.png';

const Gallery = () => {
  const images = [
    { src: heroImg, alt: 'Gym Interior' },
    { src: trainingImg, alt: 'Boxing Training' },
    { src: img1, alt: 'Salem Boxing Club Session' },
    { src: img2, alt: 'Club Atmosphere' },
    { src: img3, alt: 'Gym Equipment' },
    { src: img1, alt: 'Training Action' }, // Reusing or could add more if available
  ];

  return (
    <section id="gallery" className="section-padding">
      <div className="container">
        <span className="section-tag" style={{ textAlign: 'center', display: 'block' }}>Gallery</span>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>INSIDE THE CLUB</h2>
        
        <div className="gallery-grid fade-in">
          {images.map((image, index) => (
            <div className="gallery-item" key={index}>
              <img src={image.src} alt={image.alt} />
              <div className="gallery-overlay">
                <span>VIEW</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
