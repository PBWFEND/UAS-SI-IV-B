// App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import DestinationForm from './components/DestinationForm';
import DestinationList from './components/DestinationList';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';

function App() {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, visited, wishlist

  // Load data from localStorage
  useEffect(() => {
    const savedDestinations = localStorage.getItem('travelDestinations');
    if (savedDestinations) {
      setDestinations(JSON.parse(savedDestinations));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('travelDestinations', JSON.stringify(destinations));
  }, [destinations]);

  // CRUD Operations
  const addDestination = (newDestination) => {
    setDestinations([...destinations, { ...newDestination, id: Date.now().toString() }]);
  };

  const updateDestination = (id, updatedData) => {
    setDestinations(destinations.map(dest => 
      dest.id === id ? { ...dest, ...updatedData } : dest
    ));
  };

  const deleteDestination = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus destinasi wisata ini?')) {
      setDestinations(destinations.filter(dest => dest.id !== id));
    }
  };

  const toggleVisitedStatus = (id) => {
    setDestinations(destinations.map(dest =>
      dest.id === id ? { ...dest, isVisited: !dest.isVisited } : dest
    ));
  };

  // Filter and search logic
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dest.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dest.attraction.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' ? true :
                         filterStatus === 'visited' ? dest.isVisited :
                         !dest.isVisited;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 TravelWise</h1>
        <p>Kelola Destinasi Wisata Luar Negeri Anda</p>
      </header>

      <main className="app-main">
        <div className="sidebar">
          <h2>Tambah Destinasi Baru</h2>
          <DestinationForm onAdd={addDestination} />
        </div>

        <div className="content">
          <div className="controls">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <FilterButtons currentFilter={filterStatus} onFilterChange={setFilterStatus} />
          </div>

          <DestinationList 
            destinations={filteredDestinations}
            onUpdate={updateDestination}
            onDelete={deleteDestination}
            onToggleVisited={toggleVisitedStatus}
          />
        </div>
      </main>
    </div>
  );
}

export default App;