// src/pages/ManageSpot.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSpots, addSpot, deleteSpot, updateSpot, resetSpots, clearAllData } from '../data/dummyData';
import SpotForm from '../components/spot/SpotForm';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import '../styles/manage.css';

const ManageSpot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===== STATE UNTUK LOGIN =====
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCode, setLoginCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  // ===== CEK AUTHENTIKASI =====
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const role = localStorage.getItem('role');
      
      console.log('🔍 Checking auth:', { isLoggedIn, role });

      if (isLoggedIn === 'true' && role === 'developer') {
        setIsAuthenticated(true);
        loadSpots();
        setShowLogin(false);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
        
        if (location.state?.showLogin) {
          setShowLogin(true);
        }
      }
    };
    
    checkAuth();
  }, [location]);

  // ===== FUNGSI LOGIN =====
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (loginCode === 'DEV2024') {
      setIsAuthenticated(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', 'developer');
      setLoginError('');
      setShowLogin(false);
      loadSpots();
    } else {
      setLoginError('❌ Kode akses salah! Silakan coba lagi.');
      setLoginCode('');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      setIsAuthenticated(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('role');
      setSpots([]);
      setShowLogin(true);
    }
  };

  // ===== FUNGSI SPOT =====
  const loadSpots = () => {
    try {
      setLoading(true);
      const allSpots = getSpots();
      console.log('📋 Loading spots from localStorage:', allSpots.length, 'items');
      setSpots(allSpots);
      setLoading(false);
    } catch (error) {
      console.error('Error loading spots:', error);
      setSpots([]);
      setLoading(false);
    }
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
      loadSpots(); // Reload setelah delete
      setDeleteTarget(null);
      setIsModalOpen(false);
    }
  };

  const handleFormSubmit = (formData) => {
    setIsSubmitting(true);
    
    try {
      if (editingSpot) {
        updateSpot(editingSpot.id, formData);
        console.log('✏️ Spot updated:', editingSpot.name);
      } else {
        addSpot(formData);
        console.log('➕ New spot added');
      }
      
      // Reload data setelah submit
      loadSpots();
      
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingSpot(null);
    } catch (error) {
      console.error('Error saving spot:', error);
      setIsSubmitting(false);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingSpot(null);
  };

  const handleReset = () => {
    if (window.confirm('⚠️ Reset semua data spot ke default? Data yang ada akan hilang!')) {
      resetSpots();
      loadSpots();
      alert('✅ Data berhasil direset!');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('⚠️ Hapus SEMUA data? Data tidak bisa dikembalikan!')) {
      clearAllData();
      loadSpots();
      alert('🗑️ Semua data telah dihapus!');
    }
  };

  const formatHarga = (harga) => {
    if (!harga) return "Gratis";
    if (harga === 'Gratis' || harga === 'Rp0' || harga === '0') return "Gratis";
    return harga;
  };

  // ===== TAMPILAN LOGIN =====
  if (!isAuthenticated || showLogin) {
    return (
      <div className="manage-page">
        <div className="manage-container">
          <div className="manage-login-wrap">
            <div className="manage-login-card">
              <div className="manage-login-icon">🔐</div>
              <h2 className="manage-login-title">Akses Kelola Spot</h2>
              <p className="manage-login-sub">
                Masukkan kode akses untuk mengelola data spot wisata
              </p>
              
              <form onSubmit={handleLogin} className="manage-login-form">
                <input
                  type="password"
                  className="manage-login-input"
                  placeholder="Masukkan kode akses..."
                  value={loginCode}
                  onChange={(e) => {
                    setLoginCode(e.target.value);
                    setLoginError('');
                  }}
                  autoFocus
                />
                {loginError && (
                  <span className="manage-login-error">{loginError}</span>
                )}
                <Button variant="primary" type="submit" fullWidth>
                  🔑 Masuk
                </Button>
              </form>
              
              <p className="manage-login-hint">
                💡 Hubungi developer untuk mendapatkan kode akses
              </p>
              
              <button 
                className="manage-login-back"
                onClick={() => navigate('/')}
              >
                ← Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== TAMPILAN UTAMA =====
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
          <div className="manage-header-actions">
            <Button variant="outline" onClick={handleClearAll} size="small" style={{ color: '#e53e3e' }}>
              🗑️ Hapus Semua
            </Button>
            <Button variant="outline" onClick={handleReset} size="small">
              🔄 Reset Data
            </Button>
            <Button variant="outline" onClick={handleLogout} size="small">
              🚪 Logout
            </Button>
            <Button variant="primary" onClick={handleAdd}>
              + Tambah Spot
            </Button>
          </div>
        </div>

        <div className="manage-stats">
          <div className="manage-stat">
            <span className="manage-stat-value">{spots.length}</span>
            <span className="manage-stat-label">📌 Total Spot</span>
          </div>
          <div className="manage-stat">
            <span className="manage-stat-value">
              {spots.filter(s => s.rating > 4).length}
            </span>
            <span className="manage-stat-label">⭐ Rating Tinggi</span>
          </div>
          <div className="manage-stat">
            <span className="manage-stat-value">
              {spots.filter(s => s.rating < 3 && s.rating > 0).length}
            </span>
            <span className="manage-stat-label">🌟 Hidden Gems</span>
          </div>
        </div>

        <div className="manage-table-wrap">
          {loading ? (
            <div className="manage-loading">
              <div className="manage-loading-spinner"></div>
              <p>Memuat data...</p>
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
                {spots && spots.length > 0 ? (
                  spots.map((spot, index) => (
                    <tr key={spot.id || index}>
                      <td>{index + 1}</td>
                      <td>
                        <img 
                          src={spot.image || 'https://via.placeholder.com/50/2F4156/FFFFFF?text=No+Img'} 
                          alt={spot.name || 'Spot'}
                          className="manage-table-img"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50/2F4156/FFFFFF?text=No+Img';
                          }}
                        />
                      </td>
                      <td className="manage-table-name">{spot.name || '-'}</td>
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
                          >
                            ✏️ Edit
                          </Button>
                          <Button 
                            variant="danger" 
                            size="small" 
                            onClick={() => handleDelete(spot)}
                          >
                            🗑️ Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                      <div className="manage-empty">
                        <div className="manage-empty-icon">🗺️</div>
                        <h3>Belum Ada Data Spot</h3>
                        <p>Klik tombol "Tambah Spot" untuk menambahkan data wisata pertama.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {isFormOpen && (
          <div className="manage-form-overlay" onClick={handleFormCancel}>
            <div className="manage-form-modal" onClick={(e) => e.stopPropagation()}>
              <div className="manage-form-header">
                <h2>{editingSpot ? '✏️ Edit Spot' : '✨ Tambah Spot Baru'}</h2>
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
            <span className="manage-dev-icon">✅</span>
            Mode Developer Aktif - {new Date().toLocaleString()}
          </p>
          <p className="manage-dev-hint">
            Total data: <strong>{spots.length}</strong> spot | Data tersimpan di LocalStorage browser
          </p>
          <p className="manage-dev-hint" style={{ fontSize: '11px', color: '#a0aec0' }}>
            💡 Untuk cek data: buka Console (F12) → ketik <code>localStorage.getItem('spotFinder_spots')</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageSpot;