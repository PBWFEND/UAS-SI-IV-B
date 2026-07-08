import React, { useState } from 'react';
import { AVAILABLE_TABLES, isTableBooked, generateId } from '../utils/helpers';

function FormTambah({ schedules, setSchedules }) {
  const [formData, setFormData] = useState({
    tableName: '',
    customer: '',
    scheduleDate: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectTable = (tableName) => {
    setFormData(prev => ({ ...prev, tableName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { tableName, customer, scheduleDate, startTime, endTime } = formData;

    if (!tableName || !customer || !scheduleDate || !startTime || !endTime) {
      alert('Semua field wajib diisi!');
      return;
    }

    if (startTime >= endTime) {
      alert('Jam selesai harus lebih besar dari jam mulai!');
      return;
    }

    if (isTableBooked(schedules, tableName, scheduleDate, startTime, endTime)) {
      alert(`Meja ${tableName} sudah dipesan pada tanggal dan jam tersebut.`);
      return;
    }

    const newSchedule = {
      id: generateId(),
      tableName,
      customer,
      scheduleDate,
      startTime,
      endTime,
      status: 'tersedia'
    };

    setSchedules(prev => [newSchedule, ...prev]);
    
    setFormData({
      tableName: '',
      customer: '',
      scheduleDate: '',
      startTime: '',
      endTime: ''
    });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label><i className="fas fa-chair"></i> Meja</label>
          <select 
            name="tableName" 
            value={formData.tableName} 
            onChange={handleChange}
          >
            <option value="">Pilih Meja</option>
            {AVAILABLE_TABLES.map(table => (
              <option key={table} value={table}>{table}</option>
            ))}
          </select>
          <div className="table-options">
            {AVAILABLE_TABLES.map(table => (
              <span 
                key={table} 
                className={`table-option ${formData.tableName === table ? 'active' : ''}`}
                onClick={() => selectTable(table)}
              >
                {table}
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label><i className="fas fa-user"></i> Pelanggan</label>
          <input 
            type="text" 
            name="customer"
            placeholder="Nama Pelanggan" 
            value={formData.customer} 
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-calendar-day"></i> Tanggal</label>
          <input 
            type="date" 
            name="scheduleDate"
            value={formData.scheduleDate} 
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-clock"></i> Jam Mulai</label>
          <input 
            type="time" 
            name="startTime"
            value={formData.startTime} 
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-clock"></i> Jam Selesai</label>
          <input 
            type="time" 
            name="endTime"
            value={formData.endTime} 
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          <i className="fas fa-plus-circle"></i> Tambah
        </button>
      </form>
    </div>
  );
}

export default FormTambah;