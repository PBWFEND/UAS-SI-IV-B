# UJIAN AKHIR SEMESTER (UAS) GENAP TAHUN AKADEMIK 2025/2026

**Mata Kuliah**: Pemrograman Berbasis Web Front-End  
**Semester/SKS**: IV-A/B / 3 SKS  
**Program Studi**: S1 Sistem Informasi  
**Hari/Tanggal**: 
**Waktu**:   -
**Dosen**: Yanyan Sofiyan, M.Kom.  
**Bentuk Soal**: ~~Analisis/Essay/Pilihan Ganda/Presentasi/Penugasan~~/Proyek \*)  
**Pelaksanaan**: ~~Luring~~ / Daring \*)

---

### A. Deskripsi Umum
Anda diberi kebebasan untuk memilih dan merancang sendiri tema aplikasi, dengan syarat utama aplikasi tersebut merupakan aplikasi **CRUD (Create, Read, Update, Delete)**. Fokus utama penilaian adalah pada **logika CRUD yang fungsional** dan **antarmuka pengguna (UI/UX) yang baik**. Seluruh data akan dikelola di sisi klien (client-side).

### B. Tema Proyek: Bebas & Kreatif
Pilihlah sebuah ide aplikasi yang memungkinkan pengguna untuk mengelola sekumpulan data. Kreativitas dalam memilih tema dihargai, selama semua persyaratan teknis di bawah ini terpenuhi.

**Contoh Ide Proyek (Anda tidak harus memilih dari daftar ini):**
- **Aplikasi Manajemen Tugas (To-do List):** Menambah, melihat, menandai selesai, dan menghapus tugas.
- **Aplikasi Pencatat Keuangan Sederhana:** Mencatat pemasukan dan pengeluaran.
- **Aplikasi Daftar Kontak:** Mengelola daftar kontak teman atau kolega.
- **Aplikasi Catatan Sederhana (Simple Notes):** Membuat, mengedit, dan menghapus catatan singkat.
- **Aplikasi Manajemen Buku (Bookshelf App):** Mengelola koleksi buku yang sudah atau akan dibaca.

#### Struktur Data
Anda bebas menentukan struktur data untuk setiap `item` di aplikasi Anda, namun **wajib memiliki**:

- Sebuah `id` yang unik (bisa menggunakan `String(+new Date())` atau library seperti `uuid`).
- Minimal **dua properti data lainnya** (contoh: `{ title: 'Belajar React', isDone: false }`).

Sebagai **contoh referensi**, untuk proyek "Aplikasi Manajemen Buku", Anda bisa menggunakan struktur data yang lebih detail seperti ini:

```javascript
// HANYA CONTOH
{
  id: string,         // ID unik (timestamp string)
  title: string,      // Judul buku
  author: string,     // Nama penulis
  isRead: boolean,    // Status sudah dibaca/belum
  addedDate: string   // Tanggal penambahan (format lokal)
}
```
> Live Demo : https://book-managers.netlify.app

Persistensi Data (Wajib)

Gunakan `localStorage` untuk menyimpan data agar tidak hilang saat browser ditutup atau di-refresh. Manfaatkan hook `useEffect` untuk melakukan sinkronisasi antara state aplikasi dengan `localStorage`.


C. Persyaratan Teknis & Fungsionalitas Wajib

Apapun tema yang Anda pilih, aplikasi Anda WAJIB memiliki fungsionalitas berikut:

1. Struktur & State Management (Bobot: 25%)

- Gunakan Vite untuk inisialisasi proyek.
- Terapkan konsep _"lifting state up"_: `State` utama (array data) harus berada di komponen level atas (`App.jsx`) dan fungsi `handler` (untuk CRUD) dioper ke komponen anak melalui props.
- Buat komponen yang logis dan dapat digunakan kembali (misal: `FormInput`, `ItemList`, `Item`).

2. Fungsionalitas `CRUD (Create, Read, Update, Delete)` (Bobot: 40%)

- **CREATE**: Sediakan form untuk menambah data baru. Form harus menyertakan validasi dasar (misal: input utama tidak boleh kosong).

- **READ**: Tampilkan semua data yang ada dengan jelas.

  - (Nilai Plus): Jika data dapat dikelompokkan berdasarkan kategori atau status (misal: "Tugas Belum Selesai" dan "Tugas Selesai").

- **UPDATE**: Sediakan cara untuk mengubah data yang sudah ada.

  - **Minimal**: Pengguna harus bisa mengubah satu properti (misal: mengubah status dari "belum selesai" menjadi "selesai").
  - (Nilai Plus): Adanya fungsionalitas edit penuh melalui sebuah form.

- **DELETE**: Sediakan tombol untuk menghapus data. Wajib menampilkan dialog konfirmasi (`gunakan window.confirm()`) sebelum data dihapus permanen.

3. UI/UX & Interaktivitas (Bobot: 20%)

- Desain Antarmuka: Tampilan harus bersih, rapi, dan mudah dipahami oleh pengguna.

- **Umpan Balik (Feedback)**: Berikan umpan balik yang jelas kepada pengguna (misal: `form` dikosongkan setelah `submit` berhasil, notifikasi sederhana, dll).

- **Fitur Pencarian/Filter**: Wajib ada fitur untuk mencari atau memfilter data berdasarkan salah satu propertinya secara `real-time.`

4. Deployment & Kualitas Kode (Bobot: 15%)

- Kode harus bersih, terstruktur, dan mudah dibaca.

- Unggah proyek ke repositori `GitHub`.

- Deploy aplikasi Anda ke `Vercel` atau `Netlify` dan pastikan berfungsi dengan baik.

D. Kriteria Penilaian Rinci

| Kriteria | Bobot |
|----------|-------|
| Fungsionalitas CRUD Lengkap & Benar | 40% |
| Manajemen State, Props, & Alur Data | 25% |
| Desain UI/UX dan Interaktivitas Pengguna | 20% |
| Kualitas Kode, Deployment, & Dokumentasi | 15% |
| Total | 100% |

E. Prosedur Pengumpulan

1. Buat file `README.md` yang informatif di dalam repositori GitHub Anda.
2. File README.md wajib berisi:

   - **Nama Kelompok & NIM** Anda.
   - **Tema & Deskripsi Aplikasi:** Jelaskan aplikasi apa yang Anda buat dan fitur-fiturnya.
   - **Struktur Data**: Jelaskan struktur objek yang Anda gunakan untuk aplikasi Anda.
   - **Link Aplikasi Live**: URL Vercel/Netlify Anda yang sudah berfungsi.

3. Push ke repositori https://github.com/PBWFEND/UAS