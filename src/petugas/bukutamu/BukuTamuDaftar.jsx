import React, { useState } from 'react';
import { Controls, DataTableFooter } from '../koleksi/helpers';

// Dummy seeds per kategori
const ANGGOTA_SEED = [
  { id: 1, tgl: '2026-11-08 09:15:20', nama: 'Ahmad Fauzi Rahman', noAnggota: '202609001', perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama' },
  { id: 2, tgl: '2026-11-08 10:22:11', nama: 'Siti Nurhaliza', noAnggota: '202609004', perpus: 'Perpustakaan Pusat', ruang: 'Ruang Referensi' },
  { id: 3, tgl: '2026-11-08 11:05:40', nama: 'Budi Santoso', noAnggota: '202609002', perpus: 'Perpustakaan Pusat', ruang: 'Layanan Digital' },
];

const BUKAN_ANGGOTA_SEED = [
  { id: 101, tgl: '2026-11-08 08:45:10', nama: 'Muhammad Rizky', pekerjaan: 'Mahasiswa', pendidikan: 'S1', perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama' },
  { id: 102, tgl: '2026-11-08 09:30:25', nama: 'Dr. Hendra Wijaya', pekerjaan: 'Dosen', pendidikan: 'S3', perpus: 'Perpustakaan Pusat', ruang: 'Ruang Referensi' },
  { id: 103, tgl: '2026-11-08 10:14:50', nama: 'Dewi Anggraini', pekerjaan: 'Pelajar', pendidikan: 'SMA', perpus: 'Perpustakaan Pusat', ruang: 'Layanan Remaja' },
  { id: 104, tgl: '2026-11-08 11:20:05', nama: 'Agus Setiawan', pekerjaan: 'Pegawai Negeri Sipil', pendidikan: 'S1', perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama' },
];

const ROMBONGAN_SEED = [
  { id: 201, tgl: '2026-11-08 08:30:00', ketua: 'Drs. H. Mulyadi', instansi: 'SMA Negeri 1 Penajam', jumlah: 35, perpus: 'Perpustakaan Pusat', ruang: 'Aula Pertemuan' },
  { id: 202, tgl: '2026-11-08 10:00:15', ketua: 'Rina Kusuma, S.Pd', instansi: 'Diansyah & Partners', jumlah: 12, perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama' },
  { id: 203, tgl: '2026-11-08 11:45:00', ketua: 'Ust. Fahmi Hakim', instansi: 'Staipi Jakarta', jumlah: 24, perpus: 'Perpustakaan Pusat', ruang: 'Ruang Baca Umum' },
];

export default function BukuTamuDaftar() {
  const [kategori, setKategori] = useState('anggota'); // 'anggota' | 'bukan-anggota' | 'rombongan'
  const [dataAnggota, setDataAnggota] = useState(ANGGOTA_SEED);
  const [dataBukanAnggota, setDataBukanAnggota] = useState(BUKAN_ANGGOTA_SEED);
  const [dataRombongan, setDataRombongan] = useState(ROMBONGAN_SEED);

  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  // Dapatkan dataset aktif sesuai tab kategori
  let currentList = [];
  if (kategori === 'anggota') currentList = dataAnggota;
  else if (kategori === 'bukan-anggota') currentList = dataBukanAnggota;
  else if (kategori === 'rombongan') currentList = dataRombongan;

  const filtered = currentList.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    if (kategori === 'anggota') {
      return (item.nama || '').toLowerCase().includes(q) || (item.noAnggota || '').toLowerCase().includes(q);
    } else if (kategori === 'bukan-anggota') {
      return (item.nama || '').toLowerCase().includes(q) || (item.pekerjaan || '').toLowerCase().includes(q) || (item.pendidikan || '').toLowerCase().includes(q);
    } else {
      return (item.ketua || '').toLowerCase().includes(q) || (item.instansi || '').toLowerCase().includes(q);
    }
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * entries;
  const paged = filtered.slice(startIdx, startIdx + entries);

  const handleDelete = (id) => {
    if (window.confirm('Hapus data kunjungan buku tamu ini?')) {
      if (kategori === 'anggota') setDataAnggota((prev) => prev.filter((i) => i.id !== id));
      else if (kategori === 'bukan-anggota') setDataBukanAnggota((prev) => prev.filter((i) => i.id !== id));
      else setDataRombongan((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const getKategoriLabel = () => {
    if (kategori === 'anggota') return 'Anggota';
    if (kategori === 'bukan-anggota') return 'Bukan Anggota';
    return 'Rombongan';
  };

  return (
    <>
      {/* 2. B. Header Sub-Title & Breadcrumb Section */}
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span
            className="berita-topbar-icon"
            style={{ backgroundColor: '#ffffff', color: '#e11d48', borderColor: '#fda4af' }}
            aria-hidden="true"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
          <div>
            <h1 className="berita-topbar-title">Buku Tamu - {getKategoriLabel()}</h1>
            <p className="berita-topbar-sub">Daftar semua Buku Tamu {getKategoriLabel()}</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}>
            <i className="fa-solid fa-house" aria-hidden="true"></i> Home
          </a>
          <span aria-hidden="true">/</span>
          <span>Buku Tamu</span>
          <span aria-hidden="true">/</span>
          <span className="is-active fw-bold text-warning" aria-current="page">{getKategoriLabel()}</span>
        </nav>
      </div>

      <div className="bo-panel-body p-0">
        
        {/* 3. Sub-Menu Navigasi 3 Kategori Pengunjung */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <button
            type="button"
            className={`btn btn-sm px-3 fw-bold rounded-pill shadow-sm ${
              kategori === 'anggota' ? 'btn-primary' : 'btn-outline-secondary bg-white'
            }`}
            onClick={() => { setKategori('anggota'); setPage(1); }}
          >
            <i className="fa-solid fa-id-card me-1"></i> Anggota
          </button>
          <button
            type="button"
            className={`btn btn-sm px-3 fw-bold rounded-pill shadow-sm ${
              kategori === 'bukan-anggota' ? 'btn-primary' : 'btn-outline-secondary bg-white'
            }`}
            onClick={() => { setKategori('bukan-anggota'); setPage(1); }}
          >
            <i className="fa-solid fa-user me-1"></i> Bukan Anggota
          </button>
          <button
            type="button"
            className={`btn btn-sm px-3 fw-bold rounded-pill shadow-sm ${
              kategori === 'rombongan' ? 'btn-primary' : 'btn-outline-secondary bg-white'
            }`}
            onClick={() => { setKategori('rombongan'); setPage(1); }}
          >
            <i className="fa-solid fa-users-rectangle me-1"></i> Rombongan
          </button>
        </div>

        {/* 4. Card Content Area (Datatable Buku Tamu) */}
        <div className="card border shadow-sm">
          <div className="berita-card-head">
            <h2 id="buku-tamu-title">
              <i className="fa-solid fa-list-ul" aria-hidden="true"></i> TABEL BUKU TAMU
            </h2>
          </div>

          <div className="p-3">
            <Controls entries={entries} setEntries={setEntries} search={search} setSearch={setSearch} />

            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0">
                <thead className="table-secondary">
                  {kategori === 'anggota' && (
                    <tr>
                      <th style={{ width: 45 }} className="text-center">No</th>
                      <th style={{ width: 170 }}>Tgl. Kunjungan</th>
                      <th>Nama Anggota</th>
                      <th style={{ width: 180 }}>Nomor Anggota</th>
                      <th style={{ width: 180 }}>Lokasi Perpustakaan</th>
                      <th style={{ width: 150 }}>Lokasi Ruang</th>
                      <th style={{ width: 70 }} className="text-center">Aksi</th>
                    </tr>
                  )}

                  {kategori === 'bukan-anggota' && (
                    <tr>
                      <th style={{ width: 45 }} className="text-center">No</th>
                      <th style={{ width: 170 }}>Tgl. Kunjungan</th>
                      <th>Nama Pengunjung</th>
                      <th style={{ width: 160 }}>Pekerjaan</th>
                      <th style={{ width: 120 }}>Pendidikan</th>
                      <th style={{ width: 180 }}>Lokasi Perpustakaan</th>
                      <th style={{ width: 150 }}>Lokasi Ruang</th>
                      <th style={{ width: 70 }} className="text-center">Aksi</th>
                    </tr>
                  )}

                  {kategori === 'rombongan' && (
                    <tr>
                      <th style={{ width: 45 }} className="text-center">No</th>
                      <th style={{ width: 170 }}>Tgl. Kunjungan</th>
                      <th>Nama Ketua</th>
                      <th>Asal Instansi</th>
                      <th style={{ width: 130 }} className="text-center">Jumlah Personil</th>
                      <th style={{ width: 180 }}>Lokasi Perpustakaan</th>
                      <th style={{ width: 150 }}>Lokasi Ruang</th>
                      <th style={{ width: 70 }} className="text-center">Aksi</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {kategori === 'anggota' && paged.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="text-center fw-bold">{startIdx + idx + 1}</td>
                      <td className="small font-monospace">{row.tgl}</td>
                      <td className="fw-semibold text-dark">{row.nama}</td>
                      <td>
                        <span className="badge bg-light text-primary border font-monospace d-inline-flex align-items-center gap-1">
                          <i className="fa-solid fa-id-card"></i> {row.noAnggota}
                        </span>
                      </td>
                      <td className="small text-muted">{row.perpus}</td>
                      <td className="small text-muted">{row.ruang}</td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger py-1 px-2"
                          title="Hapus Kunjungan"
                          onClick={() => handleDelete(row.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {kategori === 'bukan-anggota' && paged.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="text-center fw-bold">{startIdx + idx + 1}</td>
                      <td className="small font-monospace">{row.tgl}</td>
                      <td className="fw-semibold text-dark">{row.nama}</td>
                      <td><span className="badge bg-info-subtle text-info-emphasis border">{row.pekerjaan}</span></td>
                      <td><span className="badge bg-secondary-subtle text-secondary border">{row.pendidikan}</span></td>
                      <td className="small text-muted">{row.perpus}</td>
                      <td className="small text-muted">{row.ruang}</td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger py-1 px-2"
                          title="Hapus Kunjungan"
                          onClick={() => handleDelete(row.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {kategori === 'rombongan' && paged.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="text-center fw-bold">{startIdx + idx + 1}</td>
                      <td className="small font-monospace">{row.tgl}</td>
                      <td className="fw-semibold text-dark">{row.ketua}</td>
                      <td className="fw-bold text-primary">{row.instansi}</td>
                      <td className="text-center fw-bold font-monospace">
                        <span className="badge bg-success-subtle text-success border px-2 py-1">
                          {row.jumlah} Orang
                        </span>
                      </td>
                      <td className="small text-muted">{row.perpus}</td>
                      <td className="small text-muted">{row.ruang}</td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger py-1 px-2"
                          title="Hapus Kunjungan"
                          onClick={() => handleDelete(row.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {paged.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center text-muted py-4">
                        {search ? `Tidak ada kunjungan yang cocok dengan pencarian "${search}".` : 'Tidak ada data buku tamu.'}
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

      </div>
    </>
  );
}
