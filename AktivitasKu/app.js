/**
 * AktivitasKu — Aplikasi Manajemen Kegiatan
 * ============================================
 * Kelompok 1 | SI IV-B | UAS 2025/2026
 *
 * Fitur:
 *  - CRUD penuh (Create, Read, Update, Delete)
 *  - Penyimpanan data via localStorage
 *  - Notifikasi browser & alarm waktu nyata
 *  - Pencarian & filter real-time
 *  - Sortir berdasarkan berbagai kriteria
 *  - Tampilan grid / list
 *  - Jam digital langsung
 *  - Progress bar kegiatan harian
 *  - Responsif desktop, tablet, mobile
 */

'use strict';

/* ============================================================
   1. KONSTANTA & STATE AWAL
   ============================================================ */

const STORAGE_KEY = 'aktivitasku_v1';
const NOTIF_DISMISSED_KEY = 'aktivitasku_notif_dismissed';

/**
 * Struktur data satu kegiatan:
 * {
 *   id          : string  — ID unik (timestamp)
 *   title       : string  — Nama kegiatan
 *   description : string  — Deskripsi (opsional)
 *   category    : string  — 'personal'|'kuliah'|'kerja'|'kesehatan'|'lainnya'
 *   priority    : string  — 'rendah'|'sedang'|'tinggi'
 *   date        : string  — Tanggal target (YYYY-MM-DD)
 *   time        : string  — Waktu notifikasi (HH:MM)
 *   isDone      : boolean — Status selesai
 *   createdAt   : number  — Timestamp pembuatan
 * }
 */

let state = {
  activities: [],       // Array seluruh kegiatan
  filter:     'semua',  // Filter aktif saat ini
  search:     '',       // Kata kunci pencarian
  sortBy:     'newest', // Kriteria urutan
  viewMode:   'grid',   // 'grid' | 'list'
  editingId:  null,     // ID kegiatan yang sedang diedit
};

/* ============================================================
   2. UTILITAS
   ============================================================ */

/** Buat ID unik berbasis timestamp */
function genId() {
  return String(Date.now()) + Math.random().toString(36).slice(2, 6);
}

/** Format tanggal ke bahasa Indonesia */
function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

/** Format datetime pendek */
function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Cek apakah suatu tanggal adalah hari ini */
function isToday(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  const d = new Date(dateStr + 'T00:00:00');
  return (
    d.getDate()     === today.getDate()     &&
    d.getMonth()    === today.getMonth()    &&
    d.getFullYear() === today.getFullYear()
  );
}

/** Cek apakah kegiatan sudah lewat waktu (overdue) */
function isOverdue(activity) {
  if (!activity.date || activity.isDone) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(activity.date + 'T00:00:00');
  return d < today;
}

/** Sanitasi teks (mencegah XSS) */
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Escape regex khusus karakter */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ============================================================
   3. STORAGE
   ============================================================ */

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.activities));
  } catch (e) {
    console.warn('Gagal menyimpan ke localStorage:', e);
    showToast('Gagal menyimpan data. Storage penuh?', 'error');
  }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        state.activities = parsed;
      }
    }
  } catch (e) {
    console.warn('Data rusak, direset:', e);
    state.activities = [];
  }
}

/* ============================================================
   4. TOAST NOTIFIKASI
   ============================================================ */

function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span class="toast-icon"></span><span class="toast-msg">${sanitize(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('leaving');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, duration);
}

/* ============================================================
   5. JAM DIGITAL & TANGGAL
   ============================================================ */

function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const timeStr = `${hh}:${mm}:${ss}`;
  const shortTimeStr = `${hh}:${mm}`;

  const clockEl = document.getElementById('clock-display');
  const topbarClock = document.getElementById('topbar-clock');
  if (clockEl) clockEl.textContent = timeStr;
  if (topbarClock) topbarClock.textContent = shortTimeStr;

  // Update subtitle
  const subtitle = document.getElementById('page-date');
  if (subtitle) {
    const dateOpts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    subtitle.textContent = now.toLocaleDateString('id-ID', dateOpts);
  }

  // Cek notifikasi alarm setiap menit persis (ketika detik = 0)
  if (now.getSeconds() === 0) {
    checkAlarms(hh, mm);
  }
}

/* ============================================================
   6. NOTIFIKASI BROWSER & ALARM
   ============================================================ */

function requestNotifPermission() {
  if (!('Notification' in window)) return;
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      showToast('Notifikasi berhasil diaktifkan! 🔔', 'success');
      document.getElementById('notif-banner').classList.add('hidden');
      localStorage.setItem(NOTIF_DISMISSED_KEY, '1');
    } else {
      showToast('Izin notifikasi ditolak. Alarm akan tampil di layar.', 'warning');
    }
  });
}

function playNotificationSound() {
  try {
    const audio = new Audio('alarm.mp3');
    audio.play().catch(e => {
      console.warn("Gagal memainkan alarm.mp3 (Mungkin diblokir oleh browser karena butuh interaksi user):", e);
    });
  } catch (e) {
    console.warn("Gagal membuat objek Audio:", e);
  }
}

function checkAlarms(hh, mm) {
  const currentTime = `${hh}:${mm}`;
  const today = new Date().toISOString().split('T')[0];

  state.activities.forEach(act => {
    if (act.isDone || !act.time) return;
    if (act.time !== currentTime) return;
    // Hanya alarm pada hari yang sama jika ada tanggal, atau setiap hari jika tidak ada tanggal
    if (act.date && act.date !== today) return;

    const msg = `⏰ Waktu kegiatan: "${act.title}"`;

    // Mainkan suara notifikasi
    playNotificationSound();

    // Browser Notification
    if (Notification.permission === 'granted') {
      const notif = new Notification('AktivitasKu — Alarm!', {
        body: msg,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>',
        tag: `alarm-${act.id}`,
      });
      notif.onclick = () => {
        window.focus();
        notif.close();
      };
    }

    // In-app toast alarm
    showToast(msg, 'warning', 8000);
  });
}

/* ============================================================
   7. CRUD OPERATIONS
   ============================================================ */

/** CREATE — Tambah kegiatan baru */
function createActivity(data) {
  const activity = {
    id:          genId(),
    title:       data.title.trim(),
    description: (data.description || '').trim(),
    category:    data.category   || 'personal',
    priority:    data.priority   || 'sedang',
    date:        data.date       || '',
    time:        data.time       || '',
    isDone:      false,
    createdAt:   Date.now(),
  };

  state.activities.unshift(activity);
  saveToStorage();
  showToast(`Kegiatan "${activity.title}" berhasil ditambahkan! ✨`, 'success');
  updateStats();
  renderActivities();
  return activity;
}

/** READ — Ambil + filter + sort kegiatan */
function getFilteredActivities() {
  let items = [...state.activities];

  // Filter utama
  const f = state.filter;
  if (f === 'aktif')    items = items.filter(a => !a.isDone);
  if (f === 'selesai')  items = items.filter(a => a.isDone);
  if (f === 'hari-ini') items = items.filter(a => isToday(a.date));
  if (f.startsWith('cat:')) {
    const cat = f.slice(4);
    items = items.filter(a => a.category === cat);
  }

  // Filter pencarian
  if (state.search) {
    const re = new RegExp(escapeRegex(state.search), 'i');
    items = items.filter(a =>
      re.test(a.title) || re.test(a.description) || re.test(a.category)
    );
  }

  // Sortir
  const PRIORITY_ORDER = { tinggi: 0, sedang: 1, rendah: 2 };
  items.sort((a, b) => {
    switch (state.sortBy) {
      case 'oldest':   return a.createdAt - b.createdAt;
      case 'priority': return (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1);
      case 'name':     return a.title.localeCompare(b.title, 'id');
      case 'date':
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date.localeCompare(b.date);
      default:         return b.createdAt - a.createdAt; // newest
    }
  });

  return items;
}

/** UPDATE — Perbarui data kegiatan */
function updateActivity(id, data) {
  const idx = state.activities.findIndex(a => a.id === id);
  if (idx === -1) return;

  state.activities[idx] = {
    ...state.activities[idx],
    title:       data.title.trim(),
    description: (data.description || '').trim(),
    category:    data.category   || state.activities[idx].category,
    priority:    data.priority   || state.activities[idx].priority,
    date:        data.date       !== undefined ? data.date : state.activities[idx].date,
    time:        data.time       !== undefined ? data.time : state.activities[idx].time,
  };

  saveToStorage();
  showToast('Kegiatan berhasil diperbarui! ✏️', 'success');
  updateStats();
  renderActivities();
}

/** UPDATE STATUS — Toggle selesai/aktif */
function toggleDone(id) {
  const act = state.activities.find(a => a.id === id);
  if (!act) return;
  act.isDone = !act.isDone;
  saveToStorage();

  const msg = act.isDone
    ? `"${act.title}" ditandai selesai! 🎉`
    : `"${act.title}" diaktifkan kembali.`;
  showToast(msg, act.isDone ? 'success' : 'info');

  updateStats();
  renderActivities();
}

/** DELETE — Hapus kegiatan */
function deleteActivity(id) {
  const act = state.activities.find(a => a.id === id);
  if (!act) return;

  const confirmed = window.confirm(`Hapus kegiatan "${act.title}"?\n\nTindakan ini tidak dapat dibatalkan.`);
  if (!confirmed) return;

  state.activities = state.activities.filter(a => a.id !== id);
  saveToStorage();
  showToast(`Kegiatan dihapus.`, 'info');
  updateStats();
  renderActivities();
}

/* ============================================================
   8. RENDER UI
   ============================================================ */

/** Render semua kegiatan ke DOM */
function renderActivities() {
  const all = getFilteredActivities();
  const pending = all.filter(a => !a.isDone);
  const done    = all.filter(a =>  a.isDone);

  const isSearching = state.search.length > 0;
  const noResults   = isSearching && all.length === 0;

  // Tampilkan/sembunyikan empty search state
  const emptySearch = document.getElementById('empty-search');
  const emptyKeyword = document.getElementById('empty-keyword');
  if (noResults) {
    emptySearch.classList.remove('hidden');
    emptyKeyword.textContent = state.search;
  } else {
    emptySearch.classList.add('hidden');
  }

  // Render pending & done
  renderGroup('pending', pending);
  renderGroup('done', done);

  // Progress bar
  renderProgress();
}

function renderGroup(groupKey, items) {
  const listEl   = document.getElementById(`list-${groupKey}`);
  const emptyEl  = document.getElementById(`empty-${groupKey}`);
  const countEl  = document.getElementById(`count-${groupKey}`);

  countEl.textContent = items.length;

  if (items.length === 0) {
    listEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
  } else {
    emptyEl.classList.add('hidden');
    listEl.className = `activity-grid${state.viewMode === 'list' ? ' list-view' : ''}`;
    listEl.innerHTML = items.map(buildCardHTML).join('');
    // Attach listeners setelah render
    listEl.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', handleCardAction);
    });
  }
}

/** Buat HTML kartu kegiatan */
function buildCardHTML(act) {
  const overdue   = isOverdue(act);
  const todayFlag = act.date && isToday(act.date) && !act.isDone;

  const badgePri = {
    tinggi: `<span class="badge badge-pri-tinggi">🔴 Tinggi</span>`,
    sedang: `<span class="badge badge-pri-sedang">🟡 Sedang</span>`,
    rendah: `<span class="badge badge-pri-rendah">🟢 Rendah</span>`,
  }[act.priority] || '';

  const catEmoji = {
    personal:  '👤', kuliah: '🎓', kerja: '💼',
    kesehatan: '💪', lainnya: '📌',
  }[act.category] || '📌';

  const timeBadge = act.time
    ? `<span class="badge badge-time">⏰ ${act.time}</span>`
    : '';

  const overdueBadge = overdue
    ? `<span class="badge badge-overdue">🚨 Terlambat</span>`
    : '';

  const todayBadge = todayFlag && !overdue
    ? `<span class="badge badge-time">📅 Hari ini</span>`
    : '';

  const dateStr = act.date ? formatDateShort(act.date) : '';
  const dateHtml = dateStr
    ? `<span class="card-date">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        ${sanitize(dateStr)}
       </span>`
    : '';

  const descHtml = act.description
    ? `<p class="card-desc">${sanitize(act.description)}</p>`
    : '';

  return `
    <article
      class="activity-card${act.isDone ? ' is-done' : ''}${overdue ? ' is-overdue' : ''}"
      data-id="${act.id}"
      data-priority="${sanitize(act.priority)}"
      role="article"
      aria-label="Kegiatan: ${sanitize(act.title)}"
    >
      <div class="card-top">
        <div class="card-checkbox-wrap">
          <div
            class="card-checkbox${act.isDone ? ' checked' : ''}"
            data-action="toggle"
            data-id="${act.id}"
            role="checkbox"
            aria-checked="${act.isDone}"
            tabindex="0"
            title="${act.isDone ? 'Aktifkan kembali' : 'Tandai selesai'}"
          ></div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${sanitize(act.title)}</h3>
          ${descHtml}
        </div>
      </div>

      <div class="card-meta">
        <span class="badge badge-cat">${catEmoji} ${sanitize(act.category)}</span>
        ${badgePri}
        ${timeBadge}
        ${overdueBadge}
        ${todayBadge}
      </div>

      <div class="card-footer">
        ${dateHtml}
        <div class="card-actions">
          <button
            class="btn-icon btn-icon-done"
            data-action="toggle"
            data-id="${act.id}"
            title="${act.isDone ? 'Aktifkan kembali' : 'Tandai selesai'}"
            aria-label="${act.isDone ? 'Aktifkan kembali' : 'Tandai selesai'}"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </button>
          <button
            class="btn-icon btn-icon-edit"
            data-action="edit"
            data-id="${act.id}"
            title="Edit kegiatan"
            aria-label="Edit kegiatan ${sanitize(act.title)}"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button
            class="btn-icon btn-icon-del"
            data-action="delete"
            data-id="${act.id}"
            title="Hapus kegiatan"
            aria-label="Hapus kegiatan ${sanitize(act.title)}"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

/** Render progress bar hari ini */
function renderProgress() {
  const todayActs = state.activities.filter(a => isToday(a.date));
  if (todayActs.length === 0) {
    document.querySelector('.progress-bar-wrap')?.classList.add('hidden');
    return;
  }

  const total = todayActs.length;
  const done  = todayActs.filter(a => a.isDone).length;
  const pct   = Math.round((done / total) * 100);

  const wrap = document.querySelector('.progress-bar-wrap');
  if (wrap) {
    wrap.classList.remove('hidden');
    wrap.querySelector('.progress-fill').style.width = pct + '%';
    wrap.querySelector('.progress-pct').textContent  = pct + '%';
    wrap.querySelector('.progress-label').textContent = `Hari ini: ${done}/${total} selesai`;
  }
}

/** Perbarui angka statistik di sidebar */
function updateStats() {
  const total   = state.activities.length;
  const done    = state.activities.filter(a => a.isDone).length;
  const pending = total - done;

  document.getElementById('stat-total').textContent   = total;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('stat-done').textContent    = done;
}

/* ============================================================
   9. EVENT HANDLERS — CARD ACTIONS
   ============================================================ */

function handleCardAction(e) {
  const btn    = e.currentTarget;
  const action = btn.dataset.action;
  const id     = btn.dataset.id;

  if (!id) return;

  switch (action) {
    case 'toggle': toggleDone(id);    break;
    case 'edit':   openEditModal(id); break;
    case 'delete': deleteActivity(id); break;
  }
}

/* ============================================================
   10. MODAL EDIT
   ============================================================ */

function openEditModal(id) {
  const act = state.activities.find(a => a.id === id);
  if (!act) return;

  state.editingId = id;

  document.getElementById('edit-title').value    = act.title;
  document.getElementById('edit-desc').value     = act.description;
  document.getElementById('edit-category').value = act.category;
  document.getElementById('edit-priority').value = act.priority;
  document.getElementById('edit-date').value     = act.date || '';
  document.getElementById('edit-time').value     = act.time || '';

  // Update char counter
  updateCharCounter(
    document.getElementById('edit-title'),
    document.getElementById('edit-title-counter')
  );

  document.getElementById('modal-overlay').classList.remove('hidden');
  document.getElementById('edit-title').focus();
  document.body.style.overflow = 'hidden';
}

function closeEditModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  state.editingId = null;
  document.body.style.overflow = '';
}

function saveEditModal() {
  const title = document.getElementById('edit-title').value.trim();
  if (!title) {
    document.getElementById('edit-title').classList.add('error');
    document.getElementById('edit-title').focus();
    showToast('Nama kegiatan tidak boleh kosong!', 'error');
    return;
  }

  document.getElementById('edit-title').classList.remove('error');

  updateActivity(state.editingId, {
    title:       title,
    description: document.getElementById('edit-desc').value,
    category:    document.getElementById('edit-category').value,
    priority:    document.getElementById('edit-priority').value,
    date:        document.getElementById('edit-date').value,
    time:        document.getElementById('edit-time').value,
  });

  closeEditModal();
}

/* ============================================================
   11. FORM TAMBAH KEGIATAN
   ============================================================ */

function handleAddForm(e) {
  e.preventDefault();

  const titleEl = document.getElementById('input-title');
  const title   = titleEl.value.trim();

  // Validasi
  if (!title) {
    titleEl.classList.add('error');
    document.getElementById('title-error').classList.add('visible');
    titleEl.focus();
    showToast('Nama kegiatan tidak boleh kosong!', 'error');
    return;
  }

  titleEl.classList.remove('error');
  document.getElementById('title-error').classList.remove('visible');

  createActivity({
    title:       title,
    description: document.getElementById('input-desc').value,
    category:    document.getElementById('input-category').value,
    priority:    document.getElementById('input-priority').value,
    date:        document.getElementById('input-date').value,
    time:        document.getElementById('input-time').value,
  });

  resetAddForm();
}

function resetAddForm() {
  document.getElementById('add-form').reset();
  document.getElementById('title-counter').textContent = '0/80';
  document.getElementById('input-title').classList.remove('error');
  document.getElementById('title-error').classList.remove('visible');
}

/* ============================================================
   12. KARAKTER COUNTER
   ============================================================ */

function updateCharCounter(input, counterEl) {
  if (!input || !counterEl) return;
  const max = input.maxLength || 80;
  counterEl.textContent = `${input.value.length}/${max}`;
}

/* ============================================================
   13. NAVIGASI FILTER (SIDEBAR)
   ============================================================ */

function setFilter(filter) {
  state.filter = filter;

  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  // Update page title
  const titles = {
    'semua':        'Semua Kegiatan',
    'aktif':        'Sedang Berjalan',
    'selesai':      'Sudah Selesai',
    'hari-ini':     'Kegiatan Hari Ini',
    'cat:personal': 'Kategori: Personal',
    'cat:kuliah':   'Kategori: Kuliah',
    'cat:kerja':    'Kategori: Kerja',
    'cat:kesehatan':'Kategori: Kesehatan',
    'cat:lainnya':  'Kategori: Lainnya',
  };
  document.getElementById('page-title').textContent = titles[filter] || 'Kegiatan';

  renderActivities();

  // Tutup sidebar di mobile
  if (window.innerWidth < 900) closeSidebar();
}

/* ============================================================
   14. SIDEBAR MOBILE TOGGLE
   ============================================================ */

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-backdrop').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-backdrop').classList.add('hidden');
  document.body.style.overflow = '';
}

/* ============================================================
   15. VIEW MODE (GRID / LIST)
   ============================================================ */

function setViewMode(mode) {
  state.viewMode = mode;
  document.querySelectorAll('.view-btn').forEach(btn => {
    const isActive = btn.dataset.view === mode;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  renderActivities();
}

/* ============================================================
   16. INISIALISASI PROGRESS BAR DOM
   ============================================================ */

function injectProgressBar() {
  const toolbar = document.querySelector('.toolbar');
  const barHtml = `
    <div class="progress-bar-wrap hidden">
      <span class="progress-label">Hari ini: 0/0 selesai</span>
      <div class="progress-track">
        <div class="progress-fill" style="width:0%"></div>
      </div>
      <span class="progress-pct">0%</span>
    </div>
  `;
  toolbar.insertAdjacentHTML('beforebegin', barHtml);
}

/* ============================================================
   17. INISIALISASI UTAMA
   ============================================================ */

function init() {
  // Load data
  loadFromStorage();

  // Inject progress bar
  injectProgressBar();

  // Mulai jam digital
  updateClock();
  setInterval(updateClock, 1000);

  // Render awal
  updateStats();
  renderActivities();

  // Form tambah kegiatan
  document.getElementById('add-form').addEventListener('submit', handleAddForm);

  // Reset form
  document.getElementById('btn-reset').addEventListener('click', resetAddForm);

  // Toggle panel tambah
  const panelToggle = document.getElementById('add-panel-toggle');
  panelToggle.addEventListener('click', () => {
    document.getElementById('add-panel').classList.toggle('collapsed');
    const expanded = !document.getElementById('add-panel').classList.contains('collapsed');
    panelToggle.setAttribute('aria-expanded', String(expanded));
  });
  panelToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      panelToggle.click();
    }
  });

  // Char counter — form tambah
  const inputTitle = document.getElementById('input-title');
  inputTitle.addEventListener('input', () => {
    updateCharCounter(inputTitle, document.getElementById('title-counter'));
    if (inputTitle.value.trim()) {
      inputTitle.classList.remove('error');
      document.getElementById('title-error').classList.remove('visible');
    }
  });

  // Char counter — modal edit
  const editTitle = document.getElementById('edit-title');
  editTitle.addEventListener('input', () => {
    updateCharCounter(editTitle, document.getElementById('edit-title-counter'));
    if (editTitle.value.trim()) editTitle.classList.remove('error');
  });

  // Search — real-time
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');

  searchInput.addEventListener('input', () => {
    state.search = searchInput.value;
    searchClear.classList.toggle('hidden', !state.search);
    renderActivities();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    state.search = '';
    searchClear.classList.add('hidden');
    searchInput.focus();
    renderActivities();
  });

  document.getElementById('btn-clear-search').addEventListener('click', () => {
    searchInput.value = '';
    state.search = '';
    searchClear.classList.add('hidden');
    renderActivities();
  });

  // Sort
  document.getElementById('sort-select').addEventListener('change', e => {
    state.sortBy = e.target.value;
    renderActivities();
  });

  // View toggle
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => setViewMode(btn.dataset.view));
  });

  // Filter nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });

  // Modal
  document.getElementById('modal-close').addEventListener('click', closeEditModal);
  document.getElementById('modal-cancel').addEventListener('click', closeEditModal);
  document.getElementById('modal-save').addEventListener('click', saveEditModal);

  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeEditModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeEditModal();
  });

  // Sidebar mobile
  document.getElementById('sidebar-toggle').addEventListener('click', openSidebar);
  document.getElementById('sidebar-backdrop').addEventListener('click', closeSidebar);

  // Notifikasi permission banner
  setupNotifBanner();

  // Set tanggal default ke hari ini pada form
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('input-date').value = today;

  // Checkbox dengan keyboard
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card-checkbox')) {
      e.preventDefault();
      e.target.click();
    }
  });
}

function setupNotifBanner() {
  const banner = document.getElementById('notif-banner');
  const dismissed = localStorage.getItem(NOTIF_DISMISSED_KEY);

  if (!('Notification' in window) || dismissed) {
    banner.classList.add('hidden');
    return;
  }

  if (Notification.permission === 'default') {
    banner.classList.remove('hidden');
  }

  document.getElementById('notif-allow').addEventListener('click', requestNotifPermission);
  document.getElementById('notif-dismiss').addEventListener('click', () => {
    banner.classList.add('hidden');
    localStorage.setItem(NOTIF_DISMISSED_KEY, '1');
  });
}

/* ── LAUNCH ─────────────────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}