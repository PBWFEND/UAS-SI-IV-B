import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import Filter from '../components/spot/Filter';
import SpotList from '../components/spot/SpotList';
import { getSpots } from '../data/dummyData';
import '../styles/search.css'; // ← Perbaiki path

const SearchSpot = () => {
  const location = useLocation();
  const [spots, setSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Ambil data dari local storage
  useEffect(() => {
    const allSpots = getSpots();
    setSpots(allSpots);
    setFilteredSpots(allSpots);
  }, []);

  // Baca query parameter dari URL (misal ?q=gunung)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const category = params.get('category');
    
    if (query) {
      setSearchQuery(query);
    }
    if (category) {
      const categoryMap = {
        'wisata-alam': 'Alam',
        'wisata-sejarah': 'Sejarah',
        'kuliner': 'Kuliner',
        'budaya': 'Budaya',
        'religi': 'Religi',
        'buatan': 'Buatan'
      };
      const mappedCategory = categoryMap[category] || category;
      setSelectedCategory(mappedCategory);
    }
  }, [location.search]);

  // Filter logic
  useEffect(() => {
    let result = spots;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(spot => 
        spot.name.toLowerCase().includes(query) ||
        spot.location.toLowerCase().includes(query) ||
        spot.category.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory && selectedCategory !== 'Semua') {
      result = result.filter(spot => 
        spot.category === selectedCategory
      );
    }
    
    setFilteredSpots(result);
  }, [searchQuery, selectedCategory, spots]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <span className="search-eyebrow">✨ Temukan Wisata</span>
        <h1 className="search-title">Jelajahi Spot Wisata Sumedang</h1>
        <p className="search-sub">
          Temukan berbagai destinasi wisata menarik di Kabupaten Sumedang
        </p>
      </div>

      <SearchBar query={searchQuery} onChange={handleSearch} />
      <Filter aktif={selectedCategory} onChange={handleFilter} />
      <SpotList spots={filteredSpots} totalData={spots.length} />
    </div>
  );
};

export default SearchSpot;