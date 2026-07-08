// src/components/review/ReviewList.jsx
import React from 'react';
import ReviewCard from './ReviewCard';
import '../../styles/review.css';

const ReviewList = ({ reviews, loading = false }) => {
  if (loading) {
    return (
      <div className="review-list-loading">
        <div className="loading-spinner-small"></div>
        <p>Memuat ulasan...</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="review-list-empty">
        <span className="review-list-empty-icon">💬</span>
        <h4 className="review-list-empty-title">Belum Ada Ulasan</h4>
        <p className="review-list-empty-sub">Jadilah yang pertama memberikan ulasan!</p>
      </div>
    );
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;