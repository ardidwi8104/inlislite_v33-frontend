import React, { useState } from 'react';
import { useTableControls, Controls, DataTableFooter } from '../koleksi/helpers';

const SEED = [];

export default function Pelanggaran() {
  const [rows] = useState(SEED);
  const t = useTableControls(rows, (r, q) => true);
  return (
    <>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-triangle-exclamation"></i></span>
          <div>
            <h1 className="berita-topbar-title">Pelanggaran</h1>
            <p className="berita-topbar-sub">Daftar Pelanggaran</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-house" aria-hidden="true"></i> Beranda</a>
          <span aria-hidden="true">/</span>
          <span>Sirkulasi</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Pelanggaran</span>
        </nav>
      </div>
      <div>
        <div className="berita-card-head">
          <h2><i className="fa-solid fa-list-ul" aria-hidden="true"></i> DAFTAR PELANGGARAN</h2>
        </div>
        <div className="bo-panel-body">
          <Controls {...t} />
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-secondary">
                <tr>
                  <th className="text-center" style={{ width: 44 }}>No.</th>
                  <th>No. Anggota</th>
                  <th>Nama</th>
                  <th>Jenis Pelanggaran</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th className="text-center" style={{ width: 100 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {t.paged.length === 0 && <tr><td colSpan={7} className="text-center text-muted py-4">No data available in table</td></tr>}
              </tbody>
            </table>
          </div>
          <DataTableFooter {...t} />
        </div>
      </div>
    </>
  );
}
