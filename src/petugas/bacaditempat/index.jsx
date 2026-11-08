import React, { useState } from 'react';
import { useTableControls, Controls, DataTableFooter } from '../koleksi/helpers';

const SEED = [
  { id: 1, tgl: '2026-05-25 14:44:45', nama: 'An. Anggota', noAnggota: 'ANG-001', barcode: 'BC-001', koleksi: 'Laskar Pelangi', perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama', status: 'belum' },
  { id: 2, tgl: '2026-05-24 11:38:53', nama: 'An. Anggota', noAnggota: 'ANG-002', barcode: 'BC-002', koleksi: 'Bumi Manusia', perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama', status: 'sudah' },
];

export default function PetugasBacaDitempat() {
  const [tab, setTab] = useState('anggota');
  const [rows] = useState(SEED);
  const t = useTableControls(rows, (r, q) => {
    const k = q.trim().toLowerCase();
    return !k || r.nama.toLowerCase().includes(k) || r.barcode.toLowerCase().includes(k) || r.noAnggota.toLowerCase().includes(k);
  });

  return (
    <>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-pen-to-square"></i></span>
          <div>
            <h1 className="berita-topbar-title">Baca Ditempat - Anggota</h1>
            <p className="berita-topbar-sub">Daftar semua Baca Ditempat Anggota</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-house" aria-hidden="true"></i> Beranda</a>
          <span aria-hidden="true">/</span>
          <span>Baca Ditempat</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Anggota</span>
        </nav>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <button type="button" className={`btn btn-sm ${tab === 'anggota' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('anggota')}>Anggota</button>
        <button type="button" className={`btn btn-sm ${tab === 'non' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setTab('non')}>Non Anggota</button>
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
                  <th className="text-center" style={{ width: 44 }}>No</th>
                  <th>Tgl. Kunjungan</th>
                  <th>Nama Anggota</th>
                  <th>Nomor Anggota</th>
                  <th>Nomor Barcode</th>
                  <th>Koleksi</th>
                  <th>Lokasi Perpustakaan</th>
                  <th>Lokasi Ruang</th>
                  <th>Status Pengembalian</th>
                  <th className="text-center" style={{ width: 90 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {t.paged.map((r, idx) => (
                  <tr key={r.id}>
                    <td className="text-center fw-semibold">{t.startIdx + idx + 1}</td>
                    <td>{r.tgl}</td>
                    <td className="fw-bold text-dark">{r.nama}</td>
                    <td><span className="badge bg-info text-dark"><i className="fa-solid fa-id-card me-1"></i>{r.noAnggota}</span></td>
                    <td><span className="badge bg-info text-dark"><i className="fa-solid fa-qrcode me-1"></i>{r.barcode}</span></td>
                    <td>{r.koleksi}</td>
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
                ))}
                {t.paged.length === 0 && <tr><td colSpan={10} className="text-center text-muted py-4">No data available in table</td></tr>}
              </tbody>
            </table>
          </div>
          <DataTableFooter {...t} />
        </div>
      </div>
    </>
  );
}
