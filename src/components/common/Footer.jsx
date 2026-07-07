import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isDeveloper, setIsDeveloper] = useState(false);

  useEffect(() => {
    const checkDeveloper = () => {
      const isDev = 
        localStorage.getItem('ILYAS') === 'true' ||
        localStorage.getItem('RESTY') === 'true' ||
        localStorage.getItem('INDRI') === 'true' ||
        localStorage.getItem('DISTI') === 'true';
      
      setIsDeveloper(isDev);
    };
    
    checkDeveloper();
    window.addEventListener('storage', checkDeveloper);
    return () => window.removeEventListener('storage', checkDeveloper);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              <div className="logo-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20l6-11 4 7 3-5 5 9H3z"/>
                </svg>
              </div>
              <div className="footer-logo-text">SpotFinder Sumedang</div>
            </div>
            <p className="footer-description">
              Platform pencarian dan eksplorasi tempat wisata terbaik di Kabupaten Sumedang.
              Temukan hidden gems, spot populer, dan rekomendasi menarik lainnya.
            </p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4>Jelajah</h4>
              <Link to="/">Beranda</Link>
              <Link to="/search">Jelajahi</Link>
              <Link to="/review">Ulasan</Link>
            </div>
            <div className="footer-col">
              <h4>Kategori</h4>
              <Link to="/search?category=wisata-alam">Wisata Alam</Link>
              <Link to="/search?category=wisata-sejarah">Wisata Sejarah</Link>
              <Link to="/search?category=kuliner">Kuliner</Link>
              <Link to="/search?category=budaya">Budaya & Seni</Link>
              <Link to="/search?category=religi">Wisata Religi</Link>
            </div>
            <div className="footer-col">
              <h4>Tentang</h4>
              <Link to="/about">Tentang Kami</Link>
              <Link to="/contact">Kontak</Link>
              {/* KELOLA SPOT - Muncul di footer hanya jika developer */}
              {isDeveloper && (
                <Link to="/manage">
                  <i className="fas fa-cog"></i> Kelola Spot
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {currentYear} SpotFinder Sumedang. All rights reserved.</span>
        <span>Dibangun dengan React &amp; Vite</span>
      </div>
    </footer>
  );
};

export default Footer;