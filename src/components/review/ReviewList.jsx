import React from 'react';
import ReviewCard from './ReviewCard';
import '../../styles/review.css';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="review-list-empty">
        <div className="review-list-empty-icon">💬</div>
        <p className="review-list-empty-title">Belum Ada Ulasan</p>
        <p className="review-list-empty-sub">
          Jadilah yang pertama memberikan ulasan untuk spot ini!
        </p>
      </div>
    );
  }

  // Urutkan dari yang terbaru
  const sortedReviews = [...reviews].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="review-list">
      {sortedReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;