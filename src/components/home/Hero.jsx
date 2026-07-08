import React from 'react';
import { useNavigate } from 'react-router-dom';
import gunungKunci from '../../assets/images/gunung-kunci.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');

    if (query && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-content">
          <span className="eyebrow">Jelajahi Sumedang</span>

          <h1 className="hero-title">
            Temukan <em>pesona</em><br />
            tersembunyi tanah Sumedang
          </h1>

          <p className="hero-description">
            Dari perbukitan hijau hingga curug tersembunyi — JejakLensa
            membantumu menemukan, menilai, dan berbagi tempat terbaik
            untuk dikunjungi di Sumedang.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="hero-search">
            <div className="search-field">
              <i className="fas fa-search"></i>

              <input
                type="text"
                name="search"
                placeholder="Cari spot, contoh: Curug Cinulang"
              />
            </div>

            <button type="submit" className="btn btn-gold">
              Cari Spot
            </button>
          </form>

          {/* Statistik */}
          <div className="hero-stats">
            <div>
              <span className="stat-number">120+</span>
              <span className="stat-label">Spot terdaftar</span>
            </div>

            <div>
              <span className="stat-number">26</span>
              <span className="stat-label">Kecamatan</span>
            </div>

            <div>
              <span className="stat-number">4.8/5</span>
              <span className="stat-label">Rating rata-rata</span>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="hero-visual">

          <div className="hero-frame">

            <div className="hero-image-placeholder">
              <img
                src={gunungKunci}
                alt="Gunung Kunci"
                className="hero-image"
              />
            </div>

          </div>

          {/* Badge */}
          <div className="hero-badge">
            <div className="hero-badge-icon">
              <i className="fas fa-star"></i>
            </div>

            <div>
              <p><strong>Gunung Kunci</strong></p>
              <p>Spot favorit minggu ini</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;