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
    // Clear error for this field
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
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData(prev => ({
          ...prev,
          image: base64String
        }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
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

  return (
    <form className="spot-form" onSubmit={handleSubmit}>
      <div className="spot-form-grid">
        {/* Nama Spot */}
        <div className="form-group">
          <label className="form-label">
            Nama Spot <span className="form-required">*</span>
          </label>
          <input
            type="text"
            name="name"
            className={`form-input ${errors.name ? 'form-input-error' : ''}`}
            placeholder="Masukkan nama spot wisata"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        {/* Kategori */}
        <div className="form-group">
          <label className="form-label">
            Kategori <span className="form-required">*</span>
          </label>
          <select
            name="category"
            className={`form-select ${errors.category ? 'form-input-error' : ''}`}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Pilih Kategori</option>
            <option value="Alam">Alam</option>
            <option value="Sejarah">Sejarah</option>
            <option value="Kuliner">Kuliner</option>
            <option value="Budaya">Budaya</option>
            <option value="Religi">Religi</option>
            <option value="Buatan">Buatan</option>
          </select>
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>

        {/* Lokasi */}
        <div className="form-group">
          <label className="form-label">
            Lokasi <span className="form-required">*</span>
          </label>
          <input
            type="text"
            name="location"
            className={`form-input ${errors.location ? 'form-input-error' : ''}`}
            placeholder="Contoh: Kec. Sumedang Selatan"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <span className="form-error">{errors.location}</span>}
        </div>

        {/* Harga */}
        <div className="form-group">
          <label className="form-label">
            Harga Tiket <span className="form-required">*</span>
          </label>
          <input
            type="text"
            name="price"
            className={`form-input ${errors.price ? 'form-input-error' : ''}`}
            placeholder="Contoh: Rp15.000 atau Gratis"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <span className="form-error">{errors.price}</span>}
        </div>

        {/* Upload Gambar */}
        <div className="form-group form-group-full">
          <label className="form-label">Upload Gambar</label>
          <div 
            className={`form-upload ${imagePreview ? 'has-image' : ''}`}
            onClick={() => document.getElementById('imageUpload').click()}
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
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            {imagePreview ? (
              <div className="form-upload-preview">
                <img src={imagePreview} alt="Preview" />
                <p className="form-upload-hint">Klik atau drag untuk mengganti</p>
              </div>
            ) : (
              <div className="form-upload-placeholder">
                <span className="form-upload-icon">📸</span>
                <p>Klik atau drag & drop gambar di sini</p>
                <span className="form-upload-hint">Format: JPG, PNG, GIF</span>
              </div>
            )}
          </div>
        </div>

        {/* Deskripsi */}
        <div className="form-group form-group-full">
          <label className="form-label">
            Deskripsi <span className="form-required">*</span>
          </label>
          <textarea
            name="description"
            className={`form-textarea ${errors.description ? 'form-input-error' : ''}`}
            placeholder="Tulis deskripsi lengkap tentang spot wisata ini..."
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <span className="form-error">{errors.description}</span>}
        </div>

        {/* Fasilitas */}
        <div className="form-group form-group-full">
          <label className="form-label">Fasilitas</label>
          <input
            type="text"
            name="fasilitas"
            className="form-input"
            placeholder="Contoh: Parkir, Toilet, Warung Makan (pisahkan dengan koma)"
            value={formData.fasilitas}
            onChange={handleChange}
          />
          <span className="form-hint">Pisahkan setiap fasilitas dengan tanda koma (,)</span>
        </div>

        {/* Waktu Terbaik */}
        <div className="form-group">
          <label className="form-label">Waktu Terbaik</label>
          <input
            type="text"
            name="waktuTerbaik"
            className="form-input"
            placeholder="Contoh: Pagi - Sore"
            value={formData.waktuTerbaik}
            onChange={handleChange}
          />
        </div>

        {/* Jam Operasional */}
        <div className="form-group">
          <label className="form-label">Jam Operasional</label>
          <input
            type="text"
            name="jamOperasional"
            className="form-input"
            placeholder="Contoh: 08.00 - 17.00"
            value={formData.jamOperasional}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <Button variant="outline" onClick={onCancel} type="button">
          Batal
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Menyimpan...' : initialData ? 'Update Spot' : 'Tambah Spot'}
        </Button>
      </div>
    </form>
  );
};

export default SpotForm;