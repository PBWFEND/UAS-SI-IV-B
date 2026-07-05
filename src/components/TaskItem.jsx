import { useState } from "react";
import {
  Clock,
  Check,
  ChevronDown,
  Bell,
  Trash2,
} from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import { MATKUL, PRIORITY } from "../data/constants.js";
import {
  progressOf,
  fmtDate,
  relativeLabel,
} from "../utils/helpers.js";
import "./TaskItem.css";

function TaskItem({
  task,
  today,
  onToggleChecklist,
  onDelete,
}) {
  const [expanded, setExpanded] = useState(false);

  const m = MATKUL[task.matkul];
  const Icon = m.icon;
  const p = PRIORITY[task.priority];

  const progress = progressOf(task);

  return (
    <div className="task-item">
      {/* Header Card */}
      <div
        className="task-item__row"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="task-item__icon"
          style={{
            background: m.bg,
            color: m.fg,
          }}
        >
          <Icon size={18} />
        </div>

        <div className="task-item__main">
          <p className="task-item__matkul">
            {task.matkul}
          </p>

          <p className="task-item__judul">
            {task.judul}
          </p>

          <div className="task-item__meta">
            <span className="task-item__deadline">
              <Clock size={12} /> {fmtDate(task.deadline)}
            </span>

            <span
              className="task-item__priority"
              style={{
                background: p.bg,
                color: p.fg,
              }}
            >
              {task.priority}
            </span>

            <span className="task-item__relative">
              {relativeLabel(task.deadline, today)}
            </span>
          </div>
        </div>

        <div className="task-item__progress">
          <span className="task-item__progress-value">
            {progress}%
          </span>

          <ChevronDown
            size={16}
            className={`task-item__chevron ${
              expanded
                ? "task-item__chevron--open"
                : ""
            }`}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="task-item__bar">
        <ProgressBar
          value={progress}
          showLabel={false}
          size="sm"
        />
      </div>

      {/* Detail */}
      {expanded && (
        <div className="task-item__detail">

          {task.deskripsi && (
            <p className="task-item__deskripsi">
              {task.deskripsi}
            </p>
          )}

          <p className="task-item__pengingat">
            <Bell size={13} />
            {" "}Pengingat : {task.pengingat}
          </p>

          {/* Informasi Progress */}
          <div className="task-item__progress-info">
            <strong>📊 Progress Penyelesaian</strong>

            <ProgressBar
              value={progress}
              showLabel={true}
              size="sm"
            />

            <p>
              {task.checklist.filter((c) => c.done).length} dari{" "}
              {task.checklist.length} checklist telah diselesaikan.
            </p>
          </div>

          {/* Checklist */}
          <div className="task-item__checklist">
            {task.checklist &&
              task.checklist.map((c) => (
                <button
                  key={c.id}
                  className="task-item__check-row"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleChecklist(task.id, c.id);
                  }}
                >
                  <span
                    className={`task-item__checkbox ${
                      c.done
                        ? "task-item__checkbox--done"
                        : ""
                    }`}
                  >
                    {c.done && (
                      <Check
                        size={12}
                        color="white"
                      />
                    )}
                  </span>

                  <span
                    className={
                      c.done
                        ? "task-item__check-label--done"
                        : ""
                    }
                  >
                    {c.label}
                  </span>
                </button>
              ))}
          </div>

          {/* Delete */}
          <button
            className="task-item__delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
          >
            <Trash2 size={13} />
            {" "}Hapus Tugas
          </button>

        </div>
      )}
    </div>
  );
}

export default TaskItem;