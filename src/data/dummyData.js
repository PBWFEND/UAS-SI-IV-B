// src/data/dummyData.js
import gunungKunci from '../assets/images/gunung-kunci.jpg';
import candiRonggeng from '../assets/images/candi-ronggeng.jpg';
import curugCikaso from '../assets/images/curug-cikaso.jpg';
import kebunTeh from '../assets/images/kebun-teh.jpg';
import airTerjun from '../assets/images/air-terjun.jpg';
import gunungCiremai from '../assets/images/gunung-ciremai.jpg';

const SPOTS_KEY = 'jejakLensa_spots';
const NEXT_ID_KEY = 'jejakLensa_nextId';
const REVIEWS_KEY = 'jejakLensa_reviews';
const VERSION_KEY = 'jejakLensa_dataVersion'; add .gitignore

// Naikkan angka ini setiap kali defaultSpots diubah (gambar, data, dll.)
const DATA_VERSION = 2;

const defaultSpots = [
  {
    id: 1,
    name: 'Gunung Kunci',
    category: 'Alam',
    location: 'Kec. Sumedang Selatan',
    price: 'Rp5.000',
    rating: 5,
    image: gunungKunci,
    description: 'Spot wisata alam dengan pemandangan indah yang memukau',
    fasilitas: ['Parkir', 'Toilet', 'Warung Makan'],
    waktuTerbaik: 'Pagi - Sore',
    jamOperasional: '08.00 - 17.00'
  },
  {
    id: 2,
    name: 'Cadas Pangeran',
    category: 'Sejarah',
    location: 'Kec. Sumedang Utara',
    price: 'Gratis',
    rating: 4.6,
    image: candiRonggeng,
    description: 'Situs sejarah peninggalan kerajaan yang masih terjaga',
    fasilitas: ['Parkir', 'Toilet'],
    waktuTerbaik: 'Pagi - Siang',
    jamOperasional: '07.00 - 18.00'
  },
  {
    id: 3,
    name: 'Curug Cinulang',
    category: 'Alam',
    location: 'Kec. Sumedang Selatan',
    price: 'Rp3.000',
    rating: 5,
    image: curugCikaso,
    description: 'Air terjun dengan keindahan alam yang memukau',
    fasilitas: ['Parkir', 'Toilet', 'Warung Makan', 'Gazebo'],
    waktuTerbaik: 'Pagi - Sore',
    jamOperasional: '07.00 - 17.00'
  },
  {
    id: 4,
    name: 'Bukit Cinta Sumedang',
    category: 'Alam',
    location: 'Kec. Sumedang Utara',
    price: 'Rp10.000',
    rating: 3.8,
    image: gunungCiremai,
    description: 'Bukit dengan pemandangan sunset terbaik di Sumedang',
    fasilitas: ['Parkir', 'Toilet', 'Kamar Ganti'],
    waktuTerbaik: 'Sore - Malam',
    jamOperasional: '06.00 - 21.00'
  },
  {
    id: 5,
    name: 'Curug Ciputrawangi',
    category: 'Alam',
    location: 'Kec. Sumedang Selatan',
    price: 'Rp2.000',
    rating: 3.5,
    image: airTerjun,
    description: 'Air terjun tersembunyi di tengah hutan yang sejuk',
    fasilitas: ['Parkir', 'Toilet'],
    waktuTerbaik: 'Pagi - Siang',
    jamOperasional: '08.00 - 16.00'
  },
  {
    id: 6,
    name: 'Kebun Teh Cigugur ',
    category: 'Alam',
    location: 'Kec. Cigugur',
    price: 'Rp20.000',
    rating: 3.5,
    image: kebunTeh,
    description: 'Kebun teh yang masih alami ',
    fasilitas: ['Parkir', 'Toilet'],
    waktuTerbaik: 'Pagi - Siang',
    jamOperasional: '08.00 - 16.00'
  }

];

// ============================================================
// ===== FUNGSI UNTUK SPOT =====
// ============================================================

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(SPOTS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return null;
  }
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(SPOTS_KEY, JSON.stringify(data));
    console.log('✅ Data saved to localStorage:', data.length, 'items');
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

const loadNextIdFromStorage = () => {
  try {
    const stored = localStorage.getItem(NEXT_ID_KEY);
    if (stored) {
      return parseInt(stored, 10);
    }
    return null;
  } catch (error) {
    console.error('Error loading nextId from storage:', error);
    return null;
  }
};

const saveNextIdToStorage = (id) => {
  try {
    localStorage.setItem(NEXT_ID_KEY, String(id));
  } catch (error) {
    console.error('Error saving nextId to storage:', error);
  }
};

// ===== INITIALIZE DATA =====
let spots = loadFromStorage();
let nextId = loadNextIdFromStorage();

// Cek versi data — jika defaultSpots berubah, update data default di localStorage
const storedVersion = localStorage.getItem(VERSION_KEY);

if (!spots || spots.length === 0) {
  // Belum ada data sama sekali → isi dengan default
  spots = [...defaultSpots];
  saveToStorage(spots);
  localStorage.setItem(VERSION_KEY, String(DATA_VERSION));
} else if (parseInt(storedVersion) !== DATA_VERSION) {
  // Versi berubah → merge: update data default, pertahankan spot user
  const defaultIds = defaultSpots.map(s => s.id);
  
  // Ambil spot yang ditambahkan user (id bukan dari default)
  const userSpots = spots.filter(s => !defaultIds.includes(s.id));
  
  // Gabungkan: default terbaru + spot user
  spots = [...defaultSpots, ...userSpots];
  saveToStorage(spots);
  localStorage.setItem(VERSION_KEY, String(DATA_VERSION));
  console.log('🔄 Data default diperbarui ke versi', DATA_VERSION);
}

if (!nextId) {
  nextId = spots.length + 1;
  saveNextIdToStorage(nextId);
}

// ===== EXPORT FUNCTIONS SPOT =====
export const getSpots = () => {
  // SELALU BACA DARI LOCALSTORAGE
  const data = loadFromStorage();
  if (data) {
    spots = data;
    return [...spots];
  }
  return [...spots];
};

export const getSpotById = (id) => {
  // SELALU BACA DARI LOCALSTORAGE
  const data = loadFromStorage();
  if (data) {
    spots = data;
  }
  return spots.find(spot => spot.id === id);
};

export const addSpot = (spotData) => {
  // Baca data terbaru dari localStorage
  let currentSpots = loadFromStorage();
  let currentNextId = loadNextIdFromStorage();
  
  if (!currentSpots) currentSpots = [];
  if (!currentNextId) currentNextId = spots.length + 1;

  const newSpot = {
    id: currentNextId++,
    ...spotData,
    rating: 0,
    image: spotData.image || ''
  };

  currentSpots = [...currentSpots, newSpot];
  
  // Simpan ke localStorage
  saveToStorage(currentSpots);
  saveNextIdToStorage(currentNextId);
  
  // Update variable global
  spots = currentSpots;
  nextId = currentNextId;
  
  console.log('✅ Spot added:', newSpot.name, 'Total:', spots.length);
  
  return newSpot;
};

export const updateSpot = (id, updatedData) => {
  let currentSpots = loadFromStorage();
  if (!currentSpots) currentSpots = [];

  currentSpots = currentSpots.map(spot => 
    spot.id === id ? { ...spot, ...updatedData } : spot
  );
  
  saveToStorage(currentSpots);
  spots = currentSpots;
  
  console.log('✅ Spot updated:', id);
  
  return currentSpots.find(spot => spot.id === id);
};

export const deleteSpot = (id) => {
  let currentSpots = loadFromStorage();
  if (!currentSpots) currentSpots = [];

  currentSpots = currentSpots.filter(spot => spot.id !== id);
  
  saveToStorage(currentSpots);
  spots = currentSpots;
  
  console.log('🗑️ Spot deleted:', id, 'Remaining:', spots.length);
};

export const resetSpots = () => {
  spots = [...defaultSpots];
  nextId = defaultSpots.length + 1;
  
  saveToStorage(spots);
  saveNextIdToStorage(nextId);
  
  console.log('✅ Data spot telah direset ke default');
};

export const clearAllData = () => {
  localStorage.removeItem(SPOTS_KEY);
  localStorage.removeItem(NEXT_ID_KEY);
  localStorage.removeItem(REVIEWS_KEY);
  spots = [];
  nextId = 1;
  console.log('🗑️ Semua data telah dihapus');
};

export const getStorageInfo = () => {
  const stored = localStorage.getItem(SPOTS_KEY);
  const nextIdStored = localStorage.getItem(NEXT_ID_KEY);
  return {
    totalData: stored ? JSON.parse(stored).length : 0,
    nextId: nextIdStored || 'N/A',
    data: stored ? JSON.parse(stored) : []
  };
};

// ============================================================
// ===== FUNGSI UNTUK REVIEW =====
// ============================================================

const loadReviewsFromStorage = () => {
  try {
    const stored = localStorage.getItem(REVIEWS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error) {
    console.error('Error loading reviews from storage:', error);
    return [];
  }
};

const saveReviewsToStorage = (data) => {
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving reviews to storage:', error);
  }
};

export const getReviews = (spotId) => {
  const reviews = loadReviewsFromStorage();
  if (spotId) {
    return reviews.filter(review => review.spotId === spotId);
  }
  return reviews;
};

export const addReview = (reviewData) => {
  const reviews = loadReviewsFromStorage();
  
  const newReview = {
    id: Date.now(),
    ...reviewData,
    date: new Date().toISOString()
  };
  
  reviews.push(newReview);
  saveReviewsToStorage(reviews);
  
  // Update rating spot
  const spotReviews = reviews.filter(r => r.spotId === reviewData.spotId);
  const avgRating = spotReviews.reduce((acc, r) => acc + r.rating, 0) / spotReviews.length;
  
  // Update spot rating di localStorage
  let currentSpots = loadFromStorage();
  if (currentSpots) {
    currentSpots = currentSpots.map(spot => 
      spot.id === reviewData.spotId 
        ? { ...spot, rating: Math.round(avgRating * 10) / 10 }
        : spot
    );
    saveToStorage(currentSpots);
    spots = currentSpots;
  }
  
  return newReview;
};

export const deleteReview = (reviewId) => {
  let reviews = loadReviewsFromStorage();
  reviews = reviews.filter(review => review.id !== reviewId);
  saveReviewsToStorage(reviews);
};

export const getReviewsBySpot = (spotId) => {
  const reviews = loadReviewsFromStorage();
  return reviews.filter(review => review.spotId === spotId);
};