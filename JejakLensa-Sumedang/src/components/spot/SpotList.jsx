import React from "react";
import SpotCard from "./SpotCard";
import "../../styles/search.css"; // ← Perbaiki path

const SpotList = ({ spots, totalData }) => {
  if (!spots || spots.length === 0) {
    return (
      <div className="spotlist-empty">
        <div className="spotlist-empty-icon">🔍</div>
        <p className="spotlist-empty-title">Spot tidak ditemukan</p>
        <p className="spotlist-empty-sub">
          Coba gunakan kata kunci lain atau ubah filter kategori yang kamu pilih.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="spotlist-info-row">
        <p className="spotlist-count">
          Menampilkan <strong>{spots.length}</strong> dari{" "}
          <strong>{totalData || spots.length}</strong> spot
        </p>
      </div>
      <div className="spotlist-grid">
        {spots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default SpotList;