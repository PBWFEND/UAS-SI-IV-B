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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [developerCode, setDeveloperCode] = useState('');

  // KODE UNIK UNTUK 4 ANGGOTA KELOMPOK
  // Ganti dengan kode yang kalian sepakati!
  const VALID_DEVELOPER_CODES = [
    'ILYAS2024',   // Kode Ilyas
    'RESTY2024',   // Kode Resty
    'INDRI2024',   // Kode Indri
    'DISTI2024'    // Kode Disti
  ];

  // Cek apakah user sudah login sebagai developer
  useEffect(() => {
    const savedCode = localStorage.getItem('developerCode');
    if (savedCode && VALID_DEVELOPER_CODES.includes(savedCode)) {
      setIsAuthenticated(true);
      setShowLogin(false);
      loadSpots();
    } else {
      setIsAuthenticated(false);
      setShowLogin(true);
      setLoading(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (VALID_DEVELOPER_CODES.includes(developerCode)) {
      localStorage.setItem('developerCode', developerCode);
      setIsAuthenticated(true);
      setShowLogin(false);
      loadSpots();
    } else {
      alert('Kode developer tidak valid!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('developerCode');
    setIsAuthenticated(false);
    setShowLogin(true);
    setDeveloperCode('');
  };

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

  // Tampilkan halaman login jika belum login
  if (showLogin) {
    return (
      <div className="manage-page">
        <div className="manage-container">
          <div className="manage-login-wrap">
            <div className="manage-login-card">
              <div className="manage-login-icon">🔐</div>
              <h2 className="manage-login-title">Akses Developer</h2>
              <p className="manage-login-sub">
                Masukkan kode developer untuk mengelola data spot wisata.
              </p>
              <form onSubmit={handleLogin} className="manage-login-form">
                <input
                  type="password"
                  className="manage-login-input"
                  placeholder="Masukkan kode developer..."
                  value={developerCode}
                  onChange={(e) => setDeveloperCode(e.target.value)}
                  autoFocus
                />
                <Button type="submit" variant="primary" fullWidth>
                  Masuk
                </Button>
              </form>
              <p className="manage-login-hint">
                * Kode developer hanya diketahui oleh 4 anggota kelompok
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan utama Manage Spot (sama seperti sebelumnya)
  return (
    <div className="manage-page">
      <div className="manage-container">
        {/* Header dengan Logout */}
        <div className="manage-header">
          <div>
            <h1 className="manage-title">Kelola Spot Wisata</h1>
            <p className="manage-subtitle">
              Tambah, edit, atau hapus data spot wisata di Kabupaten Sumedang
            </p>
          </div>
          <div className="manage-header-actions">
            <Button variant="outline" size="small" onClick={handleLogout} icon="🚪">
              Logout
            </Button>
            <Button variant="primary" onClick={handleAdd} icon="+">
              Tambah Spot
            </Button>
          </div>
        </div>

        {/* Stats */}
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

        {/* Table */}
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

        {/* Form Modal */}
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

        {/* Delete Confirmation Modal */}
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

        {/* Developer Info */}
        <div className="manage-dev-info">
          <p>
            <span className="manage-dev-icon">👤</span>
            Login sebagai: <strong>{localStorage.getItem('developerCode')}</strong>
          </p>
          <p className="manage-dev-hint">
            Klik Logout untuk keluar dari mode developer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageSpot;