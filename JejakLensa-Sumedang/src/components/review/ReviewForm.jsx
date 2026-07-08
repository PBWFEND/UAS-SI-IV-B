// src/components/review/ReviewForm.jsx
import React, { useState } from 'react';
import Rating from './Rating';
import '../../styles/review.css';

const ReviewForm = ({ onSubmit, isSubmitting = false }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!comment.trim()) {
      newErrors.comment = 'Ulasan wajib diisi';
    }
    if (comment.trim().length < 10) {
      newErrors.comment = 'Ulasan minimal 10 karakter';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit({
      rating,
      comment,
      image
    });
    
    setComment('');
    setRating(5);
    setImage(null);
    setErrors({});
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="review-form-wrap">
      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-form-rating">
          <span className="review-form-rating-text">Rating:</span>
          <Rating 
            rating={rating} 
            maxRating={5} 
            interactive={true}
            size="large"
            onRatingChange={setRating}
          />
        </div>

        <div className="review-form-comment">
          <label className="review-form-label">Ulasan *</label>
          <textarea
            className={`review-form-textarea ${errors.comment ? 'review-form-error' : ''}`}
            placeholder="Bagikan pengalaman Anda mengunjungi tempat ini..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (errors.comment) {
                setErrors({ ...errors, comment: '' });
              }
            }}
            rows="4"
          />
          {errors.comment && (
            <span className="review-form-error">{errors.comment}</span>
          )}
        </div>

        <div className="review-form-image">
          <label className="review-form-label">Foto (Opsional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {image && (
            <div className="review-form-image-preview">
              <img src={image} alt="Preview" />
              <button 
                type="button"
                onClick={() => setImage(null)}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="review-form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? '⏳ Mengirim...' : '✏️ Kirim Ulasan'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;