// src/components/review/ReviewCard.jsx
import React from 'react';
import Rating from './Rating';
import '../../styles/review.css';

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-card-user">
          <div className="review-card-avatar">
            {review.userName ? review.userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="review-card-user-info">
            <span className="review-card-name">{review.userName || 'Pengguna'}</span>
            <span className="review-card-date">{formatDate(review.date)}</span>
          </div>
        </div>
        <div className="review-card-rating">
          <Rating value={review.rating} readonly size="small" />
        </div>
      </div>
      <div className="review-card-body">
        <p className="review-card-comment">{review.comment}</p>
        {review.image && (
          <img 
            src={review.image} 
            alt="Review" 
            className="review-card-image"
          />
        )}
      </div>
    </div>
  );
};

export default ReviewCard;