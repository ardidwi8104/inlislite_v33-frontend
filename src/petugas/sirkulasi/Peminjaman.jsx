import React, { useState, useEffect } from 'react';
import { Controls, DataTableFooter } from '../koleksi/helpers';

const STORAGE_KEY = 'inlislite.sirkulasi.peminjaman';

const INITIAL_DATA = [
  {
    id: 1,
    no_barcode: 'PPU-2026-00101',
    judul_penerbit: 'Laskar Pelangi / Andrea Hirata (Bentang Pustaka)',
    tgl_pinjam_tempo: '2026-11-01 s/d 2026-11-08',
    tgl_kembali: '-',
    hari_terlambat: '1 Hari',
    lokasi: 'Perpustakaan Utama - Rak 08',
    updated_date: '2026-11-08',
    no_anggota: '64.09.26.00001',
    nama_peminjam: 'Ahmad Fauzi Rahman',
  },
  {
    id: 2,
    no_barcode: 'PPU-2026-00102',
    judul_penerbit: 'Bumi Manusia / Pramoedya Ananta Toer (Lentera Dipantara)',
    tgl_pinjam_tempo: '2026-11-05 s/d 2026-11-12',
    tgl_kembali: '-',
    hari_terlambat: '0 Hari',
    lokasi: 'Perpustakaan Utama - Rak 08',
    updated_date: '2026-11-05',
    no_anggota: '64.09.26.00004',
    nama_peminjam: 'Siti Nurhaliza',
  },
];

export default function Peminjaman() {
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
      (item.nama_peminjam || '').toLowerCase().includes(q) ||
      (item.lokasi || '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * entries;
  const paged = filtered.slice(startIdx, startIdx + entries);

  const handleNotifyTerlambat = () => {
    alert('Notifikasi peringatan keterlambatan berhasil dikirimkan ke email seluruh anggota bersangkutan.');
  };

  return (
    <>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true">
            <i className="fa-solid fa-book-reader"></i>
          </span>
          <div>
            <h1 className="berita-topbar-title">Peminjaman</h1>
            <p className="berita-topbar-sub">Daftar Peminjaman Koleksi Perpustakaan</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}>
            <i className="fa-solid fa-house" aria-hidden="true"></i> Beranda
          </a>
          <span aria-hidden="true">/</span>
          <span>Sirkulasi</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Peminjaman</span>
        </nav>
      </div>

      <div>
        <div className="berita-card-head">
          <h2 id="peminjaman-table-title">
            <i className="fa-solid fa-list-ul" aria-hidden="true"></i> DAFTAR PEMINJAMAN
          </h2>
          <div className="d-flex gap-2 flex-wrap align-items-center">
            <button
              type="button"
              className="btn btn-danger btn-sm fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
              onClick={handleNotifyTerlambat}
            >
              <i className="fa-solid fa-bell me-1"></i> Notifikasi Semua Terlambat
            </button>
            <a
              href="#/sirkulasi/peminjaman/create"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#/sirkulasi/peminjaman/create';
              }}
              className="berita-btn-add"
              style={{ textDecoration: 'none' }}
            >
              <i className="fa-solid fa-plus me-1"></i> Tambah Peminjaman
            </a>
          </div>
        </div>

        <div className="bo-panel-body">
          <Controls entries={entries} setEntries={setEntries} search={search} setSearch={setSearch} />

          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-secondary">
                <tr>
                  <th className="text-center" style={{ width: 44 }}>No.</th>
                  <th style={{ width: 140 }}>No. Barcode</th>
                  <th style={{ width: 130 }}>Nama Peminjam</th>
                  <th style={{ width: 100 }}>No. Anggota</th>
                  <th>Penerbit / Judul</th>
                  <th style={{ width: 180 }}>Tgl. Pinjam / Jatuh Tempo</th>
                  <th style={{ width: 120 }}>Tgl. Kembali</th>
                  <th style={{ width: 120 }} className="text-center">Hari Terlambat</th>
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
                      <div className="fw-bold text-dark">{row.nama_peminjam || 'Peminjam'}</div>
                    </td>
                    <td className="small text-muted">{row.no_anggota || '000000'}</td>
                    <td>
                      <div className="fw-bold text-dark">{row.judul_penerbit}</div>
                    </td>
                    <td className="small">{row.tgl_pinjam_tempo}</td>
                    <td className="small text-muted">{row.tgl_kembali}</td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          row.hari_terlambat !== '0 Hari' ? 'bg-danger' : 'bg-success-subtle text-success border'
                        }`}
                      >
                        {row.hari_terlambat}
                      </span>
                    </td>
                    <td className="small text-muted">{row.lokasi}</td>
                    <td className="small text-muted">{row.updated_date}</td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center text-muted py-4">
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
