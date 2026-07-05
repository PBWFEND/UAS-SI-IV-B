import { Star } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import { progressOf } from "../utils/helpers.js";
import "./SummaryStats.css";

const HARI_LABEL = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const HABIT_SAMPLE = [3, 5, 2, 6, 7, 4, 1]; // contoh jumlah tugas dikerjakan per hari

export default function Stats({ tasks, today }) {
  const aktif = tasks.filter((t) => progressOf(t) < 100).length;
  const selesai = tasks.filter((t) => progressOf(t) === 100).length;
  const terlambat = tasks.filter((t) => progressOf(t) < 100 && t.deadline < today).length;
  const avgProgress = Math.round(
    tasks.reduce((sum, t) => sum + progressOf(t), 0) / (tasks.length || 1)
  );

  const maxHabit = Math.max(...HABIT_SAMPLE);
  const peakIndex = HABIT_SAMPLE.indexOf(maxHabit);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
          borderRadius: "var(--radius-lg)",
          padding: 22,
          color: "white",
        }}
      >
        <p style={{ fontSize: 13, opacity: 0.85 }}>Progress Mingguan</p>
        <p style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>{avgProgress}%</p>
        <p style={{ fontSize: 12.5, opacity: 0.85, marginTop: 4 }}>Keren, terus pertahankan! 🎉</p>
        <div style={{ marginTop: 14 }}>
          <ProgressBar value={avgProgress} showLabel={false} size="md" />
        </div>
      </div>

      <div className="summary-stats" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="summary-stats__card">
          <div className="summary-stats__icon summary-stats__icon--violet">{aktif}</div>
          <div>
            <p className="summary-stats__value">{aktif}</p>
            <p className="summary-stats__label">Tugas Aktif</p>
          </div>
        </div>
        <div className="summary-stats__card">
          <div className="summary-stats__icon summary-stats__icon--green">{selesai}</div>
          <div>
            <p className="summary-stats__value">{selesai}</p>
            <p className="summary-stats__label">Tugas Selesai</p>
          </div>
        </div>
        <div className="summary-stats__card">
          <div className="summary-stats__icon summary-stats__icon--amber">{terlambat}</div>
          <div>
            <p className="summary-stats__value">{terlambat}</p>
            <p className="summary-stats__label">Deadline Terlambat</p>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "var(--color-surface)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-card)",
          padding: 20,
        }}
      >
        <p style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 14 }}>Kebiasaan Ngerjain Tugas</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 110 }}>
          {HABIT_SAMPLE.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: `${(v / maxHabit) * 100}%`,
                  background: i === peakIndex ? "var(--color-primary)" : "var(--color-primary-light)",
                }}
              />
              <span style={{ fontSize: 10.5, color: "var(--color-text-faint)" }}>{HARI_LABEL[i]}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11.5, color: "var(--color-primary)", textAlign: "center", marginTop: 10 }}>
          Paling produktif hari {HARI_LABEL[peakIndex]}
        </p>
      </div>

      <div
        style={{
          background: "#FEF3DA",
          borderRadius: "var(--radius-md)",
          padding: 16,
          display: "flex",
          gap: 12,
        }}
      >
        <Star size={18} color="#B7791F" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#92600F" }}>Tips Buat Kamu</p>
          <p style={{ fontSize: 12, color: "#B7791F", marginTop: 3 }}>
            Coba kerjain tugas di pagi hari biar lebih fokus dan produktif!
          </p>
        </div>
      </div>
    </div>
  );
}