# 📚 TASKORA - Task Organizer Assistant

TASKORA (Task Organizer Assistant) merupakan aplikasi berbasis web yang dikembangkan menggunakan React.js dan Vite untuk membantu mahasiswa mengelola tugas kuliah secara lebih terorganisir. Aplikasi ini menerapkan konsep CRUD (Create, Read, Update, Delete) dengan penyimpanan data menggunakan Local Storage sehingga data tetap tersimpan meskipun halaman di-refresh.

---

## 👥 Kelompok

| Nama | NIM |
|------|------|
| Rahma Nadya | 240160221035 |
| Putri Indra Lestari Aryanto | 240160221034 |
| Siti Khodijah | 240160221045 |
| Nabilla Natasya Putri | 240160221029 |

---

## 🎓 Mata Kuliah

**Pemrograman Berbasis Web Front-End**

Program Studi **S1 Sistem Informasi**

---

# 📖 Deskripsi Aplikasi

TASKORA merupakan aplikasi manajemen tugas yang membantu pengguna dalam mencatat, mengelola, memantau, dan menyelesaikan tugas kuliah secara lebih efektif.

Aplikasi ini dibangun menggunakan **React.js** dengan **Vite** sebagai build tool dan menerapkan konsep **lifting state up**. Seluruh data disimpan menggunakan **Local Storage** sehingga data tetap tersedia walaupun browser ditutup atau halaman di-refresh.

---

# ✨ Fitur Aplikasi

## ✅ Create
- Menambahkan tugas baru
- Validasi form
- Input mata kuliah
- Input judul tugas
- Input deadline
- Input prioritas

## ✅ Read
- Menampilkan seluruh daftar tugas
- Dashboard ringkasan tugas
- Deadline terdekat
- Kalender tugas
- Statistik tugas

## ✅ Update
- Checklist penyelesaian tugas
- Progress bar otomatis berdasarkan checklist
- Status tugas berubah menjadi selesai ketika checklist telah terpenuhi

## ✅ Delete
- Menghapus tugas
- Konfirmasi penghapusan menggunakan `window.confirm()`

---

# 🔍 Fitur Tambahan

- 🔎 Search tugas berdasarkan judul
- 📚 Filter berdasarkan mata kuliah
- 📌 Filter berdasarkan status (Aktif / Selesai)
- 📊 Progress Bar
- 📅 Kalender Deadline
- 🔔 Notifikasi Deadline Hari Ini
- 📈 Statistik Tugas
- 💾 Penyimpanan data menggunakan Local Storage
- 📱 Responsive User Interface

---

# 🗂 Struktur Data

```javascript
{
  id: number,
  matkul: string,
  judul: string,
  priority: string,
  deadline: Date,
  pengingat: string,
  deskripsi: string,
  checklist: [
    {
      id: string,
      label: string,
      done: boolean
    }
  ]
}
```

---

# 💻 Teknologi yang Digunakan

- React.js
- Vite
- JavaScript (ES6)
- CSS
- Local Storage
- Lucide React Icons

---

# ▶️ Cara Menjalankan Project

Clone repository

```bash
git clone <repository-url>
```

Masuk ke folder project

```bash
cd taskora
```

Install dependency

```bash
npm install
```

Menjalankan project

```bash
npm run dev
```

---

# 🌐 Demo Aplikasi

GitHub Repository

> https://github.com/PutriIndraa/kelompok5.git

Live Demo

> https://kelompok5-bvod.vercel.app/

---

# 📌 Pemenuhan Kriteria UAS

✅ React + Vite

✅ CRUD (Create, Read, Update, Delete)

✅ Lifting State Up

✅ Props & Component

✅ Local Storage

✅ Search

✅ Filter

✅ Progress Checklist

✅ Dashboard

✅ Statistik

✅ Kalender

✅ Responsive UI

---

# 👨‍💻 Author

Kelompok TASKORA

- Rahma Nadya
- Putri Indra Lestari Aryanto
- Siti Khodijah
- Nabilla Natasya Putri

---

Terima kasih telah menggunakan **TASKORA - Task Organizer Assistant** 📚✨