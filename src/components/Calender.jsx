import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { MATKUL, HARI, BULAN } from "../data/constants.js";
import { sameDay, relativeLabel } from "../utils/helpers.js";
import "./Calender.css";

export default function Calender({ tasks, today }) {
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const grid = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startOffset = first.getDay();
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    return cells;
  }, [view]);

  const deadlinesInView = tasks
    .filter((t) => t.deadline.getFullYear() === view.getFullYear() && t.deadline.getMonth() === view.getMonth())
    .sort((a, b) => a.deadline - b.deadline);

  return (
    <div className="calender">
      <div className="calender__card">
        <div className="calender__head">
          <button onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}>
            <ChevronLeft size={18} />
          </button>
          <p>
            {BULAN[view.getMonth()]} {view.getFullYear()}
          </p>
          <button onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="calender__weekdays">
          {HARI.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>

        <div className="calender__grid">
          {grid.map((d, i) => {
            if (!d) return <span key={i} />;
            const isToday = sameDay(d, today);
            const hasDeadline = tasks.some((t) => sameDay(t.deadline, d));
            return (
              <div key={i} className="calender__cell">
                <span className={`calender__day ${isToday ? "calender__day--today" : ""}`}>{d.getDate()}</span>
                <span className={`calender__dot ${hasDeadline ? "calender__dot--active" : ""}`} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="calender__deadlines">
        <p className="calender__deadlines-title">
          <CalendarDays size={15} /> Deadline Bulan Ini
        </p>
        {deadlinesInView.length === 0 && (
          <p className="calender__empty">Tidak ada deadline bulan ini.</p>
        )}
        <div className="calender__deadline-list">
          {deadlinesInView.map((t) => {
            const m = MATKUL[t.matkul];
            const Icon = m.icon;
            return (
              <div className="calender__deadline-item" key={t.id}>
                <div className="calender__deadline-icon" style={{ background: m.bg, color: m.fg }}>
                  <Icon size={16} />
                </div>
                <div className="calender__deadline-info">
                  <p>{t.judul}</p>
                  <span>{t.matkul}</span>
                </div>
                <span className="calender__deadline-chip">{relativeLabel(t.deadline, today)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}