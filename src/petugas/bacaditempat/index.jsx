import React, { useState } from 'react';
import { useTableControls, Controls, DataTableFooter } from '../koleksi/helpers';

const SEED_ANGGOTA = [
  { id: 1, tgl: '2026-05-25 14:44:45', nama: 'An. Anggota', noAnggota: '64.09.26.00001', barcode: 'PPU-2026-00001', koleksi: 'Laskar Pelangi', perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama', status: 'belum' },
  { id: 2, tgl: '2026-05-24 11:38:53', nama: 'An. Anggota', noAnggota: '64.09.26.00002', barcode: 'PPU-2026-00002', koleksi: 'Bumi Manusia', perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama', status: 'sudah' },
];

const SEED_NON = [
  { id: 101, tgl: '2026-05-24 11:59:53', nama: 'Dali', barcode: 'PPU-2026-00100', perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama', status: 'belum' },
];

export default function PetugasBacaDitempat() {
  const [tab, setTab] = useState('anggota');
  const isAnggota = tab === 'anggota';
  const rows = isAnggota ? SEED_ANGGOTA : SEED_NON;

  const t = useTableControls(rows, (r, q) => {
    const k = q.trim().toLowerCase();
    return !k || r.nama.toLowerCase().includes(k) || (r.barcode || '').toLowerCase().includes(k) || (r.noAnggota || '').toLowerCase().includes(k);
  });

  const anggotaCols = (
    <>
      <th className="text-center" style={{ width: 44 }}>No</th>
      <th>Tgl. Kunjungan</th>
      <th>Nama Anggota</th>
      <th>Nomor Anggota</th>
      <th>Nomor Barcode Koleksi</th>
      <th>Lokasi Perpustakaan</th>
      <th>Lokasi Ruang</th>
      <th>Status Pengembalian</th>
      <th className="text-center" style={{ width: 90 }}>Aksi</th>
    </>
  );

  const nonCols = (
    <>
      <th className="text-center" style={{ width: 44 }}>No</th>
      <th>Tgl. Kunjungan</th>
      <th>Nama Pengunjung</th>
      <th>Nomor Barcode Koleksi</th>
      <th>Lokasi Perpustakaan</th>
      <th>Lokasi Ruang</th>
      <th>Status Pengembalian</th>
      <th className="text-center" style={{ width: 90 }}>Aksi</th>
    </>
  );

  const anggotaBody = (r, idx) => (
    <tr key={r.id}>
      <td className="text-center fw-semibold">{t.startIdx + idx + 1}</td>
      <td>{r.tgl}</td>
      <td className="fw-bold text-dark">{r.nama}</td>
      <td><span className="badge bg-info text-dark">{r.noAnggota}</span></td>
      <td><span className="badge bg-info text-dark">{r.barcode}</span></td>
      <td>{r.perpus}</td>
      <td>{r.ruang}</td>
      <td>
        {r.status === 'belum'
          ? <span className="badge" style={{ backgroundColor: '#FDE68A', color: '#92400E' }}>BELUM DIKEMBALIKAN</span>
          : <span className="badge" style={{ backgroundColor: '#A7F3D0', color: '#065F46' }}>SUDAH DIKEMBALIKAN</span>}
      </td>
      <td className="text-center">
        <button type="button" className="btn btn-sm btn-danger" title="Hapus"><i className="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  );

  const nonBody = (r, idx) => (
    <tr key={r.id}>
      <td className="text-center fw-semibold">{t.startIdx + idx + 1}</td>
      <td>{r.tgl}</td>
      <td className="fw-bold text-dark">{r.nama}</td>
      <td><span className="badge bg-info text-dark">{r.barcode}</span></td>
      <td>{r.perpus}</td>
      <td>{r.ruang}</td>
      <td>
        {r.status === 'belum'
          ? <span className="badge" style={{ backgroundColor: '#FDE68A', color: '#92400E' }}>BELUM DIKEMBALIKAN</span>
          : <span className="badge" style={{ backgroundColor: '#A7F3D0', color: '#065F46' }}>SUDAH DIKEMBALIKAN</span>}
      </td>
      <td className="text-center">
        <button type="button" className="btn btn-sm btn-danger" title="Hapus"><i className="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  );

  return (
    <>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-pen-to-square"></i></span>
          <div>
            <h1 className="berita-topbar-title">Baca Ditempat - {tab === 'anggota' ? 'Anggota' : 'Non Anggota'}</h1>
            <p className="berita-topbar-sub">Daftar semua Baca Ditempat {tab === 'anggota' ? 'Anggota' : 'Non Anggota'}</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-house" aria-hidden="true"></i> Beranda</a>
          <span aria-hidden="true">/</span>
          <span>Baca Ditempat</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">{tab === 'anggota' ? 'Anggota' : 'Non Anggota'}</span>
        </nav>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <button type="button" className={`btn btn-sm ${tab === 'anggota' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('anggota')}>Anggota</button>
        <button type="button" className={`btn btn-sm ${tab === 'non' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('non')}>Non Anggota</button>
      </div>

      <div>
        <div className="berita-card-head">
          <h2><i className="fa-solid fa-list-check me-2"></i> TABEL BACA DITEMPAT</h2>
          <button type="button" className="berita-btn-add" style={{ background: '#198754' }}><i className="fa-solid fa-plus me-1"></i> Tambah</button>
        </div>
        <div className="bo-panel-body">
          <Controls {...t} />
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-secondary">
                <tr>
                  {isAnggota ? anggotaCols : nonCols}
                </tr>
              </thead>
              <tbody>
                {t.paged.map((r, idx) => (isAnggota ? anggotaBody(r, idx) : nonBody(r, idx)))}
                {t.paged.length === 0 && (
                  <tr><td colSpan={isAnggota ? 9 : 8} className="text-center text-muted py-4">No data available in table</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <DataTableFooter {...t} />
        </div>
      </div>
    </>
  );
}