// Kumpulan fungsi bantu: tanggal, perhitungan progress, dan data tugas awal.

export function addDays(base, n) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

export function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function fmtDate(d) {
  const BULAN = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

export function relativeLabel(d, today) {
  const diff = Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate()) -
      new Date(today.getFullYear(), today.getMonth(), today.getDate())) /
      86400000
  );
  if (diff < 0) return "Terlambat";
  if (diff === 0) return "Hari ini";
  if (diff === 1) return "Besok";
  return `${diff} hari lagi`;
}

export function progressOf(task) {
  const total = task.checklist.length || 1;
  const done = task.checklist.filter((c) => c.done).length;
  return Math.round((done / total) * 100);
}

export function makeInitialTasks(today) {
  return [
    {
      id: 1, matkul: "UI/UX Design", judul: "Prototype Aplikasi", priority: "High",
      deadline: addDays(today, 0), pengingat: "1 hari sebelumnya",
      deskripsi: "Buat prototype aplikasi sesuai flow yang sudah ditentukan pada Figma.",
      checklist: [
        { id: "c1", label: "Riset & Referensi", done: true },
        { id: "c2", label: "Wireframe", done: true },
        { id: "c3", label: "High Fidelity Prototype", done: false },
        { id: "c4", label: "User Testing", done: false },
      ],
    },
    {
      id: 2, matkul: "Basis Data", judul: "ERD & Normalisasi", priority: "Medium",
      deadline: addDays(today, 1), pengingat: "1 hari sebelumnya",
      deskripsi: "Rancang ERD dan lakukan normalisasi hingga bentuk normal ketiga (3NF).",
      checklist: [
        { id: "c1", label: "Identifikasi entitas", done: true },
        { id: "c2", label: "Rancang ERD", done: true },
        { id: "c3", label: "Normalisasi 1NF-3NF", done: false },
        { id: "c4", label: "Review dosen", done: false },
        { id: "c5", label: "Finalisasi", done: false },
      ],
    },
    {
      id: 3, matkul: "Algoritma & Struktur Data", judul: "Tugas 3 \u2013 Sorting", priority: "Medium",
      deadline: addDays(today, 3), pengingat: "2 hari sebelumnya",
      deskripsi: "Implementasi dan analisis kompleksitas algoritma sorting (merge sort & quick sort).",
      checklist: [
        { id: "c1", label: "Pelajari materi", done: true },
        { id: "c2", label: "Implementasi merge sort", done: false },
        { id: "c3", label: "Implementasi quick sort", done: false },
        { id: "c4", label: "Analisis kompleksitas", done: false },
        { id: "c5", label: "Tulis laporan", done: false },
      ],
    },
    {
      id: 4, matkul: "Bahasa Inggris", judul: "Essay: Education", priority: "Low",
      deadline: addDays(today, 6), pengingat: "Tanpa pengingat",
      deskripsi: "Tulis essay argumentatif minimal 500 kata tentang pendidikan di era digital.",
      checklist: [
        { id: "c1", label: "Outline essay", done: false },
        { id: "c2", label: "Draft pertama", done: false },
        { id: "c3", label: "Revisi & grammar check", done: false },
      ],
    },
    {
      id: 5, matkul: "Kewirausahaan", judul: "Business Model Canvas", priority: "Low",
      deadline: addDays(today, 9), pengingat: "Tanpa pengingat",
      deskripsi: "Susun Business Model Canvas untuk ide bisnis kelompok.",
      checklist: [
        { id: "c1", label: "Tentukan ide bisnis", done: false },
        { id: "c2", label: "Isi 9 blok BMC", done: false },
        { id: "c3", label: "Diskusi kelompok", done: false },
      ],
    },
    {
      id: 6, matkul: "Basis Data", judul: "Quiz Modul 2", priority: "Medium",
      deadline: addDays(today, -3), pengingat: "Tanpa pengingat",
      deskripsi: "Quiz materi normalisasi dan query SQL dasar.",
      checklist: [{ id: "c1", label: "Selesaikan quiz", done: true }],
    },
    {
      id: 7, matkul: "Algoritma & Struktur Data", judul: "Laporan Praktikum 1", priority: "Low",
      deadline: addDays(today, -5), pengingat: "Tanpa pengingat",
      deskripsi: "Laporan praktikum struktur data linked list.",
      checklist: [{ id: "c1", label: "Selesaikan laporan", done: true }],
    },
    {
      id: 8, matkul: "Kewirausahaan", judul: "Presentasi Ide Bisnis", priority: "Medium",
      deadline: addDays(today, -1), pengingat: "Tanpa pengingat",
      deskripsi: "Presentasikan ide bisnis awal di depan kelas.",
      checklist: [{ id: "c1", label: "Selesaikan presentasi", done: true }],
    },
  ];
}