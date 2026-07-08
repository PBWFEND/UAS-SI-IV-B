import { Search, ArrowDownUp } from "lucide-react";
import { MATKUL } from "../data/constants.js";
import "./SearchFilter.css";

const TABS = ["Semua", "Aktif", "Selesai"];

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  statusTab,
  onStatusTabChange,
  matkulFilter,
  onMatkulFilterChange,
}) {
  return (
    <div className="search-filter">
      <div className="search-filter__search">
        <Search size={16} className="search-filter__search-icon" />
        <input
          type="text"
          placeholder="Cari judul tugas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="search-filter__tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`search-filter__tab ${statusTab === tab ? "search-filter__tab--active" : ""}`}
            onClick={() => onStatusTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="search-filter__row">
        <select value={matkulFilter} onChange={(e) => onMatkulFilterChange(e.target.value)}>
          <option>Semua Mata Kuliah</option>
          {Object.keys(MATKUL).map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <span className="search-filter__sort">
          <ArrowDownUp size={13} /> Urut: Deadline
        </span>
      </div>
    </div>
  );
}