import React, { useState, useEffect, useMemo } from 'react';
import Modal from '../../components/Modal';

export function Overlay({ children }) {
  return <div className="popup-backdrop">{children}</div>;
}

export function ConfirmModal({ title, message, onConfirm, onCancel, confirmLabel = 'Ya', confirmColor = '#dc3545', icon = 'fa-triangle-exclamation' }) {
  return (
    <Modal
      show
      onClose={onCancel}
      title={title}
      icon={icon}
      accent="#1b3878"
      size="sm"
      footer={
        <>
          <button type="button" className="btn btn-light border fw-semibold" onClick={onCancel}>Batal</button>
          <button type="button" className="btn text-white fw-semibold" style={{ backgroundColor: confirmColor }} onClick={onConfirm}>{confirmLabel}</button>
        </>
      }
    >
      <p className="text-muted small mb-0">{message}</p>
    </Modal>
  );
}

export function SuccessModal({ message, onClose }) {
  return (
    <Modal
      show
      onClose={onClose}
      title="Berhasil"
      icon="fa-circle-check"
      accent="#1b3878"
      size="sm"
      footer={<button type="button" className="btn text-white fw-semibold" style={{ backgroundColor: '#1b3878' }} onClick={onClose}>OK</button>}
    >
      <p className="text-muted small mb-0">{message}</p>
    </Modal>
  );
}

export function useTableControls(rows, searchFn) {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [search, entries]);
  const filtered = useMemo(() => rows.filter((r) => searchFn(r, search)), [rows, search, searchFn]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * entries;
  const paged = filtered.slice(startIdx, startIdx + entries);
  return { search, setSearch, entries, setEntries, page: safePage, setPage, totalPages, startIdx, paged, total: filtered.length };
}

export function Controls({ entries, setEntries, search, setSearch }) {
  return (
    <div className="berita-controls">
      <label className="berita-entries">
        Show
        <select className="form-select form-select-sm" value={entries} onChange={(e) => setEntries(Number(e.target.value))} aria-label="Show entries">
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        entries
      </label>
      <div className="berita-search">
        <label className="visually-hidden" htmlFor="koleksi-search">Search</label>
        <input id="koleksi-search" type="search" className="form-control form-control-sm" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      </div>
    </div>
  );
}

export function DataTableFooter({ startIdx, entries, total, page, setPage, totalPages }) {
  return (
    <div className="berita-footer">
      <span className="small text-muted">Showing {total === 0 ? 0 : startIdx + 1} to {Math.min(startIdx + entries, total)} of {total} entries</span>
      <nav className="berita-pagination" aria-label="Navigasi halaman">
        <button type="button" disabled={page <= 1} onClick={() => setPage(1)} title="Halaman pertama" aria-label="Halaman pertama"><i className="fa-solid fa-angles-left" aria-hidden="true"></i></button>
        <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} title="Sebelumnya" aria-label="Sebelumnya"><i className="fa-solid fa-angle-left" aria-hidden="true"></i></button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button key={n} type="button" className={n === page ? 'is-current' : ''} onClick={() => setPage(n)} aria-current={n === page ? 'page' : undefined}>{n}</button>
        ))}
        <button type="button" disabled={page >= totalPages} onClick={() => setPage(page + 1)} title="Berikutnya" aria-label="Berikutnya"><i className="fa-solid fa-angle-right" aria-hidden="true"></i></button>
        <button type="button" disabled={page >= totalPages} onClick={() => setPage(totalPages)} title="Halaman terakhir" aria-label="Halaman terakhir"><i className="fa-solid fa-angles-right" aria-hidden="true"></i></button>
      </nav>
    </div>
  );
}
