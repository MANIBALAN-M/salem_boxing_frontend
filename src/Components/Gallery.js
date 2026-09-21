import React, { useState, useEffect } from 'react';
import DataService from '../services/dataService';
import { Camera, Eye, X, Image as ImageIcon } from 'lucide-react';
import heroImg from '../Images/hero.png';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const data = await DataService.getAll('gallery');
      setGalleryItems(data || []);
    } catch (err) {
      console.error('Failed to load gallery images:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Training', 'Sparring', 'Facilities', 'Championships', 'Community'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => (item.category || 'Training').toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="gallery" className="section-padding" style={{ background: '#07080B' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span className="section-tag">
            <Camera size={16} /> Inside The Ring
          </span>
          <h2 className="section-title">
            CLUB <span className="text-gradient">GALLERY</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Experience the blood, sweat, and championship glory at Salem Boxing Club.
          </p>
        </div>

        {/* Category Filter */}
        <div className="gallery-filter-bar" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Loading gallery photos...
          </div>
        ) : filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <ImageIcon size={36} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.5 }} />
            No photos found in this category.
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredItems.map((item) => {
              const imgSrc = item.image_url || heroImg;
              return (
                <div 
                  className="gallery-item" 
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                >
                  <img src={imgSrc} alt={item.title || 'Salem Boxing Club'} />
                  <div className="gallery-overlay">
                    <div>
                      <span className="gallery-category-pill" style={{ fontSize: '0.72rem', background: 'var(--primary)', color: '#FFF', padding: '2px 8px', borderRadius: '4px', marginBottom: '6px', display: 'inline-block' }}>
                        {item.category || 'Training'}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF', fontWeight: '700', fontSize: '0.95rem' }}>
                        <Eye size={16} /> {item.title}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', width: '90%' }}>
              <button className="lightbox-close-btn" onClick={() => setSelectedImage(null)}>
                <X size={20} />
              </button>
              <img 
                src={selectedImage.image_url || heroImg} 
                alt={selectedImage.title} 
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: 'var(--radius-sm)' }}
              />
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,0,60,0.2)', color: 'var(--primary)', padding: '3px 10px', borderRadius: '4px', border: '1px solid rgba(255,0,60,0.3)', textTransform: 'uppercase' }}>
                  {selectedImage.category || 'Training'}
                </span>
                <div style={{ color: '#FFF', fontFamily: 'Orbitron', fontSize: '1.2rem', marginTop: '8px' }}>
                  {selectedImage.title}
                </div>
                {selectedImage.caption && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
                    {selectedImage.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
