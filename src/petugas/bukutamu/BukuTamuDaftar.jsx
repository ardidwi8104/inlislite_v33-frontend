import React, { useState, useEffect } from 'react';
import { Controls, DataTableFooter } from '../koleksi/helpers';
import { listVisits, formatDateID } from '../../lib/libraryStore';

const DEFAULT_ANGGOTA_SEED = [
  { id: 'SEED-A1', tgl: '2026-11-26', nama: 'Ahmad Fauzi Rahman', noAnggota: '202609001', perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama' },
  { id: 'SEED-A2', tgl: '2026-11-26', nama: 'Siti Nurhaliza', noAnggota: '202609004', perpus: 'Perpustakaan Pusat', ruang: 'Ruang Referensi' },
];

const DEFAULT_BUKAN_ANGGOTA_SEED = [
  { id: 'SEED-NA1', tgl: '2026-11-26', nama: 'Muhammad Rizky', pekerjaan: 'Mahasiswa', pendidikan: 'S1', perpus: 'Perpustakaan Pusat', ruang: 'Lobby Utama' },
  { id: 'SEED-NA2', tgl: '2026-11-26', nama: 'Dr. Hendra Wijaya', pekerjaan: 'Dosen', pendidikan: 'S3', perpus: 'Perpustakaan Pusat', ruang: 'Ruang Referensi' },
];

const DEFAULT_ROMBONGAN_SEED = [
  { id: 'SEED-R1', tgl: '2026-11-26', ketua: 'Drs. H. Mulyadi', instansi: 'SMA Negeri 1 Penajam', jumlah: 35, perpus: 'Perpustakaan Pusat', ruang: 'Aula Pertemuan' },
];

export default function BukuTamuDaftar() {
  const [kategori, setKategori] = useState('anggota'); // 'anggota' | 'bukan-anggota' | 'rombongan'
  const [visits, setVisits] = useState(() => listVisits());

  const refresh = () => setVisits(listVisits());

  useEffect(() => {
    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);
    window.addEventListener('storage', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onFocus);
    };
  }, []);

  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  // Filter kunjungan nyata dari libraryStore berdasarkan kategori (hanya yang sudah terverifikasi / semua)
  // Sinkronisasi data kunjungan:
  const verifiedVisits = visits; // menampilkan seluruh kunjungan buku tamu

  const realAnggota = verifiedVisits
    .filter((v) => v.type === 'anggota')
    .map((v) => ({
      id: v.id,
      tgl: formatDateID(v.visitDate),
      nama: v.name || '-',
      noAnggota: v.memberNo || v.identityNo || v.bookingCode,
      perpus: 'Perpustakaan Pusat',
      ruang: v.location || v.purpose || 'Lobby Utama',
      status: v.status,
    }));

  const realBukanAnggota = verifiedVisits
    .filter((v) => v.type === 'nonanggota')
    .map((v) => ({
      id: v.id,
      tgl: formatDateID(v.visitDate),
      nama: v.name || '-',
      pekerjaan: v.profession || 'Umum',
      pendidikan: v.education || '-',
      perpus: 'Perpustakaan Pusat',
      ruang: v.location || v.purpose || 'Lobby Utama',
      status: v.status,
    }));

  const realRombongan = verifiedVisits
    .filter((v) => v.type === 'rombongan')
    .map((v) => ({
      id: v.id,
      tgl: formatDateID(v.visitDate),
      ketua: v.name || '-',
      instansi: v.institution || '-',
      jumlah: v.groupSize || 1,
      perpus: 'Perpustakaan Pusat',
      ruang: v.location || v.purpose || 'Ruang Pertemuan',
      status: v.status,
    }));

  const listAnggota = [...realAnggota, ...DEFAULT_ANGGOTA_SEED];
  const listBukanAnggota = [...realBukanAnggota, ...DEFAULT_BUKAN_ANGGOTA_SEED];
  const listRombongan = [...realRombongan, ...DEFAULT_ROMBONGAN_SEED];

  let currentList = [];
  if (kategori === 'anggota') currentList = listAnggota;
  else if (kategori === 'bukan-anggota') currentList = listBukanAnggota;
  else if (kategori === 'rombongan') currentList = listRombongan;

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

  const getKategoriLabel = () => {
    if (kategori === 'anggota') return 'Anggota';
    if (kategori === 'bukan-anggota') return 'Bukan Anggota';
    return 'Rombongan';
  };

  return (
    <>
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
          <span className="is-active fw-semibold text-warning" aria-current="page">{getKategoriLabel()}</span>
        </nav>
      </div>

      <div className="bo-panel-body p-0">
        <div className="d-flex align-items-center gap-2 mb-3">
          <button
            type="button"
            className={`btn btn-sm px-3 fw-semibold rounded-pill shadow-sm ${
              kategori === 'anggota' ? 'btn-primary' : 'btn-outline-secondary bg-white'
            }`}
            onClick={() => { setKategori('anggota'); setPage(1); }}
          >
            <i className="fa-solid fa-id-card me-1"></i> Anggota
          </button>
          <button
            type="button"
            className={`btn btn-sm px-3 fw-semibold rounded-pill shadow-sm ${
              kategori === 'bukan-anggota' ? 'btn-primary' : 'btn-outline-secondary bg-white'
            }`}
            onClick={() => { setKategori('bukan-anggota'); setPage(1); }}
          >
            <i className="fa-solid fa-user me-1"></i> Bukan Anggota
          </button>
          <button
            type="button"
            className={`btn btn-sm px-3 fw-semibold rounded-pill shadow-sm ${
              kategori === 'rombongan' ? 'btn-primary' : 'btn-outline-secondary bg-white'
            }`}
            onClick={() => { setKategori('rombongan'); setPage(1); }}
          >
            <i className="fa-solid fa-users-rectangle me-1"></i> Rombongan
          </button>
        </div>

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
                      <th style={{ width: 150 }}>Tgl. Kunjungan</th>
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
                      <th style={{ width: 150 }}>Tgl. Kunjungan</th>
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
                      <th style={{ width: 150 }}>Tgl. Kunjungan</th>
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
                      <td className="text-center fw-semibold">{startIdx + idx + 1}</td>
                      <td className="small">{row.tgl}</td>
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
                          onClick={() => alert('Data kunjungan berhasil dihapus.')}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {kategori === 'bukan-anggota' && paged.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="text-center fw-semibold">{startIdx + idx + 1}</td>
                      <td className="small">{row.tgl}</td>
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
                          onClick={() => alert('Data kunjungan berhasil dihapus.')}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {kategori === 'rombongan' && paged.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="text-center fw-semibold">{startIdx + idx + 1}</td>
                      <td className="small">{row.tgl}</td>
                      <td className="fw-semibold text-dark">{row.ketua}</td>
                      <td className="fw-semibold text-primary">{row.instansi}</td>
                      <td className="text-center fw-semibold font-monospace">
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
                          onClick={() => alert('Data kunjungan berhasil dihapus.')}
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
