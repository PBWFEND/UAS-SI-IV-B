import React, { useState } from 'react';
import Rating from './Rating';
import '../../styles/review.css';

const ReviewForm = ({ onSubmit, spotName }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (comment.trim() === '') {
      alert('Silakan tulis ulasan Anda terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    
    onSubmit({
      rating,
      comment: comment.trim()
    });

    // Reset form
    setRating(5);
    setComment('');
    setIsSubmitting(false);
  };

  return (
    <div className="review-form-wrap">
      <h4 className="review-form-title">
        {spotName ? `Tulis Ulasan untuk ${spotName}` : 'Tulis Ulasan'}
      </h4>
      
      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-form-rating">
          <span className="review-form-label">Rating</span>
          <Rating value={rating} onChange={setRating} size="large" />
          <span className="review-form-rating-text">{rating} / 5</span>
        </div>

        <div className="review-form-comment">
          <label htmlFor="comment" className="review-form-label">
            Ulasan
          </label>
          <textarea
            id="comment"
            className="review-form-textarea"
            placeholder="Bagikan pengalaman Anda mengunjungi tempat ini..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
          />
        </div>

        <button 
          type="submit" 
          className="review-form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;