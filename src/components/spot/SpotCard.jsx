import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/search.css"; // ← Perbaiki path

const SpotCard = ({ spot }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/spot/${spot.id}`);
  };

  // Format harga
  const formatHarga = (harga) => {
    if (!harga) return "Gratis";
    const cleanHarga = harga.replace(/[^0-9]/g, '');
    if (!cleanHarga) return "Gratis";
    if (cleanHarga === '0') return "Gratis";
    return `Rp ${parseInt(cleanHarga).toLocaleString("id-ID")}`;
  };

  // Cek apakah gratis
  const isGratis = spot.price === 'Gratis' || spot.price === 'Rp0' || spot.price === '0';

  // Fasilitas (fallback jika tidak ada)
  const fasilitas = spot.fasilitas || ['WiFi', 'Parkir', 'Toilet'];

  // Ambil 3 fasilitas pertama
  const fasilitasTampil = fasilitas.slice(0, 3);
  const sisaFasilitas = fasilitas.length - 3;

  // Waktu terbaik (fallback)
  const waktuTerbaik = spot.waktuTerbaik || 'Pagi - Sore';

  // Jam operasional (fallback)
  const jamOperasional = spot.jamOperasional || '08.00 - 17.00';

  return (
    <div className="spot-card" onClick={handleClick}>
      <div className="spot-card-img-wrap">
        <img
          src={spot.image}
          alt={spot.name}
          className="spot-card-img"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <span className="spot-card-score">
          <span className="score-star">★</span>
          {spot.rating || 0}
        </span>
        <span className="spot-card-waktu">⏱ {waktuTerbaik}</span>
        <span className="spot-card-kategori">{spot.category || 'Wisata'}</span>
      </div>

      <div className="spot-card-body">
        <h3 className="spot-card-nama">{spot.name}</h3>
        <p className="spot-card-lokasi">📍 {spot.location || 'Sumedang'}</p>
        <p className="spot-card-desc">{spot.description || 'Destinasi wisata menarik di Sumedang'}</p>

        <div className="spot-card-fasilitas">
          {fasilitasTampil.map((f) => (
            <span key={f} className="fasilitas-tag">{f}</span>
          ))}
          {sisaFasilitas > 0 && (
            <span className="fasilitas-tag">+{sisaFasilitas}</span>
          )}
        </div>

        <div className="spot-card-footer">
          <span className={`spot-card-harga ${isGratis ? "gratis" : ""}`}>
            {isGratis ? "Gratis" : formatHarga(spot.price)}
          </span>
          <span className="spot-card-jam">🕐 {jamOperasional}</span>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;