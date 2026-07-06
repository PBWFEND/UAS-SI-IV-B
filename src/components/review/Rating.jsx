import React from 'react';
import '../../styles/review.css';

const Rating = ({ value, onChange, readonly = false, size = 'medium' }) => {
  const stars = [1, 2, 3, 4, 5];
  
  const getSizeClass = () => {
    switch(size) {
      case 'small': return 'rating-small';
      case 'large': return 'rating-large';
      default: return 'rating-medium';
    }
  };

  const handleClick = (starValue) => {
    if (!readonly && onChange) {
      onChange(starValue);
    }
  };

  const handleMouseEnter = (starValue) => {
    if (!readonly && onChange) {
      // Bisa ditambahkan hover effect jika diperlukan
    }
  };

  const handleMouseLeave = () => {
    if (!readonly && onChange) {
      // Reset ke value asli jika diperlukan
    }
  };

  return (
    <div className={`rating-wrap ${getSizeClass()} ${readonly ? 'rating-readonly' : 'rating-interactive'}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`rating-star ${star <= value ? 'active' : ''}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor: readonly ? 'default' : 'pointer',
            transition: 'transform 0.15s ease'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;