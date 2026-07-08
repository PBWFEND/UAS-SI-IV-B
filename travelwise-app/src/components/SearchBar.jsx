// components/SearchBar.jsx
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Cari berdasarkan negara, kota, atau objek wisata..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button className="clear-search" onClick={() => onSearchChange('')}>
          ✖
        </button>
      )}
    </div>
  );
}

export default SearchBar;