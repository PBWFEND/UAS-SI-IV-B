import {
  Bell,
  Plus,
  LayoutDashboard,
  ListChecks,
  CalendarDays,
  BarChart3,
} from "lucide-react";
import "./Header.css";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "tugas", label: "Tugas", icon: ListChecks },
  { key: "kalender", label: "Kalender", icon: CalendarDays },
  { key: "statistik", label: "Statistik", icon: BarChart3 },
];

export default function Header({
  activeTab,
  onTabChange,
  notifCount,
  onAddTask,
  onNotificationClick,
}) {
  return (
    <header className="header">

      {/* Logo */}
      <div className="header__brand">
        <div className="header__logo">T</div>
        <span className="header__name">Taskora</span>
      </div>

      {/* Menu */}
      <nav className="header__nav">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`header__nav-item ${
              activeTab === key ? "header__nav-item--active" : ""
            }`}
            onClick={() => onTabChange(key)}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Action */}
      <div className="header__actions">

        {/* Notifikasi */}
        {/* Notifikasi */}
<button
  className="header__icon-btn"
  onClick={onNotificationClick}
>
  <Bell size={18} />

  {notifCount > 0 && (
    <span className="header__badge">
      {notifCount}
    </span>
  )}
</button>

        {/* Tambah Tugas */}
        <button
          className="header__add-btn"
          onClick={onAddTask}
        >
          <Plus size={16} />
          <span>Tambah Tugas</span>
        </button>

      </div>
    </header>
  );
}