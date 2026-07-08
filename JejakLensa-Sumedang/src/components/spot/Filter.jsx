import React from "react";
import "../../styles/search.css"; // ← Perbaiki path

// Data kategori langsung di sini
const KATEGORI_LIST = ['Semua', 'Alam', 'Sejarah', 'Kuliner', 'Budaya', 'Religi', 'Buatan'];

const Filter = ({ aktif, onChange, kategoriList }) => {
  const categories = kategoriList || KATEGORI_LIST;

  return (
    <div className="filter-wrap">
      {categories.map((kat) => (
        <button
          key={kat}
          className={`filter-btn ${aktif === kat ? "active" : ""}`}
          onClick={() => onChange(kat)}
        >
          {kat}
        </button>
      ))}
    </div>
  );
};

export default Filter;