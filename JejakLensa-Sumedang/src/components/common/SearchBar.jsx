import React from "react";
import "../../styles/search.css"; // ← Perbaiki path

const SearchBar = ({ query, onChange }) => {
  return (
    <div className="searchbar-wrap">
      <span className="searchbar-icon">🔍</span>
      <input
        type="text"
        className="searchbar-input"
        placeholder="Cari nama spot, kecamatan, atau kategori..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
      {query && (
        <button className="searchbar-clear" onClick={() => onChange("")}>
          ✕ Hapus
        </button>
      )}
    </div>
  );
};

export default SearchBar;