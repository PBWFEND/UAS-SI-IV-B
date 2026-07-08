import { ClipboardX } from "lucide-react";
import TaskItem from "./TaskItem.jsx";
import "./TaskList.css";

export default function TaskList({
  tasks,
  today,
  onToggleChecklist,
  onDelete,
}) {
  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <ClipboardX size={28} />
        <p>Tidak ada tugas di kategori ini.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          today={today}
          onToggleChecklist={onToggleChecklist}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}