import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotCard from '../spot/SpotCard';
import { getSpots } from '../../data/dummyData';

const PopularSpot = () => {
  const navigate = useNavigate();
  const [popularSpots, setPopularSpots] = useState([]);

  useEffect(() => {
    const allSpots = getSpots();
    // Ambil 3 spot dengan rating tertinggi
    const sorted = [...allSpots].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setPopularSpots(sorted.slice(0, 3));
  }, []);

  const handleViewAll = () => {
    navigate('/search');
  };

  return (
    <section id="populer" className="popular-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">Paling ramai dikunjungi</span>
            <h2>Spot populer di Sumedang</h2>
            <p>Tempat-tempat yang paling banyak dicari dan diberi ulasan.</p>
          </div>
          <button className="see-all" onClick={handleViewAll}>
            Lihat semua <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        <div className="spot-grid">
          {popularSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSpot;