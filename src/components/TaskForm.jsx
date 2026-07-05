import { useState } from "react";
import "./TaskForm.css";

import * as Constants from "../data/constants";

export default function TaskForm({ onSubmit, onCancel }) {
  const matkulData = Constants?.MATKUL || {};
  const priorityData = Constants?.PRIORITY || {};

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !course || !deadline) {
      alert("Mohon lengkapi semua data!");
      return;
    }

    onSubmit({
      judul: title,
      matkul: course,
      deadline: new Date(deadline),
      priority,
    });

    setTitle("");
    setCourse("");
    setDeadline("");
    setPriority("Medium");

    alert("Tugas berhasil ditambahkan! 🎉");

    if (onCancel) {
  onCancel();
}
};

  return (
    <div className="task-form__overlay">
      <div className="task-form">

        <div className="task-form__header">
          <h3>Tambah Tugas</h3>

          <button
            className="task-form__close"
            onClick={onCancel}
            type="button"
          >
            ✕
          </button>
        </div>

        <form className="task-form__body" onSubmit={handleSubmit}>

          <div className="task-form__field">
            <label>Mata Kuliah</label>

            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Pilih Mata Kuliah</option>

              {Object.keys(matkulData).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="task-form__field">
            <label>Judul Tugas</label>

            <input
              type="text"
              value={title}
              placeholder="Masukkan Judul Tugas"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="task-form__field">
            <label>Deadline</label>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="task-form__field">
            <label>Prioritas</label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {Object.keys(priorityData).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="task-form__buttons">

            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
            >
              Batal
            </button>

            <button
              type="submit"
              className="btn-save"
            >
              Simpan Tugas
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}