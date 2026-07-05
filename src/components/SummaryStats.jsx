import { ListTodo, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { progressOf, sameDay } from "../utils/helpers.js";
import "./SummaryStats.css";

export default function SummaryStats({ tasks, today }) {
  const aktif = tasks.filter((t) => progressOf(t) < 100);
  const selesai = tasks.filter((t) => progressOf(t) === 100);
  const deadlineHariIni = aktif.filter((t) => sameDay(t.deadline, today));
  const avgProgress = Math.round(
    tasks.reduce((sum, t) => sum + progressOf(t), 0) / (tasks.length || 1)
  );

  const cards = [
    { icon: ListTodo, label: "Tugas Aktif", value: aktif.length, tone: "violet" },
    { icon: Clock, label: "Deadline Hari Ini", value: deadlineHariIni.length, tone: "amber" },
    { icon: CheckCircle2, label: "Tugas Selesai", value: selesai.length, tone: "green" },
    { icon: TrendingUp, label: "Progress Minggu", value: `${avgProgress}%`, tone: "blue" },
  ];

  return (
    <div className="summary-stats">
      {cards.map(({ icon: Icon, label, value, tone }) => (
        <div className="summary-stats__card" key={label}>
          <div className={`summary-stats__icon summary-stats__icon--${tone}`}>
            <Icon size={18} />
          </div>
          <div>
            <p className="summary-stats__value">{value}</p>
            <p className="summary-stats__label">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}