// src/components/spot/SpotDetailComponents.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewList from '../review/ReviewList';
import ReviewForm from '../review/ReviewForm';
import Rating from '../review/Rating';
import { getSpotById, getReviews, addReview } from '../../data/dummyData';
import '../../styles/detail.css';

const SpotDetailComponents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const spotId = parseInt(id);
    const foundSpot = getSpotById(spotId);
    
    if (foundSpot) {
      setSpot(foundSpot);
      const spotReviews = getReviews(spotId);
      setReviews(spotReviews);
    }
    setLoading(false);
  }, [id]);

  const handleAddReview = (reviewData) => {
    const spotId = parseInt(id);
    
    const newReview = addReview({
      spotId: spotId,
      ...reviewData,
      userName: 'Pengguna'
    });
    
    if (newReview) {
      const updatedReviews = getReviews(spotId);
      setReviews(updatedReviews);
      const updatedSpot = getSpotById(spotId);
      setSpot(updatedSpot);
    }
  };

  const formatHarga = (harga) => {
    if (!harga) return "Gratis";
    if (harga === 'Gratis' || harga === 'Rp0' || harga === '0') return "Gratis";
    return harga;
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="detail-loading-spinner"></div>
        <p>Memuat detail spot...</p>
      </div>
    );
  }

  if (!spot) {
    return (
      <div className="detail-not-found">
        <div className="detail-not-found-icon">🗺️</div>
        <h2>Spot Tidak Ditemukan</h2>
        <p>Maaf, spot wisata yang Anda cari tidak tersedia.</p>
        <button className="btn btn-primary" onClick={() => navigate('/search')}>
          Kembali ke Pencarian
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        <button className="detail-back" onClick={() => navigate(-1)}>
          <span className="detail-back-icon">←</span> Kembali
        </button>

        <div className="detail-hero">
          <div className="detail-hero-image">
            <img
              src={spot.image}
              alt={spot.name}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="detail-hero-badge">
              <span className="detail-hero-category">{spot.category || 'Wisata'}</span>
              <span className="detail-hero-rating">
                <span className="star">★</span> {spot.rating || 0}
              </span>
            </div>
          </div>

          <div className="detail-hero-content">
            <h1 className="detail-title">{spot.name}</h1>
            <p className="detail-location">
              <span className="detail-location-icon">📍</span> {spot.location || 'Sumedang'}
            </p>
            
            <div className="detail-stats">
              <div className="detail-stat">
                <span className="detail-stat-value">{spot.rating || 0}</span>
                <span className="detail-stat-label">Rating</span>
              </div>
              <div className="detail-stat">
                <span className="detail-stat-value">{reviews.length}</span>
                <span className="detail-stat-label">Ulasan</span>
              </div>
              <div className="detail-stat">
                <span className="detail-stat-value">{formatHarga(spot.price)}</span>
                <span className="detail-stat-label">Harga Tiket</span>
              </div>
            </div>

            <div className="detail-description">
              <h3>Deskripsi</h3>
              <p>{spot.description || 'Destinasi wisata menarik di Kabupaten Sumedang.'}</p>
            </div>

            {spot.waktuTerbaik && (
              <div className="detail-info-grid">
                <div className="detail-info-item">
                  <span className="detail-info-icon">⏱️</span>
                  <div>
                    <span className="detail-info-label">Waktu Terbaik</span>
                    <span className="detail-info-value">{spot.waktuTerbaik}</span>
                  </div>
                </div>
                {spot.jamOperasional && (
                  <div className="detail-info-item">
                    <span className="detail-info-icon">🕐</span>
                    <div>
                      <span className="detail-info-label">Jam Operasional</span>
                      <span className="detail-info-value">{spot.jamOperasional}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {spot.fasilitas && spot.fasilitas.length > 0 && (
              <div className="detail-fasilitas">
                <h3>Fasilitas</h3>
                <div className="detail-fasilitas-list">
                  {spot.fasilitas.map((f, index) => (
                    <span key={index} className="detail-fasilitas-tag">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="detail-tabs">
          <button
            className={`detail-tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <span className="detail-tab-icon">ℹ️</span> Informasi
          </button>
          <button
            className={`detail-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <span className="detail-tab-icon">💬</span> Ulasan ({reviews.length})
          </button>
        </div>

        <div className="detail-tab-content">
          {activeTab === 'info' && (
            <div className="detail-info-tab">
              <div className="detail-info-section">
                <h3>Tentang Spot Ini</h3>
                <p>{spot.description || 'Destinasi wisata menarik di Kabupaten Sumedang.'}</p>
                
                <div className="detail-info-meta">
                  <div className="detail-meta-item">
                    <span className="detail-meta-label">Kategori</span>
                    <span className="detail-meta-value">{spot.category || 'Wisata'}</span>
                  </div>
                  <div className="detail-meta-item">
                    <span className="detail-meta-label">Lokasi</span>
                    <span className="detail-meta-value">{spot.location || 'Sumedang'}</span>
                  </div>
                  <div className="detail-meta-item">
                    <span className="detail-meta-label">Harga Tiket</span>
                    <span className="detail-meta-value">{formatHarga(spot.price)}</span>
                  </div>
                  <div className="detail-meta-item">
                    <span className="detail-meta-label">Rating</span>
                    <span className="detail-meta-value">
                      <Rating value={spot.rating || 0} readonly />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="detail-reviews-tab">
              <div className="detail-reviews-header">
                <h3>Ulasan Pengunjung</h3>
                <div className="detail-reviews-summary">
                  <span className="detail-reviews-rating">
                    <span className="star">★</span> {spot.rating || 0}
                  </span>
                  <span className="detail-reviews-count">
                    {reviews.length} ulasan
                  </span>
                </div>
              </div>

              <ReviewForm onSubmit={handleAddReview} />

              <ReviewList reviews={reviews} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotDetailComponents;