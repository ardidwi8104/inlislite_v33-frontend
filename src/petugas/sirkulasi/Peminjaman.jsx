import React, { useState } from 'react';
import { useTableControls, Controls, DataTableFooter } from '../koleksi/helpers';

const SEED = [];

export default function Peminjaman() {
  const [rows] = useState(SEED);
  const t = useTableControls(rows, (r, q) => {
    const k = q.trim().toLowerCase();
    return !k;
  });
  return (
    <>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-book-reader"></i></span>
          <div>
            <h1 className="berita-topbar-title">Peminjaman</h1>
            <p className="berita-topbar-sub">Daftar Peminjaman</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-house" aria-hidden="true"></i> Beranda</a>
          <span aria-hidden="true">/</span>
          <span>Sirkulasi</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Peminjaman</span>
        </nav>
      </div>
      <div>
        <div className="berita-card-head">
          <h2><i className="fa-solid fa-list-ul" aria-hidden="true"></i> DAFTAR PEMINJAMAN</h2>
          <div className="d-flex gap-2 flex-wrap align-items-center">
            <button type="button" className="berita-btn-add" style={{ background: '#dc3545' }}><i className="fa-solid fa-bell me-1"></i> Notifikasi Semua Terlambat</button>
            <button type="button" className="berita-btn-add" style={{ background: '#198754' }}><i className="fa-solid fa-plus me-1"></i> Peminjaman</button>
          </div>
        </div>
        <div className="bo-panel-body">
          <Controls {...t} />
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-secondary">
                <tr>
                  <th className="text-center" style={{ width: 44 }}>No.</th>
                  <th>No. Barcode</th>
                  <th>Penerbit / Judul</th>
                  <th>Tgl. Pinjam / Jatuh Tempo</th>
                  <th>Tgl. Kembali</th>
                  <th>Hari Terlambat</th>
                  <th>Lokasi Perpustakaan</th>
                  <th>Updated Date</th>
                </tr>
              </thead>
              <tbody>
                {t.paged.length === 0 && <tr><td colSpan={8} className="text-center text-muted py-4">No data available in table</td></tr>}
              </tbody>
            </table>
          </div>
          <DataTableFooter {...t} />
        </div>
      </div>
    </>
  );
}
