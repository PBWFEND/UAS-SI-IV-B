import React from 'react';

function Pencarian({ searchTerm, onSearchChange }) {
  return (
    <div className="search-box" style={{ marginBottom: '1rem' }}>
      <i className="fas fa-search"></i>
      <input 
        type="text" 
        placeholder="Cari berdasarkan meja, pelanggan, tanggal, jam, status..." 
        value={searchTerm} 
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Pencarian;