// src/components/review/Rating.jsx
import React from 'react';
import '../../styles/review.css';

const Rating = ({ 
  rating = 0, 
  maxRating = 5, 
  interactive = false,
  size = 'medium',
  onRatingChange = null,
  readonly = false
}) => {
  const handleClick = (index) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const handleHover = (index) => {
    // Untuk efek hover jika diperlukan
  };

  const sizeClass = {
    small: 'rating-small',
    medium: 'rating-medium',
    large: 'rating-large'
  };

  const isReadonly = readonly || !interactive;

  return (
    <div className={`rating-wrap ${!isReadonly ? 'rating-interactive' : ''} ${sizeClass[size] || 'rating-medium'}`}>
      {[...Array(maxRating)].map((_, index) => (
        <span
          key={index}
          className={`rating-star ${index < rating ? 'active' : ''}`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleHover(index)}
          style={{ cursor: isReadonly ? 'default' : 'pointer' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;