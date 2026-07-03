KELOMPOK 2
Anggota :
1. Aprilliana Fratiwi (240160221004)
2. Cinta Rahmia Yulianti (240160221005)
3. Kikan Khairani (240160221019)
4. Lintang Azzahra Govarana (240160221021)



Aplikasi Travel Wishlist adalah aplikasi web untuk mencatat, mengelola, dan memantau destinasi wisata impian Anda secara mudah dan modern. Dibangun dengan React dan Vite, serta mengusung tema UI Neobrutalism yang konsisten dan responsif.

Struktur Direktori
text
wishlist-travel/
├── node_modules/
├── public/
│   ├── favicon.ico
│   └── screenshot.png
├── src/
│   ├── assets/
│   │   ├── logo.svg
│   │   └── default-destination.png
│   ├── components/
│   │   ├── DestinationForm.jsx
│   │   ├── DestinationItem.jsx
│   │   ├── DestinationList.jsx
│   │   ├── FilterButtons.jsx
│   │   └── SearchBar.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md


Penjelasan Direktori
Direktori / File	Deskripsi
public/	Berisi file statis yang bisa diakses langsung browser (favicon, screenshot, dsb)
src/assets/	Aset gambar/icon yang digunakan di aplikasi (logo, default image, dsb)
src/components/common/	Komponen reusable (Header, Footer, Toast, ConfirmationModal, Pagination)
src/components/destinations/	Komponen utama untuk manajemen destinasi: DestinationForm, DestinationList, DestinationItem, DestinationStats, SearchBar, FilterDropdown, SortDropdown
src/components/layout/	Komponen layout seperti MainLayout
src/context/	Context API untuk state management global (DestinationContext)
src/hooks/	Custom hooks untuk logika reusable (useLocalStorage, useToast)
src/styles/	CSS modular dengan struktur: base.css (reset & variabel), layouts.css, components.css, utilities.css
src/utils/	Fungsi pembantu (helpers.js) dan konstanta (constants.js)
src/App.jsx	Komponen utama yang mengatur seluruh flow aplikasi
src/main.jsx	Entry point React, mounting ke DOM
src/index.css	Style global, import Tailwind dan custom CSS
package.json	Daftar dependencies dan script npm
tailwind.config.js, postcss.config.js, vite.config.js	Konfigurasi tools build dan styling
README.md	Dokumentasi project ini


Fitur Utama
Fitur	Deskripsi
    Tambah Destinasi:	Menambahkan destinasi baru dengan nama, negara, benua, status tanggal rencana, rating, dan catatan
    Edit Destinasi :	Mengubah informasi destinasi yang sudah tersimpan
    Hapus Destinasi :	Menghapus destinasi dengan konfirmasi modal untuk mencegah kesalahan
    Pencarian :	Mencari destinasi berdasarkan nama atau negara dengan debounce 300ms
    Filter Benua :	Menyaring destinasi berdasarkan 7 benua (Asia, Eropa, Amerika Utara, Amerika Selatan, Afrika, Oseania, Antartika)
    Filter Status :	Menyaring berdasarkan status perjalanan (Wishlist, Merencanakan, Sudah Dipesan, Sudah Dikunjungi)
    Sorting :	Mengurutkan berdasarkan nama (A-Z/Z-A), tanggal rencana (terdekat/terjauh), rating tertinggi, dan tanggal ditambahkan
    Rating Bintang :	Memberikan rating 1–5 bintang untuk setiap destinasi
    Statistik :	Menampilkan total destinasi dan jumlah per status
    Pagination :	Membagi daftar destinasi per halaman (6 item per halaman)
    Notifikasi Toast :	Umpan balik visual untuk aksi CRUD (sukses/error)
    Konfirmasi Modal :	Konfirmasi sebelum menghapus data
    Penyimpanan Lokal :	Data tersimpan di localStorage (persisten meskipun halaman di-refresh)
    UI Modern & Responsif :	Tema Neobrutalism dengan gradien, bayangan, dan animasi halus.