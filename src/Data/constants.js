// Data referensi: daftar mata kuliah (ikon & warna) dan tingkat prioritas.
import { BookOpen, Database, Code2, Globe, Briefcase } from "lucide-react";

export const MATKUL = {
  "UI/UX Design": { icon: BookOpen, bg: "var(--color-primary-light)", fg: "var(--color-primary)" },
  "Basis Data": { icon: Database, bg: "#FEF3DA", fg: "#B7791F" },
  "Algoritma & Struktur Data": { icon: Code2, bg: "#DFF7E8", fg: "#1C8A56" },
  "Bahasa Inggris": { icon: Globe, bg: "#E0EEFF", fg: "#2563EB" },
  Kewirausahaan: { icon: Briefcase, bg: "#FCE7F3", fg: "#DB2777" },
};

export const PRIORITY = {
  High: { bg: "var(--color-high-bg)", fg: "var(--color-high-fg)" },
  Medium: { bg: "var(--color-medium-bg)", fg: "var(--color-medium-fg)" },
  Low: { bg: "var(--color-low-bg)", fg: "var(--color-low-fg)" },
};

export const HARI = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
export const BULAN = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];