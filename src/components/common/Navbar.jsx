// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkDeveloperStatus = () => {
      const userData = localStorage.getItem('user');
      const role = localStorage.getItem('role');
      
      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (user.role === 'developer' || user.role === 'admin') {
            setIsDeveloper(true);
            return;
          }
        } catch (e) {}
      }

      if (role === 'developer' || role === 'admin') {
        setIsDeveloper(true);
        return;
      }

      const isDev = 
        localStorage.getItem('ILYAS') === 'true' ||
        localStorage.getItem('RESTY') === 'true' ||
        localStorage.getItem('INDRI') === 'true' ||
        localStorage.getItem('DISTI') === 'true';
      
      setIsDeveloper(isDev);
    };
    
    checkDeveloperStatus();
    window.addEventListener('storage', checkDeveloperStatus);
    return () => window.removeEventListener('storage', checkDeveloperStatus);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    if (query && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsMenuOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 20l6-11 4 7 3-5 5 9H3z"/>
            </svg>
          </div>
          <div className="logo-text">SpotFinder<span>.</span> <span>Sumedang</span></div>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Beranda</Link>
          <Link to="/search" className={`nav-link ${isActive('/search')}`}>Jelajahi</Link>
          {/* ✅ HAPUS LINK REVIEW */}
          {/* <Link to="/review" className={`nav-link ${isActive('/review')}`}>Ulasan</Link> */}
          {isDeveloper && (
            <Link to="/manage" className={`nav-link ${isActive('/manage')}`}>
              <i className="fas fa-cog"></i> Kelola Spot
            </Link>
          )}
        </div>

        <form onSubmit={handleSearch} className="navbar-search">
          <input
            type="text"
            name="search"
            placeholder="Cari tempat wisata..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={toggleMenu}>
            <i className="fas fa-home"></i> Beranda
          </Link>
          <Link to="/search" className="mobile-link" onClick={toggleMenu}>
            <i className="fas fa-compass"></i> Jelajahi
          </Link>
          {/* ✅ HAPUS LINK REVIEW DI MOBILE MENU */}
          {/* <Link to="/review" className="mobile-link" onClick={toggleMenu}>
            <i className="fas fa-star"></i> Ulasan
          </Link> */}
          {isDeveloper && (
            <Link to="/manage" className="mobile-link" onClick={toggleMenu}>
              <i className="fas fa-cog"></i> Kelola Spot
            </Link>
          )}
          <form onSubmit={handleSearch} className="mobile-search">
            <input
              type="text"
              name="search"
              placeholder="Cari tempat wisata..."
              className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-btn">
              <i className="fas fa-search"></i> Cari
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;