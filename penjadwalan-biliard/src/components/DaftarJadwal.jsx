import React from 'react';
import ItemJadwal from './ItemJadwal';

function DaftarJadwal({ title, icon, items, onDelete, onToggleStatus, onUpdate, schedules }) {
  return (
    <>
      <div className="section-title">
        <h3><i className={icon} style={{color:'#1f7a6b'}}></i> {title}</h3>
        <span className="badge">{items.length}</span>
      </div>
      <div className="schedule-list">
        {items.length === 0 && (
          <div className="empty-state">Tidak ada jadwal {title.toLowerCase()}</div>
        )}
        {items.map(item => (
          <ItemJadwal 
            key={item.id}
            item={item}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
            onUpdate={onUpdate}
            schedules={schedules}
          />
        ))}
      </div>
    </>
  );
}

export default DaftarJadwal;