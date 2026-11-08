import React, { useState, useEffect } from 'react';
import { Controls, DataTableFooter } from '../koleksi/helpers';

const STORAGE_KEY = 'inlislite.sirkulasi.pengembalian';

const INITIAL_DATA = [
  {
    id: 1,
    no_barcode: 'BC-202600201',
    judul_penerbit: 'Metodologi Penelitian Kuantitatif / Sugiyono (Rajawali Pers)',
    tgl_pinjam_tempo: '2026-10-25 s/d 2026-11-08',
    tgl_kembali: '2026-11-08',
    status: 'Kembali Tepat Waktu',
    lokasi: 'Perpustakaan Utama - Rak 01',
    updated_date: '2026-11-08',
  },
];

export default function Pengembalian() {
  const [data, setData] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return INITIAL_DATA;
  });

  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [search, entries]);

  const filtered = data.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (item.no_barcode || '').toLowerCase().includes(q) ||
      (item.judul_penerbit || '').toLowerCase().includes(q) ||
      (item.lokasi || '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * entries;
  const paged = filtered.slice(startIdx, startIdx + entries);

  return (
    <>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true">
            <i className="fa-solid fa-rotate-left"></i>
          </span>
          <div>
            <h1 className="berita-topbar-title">Pengembalian</h1>
            <p className="berita-topbar-sub">Daftar Pengembalian Koleksi</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}>
            <i className="fa-solid fa-house" aria-hidden="true"></i> Beranda
          </a>
          <span aria-hidden="true">/</span>
          <span>Sirkulasi</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Pengembalian</span>
        </nav>
      </div>

      <div>
        <div className="berita-card-head">
          <h2 id="pengembalian-table-title">
            <i className="fa-solid fa-list-ul" aria-hidden="true"></i> DAFTAR PENGEMBALIAN
          </h2>
          <a
            href="#/sirkulasi/pengembalian/create"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/sirkulasi/pengembalian/create';
            }}
            className="berita-btn-add"
            style={{ textDecoration: 'none' }}
          >
            <i className="fa-solid fa-plus me-1"></i> + Pengembalian
          </a>
        </div>

        <div className="bo-panel-body">
          <Controls entries={entries} setEntries={setEntries} search={search} setSearch={setSearch} />

          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-secondary">
                <tr>
                  <th className="text-center" style={{ width: 44 }}>No.</th>
                  <th style={{ width: 140 }}>No. Barcode</th>
                  <th>Penerbit / Judul</th>
                  <th style={{ width: 180 }}>Tgl. Pinjam / Jatuh Tempo</th>
                  <th style={{ width: 130 }}>Tgl. Kembali</th>
                  <th style={{ width: 160 }} className="text-center">Status</th>
                  <th style={{ width: 180 }}>Lokasi Perpustakaan</th>
                  <th style={{ width: 120 }}>Updated Date</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((row, idx) => (
                  <tr key={row.id}>
                    <td className="text-center fw-semibold">{startIdx + idx + 1}</td>
                    <td>
                      <span className="badge bg-light text-primary border font-monospace">
                        {row.no_barcode}
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{row.judul_penerbit}</div>
                    </td>
                    <td className="small">{row.tgl_pinjam_tempo}</td>
                    <td className="small">{row.tgl_kembali}</td>
                    <td className="text-center">
                      <span className="badge bg-success-subtle text-success border">
                        {row.status}
                      </span>
                    </td>
                    <td className="small text-muted">{row.lokasi}</td>
                    <td className="small text-muted">{row.updated_date}</td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center text-muted py-4">
                      {search ? `Tidak ada data yang cocok dengan "${search}".` : 'No data available in table'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <DataTableFooter
            startIdx={startIdx}
            entries={entries}
            total={filtered.length}
            page={safePage}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
}
