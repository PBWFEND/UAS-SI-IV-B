// components/FilterButtons.jsx
function FilterButtons({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      <button 
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        Semua
      </button>
      <button 
        className={`filter-btn ${currentFilter === 'visited' ? 'active' : ''}`}
        onClick={() => onFilterChange('visited')}
      >
        Sudah Dikunjungi
      </button>
      <button 
        className={`filter-btn ${currentFilter === 'wishlist' ? 'active' : ''}`}
        onClick={() => onFilterChange('wishlist')}
      >
        Wishlist
      </button>
    </div>
  );
}

export default FilterButtons;