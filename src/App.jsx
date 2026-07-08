import { useState, useMemo, useEffect } from "react";
import Header from "./components/Header.jsx";
import SummaryStats from "./components/SummaryStats.jsx";
import SearchFilter from "./components/SearchFilter.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Calender from "./components/Calender.jsx";
import Stats from "./components/Stats.jsx";
import {
  progressOf,
  sameDay,
  makeInitialTasks,
} from "./utils/helpers.js";
import "./App.css";
import studyImage from "./assets/study.svg";

export default function App() {
  const today = useMemo(() => new Date(), []);

  // ===== LOAD + LOCALSTORAGE SAFE =====
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");

      if (!saved) return makeInitialTasks(today);

      const parsed = JSON.parse(saved);

      return parsed.map((t) => ({
        ...t,
        deadline: new Date(t.deadline),
        checklist: t.checklist || [],
      }));
    } catch (err) {
      return makeInitialTasks(today);
    }
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState("Semua");
  const [matkulFilter, setMatkulFilter] = useState("Semua Mata Kuliah");

  // ===== AUTO SAVE LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ===== DATA =====
  const aktif = tasks.filter((t) => progressOf(t) < 100);
  const deadlineHariIni = aktif.filter((t) =>
    sameDay(t.deadline, today)
  );

  // ===== CREATE =====
  function addTask(data) {
    const newTask = {
      id: Date.now(),
      ...data,
      checklist: [
        { id: "c1", label: "Selesaikan tugas", done: false },
      ],
    };

    setTasks((prev) => [newTask, ...prev]);
    setShowForm(false);
    setActiveTab("tugas");
  }

  // ===== UPDATE CHECKLIST =====
  function toggleChecklist(taskId, itemId) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              checklist: t.checklist.map((c) =>
                c.id === itemId
                  ? { ...c, done: !c.done }
                  : c
              ),
            }
          : t
      )
    );
  }

  // ===== DELETE =====
  function deleteTask(taskId) {
    if (window.confirm("Yakin mau hapus tugas ini?")) {
      setTasks((prev) =>
        prev.filter((t) => t.id !== taskId)
      );
    }
  }

  // ===== FILTER =====
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        const status =
          progressOf(t) === 100 ? "Selesai" : "Aktif";

        if (statusTab !== "Semua" && status !== statusTab)
          return false;

        if (
          matkulFilter !== "Semua Mata Kuliah" &&
          t.matkul !== matkulFilter
        )
          return false;

        if (
          searchTerm &&
          !t.judul
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
          return false;

        return true;
      })
      .sort((a, b) => a.deadline - b.deadline);
  }, [tasks, statusTab, matkulFilter, searchTerm]);

  const recentTasks = useMemo(
    () =>
      aktif
        .slice()
        .sort((a, b) => a.deadline - b.deadline)
        .slice(0, 4),
    [aktif]
  );

  // ===== UI =====
  return (
    <div className="app">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notifCount={deadlineHariIni.length}
        onAddTask={() => setShowForm(true)}
        onNotificationClick={() => {
          alert(
            deadlineHariIni.length === 0
              ? "🎉 Tidak ada deadline hari ini."
              : `🔔 Kamu punya ${deadlineHariIni.length} tugas hari ini!`
          );
        }}
      />

      <main className="app__content">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="app__section">
            <h2>Hi 👋</h2>
            <p>Semangat ngerjain tugas!</p>

            <div className="app__hero">
              <img
                src={studyImage}
                alt="study"
                className="app__hero-image"
              />
            </div>

            <SummaryStats tasks={tasks} today={today} />

            <div className="app__block">
              <p>Deadline Terdekat</p>
              <TaskList
                tasks={recentTasks}
                today={today}
                onToggleChecklist={toggleChecklist}
                onDelete={deleteTask}
              />
            </div>
          </div>
        )}

        {/* TASKS */}
        {activeTab === "tugas" && (
          <div className="app__section">
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusTab={statusTab}
              onStatusTabChange={setStatusTab}
              matkulFilter={matkulFilter}
              onMatkulFilterChange={setMatkulFilter}
            />

            <TaskList
              tasks={filteredTasks}
              today={today}
              onToggleChecklist={toggleChecklist}
              onDelete={deleteTask}
            />
          </div>
        )}

        {/* CALENDAR */}
        {activeTab === "kalender" && (
          <Calender tasks={tasks} today={today} />
        )}

        {/* STATS */}
        {activeTab === "statistik" && (
          <Stats tasks={tasks} today={today} />
        )}
      </main>

      {/* FORM */}
      {showForm && (
        <TaskForm
          onSubmit={addTask}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}