import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSpots } from '../../data/dummyData';

const HiddenGems = () => {
  const navigate = useNavigate();
  const [hiddenGems, setHiddenGems] = useState([]);

  useEffect(() => {
    const allSpots = getSpots();
    // Ambil 3 spot dengan rating terendah (hidden gems)
    const sorted = [...allSpots].sort((a, b) => (a.rating || 0) - (b.rating || 0));
    setHiddenGems(sorted.slice(0, 3));
  }, []);

  const handleViewAll = () => {
    navigate('/search?type=hidden-gems');
  };

  const handleCardClick = (id) => {
    navigate(`/spot/${id}`);
  };

  // Fungsi untuk handle error gambar
  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  return (
    <section id="gems" className="gems-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">Belum banyak diketahui</span>
            <h2>Hidden gems menanti dijelajahi</h2>
            <p>Spot-spot tenang yang belum ramai, direkomendasikan oleh penjelajah lokal.</p>
          </div>
          <button className="see-all" onClick={handleViewAll}>
            Jelajahi semua <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        <div className="gems-grid">
          {hiddenGems.map((gem) => (
            <div
              key={gem.id}
              className="gem-card"
              onClick={() => handleCardClick(gem.id)}
            >
              {/* Gambar Background */}
              <img
                src={gem.image}
                alt={gem.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
                onError={handleImageError}
              />
              
              {/* Overlay Gelap */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(47,65,86,0.2) 0%, rgba(47,65,86,0.85) 100%)',
                zIndex: 1
              }}></div>

              {/* Badge */}
              <span className="gem-badge" style={{ position: 'relative', zIndex: 2 }}>
                <i className="fas fa-gem"></i> Tersembunyi
              </span>
              
              {/* Content */}
              <div className="gem-body" style={{ position: 'relative', zIndex: 2 }}>
                <h3>{gem.name}</h3>
                <p>{gem.description}</p>
                <div className="gem-meta">
                  <i className="fas fa-map-marker-alt"></i>
                  {gem.location}
                  <span style={{ marginLeft: 'auto', color: '#FFD700' }}>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiddenGems;