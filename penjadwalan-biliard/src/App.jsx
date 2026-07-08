import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId } from './utils/helpers';
import FormTambah from './components/FormTambah';
import DaftarJadwal from './components/DaftarJadwal';
import Pencarian from './components/Pencarian';

function App() {
  const [schedules, setSchedules] = useLocalStorage('billiard-schedules', [
    { id: generateId(), tableName: 'Meja A', customer: 'Rama', scheduleDate: '2026-07-05', startTime: '10:00', endTime: '12:00', status: 'dipesan' },
    { id: generateId(), tableName: 'Meja B', customer: 'Sita', scheduleDate: '2026-07-06', startTime: '14:00', endTime: '16:00', status: 'tersedia' },
    { id: generateId(), tableName: 'Meja C', customer: 'Bayu', scheduleDate: '2026-07-07', startTime: '19:00', endTime: '21:00', status: 'dipesan' },
    { id: generateId(), tableName: 'Meja D', customer: 'Dewi', scheduleDate: '2026-07-05', startTime: '13:00', endTime: '15:00', status: 'tersedia' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    if (!window.confirm('Hapus jadwal ini secara permanen?')) return;
    setSchedules(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleStatus = (id) => {
    setSchedules(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'dipesan' ? 'tersedia' : 'dipesan' } 
        : item
    ));
  };

  const handleUpdate = (id, updatedData) => {
    setSchedules(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const filtered = schedules.filter(item => {
    const term = searchTerm.toLowerCase();
    return item.tableName.toLowerCase().includes(term) ||
           item.customer.toLowerCase().includes(term) ||
           item.scheduleDate.includes(term) ||
           item.status.toLowerCase().includes(term) ||
           (item.startTime && item.startTime.includes(term)) ||
           (item.endTime && item.endTime.includes(term));
  });

  const bookedItems = filtered.filter(item => item.status === 'dipesan');
  const availableItems = filtered.filter(item => item.status === 'tersedia');

  return (
    <div className="app-card">
      <header>
        <h1><i className="fas fa-table-tennis"></i> Penjadwalan Meja Biliard</h1>
        <div className="subhead">
          <span><i className="far fa-calendar-alt"></i> {new Date().toLocaleDateString('id-ID')}</span>
          <span><i className="fas fa-database"></i> {schedules.length} jadwal</span>
        </div>
      </header>

      <FormTambah schedules={schedules} setSchedules={setSchedules} />

      <Pencarian searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <DaftarJadwal 
        title="Dipesan"
        icon="fas fa-check-circle"
        items={bookedItems}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onUpdate={handleUpdate}
        schedules={schedules}
      />

      <DaftarJadwal 
        title="Tersedia"
        icon="fas fa-clock"
        items={availableItems}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onUpdate={handleUpdate}
        schedules={schedules}
      />
    </div>
  );
}

export default App;