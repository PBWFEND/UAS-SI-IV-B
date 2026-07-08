import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import '../../styles/manage.css';

const SpotForm = ({ 
  initialData = null, 
  onSubmit, 
  onCancel,
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    price: '',
    image: '',
    description: '',
    fasilitas: '',
    waktuTerbaik: '',
    jamOperasional: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || '',
        location: initialData.location || '',
        price: initialData.price || '',
        image: initialData.image || '',
        description: initialData.description || '',
        fasilitas: initialData.fasilitas ? initialData.fasilitas.join(', ') : '',
        waktuTerbaik: initialData.waktuTerbaik || '',
        jamOperasional: initialData.jamOperasional || ''
      });
      setImagePreview(initialData.image || null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Ukuran file maksimal 2MB'
        }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama spot wajib diisi';
    if (!formData.category) newErrors.category = 'Kategori wajib dipilih';
    if (!formData.location.trim()) newErrors.location = 'Lokasi wajib diisi';
    if (!formData.price.trim()) newErrors.price = 'Harga tiket wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      ...formData,
      fasilitas: formData.fasilitas 
        ? formData.fasilitas.split(',').map(f => f.trim()).filter(f => f)
        : []
    };

    onSubmit(submitData);
  };

  const categoryOptions = [
    { value: 'Alam', icon: '🌄', color: '#48bb78' },
    { value: 'Sejarah', icon: '🏛️', color: '#ed8936' },
    { value: 'Kuliner', icon: '🍽️', color: '#f56565' },
    { value: 'Budaya', icon: '🎭', color: '#9f7aea' },
    { value: 'Religi', icon: '⛪', color: '#4299e1' },
    { value: 'Buatan', icon: '🎡', color: '#ed64a6' }
  ];

  return (
    <form className="spot-form" onSubmit={handleSubmit}>
      {/* Header Form */}
      <div className="spot-form-header-modern">
        <div className="spot-form-header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div>
          <h3 className="spot-form-title-modern">
            {initialData ? '✏️ Edit Spot Wisata' : '✨ Tambah Spot Baru'}
          </h3>
          <p className="spot-form-subtitle-modern">
            {initialData ? 'Perbarui data spot wisata' : 'Isi data spot wisata baru'}
          </p>
        </div>
      </div>

      <div className="spot-form-grid-modern">
        {/* Nama Spot */}
        <div className="form-group-modern">
          <label className="form-label-modern">
            Nama Spot <span className="form-required">*</span>
          </label>
          <div className="form-input-wrap-modern">
            <span className="form-input-icon-modern">📍</span>
            <input
              type="text"
              name="name"
              className={`form-input-modern ${errors.name ? 'form-input-error' : ''}`}
              placeholder="Masukkan nama spot wisata"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <span className="form-error-modern">{errors.name}</span>}
        </div>

        {/* Kategori */}
        <div className="form-group-modern">
          <label className="form-label-modern">
            Kategori <span className="form-required">*</span>
          </label>
          <div className="form-input-wrap-modern">
            <span className="form-input-icon-modern">📂</span>
            <select
              name="category"
              className={`form-select-modern ${errors.category ? 'form-input-error' : ''}`}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Pilih Kategori</option>
              {categoryOptions.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.value}
                </option>
              ))}
            </select>
          </div>
          {errors.category && <span className="form-error-modern">{errors.category}</span>}
        </div>

        {/* Lokasi */}
        <div className="form-group-modern">
          <label className="form-label-modern">
            Lokasi <span className="form-required">*</span>
          </label>
          <div className="form-input-wrap-modern">
            <span className="form-input-icon-modern">🗺️</span>
            <input
              type="text"
              name="location"
              className={`form-input-modern ${errors.location ? 'form-input-error' : ''}`}
              placeholder="Contoh: Kec. Sumedang Selatan"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          {errors.location && <span className="form-error-modern">{errors.location}</span>}
        </div>

        {/* Harga */}
        <div className="form-group-modern">
          <label className="form-label-modern">
            Harga Tiket <span className="form-required">*</span>
          </label>
          <div className="form-input-wrap-modern">
            <span className="form-input-icon-modern">💰</span>
            <input
              type="text"
              name="price"
              className={`form-input-modern ${errors.price ? 'form-input-error' : ''}`}
              placeholder="Contoh: Rp15.000 atau Gratis"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          {errors.price && <span className="form-error-modern">{errors.price}</span>}
        </div>

        {/* Upload Gambar - Full Width */}
        <div className="form-group-modern form-group-full-modern">
          <label className="form-label-modern">
            Upload Gambar
            <span className="form-label-badge-modern">Opsional</span>
          </label>
          <div 
            className={`form-upload-modern ${imagePreview ? 'has-image' : ''} ${errors.image ? 'form-upload-error' : ''}`}
            onClick={() => document.getElementById('imageUploadModern').click()}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add('drag-over');
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('drag-over');
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('drag-over');
              const file = e.dataTransfer.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData(prev => ({ ...prev, image: reader.result }));
                  setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          >
            <input
              type="file"
              id="imageUploadModern"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            {imagePreview ? (
              <div className="form-upload-preview-modern">
                <img src={imagePreview} alt="Preview" />
                <div className="form-upload-overlay-modern">
                  <button 
                    type="button" 
                    className="form-upload-remove-modern"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                  >
                    ✕
                  </button>
                  <span className="form-upload-hint-modern">Klik untuk mengganti</span>
                </div>
              </div>
            ) : (
              <div className="form-upload-placeholder-modern">
                <div className="form-upload-icon-modern">📸</div>
                <p className="form-upload-text-modern">Klik atau drag & drop gambar di sini</p>
                <span className="form-upload-hint-modern">Format: JPG, PNG, GIF (Max: 2MB)</span>
              </div>
            )}
          </div>
          {errors.image && <span className="form-error-modern">{errors.image}</span>}
        </div>

        {/* Deskripsi - Full Width */}
        <div className="form-group-modern form-group-full-modern">
          <label className="form-label-modern">
            Deskripsi <span className="form-required">*</span>
          </label>
          <div className="form-input-wrap-modern">
            <span className="form-input-icon-modern form-textarea-icon-modern">✍️</span>
            <textarea
              name="description"
              className={`form-textarea-modern ${errors.description ? 'form-input-error' : ''}`}
              placeholder="Tulis deskripsi lengkap tentang spot wisata ini..."
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-hint-wrapper-modern">
            <span className="form-hint-modern">💡 Minimal 20 karakter untuk deskripsi yang informatif</span>
            <span className="form-counter-modern">{formData.description.length}/1000</span>
          </div>
          {errors.description && <span className="form-error-modern">{errors.description}</span>}
        </div>

        {/* Fasilitas - Full Width */}
        <div className="form-group-modern form-group-full-modern">
          <label className="form-label-modern">
            Fasilitas
            <span className="form-label-badge-modern">Opsional</span>
          </label>
          <div className="form-input-wrap-modern">
            <span className="form-input-icon-modern">🎯</span>
            <input
              type="text"
              name="fasilitas"
              className="form-input-modern"
              placeholder="Parkir, Toilet, Warung Makan"
              value={formData.fasilitas}
              onChange={handleChange}
            />
          </div>
          <span className="form-hint-modern">💡 Pisahkan setiap fasilitas dengan tanda koma (,)</span>
        </div>

        {/* Waktu Terbaik */}
        <div className="form-group-modern">
          <label className="form-label-modern">
            Waktu Terbaik
            <span className="form-label-badge-modern">Opsional</span>
          </label>
          <div className="form-input-wrap-modern">
            <span className="form-input-icon-modern">⏰</span>
            <input
              type="text"
              name="waktuTerbaik"
              className="form-input-modern"
              placeholder="Contoh: Pagi - Sore"
              value={formData.waktuTerbaik}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Jam Operasional */}
        <div className="form-group-modern">
          <label className="form-label-modern">
            Jam Operasional
            <span className="form-label-badge-modern">Opsional</span>
          </label>
          <div className="form-input-wrap-modern">
            <span className="form-input-icon-modern">🕐</span>
            <input
              type="text"
              name="jamOperasional"
              className="form-input-modern"
              placeholder="Contoh: 08.00 - 17.00"
              value={formData.jamOperasional}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions-modern">
        <Button variant="outline" onClick={onCancel} type="button">
          ✕ Batal
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '⏳ Menyimpan...' : initialData ? '💾 Update Spot' : '➕ Tambah Spot'}
        </Button>
      </div>
    </form>
  );
};

export default SpotForm;