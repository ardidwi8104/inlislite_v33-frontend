import React, { useState, useRef, useEffect } from 'react';
import Modal from '../components/Modal';
import TambahEditBerita from './TambahEditBerita';

/* ---------- helpers ---------- */
function formatIndonesianDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch (e) { return dateStr; }
}
function formatShortDisplayDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch (e) { return dateStr; }
}
function formatRelativeTime(dateStr) {
  const time = new Date(dateStr).getTime();
  if (isNaN(time)) return '';
  const diff = Date.now() - time;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'baru saja';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} menit yang lalu`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour} jam yang lalu`;
  const day = Math.floor(hour / 24);
  if (day < 30) return `${day} hari yang lalu`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month} bulan yang lalu`;
  return `${Math.floor(month / 12)} tahun yang lalu`;
}

const BERITA_STORAGE_KEY = 'inlislite.berita.v1';
function saveBerita(items) {
  try { window.localStorage.setItem(BERITA_STORAGE_KEY, JSON.stringify(items)); } catch (e) {}
}

/* ---------- component ---------- */
export default function BeritaPage({ role = 'petugas' }) {
  const publisher = role === 'admin' ? 'admin' : 'petugas';

  const [data, setData] = useState(() => {
    try {
      const raw = window.localStorage.getItem(BERITA_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch (e) {}
    return [
      { id: 1, no: 1, judul: 'Sosialisasi INLISLite 3.3', ket: 'Berita ujicoba', urutan: 1, status: 'ACTIVE', createdAt: '2026-10-31T08:00:00', tanggal: '2026-10-31', lokasi: 'Penajam', thumbnail: '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg', blocks: [{ id: 1, type: 'text', content: 'Sosialisasi implementasi sistem otomasi perpustakaan INLISLite versi 3.3 telah diselenggarakan dengan lancar.' }], galeri: ['/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg', '/berita/thumb_20260517_1779015332_7f282eee5b93c76e694d.jpg'], publisher: 'admin' },
      { id: 2, no: 2, judul: 'FGD Pengelolaan Perpustakaan Khusus Instansi Pemerintah', ket: 'FGD', urutan: 2, status: 'ACTIVE', createdAt: '2025-11-24T09:30:00', tanggal: '2025-11-24', lokasi: 'Penajam', thumbnail: '/berita/thumb_20260517_1779015332_7f282eee5b93c76e694d.jpg', blocks: [{ id: 2, type: 'text', content: 'Fokus Group Discussion (FGD) mengenai integrasi sistem perpustakaan khusus instansi.' }], publisher: 'petugas' },
      { id: 3, no: 3, judul: 'FGD Pengelolaan Repositori dan Knowledge Management (KM)', ket: 'FGD KM', urutan: 3, status: 'ACTIVE', createdAt: '2025-11-24T10:15:00', tanggal: '2025-11-24', lokasi: 'Penajam', thumbnail: '/berita/20260517_1779015332_7f282eee5b93c76e694d.jpg', blocks: [{ id: 3, type: 'text', content: 'Penguatan knowledge management dan repositori digital lokal.' }], publisher: 'admin' },
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  // DataTables
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const sorted = [...data].sort((a, b) => new Date(b.createdAt || b.tanggal) - new Date(a.createdAt || a.tanggal));
  const filtered = sorted.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (item.judul || '').toLowerCase().includes(q) || (item.ket || '').toLowerCase().includes(q);
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * entries;
  const paged = filtered.slice(startIdx, startIdx + entries);

  useEffect(() => { setPage(1); }, [search, entries]);
  useEffect(() => { saveBerita(data); }, [data]);

  const handleOpenAdd = () => { setEditingItem(null); setShowForm(true); };
  const handleOpenEdit = (item) => { setEditingItem(item); setShowForm(true); };
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };
  const handleOpenPreview = (item) => { setPreviewItem(item); setShowPreview(true); };
  const handleSave = (itemData, editing) => {
    if (editing) {
      setData((prev) => prev.map((item) => (item.id === editing.id ? { ...item, ...itemData, updatedAt: new Date().toISOString() } : item)));
    } else {
      setData((prev) => [{ ...itemData, no: prev.length + 1, urutan: prev.length + 1, createdAt: new Date().toISOString() }, ...prev]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div>
      <TambahEditBerita show={showForm} editing={editingItem} publisher={publisher} onClose={() => { setShowForm(false); setEditingItem(null); }} onSave={handleSave} />

      {/* Modal Preview Berita */}
      <Modal show={showPreview} onClose={() => setShowPreview(false)} title="Preview Berita Publik" icon="fa-regular fa-newspaper" accent="#1b3878" size="lg" footer={<button type="button" className="btn btn-light border fw-semibold px-4" onClick={() => setShowPreview(false)}>Tutup preview</button>}>
        {previewItem && (
          <div>
            {previewItem.thumbnail ? (
              <div className="rounded-4 bg-light d-flex align-items-center justify-content-center mb-3 overflow-hidden shadow-sm" style={{ maxHeight: '320px' }}>
                <img src={previewItem.thumbnail} alt={previewItem.judul} style={{ width: '100%', objectFit: 'cover' }} />
              </div>
            ) : null}
            <div className="d-flex flex-wrap align-items-center gap-3 small text-muted mb-3 border-bottom pb-2">
              <span className="d-inline-flex align-items-center gap-1"><i className="fa-regular fa-calendar text-primary"></i> {formatIndonesianDate(previewItem.tanggal)}</span>
              <span className="d-inline-flex align-items-center gap-1"><i className="fa-solid fa-user text-primary"></i> {previewItem.publisher || publisher}</span>
              <span className="d-inline-flex align-items-center gap-1"><i className="fa-solid fa-location-dot text-primary"></i> {previewItem.lokasi}</span>
              {previewItem.updatedAt && new Date(previewItem.updatedAt) > new Date(previewItem.createdAt || previewItem.tanggal) && (
                <span className="d-inline-flex align-items-center gap-1"><i className="fa-solid fa-pen-to-square text-primary"></i> Diedit {formatRelativeTime(previewItem.updatedAt)}</span>
              )}
            </div>
            <h3 className="fw-bold mb-3 text-dark">{previewItem.judul}</h3>
            <div className="text-secondary lh-lg" style={{ fontSize: '0.95rem' }}>
              {(previewItem.blocks || []).map((b, idx) => {
                if (b.type === 'text') return <div key={idx} className="mb-3" dangerouslySetInnerHTML={{ __html: b.content }} />;
                if (b.type === 'image' && b.content) {
                  return (
                    <div key={idx} className="my-3 text-center">
                      <img src={b.content} alt="Sisipan Berita" className="rounded-3 shadow-sm" style={{ maxWidth: '100%', maxHeight: '350px' }} />
                      {b.caption && <div className="text-muted small fst-italic mt-1">{b.caption}</div>}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </Modal>

      {/* Header halaman */}
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-regular fa-newspaper"></i></span>
          <div>
            <h1 className="berita-topbar-title">Berita</h1>
            <p className="berita-topbar-sub">Daftar semua Berita</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-house" aria-hidden="true"></i> Beranda</a>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Berita</span>
          <span aria-hidden="true">/</span>
        </nav>
      </div>

      <div aria-labelledby="berita-table-title">
        <div className="berita-card-head">
          <h2 id="berita-table-title"><i className="fa-solid fa-list-ul" aria-hidden="true"></i> TABEL BERITA</h2>
          <button type="button" className="berita-btn-add" onClick={handleOpenAdd}><i className="fa-solid fa-plus" aria-hidden="true"></i> Tambah Berita</button>
        </div>
        <div className="bo-panel-body">
          <div className="berita-controls">
            <label className="berita-entries">
              Show
              <select className="form-select form-select-sm" value={entries} onChange={(e) => setEntries(Number(e.target.value))} aria-label="Show entries">
                <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option>
              </select>
              entries
            </label>
            <div className="berita-search">
              <label className="visually-hidden" htmlFor="berita-search-input">Search</label>
              <input id="berita-search-input" type="search" className="form-control form-control-sm" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <caption className="visually-hidden">Daftar berita, urut terbaru di paling atas</caption>
              <thead className="table-secondary">
                <tr>
                  <th scope="col" className="text-center" style={{ width: '60px' }}>No.</th>
                  <th scope="col">Judul Berita</th>
                  <th scope="col" style={{ width: '140px' }}>Tanggal</th>
                  <th scope="col" className="text-center" style={{ width: '130px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((row, idx) => (
                  <tr key={row.id}>
                    <td className="text-center fw-semibold">{startIdx + idx + 1}</td>
                    <td>
                      <div className="fw-bold text-dark">{row.judul}</div>
                      {row.updatedAt && new Date(row.updatedAt) > new Date(row.createdAt || row.tanggal) && (
                        <div className="small text-muted d-flex align-items-center gap-1 mt-1">
                          <i className="fa-solid fa-pen-to-square" style={{ fontSize: '0.7rem' }} aria-hidden="true"></i>
                          Diedit {formatRelativeTime(row.updatedAt)}
                        </div>
                      )}
                    </td>
                    <td className="text-muted small">{formatShortDisplayDate(row.tanggal)}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-1">
                        <button type="button" className="berita-action berita-action--preview" title="Preview Berita" onClick={() => handleOpenPreview(row)}><i className="fa-solid fa-eye" aria-hidden="true"></i><span className="visually-hidden">Preview</span></button>
                        <button type="button" className="berita-action berita-action--edit" title="Edit Berita" onClick={() => handleOpenEdit(row)}><i className="fa-solid fa-pen-to-square" aria-hidden="true"></i><span className="visually-hidden">Edit</span></button>
                        <button type="button" className="berita-action berita-action--delete" title="Hapus Berita" onClick={() => handleDelete(row.id)}><i className="fa-solid fa-trash-can" aria-hidden="true"></i><span className="visually-hidden">Hapus</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr><td colSpan={4} className="text-center text-muted py-4">{search ? `Tidak ada berita yang cocok dengan "${search}".` : 'Tidak ada data berita.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="berita-footer">
            <span className="small text-muted">Showing {filtered.length === 0 ? 0 : startIdx + 1} to {Math.min(startIdx + entries, filtered.length)} of {filtered.length} entries</span>
            <nav className="berita-pagination" aria-label="Navigasi halaman">
              <button type="button" disabled={safePage <= 1} onClick={() => setPage(1)} title="Halaman pertama" aria-label="Halaman pertama"><i className="fa-solid fa-angles-left" aria-hidden="true"></i></button>
              <button type="button" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)} title="Sebelumnya" aria-label="Sebelumnya"><i className="fa-solid fa-angle-left" aria-hidden="true"></i></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" className={n === safePage ? 'is-current' : ''} onClick={() => setPage(n)} aria-current={n === safePage ? 'page' : undefined}>{n}</button>
              ))}
              <button type="button" disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)} title="Berikutnya" aria-label="Berikutnya"><i className="fa-solid fa-angle-right" aria-hidden="true"></i></button>
              <button type="button" disabled={safePage >= totalPages} onClick={() => setPage(totalPages)} title="Halaman terakhir" aria-label="Halaman terakhir"><i className="fa-solid fa-angles-right" aria-hidden="true"></i></button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
