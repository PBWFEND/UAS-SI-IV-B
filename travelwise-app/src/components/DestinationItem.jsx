// components/DestinationItem.jsx
import { useState } from 'react';

function DestinationItem({ destination, onUpdate, onDelete, onToggleVisited }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    country: destination.country,
    city: destination.city,
    attraction: destination.attraction,
    budget: destination.budget,
    duration: destination.duration
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdate(destination.id, editData);
    setIsEditing(false);
    alert('✏️ Destinasi berhasil diperbarui!');
  };

  if (isEditing) {
    return (
      <div className="destination-card editing">
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editData.country}
            onChange={(e) => setEditData({...editData, country: e.target.value})}
            required
            placeholder="Negara"
          />
          <input
            type="text"
            value={editData.city}
            onChange={(e) => setEditData({...editData, city: e.target.value})}
            required
            placeholder="Kota"
          />
          <input
            type="text"
            value={editData.attraction}
            onChange={(e) => setEditData({...editData, attraction: e.target.value})}
            required
            placeholder="Objek Wisata"
          />
          <input
            type="number"
            value={editData.budget}
            onChange={(e) => setEditData({...editData, budget: e.target.value})}
            required
            placeholder="Budget"
          />
          <input
            type="number"
            value={editData.duration}
            onChange={(e) => setEditData({...editData, duration: e.target.value})}
            required
            placeholder="Durasi"
          />
          <div className="edit-actions">
            <button type="submit" className="btn-save">Simpan</button>
            <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Batal</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`destination-card ${destination.isVisited ? 'visited' : 'wishlist'}`}>
      <div className="card-header">
        <h3>{destination.attraction}</h3>
        <div className="badge">
          {destination.isVisited ? '✅ Dikunjungi' : '⭐ Wishlist'}
        </div>
      </div>

      <div className="card-content">
        <p><strong>📍 Negara:</strong> {destination.country}</p>
        <p><strong>🏙️ Kota:</strong> {destination.city}</p>
        <p><strong>💰 Budget:</strong> ${destination.budget} USD</p>
        <p><strong>📅 Durasi:</strong> {destination.duration} hari</p>
        <p><strong>📆 Ditambahkan:</strong> {destination.addedDate}</p>
      </div>

      <div className="card-actions">
        <button 
          className={`btn-visit ${destination.isVisited ? 'visited' : ''}`}
          onClick={() => onToggleVisited(destination.id)}
        >
          {destination.isVisited ? 'Belum Dikunjungi' : 'Tandai Dikunjungi'}
        </button>
        <button className="btn-edit" onClick={() => setIsEditing(true)}>
          ✏️ Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(destination.id)}>
          🗑️ Hapus
        </button>
      </div>
    </div>
  );
}

export default DestinationItem;