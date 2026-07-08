// components/DestinationList.jsx
import DestinationItem from './DestinationItem';

function DestinationList({ destinations, onUpdate, onDelete, onToggleVisited }) {
  if (destinations.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 Belum ada destinasi wisata</p>
        <p>Tambahkan destinasi impian Anda!</p>
      </div>
    );
  }

  const visitedCount = destinations.filter(d => d.isVisited).length;
  const wishlistCount = destinations.filter(d => !d.isVisited).length;

  return (
    <div className="destination-list">
      <div className="stats">
        <div className="stat-card">
          <span className="stat-value">{destinations.length}</span>
          <span className="stat-label">Total Destinasi</span>
        </div>
        <div className="stat-card visited">
          <span className="stat-value">{visitedCount}</span>
          <span className="stat-label">Sudah Dikunjungi</span>
        </div>
        <div className="stat-card wishlist">
          <span className="stat-value">{wishlistCount}</span>
          <span className="stat-label">Wishlist</span>
        </div>
      </div>

      <div className="destinations-grid">
        {destinations.map(destination => (
          <DestinationItem
            key={destination.id}
            destination={destination}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleVisited={onToggleVisited}
          />
        ))}
      </div>
    </div>
  );
}

export default DestinationList;