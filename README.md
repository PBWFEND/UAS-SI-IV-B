KELOMPOK 6
No	Nama	NIM
1	Muhamad Kurnia	- 240160221025
2	Fadhlan Mahdan Ghani	- 240160221012
3	Rully Iksan Risandy	- 240160221042
4	Patria Yustisi	- 240160221033

🎱 TEMA & DESKRIPSI APLIKASI
Aplikasi Penjadwalan Biliard
Aplikasi Penjadwalan Biliard adalah sistem manajemen pemesanan meja biliard berbasis web yang dibangun menggunakan React.js dan Vite. Aplikasi ini dirancang untuk memudahkan pengelolaan jadwal pemesanan meja biliard secara digital, menggantikan sistem pencatatan manual yang rentan terhadap kesalahan dan konflik jadwal.

Latar Belakang
Di tempat usaha biliard, sering terjadi masalah seperti:

Pemesanan meja yang bentrok (double booking)

Kesulitan mencatat jadwal secara manual

Kesalahan dalam menghitung durasi dan biaya sewa

Susahnya mencari jadwal yang tersedia

Oleh karena itu, kami mengembangkan aplikasi ini untuk memberikan solusi yang praktis dan efisien bagi pengelola usaha biliard.

✨ Fitur-Fitur Aplikasi
1. Manajemen Jadwal
➕ Tambah Jadwal: Menambahkan pemesanan baru dengan mengisi form (nama, telepon, tanggal, waktu, meja)

📋 Daftar Jadwal: Menampilkan semua jadwal pemesanan yang sudah terdaftar

✏️ Edit Jadwal: Mengubah data pemesanan yang sudah ada

🗑️ Hapus Jadwal: Menghapus jadwal pemesanan yang tidak aktif

2. Pencarian & Filter
🔍 Pencarian: Mencari jadwal berdasarkan nama pemesan atau nomor telepon

📅 Filter Tanggal: Menampilkan jadwal berdasarkan tanggal tertentu

📊 Sortir: Mengurutkan jadwal berdasarkan tanggal dan waktu

3. Validasi & Keamanan
✅ Validasi Input: Memastikan data yang dimasukkan valid (nama wajib, nomor telepon 10-13 digit, waktu valid)

🚫 Cek Ketersediaan Meja: Mencegah double booking dengan mengecek ketersediaan meja pada waktu yang dipilih

💰 Perhitungan Otomatis: Menghitung durasi dan total harga secara otomatis

4. Penyimpanan Data
💾 LocalStorage: Data tersimpan di browser menggunakan LocalStorage

🔄 Persistent Data: Data tetap tersimpan meskipun browser ditutup dan dibuka kembali

5. User Interface
🎨 Responsive Design: Tampilan yang responsif untuk berbagai ukuran layar

🖥️ User-Friendly: Antarmuka yang intuitif dan mudah digunakan

penjadwalan-biliard/
│
├── public/                          # File statis publik
│   └── (assets publik)
│
├── src/                             # Source code utama
│   ├── assets/                      # Aset statis (gambar, font, dll)
│   │
│   ├── components/                  # Komponen React
│   │   ├── DaftarJadwal.jsx         # Menampilkan daftar jadwal
│   │   ├── FormTambah.jsx           # Form untuk menambah jadwal
│   │   ├── ItemJadwal.jsx           # Komponen item jadwal
│   │   └── Pencarian.jsx            # Komponen pencarian jadwal
│   │
│   ├── hooks/                       # Custom hooks React
│   │   └── useLocalStorage.js       # Hook untuk manajemen LocalStorage
│   │
│   ├── utils/                       # Utility functions
│   │   └── helpers.js               # Fungsi-fungsi pembantu
│   │
│   ├── App.css                      # Styling utama aplikasi
│   ├── App.jsx                      # Komponen utama aplikasi
│   ├── index.css                    # Styling global
│   └── main.jsx                     # Entry point React
│
├── .eslintrc.cjs                    # Konfigurasi ESLint
├── .gitignore                       # File yang diabaikan Git
├── eslint.config.js                 # Konfigurasi ESLint (alternatif)
├── index.html                       # Template HTML utama
├── package-lock.json                # Lock file dependency
├── package.json                     # Dependensi dan script proyek
├── README.md                        # Dokumentasi proyek
├── vite.config.js                   # Konfigurasi Vite
└── README.md                        # (Duplicate - mungkin typo)

KETERANGAN FILE
File/Folder	Fungsi
public/	Menyimpan file statis seperti favicon, logo, atau asset publik lainnya
src/assets/	Menyimpan aset seperti gambar, icon, atau font yang digunakan di komponen
src/components/	Berisi semua komponen React yang digunakan dalam aplikasi
src/hooks/	Berisi custom hooks React, termasuk useLocalStorage.js untuk penyimpanan data
src/utils/	Berisi fungsi utilitas/helper untuk logika bisnis aplikasi
App.jsx	Komponen root yang mengatur routing dan state global
main.jsx	Entry point aplikasi, merender App ke DOM
index.html	Template HTML utama dengan div root untuk React
package.json	Mengelola dependencies dan script proyek
vite.config.js	Konfigurasi build tool Vite
.eslintrc.cjs	Konfigurasi linting untuk kode JavaScript/React

link demo project kelompok 6:https://penjadwalan-biliard.netlify.app/