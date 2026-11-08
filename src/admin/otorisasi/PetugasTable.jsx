import React, { useState, useEffect } from 'react';
import { listPetugasAccounts, addPetugasAccount, removePetugasAccount } from '../../lib/libraryStore';
import TambahPetugasModal from './TambahPetugasModal';
import { ConfirmModal } from '../../petugas/koleksi/helpers';

export default function PetugasTable() {
  const [accounts, setAccounts] = useState(() => listPetugasAccounts());
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const refresh = () => setAccounts(listPetugasAccounts());

  useEffect(() => { setPage(1); }, [search, entries]);

  const filtered = accounts.filter((row) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [row.username, row.name, row.status].some((v) => String(v || '').toLowerCase().includes(q));
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * entries;
  const paged = filtered.slice(startIdx, startIdx + entries);

  const openAdd = () => {
    setError('');
    setModalOpen(true);
  };

  const save = (form) => {
    const payload = {
      username: form.username,
      name: [form.namaDepan, form.namaBelakang].filter(Boolean).join(' ').trim() || form.username,
      password: form.password && form.password.trim() ? form.password : '-',
      email: form.email,
      telepon: form.telepon,
      aksesLokasi: form.aksesLokasi,
    };
    const result = addPetugasAccount(payload);
    if (!result.ok) {
      setError(result.message || 'Gagal menyimpan akun petugas.');
      return false;
    }
    refresh();
    setModalOpen(false);
    return true;
  };

  const remove = (id) => {
    removePetugasAccount(id);
    refresh();
    setConfirmDelete(null);
  };

  return (
    <div>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-user-tie"></i></span>
          <div>
            <h1 className="berita-topbar-title">Akun Petugas</h1>
            <p className="berita-topbar-sub">Daftar semua akun petugas</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-house" aria-hidden="true"></i> Beranda</a>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Akun Petugas</span>
        </nav>
      </div>

      <div aria-labelledby="petugas-table-title">
        <div className="berita-card-head">
          <h2 id="petugas-table-title"><i className="fa-solid fa-list-ul" aria-hidden="true"></i> TABEL AKUN PETUGAS</h2>
          <button type="button" className="berita-btn-add" onClick={openAdd}><i className="fa-solid fa-plus" aria-hidden="true"></i> Tambah Petugas</button>
        </div>
        <div className="bo-panel-body">
          {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

          <div className="berita-controls">
            <label className="berita-entries">
              Show
              <select className="form-select form-select-sm" value={entries} onChange={(e) => setEntries(Number(e.target.value))} aria-label="Show entries">
                <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option>
              </select>
              entries
            </label>
            <div className="berita-search">
              <label className="visually-hidden" htmlFor="petugas-search-input">Search</label>
              <input id="petugas-search-input" type="search" className="form-control form-control-sm" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <caption className="visually-hidden">Daftar akun petugas</caption>
              <thead className="table-secondary">
                <tr>
                  <th scope="col" className="text-center" style={{ width: '60px' }}>No.</th>
                  <th scope="col">Username</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Password</th>
                  <th scope="col" className="text-center" style={{ width: '120px' }}>Status</th>
                  <th scope="col" className="text-center" style={{ width: '110px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((row, idx) => (
                  <tr key={row.id}>
                    <td className="text-center fw-semibold">{startIdx + idx + 1}</td>
                    <td><span className="fw-semibold text-dark">{row.username}</span></td>
                    <td>{row.name}</td>
                    <td><span className="text-muted small">{row.password}</span></td>
                    <td className="text-center">
                      <span className="bo-tag bo-tag--active">{row.status}</span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-1">
                        <button type="button" className="berita-action berita-action--delete" title="Hapus akun petugas" onClick={() => setConfirmDelete(row.id)}>
                          <i className="fa-solid fa-trash-can" aria-hidden="true"></i>
                          <span className="visually-hidden">Hapus</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      {search ? `Tidak ada akun yang cocok dengan "${search}".` : 'Belum ada akun petugas.'}
                    </td>
                  </tr>
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

      <TambahPetugasModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={save}
      />

      {confirmDelete && (
        <ConfirmModal
          title="Hapus Akun Petugas?"
          message="Akun petugas akan dihapus permanen."
          confirmLabel="Hapus"
          confirmColor="#dc2626"
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => remove(confirmDelete)}
        />
      )}
    </div>
  );
}
