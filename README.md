# AktivitasKu — Aplikasi Manajemen Kegiatan

> Proyek UAS Mata Kuliah Pemrograman Berbasis Web Front-End  
> Semester Genap 2025/2026 | Program Studi S1 Sistem Informasi

---

## 👥 Identitas Kelompok

Kelompok 1  
SI IV-B

| No | Nama |
|----|------|
| 1 | M. Rifqie Jiwara |240160221027
| 2 | Desfryansyah N.I |240160221023
| 3 | Rendi Fergian Sukmawan |240160221037
| 4 | Zhilan Maulana |24010221049

link website : https://aktifitasku.netlify.app

**Dosen:** Yanyan Sofiyan, M.Kom.

---

## 📋 Deskripsi Aplikasi

**AktivitasKu** adalah aplikasi manajemen kegiatan (activity manager) berbasis web yang dibangun menggunakan HTML, CSS, dan JavaScript murni (tanpa framework). Aplikasi ini dirancang dengan tampilan premium dan modern menggunakan tema gelap (dark theme) yang elegan.

### Latar Belakang

Aplikasi ini lahir dari kebutuhan nyata mahasiswa dan profesional muda yang ingin mengelola kegiatan harian secara terstruktur, tepat waktu, dan tidak melewatkan deadline penting. Dengan fitur notifikasi alarm berbasis browser, pengguna akan selalu diingatkan ketika waktu kegiatan telah tiba.

### Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| ➕ **Tambah Kegiatan** | Form input lengkap dengan validasi dasar |
| 📋 **Lihat Kegiatan** | Tampilan grid/list dengan pengelompokan Aktif & Selesai |
| ✏️ **Edit Kegiatan** | Modal edit penuh untuk mengubah semua properti |
| 🗑️ **Hapus Kegiatan** | Hapus dengan konfirmasi dialog `window.confirm()` |
| ✅ **Toggle Status** | Tandai kegiatan sebagai selesai atau aktif kembali |
| 🔍 **Pencarian Real-time** | Filter kegiatan langsung saat mengetik |
| 🏷️ **Filter Kategori** | Filter berdasarkan kategori (Personal, Kuliah, Kerja, dll.) |
| 📊 **Statistik** | Ringkasan jumlah total, aktif, dan selesai di sidebar |
| 📅 **Progress Bar** | Progress kegiatan hari ini secara visual |
| ⏰ **Notifikasi Alarm** | Alarm browser + toast saat waktu kegiatan tiba |
| 🌙 **Jam Digital** | Jam real-time yang selalu terbarui |
| 🔄 **Sortir Data** | Sortir berdasarkan terbaru, terlama, prioritas, A-Z, atau tanggal |
| 📱 **Responsif** | Tampilan optimal di desktop, tablet, dan mobile |
| 💾 **Penyimpanan Lokal** | Data tersimpan di `localStorage`, tidak hilang saat refresh |

---

## 🗂️ Struktur Data

Setiap kegiatan disimpan sebagai objek JavaScript dengan struktur berikut:

```javascript
{
  id:          string,  // ID unik (timestamp + random)
  title:       string,  // Nama kegiatan (wajib, maks. 80 karakter)
  description: string,  // Deskripsi singkat (opsional, maks. 200 karakter)
  category:    string,  // 'personal' | 'kuliah' | 'kerja' | 'kesehatan' | 'lainnya'
  priority:    string,  // 'rendah' | 'sedang' | 'tinggi'
  date:        string,  // Tanggal target format YYYY-MM-DD (opsional)
  time:        string,  // Waktu notifikasi format HH:MM (opsional)
  isDone:      boolean, // Status selesai (true/false)
  createdAt:   number,  // Timestamp pembuatan (ms Unix)
}
```

Data disimpan di `localStorage` dengan key `aktivitasku_v1` sebagai array JSON.

---

## 🗃️ Struktur Proyek

```
activity-manager/
├── index.html          # Halaman utama & markup HTML
├── css/
│   └── style.css       # Seluruh styling (design tokens, komponen, responsif)
├── js/
│   └── app.js          # Logika CRUD, render, notifikasi, state management
└── README.md           # Dokumentasi proyek
```

---

## ⚙️ Cara Menjalankan

1. Clone atau download repositori ini
2. Buka file `index.html` langsung di browser
3. Tidak memerlukan server atau instalasi apapun
4. Izinkan notifikasi browser untuk fitur alarm

---

## 🎨 Desain & Teknologi

- **HTML5** — Markup semantik, aksesibel, ARIA attributes
- **CSS3** — Custom properties (CSS variables), Grid, Flexbox, animasi, media query
- **JavaScript ES6+** — Modular, `'use strict'`, DOM API, localStorage API, Notification API
- **Google Fonts** — Plus Jakarta Sans + Space Grotesk
- **Color Palette:**
  - Background: `#0d0f14` (deep dark)
  - Primary: `#7c6dfa` (violet)
  - Accent: `#32d4a4` (teal green)
  - Warning: `#f5a623` (amber)
  - Danger: `#f55f5f` (coral red)

---

## 🔗 Link Demo

> _(Akan diisi setelah deployment ke Vercel/Netlify)_

---

*Selamat Mengerjakan — Kelompok 1, SI IV-B 🚀*