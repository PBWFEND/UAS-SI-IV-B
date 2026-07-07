import React from 'react';
import { useNavigate } from 'react-router-dom';

// Data Hidden Gems - Hardcode langsung di sini
const hiddenGemsData = [
  {
    id: 6,
    name: 'Kebun Teh Cigugur',
    category: 'Alam',
    location: 'Kec. Cigugur',
    price: 'Rp5.000',
    image: 'https://images.unsplash.com/photo-1572624784951-8d8fb7f218e3?w=600&h=400&fit=crop',
    description: 'Perkebunan teh yang masih alami dengan pemandangan hijau menenangkan'
  },
  {
    id: 7,
    name: 'Balong Geulis',
    category: 'Buatan',
    location: 'Kec. Cibugel',
    price: 'Rp20.000',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop',
    description: 'Belum Ada Deskripsi'
  },
  {
    id: 8,
    name: 'Air Terjun Ciputri',
    category: 'Alam',
    location: 'Kec. Cimanggung',
    price: 'Rp10.000',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=400&fit=crop',
    description: 'Air terjun tersembunyi di tengah hutan dengan kolam alami yang jernih'
  }
];

const HiddenGems = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/search?type=hidden-gems');
  };

  const handleCardClick = (id) => {
    navigate(`/spot/${id}`);
  };

  // Fungsi untuk handle error gambar
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/600x400/2F4156/FFFFFF?text=Hidden+Gem';
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
          {hiddenGemsData.map((gem) => (
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