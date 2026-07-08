import React, { useState } from 'react';
import { AVAILABLE_TABLES, isTableBooked } from '../utils/helpers';

function ItemJadwal({ item, onDelete, onToggleStatus, onUpdate, schedules }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    tableName: item.tableName,
    customer: item.customer,
    scheduleDate: item.scheduleDate,
    startTime: item.startTime,
    endTime: item.endTime,
    status: item.status
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const { tableName, customer, scheduleDate, startTime, endTime, status } = editData;

    if (!tableName || !customer || !scheduleDate || !startTime || !endTime) {
      alert('Semua field wajib diisi!');
      return;
    }

    if (startTime >= endTime) {
      alert('Jam selesai harus lebih besar dari jam mulai!');
      return;
    }

    if (isTableBooked(schedules, tableName, scheduleDate, startTime, endTime, item.id)) {
      alert(`Meja ${tableName} sudah dipesan pada tanggal dan jam tersebut.`);
      return;
    }

    onUpdate(item.id, editData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="list-item" style={{ borderLeftColor: '#b98f3f', background: '#f5faf9' }}>
        <div className="edit-inline">
          <select 
            name="tableName"
            value={editData.tableName}
            onChange={handleEditChange}
          >
            {AVAILABLE_TABLES.map(table => (
              <option key={table} value={table}>{table}</option>
            ))}
          </select>
          <input 
            name="customer"
            value={editData.customer} 
            onChange={handleEditChange}
            placeholder="Pelanggan"
          />
          <input 
            type="date" 
            name="scheduleDate"
            value={editData.scheduleDate} 
            onChange={handleEditChange}
          />
          <input 
            type="time" 
            name="startTime"
            value={editData.startTime} 
            onChange={handleEditChange}
          />
          <input 
            type="time" 
            name="endTime"
            value={editData.endTime} 
            onChange={handleEditChange}
          />
          <select 
            name="status"
            value={editData.status} 
            onChange={handleEditChange}
          >
            <option value="tersedia">Tersedia</option>
            <option value="dipesan">Dipesan</option>
          </select>
          <button className="btn btn-success" onClick={handleSave}>
            <i className="fas fa-save"></i> Simpan
          </button>
          <button className="btn btn-outline" onClick={() => setIsEditing(false)}>
            Batal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="list-item">
      <div className="item-info">
        <div className="item-title">{item.tableName} · {item.customer}</div>
        <div className="item-meta">
          <span><i className="far fa-calendar-alt"></i> {item.scheduleDate}</span>
          <span className="time-badge">
            <i className="fas fa-clock"></i> {item.startTime || '--:--'} - {item.endTime || '--:--'}
          </span>
          <span><i className="fas fa-tag"></i> {item.status}</span>
        </div>
      </div>
      <div 
        className={`item-status ${item.status}`} 
        onClick={() => onToggleStatus(item.id)}
        title="klik untuk ubah status"
      >
        <i className={`fas fa-${item.status === 'dipesan' ? 'check-circle' : 'circle'}`}></i>
        {item.status}
      </div>
      <div className="item-actions">
        <button onClick={() => setIsEditing(true)} title="Edit">
          <i className="fas fa-pen"></i>
        </button>
        <button className="delete-btn" onClick={() => onDelete(item.id)} title="Hapus">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}

export default ItemJadwal;