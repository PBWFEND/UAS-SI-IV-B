# UJIAN AKHIR SEMESTER (UAS) GENAP

## TAHUN AKADEMIK 2025/2026

**Mata Kuliah**: Pemrograman Berbasis Web Front-End

**Semester/SKS**: IV-A/B / 3 SKS

**Program Studi**: S1 Sistem Informasi

**Hari / Tanggal**: ........................................................

**Waktu**: .................... s.d. ....................

**Dosen**: Yanyan Sofiyan, M.Kom.

**Bentuk Soal**: Proyek

**Pelaksanaan**: Daring (Online)

---

### A. DESKRIPSI UMUM

Anda diberi kebebasan untuk memilih dan merancang sendiri tema aplikasi, dengan syarat utama aplikasi tersebut merupakan aplikasi **CRUD (Create, Read, Update, Delete)**. Fokus utama penilaian adalah pada **logika CRUD yang fungsional** dan **Antarmuka Pengguna (UI/UX) yang baik**. Seluruh pengelolaan data dilakukan di sisi klien (*client-side*).

---

### B. TEMA PROYEK: BEBAS & KREATIF

Pilihlah sebuah ide aplikasi yang memungkinkan pengguna untuk mengelola sekumpulan data. Kreativitas dalam memilih tema sangat dihargai, selama semua persyaratan teknis di bawah ini terpenuhi.

**Contoh Ide Proyek (Anda tidak harus memilih dari daftar ini):**

* **Aplikasi Manajemen Tugas (To-do List):** Menambah, melihat, menandai selesai, dan menghapus tugas.
* **Aplikasi Pencatat Keuangan Sederhana:** Mencatat pemasukan dan pengeluaran keuangan.
* **Aplikasi Daftar Kontak:** Mengelola daftar kontak teman, keluarga, atau kolega.
* **Aplikasi Catatan Sederhana (Simple Notes):** Membuat, membaca, mengedit, dan menghapus catatan singkat.
* **Aplikasi Manajemen Buku (Bookshelf App):** Mengelola koleksi buku yang sudah atau akan dibaca.

#### 1. Struktur Data

Anda bebas menentukan struktur data untuk setiap `item` di aplikasi Anda, namun **wajib memiliki**:

* Sebuah `id` yang unik (bisa menggunakan `String(+new Date())` atau library seperti `uuid`).
* Minimal **dua properti data lainnya** (contoh: `{ title: 'Belajar React', isDone: false }`).

> **Contoh Referensi:** > Untuk proyek "Aplikasi Manajemen Buku", Anda bisa menggunakan struktur data yang lebih detail seperti ini:
> ```javascript
> {
>   id: string,         // ID unik (timestamp string)
>   title: string,      // Judul buku
>   author: string,     // Nama penulis
>   isRead: boolean,    // Status sudah dibaca atau belum
>   addedDate: string   // Tanggal penambahan (format lokal)
> }
> 
> ```
> 
> 
> *Live Demo Referensi:* [https://book-managers.netlify.app](https://book-managers.netlify.app)

> *Repository* : [https://github.com/yysofiyan/example-book-manager](https://github.com/yysofiyan/example-book-manager)

#### 2. Persistensi Data (Wajib)

Gunakan `localStorage` untuk menyimpan data agar data tidak hilang saat browser ditutup atau di-*refresh*. Manfaatkan *hook* `useEffect` untuk melakukan sinkronisasi antara *state* aplikasi dengan `localStorage`.

---

### C. PERSYARATAN TEKNIS & FUNGSIONALITAS WAJIB

Apapun tema yang Anda pilih, aplikasi Anda **WAJIB** memiliki komponen dan fungsionalitas berikut:

#### 1. Struktur & State Management (Bobot: 25%)

* Gunakan **Vite** untuk inisialisasi proyek.
* Terapkan konsep *"lifting state up"*: *State* utama (array data) harus berada di komponen level atas (`App.jsx`) dan fungsi *handler* (untuk CRUD) dioper ke komponen anak melalui *props*.
* Buat komponen yang logis, modular, dan dapat digunakan kembali (misal: `FormInput`, `ItemList`, `Item`).

#### 2. Fungsionalitas CRUD (Bobot: 40%)

* **CREATE**: Sediakan form untuk menambah data baru. Form harus menyertakan validasi dasar (misal: input utama tidak boleh kosong).
* **READ**: Tampilkan semua data yang ada dengan jelas.
* *(Nilai Plus)*: Jika data dapat dikelompokkan berdasarkan kategori atau status (misal: "Tugas Belum Selesai" dan "Tugas Selesai").


* **UPDATE**: Sediakan cara untuk mengubah data yang sudah ada.
* *Minimal*: Pengguna harus bisa mengubah satu properti (misal: mengubah status dari "belum selesai" menjadi "selesai").
* *(Nilai Plus)*: Adanya fungsionalitas edit penuh (mengubah teks/konten) melalui sebuah form.


* **DELETE**: Sediakan tombol untuk menghapus data. Wajib menampilkan dialog konfirmasi menggunakan `window.confirm()` sebelum data dihapus secara permanen.

#### 3. UI/UX & Interaktivitas (Bobot: 20%)

* **Desain Antarmuka**: Tampilan harus bersih, rapi, responsif, dan mudah dipahami oleh pengguna.
* **Umpan Balik (Feedback)**: Berikan umpan balik yang jelas kepada pengguna (misal: form otomatis dikosongkan setelah *submit* berhasil, adanya notifikasi sukses, dll).
* **Fitur Pencarian/Filter**: Wajib menyediakan fitur untuk mencari atau memfilter data berdasarkan salah satu propertinya secara *real-time*.

#### 4. Deployment & Kualitas Kode (Bobot: 15%)

* Kode program harus bersih, terstruktur, terindentasi dengan baik, dan mudah dibaca.
* Unggah proyek ke repositori **GitHub**.
* *Deploy* aplikasi Anda ke **Vercel** atau **Netlify** dan pastikan dapat diakses secara publik dengan baik.

---

### D. KRITERIA PENILAIAN RINCI

| Kriteria Penilaian | Bobot |
| --- | --- |
| **Fungsionalitas CRUD Lengkap & Benar** (Aplikasi berjalan tanpa error) | 40% |
| **Manajemen State, Props, & Alur Data** (Sesuai kaidah React) | 25% |
| **Desain UI/UX dan Interaktivitas Pengguna** (Kerapian & Fitur Pencarian) | 20% |
| **Kualitas Kode, Deployment, & Dokumentasi** | 15% |
| **TOTAL** | **100%** |

---

### E. PROSEDUR PENGUMPULAN

1. Buat file `README.md` yang informatif di dalam repositori GitHub Anda.
2. File `README.md` tersebut wajib memuat informasi berikut:
* **Nama Kelompok & NIM** anggota.
* **Tema & Deskripsi Aplikasi**: Jelaskan latar belakang aplikasi yang dibuat serta fitur-fiturnya.
* **Struktur Data**: Jelaskan struktur objek/properti data yang digunakan.
* **Link Demo Live**: URL tautan aktif dari hasil *deploy* di [Vercel]([https://](https://vercel.com)) / [Netlify]([https://](https://app.netlify.com/))


3. Lakukan *Push* hasil akhir proyek ke repositori kelas:
👉 [https://github.com/PBWFEND/UAS-SI-IV-B](https://github.com/PBWFEND/UAS-SI-IV-B)

---

*Selamat Mengerjakan, Happy Coding!*