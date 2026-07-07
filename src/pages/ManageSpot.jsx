import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSpots, addSpot, deleteSpot, updateSpot } from '../data/dummyData';
import SpotForm from '../components/spot/SpotForm';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import '../styles/manage.css';

const ManageSpot = () => {
  const navigate = useNavigate();
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CEK LOCAL STORAGE dengan NAMA (tanpa angka)
  const isDeveloper = 
    localStorage.getItem('ILYAS') === 'true' ||
    localStorage.getItem('RESTY') === 'true' ||
    localStorage.getItem('INDRI') === 'true' ||
    localStorage.getItem('DISTI') === 'true';

  useEffect(() => {
    if (!isDeveloper) {
      navigate('/');
      return;
    }
    loadSpots();
  }, [isDeveloper, navigate]);

  const loadSpots = () => {
    const allSpots = getSpots();
    setSpots(allSpots);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingSpot(null);
    setIsFormOpen(true);
  };

  const handleEdit = (spot) => {
    setEditingSpot(spot);
    setIsFormOpen(true);
  };

  const handleDelete = (spot) => {
    setDeleteTarget(spot);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteSpot(deleteTarget.id);
      loadSpots();
      setDeleteTarget(null);
      setIsModalOpen(false);
    }
  };

  const handleFormSubmit = (formData) => {
    setIsSubmitting(true);
    
    if (editingSpot) {
      updateSpot(editingSpot.id, formData);
    } else {
      addSpot(formData);
    }
    
    loadSpots();
    setIsSubmitting(false);
    setIsFormOpen(false);
    setEditingSpot(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingSpot(null);
  };

  const formatHarga = (harga) => {
    if (!harga) return "Gratis";
    if (harga === 'Gratis' || harga === 'Rp0' || harga === '0') return "Gratis";
    return harga;
  };

  if (!isDeveloper) {
    return null;
  }

  return (
    <div className="manage-page">
      <div className="manage-container">
        <div className="manage-header">
          <div>
            <h1 className="manage-title">Kelola Spot Wisata</h1>
            <p className="manage-subtitle">
              Tambah, edit, atau hapus data spot wisata di Kabupaten Sumedang
            </p>
          </div>
          <Button variant="primary" onClick={handleAdd} icon="+">
            Tambah Spot
          </Button>
        </div>

        <div className="manage-stats">
          <div className="manage-stat">
            <span className="manage-stat-value">{spots.length}</span>
            <span className="manage-stat-label">Total Spot</span>
          </div>
          <div className="manage-stat">
            <span className="manage-stat-value">
              {spots.filter(s => s.rating > 4).length}
            </span>
            <span className="manage-stat-label">Rating Tinggi</span>
          </div>
          <div className="manage-stat">
            <span className="manage-stat-value">
              {spots.filter(s => s.rating < 3 && s.rating > 0).length}
            </span>
            <span className="manage-stat-label">Hidden Gems</span>
          </div>
        </div>

        <div className="manage-table-wrap">
          {loading ? (
            <div className="manage-loading">
              <div className="manage-loading-spinner"></div>
              <p>Memuat data...</p>
            </div>
          ) : spots.length === 0 ? (
            <div className="manage-empty">
              <div className="manage-empty-icon">🗺️</div>
              <h3>Belum Ada Data Spot</h3>
              <p>Klik tombol "Tambah Spot" untuk menambahkan data wisata pertama.</p>
            </div>
          ) : (
            <table className="manage-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Gambar</th>
                  <th>Nama Spot</th>
                  <th>Kategori</th>
                  <th>Lokasi</th>
                  <th>Harga</th>
                  <th>Rating</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {spots.map((spot, index) => (
                  <tr key={spot.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img 
                        src={spot.image || 'https://via.placeholder.com/50/2F4156/FFFFFF?text=No+Img'} 
                        alt={spot.name}
                        className="manage-table-img"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/50/2F4156/FFFFFF?text=No+Img';
                        }}
                      />
                    </td>
                    <td className="manage-table-name">{spot.name}</td>
                    <td>
                      <span className="manage-table-category">{spot.category || '-'}</span>
                    </td>
                    <td>{spot.location || '-'}</td>
                    <td>{formatHarga(spot.price)}</td>
                    <td>
                      <span className="manage-table-rating">
                        {spot.rating > 0 ? `⭐ ${spot.rating}` : '-'}
                      </span>
                    </td>
                    <td>
                      <div className="manage-table-actions">
                        <Button 
                          variant="outline" 
                          size="small" 
                          onClick={() => handleEdit(spot)}
                          icon="✏️"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="small" 
                          onClick={() => handleDelete(spot)}
                          icon="🗑️"
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {isFormOpen && (
          <div className="manage-form-overlay" onClick={handleFormCancel}>
            <div className="manage-form-modal" onClick={(e) => e.stopPropagation()}>
              <div className="manage-form-header">
                <h2>{editingSpot ? 'Edit Spot' : 'Tambah Spot Baru'}</h2>
                <button className="manage-form-close" onClick={handleFormCancel}>
                  ✕
                </button>
              </div>
              <SpotForm
                initialData={editingSpot}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
          title="Hapus Spot Wisata"
          message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.name}"? Data yang dihapus tidak dapat dikembalikan.`}
          confirmText="Hapus"
          cancelText="Batal"
          type="danger"
        />

        <div className="manage-dev-info">
          <p>
            <span className="manage-dev-icon">👤</span>
            Mode Developer Aktif
          </p>
          <p className="manage-dev-hint">
            Untuk menonaktifkan: <code>localStorage.removeItem('NAMA_KAMU')</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageSpot;