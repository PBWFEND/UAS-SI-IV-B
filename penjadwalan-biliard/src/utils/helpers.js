// Generate ID unik
export const generateId = () => {
  return String(+new Date()) + '-' + Math.random().toString(36).slice(2, 6);
};

// Daftar meja yang tersedia
export const AVAILABLE_TABLES = ['Meja A', 'Meja B', 'Meja C', 'Meja D', 'Meja E', 'Meja F'];

// Format tanggal Indonesia
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Cek apakah ada bentrok jadwal
export const isTableBooked = (schedules, tableName, date, startTime, endTime, excludeId = null) => {
  return schedules.some(item => 
    item.id !== excludeId &&
    item.tableName === tableName &&
    item.scheduleDate === date &&
    item.status === 'dipesan' &&
    ((startTime >= item.startTime && startTime < item.endTime) ||
     (endTime > item.startTime && endTime <= item.endTime) ||
     (startTime <= item.startTime && endTime >= item.endTime))
  );
};