import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSpots } from '../data/dummyData';
import ReviewList from '../components/review/ReviewList';
import ReviewForm from '../components/review/ReviewForm';
import { addReview, getReviews } from '../data/dummyData';
import '../styles/review.css';

const Review = () => {
  const navigate = useNavigate();
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const allSpots = getSpots();
    setSpots(allSpots);
    if (allSpots.length > 0) {
      setSelectedSpot(allSpots[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedSpot) {
      const spotReviews = getReviews(selectedSpot.id);
      setReviews(spotReviews);
    }
  }, [selectedSpot]);

  const handleAddReview = (reviewData) => {
    if (selectedSpot) {
      const newReview = addReview(selectedSpot.id, {
        ...reviewData,
        userName: 'Pengguna'
      });
      
      if (newReview) {
        const updatedReviews = getReviews(selectedSpot.id);
        setReviews(updatedReviews);
        
        // Refresh spot data
        const updatedSpots = getSpots();
        setSpots(updatedSpots);
        const updatedSpot = updatedSpots.find(s => s.id === selectedSpot.id);
        setSelectedSpot(updatedSpot);
      }
    }
  };

  return (
    <div className="detail-page">
      <div className="detail-container">
        <button className="detail-back" onClick={() => navigate('/')}>
          <span className="detail-back-icon">←</span> Kembali ke Beranda
        </button>

        <div className="review-page-grid">
          {/* Pilih Spot */}
          <div className="review-spot-selector">
            <h3>Pilih Spot</h3>
            <div className="review-spot-list">
              {spots.map((spot) => (
                <button
                  key={spot.id}
                  className={`review-spot-btn ${selectedSpot?.id === spot.id ? 'active' : ''}`}
                  onClick={() => setSelectedSpot(spot)}
                >
                  <span className="review-spot-name">{spot.name}</span>
                  <span className="review-spot-rating">⭐ {spot.rating || 0}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Review Area */}
          <div className="review-area">
            {selectedSpot ? (
              <>
                <div className="review-spot-info">
                  <h2>{selectedSpot.name}</h2>
                  <p className="review-spot-location">📍 {selectedSpot.location}</p>
                  <div className="review-spot-meta">
                    <span>⭐ {selectedSpot.rating || 0}</span>
                    <span>{selectedSpot.reviews || 0} ulasan</span>
                    <span>{selectedSpot.price}</span>
                  </div>
                </div>

                <ReviewForm 
                  onSubmit={handleAddReview} 
                  spotName={selectedSpot.name}
                />
                
                <div className="review-section-title">
                  <h3>Semua Ulasan</h3>
                  <span className="review-count">{reviews.length} ulasan</span>
                </div>
                
                <ReviewList reviews={reviews} />
              </>
            ) : (
              <div className="review-empty-state">
                <p>Silakan pilih spot wisata terlebih dahulu.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;