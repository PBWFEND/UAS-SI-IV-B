// components/DestinationForm.jsx
import { useState } from 'react';

function DestinationForm({ onAdd }) {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    attraction: '',
    budget: '',
    duration: '',
    isVisited: false,
    addedDate: new Date().toLocaleDateString('id-ID')
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.country.trim()) newErrors.country = 'Negara wajib diisi';
    if (!formData.city.trim()) newErrors.city = 'Kota wajib diisi';
    if (!formData.attraction.trim()) newErrors.attraction = 'Objek wisata wajib diisi';
    if (!formData.budget || formData.budget <= 0) newErrors.budget = 'Budget harus lebih dari 0';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Durasi harus lebih dari 0 hari';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAdd(formData);
      setFormData({
        country: '',
        city: '',
        attraction: '',
        budget: '',
        duration: '',
        isVisited: false,
        addedDate: new Date().toLocaleDateString('id-ID')
      });
      alert('✅ Destinasi berhasil ditambahkan!');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="destination-form">
      <div className="form-group">
        <label>Negara:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Contoh: Jepang"
        />
        {errors.country && <span className="error">{errors.country}</span>}
      </div>

      <div className="form-group">
        <label>Kota:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Contoh: Tokyo"
        />
        {errors.city && <span className="error">{errors.city}</span>}
      </div>

      <div className="form-group">
        <label>Objek Wisata:</label>
        <input
          type="text"
          name="attraction"
          value={formData.attraction}
          onChange={handleChange}
          placeholder="Contoh: Tokyo Tower"
        />
        {errors.attraction && <span className="error">{errors.attraction}</span>}
      </div>

      <div className="form-group">
        <label>Estimasi Budget (USD):</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Minimal 1 USD"
        />
        {errors.budget && <span className="error">{errors.budget}</span>}
      </div>

      <div className="form-group">
        <label>Durasi (hari):</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Minimal 1 hari"
        />
        {errors.duration && <span className="error">{errors.duration}</span>}
      </div>

      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="isVisited"
            checked={formData.isVisited}
            onChange={handleChange}
          />
          Sudah Dikunjungi
        </label>
      </div>

      <button type="submit" className="btn-submit">
        ✨ Tambah Destinasi
      </button>
    </form>
  );
}

export default DestinationForm;