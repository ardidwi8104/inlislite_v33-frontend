import React, { useState, useEffect } from 'react';
import TambahEditBanner from './TambahEditBanner';
import { ConfirmModal, SuccessModal } from '../petugas/koleksi/helpers';

const initialBanners = [
  { no: 1, title: 'Banner utama', file: '/banner/20260527_1779891359_4b7007248d38c0dac1c4.webp', width: 3168, height: 1344, text: '', status: 'ACTIVE' },
  { no: 2, title: 'Banner pendukung', file: '/banner/20260527_1779891390_317be78295d8b6700d3d.webp', width: 3229, height: 937, text: '', status: 'ACTIVE' },
  { no: 3, title: 'Banner hero', file: '/banner/banner-hero.png', width: 1920, height: 600, text: '', status: 'ACTIVE' },
  { no: 4, title: 'Foto kegiatan 1', file: '/foto/FB_IMG_1649089559306.jpg', width: 1200, height: 800, text: 'Selamat datang di INLISLite 3.3', status: 'ACTIVE' },
  { no: 5, title: 'Foto kegiatan 2', file: '/foto/IMG-20250425-WA0019.jpg', width: 1200, height: 800, text: 'Selamat datang di Layanan Digital', status: 'ACTIVE' },
  { no: 6, title: 'Foto kegiatan 3', file: '/foto/WhatsApp-Image-2022-04-18-at-04.59.57-780x470.jpeg', width: 780, height: 470, text: 'Selamat datang di Perpustakaan Mitra', status: 'ACTIVE' },
];

export default function BannerPage() {
  const [banners, setBanners] = useState(initialBanners);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [success, setSuccess] = useState('');

  // Kontrol DataTables: pencarian, entries, paginasi, sorting
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(null); // 'no' | 'teks' | 'ukuran'
  const [sortDir, setSortDir] = useState(1); // 1 = asc, -1 = desc

  useEffect(() => {
    setPage(1);
  }, [search, entries]);

  const filtered = banners.filter((banner) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (banner.text || '').toLowerCase().includes(q) ||
      (banner.title || '').toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    let cmp = 0;
    if (sortKey === 'no') cmp = a.no - b.no;
    else if (sortKey === 'teks') cmp = String(a.text || '').localeCompare(String(b.text || ''));
    else if (sortKey === 'ukuran') cmp = (a.width * a.height) - (b.width * b.height);
    return cmp * sortDir;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / entries));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * entries;
  const paged = sorted.slice(startIdx, startIdx + entries);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => -d);
    } else {
      setSortKey(key);
      setSortDir(1);
    }
  };

  const toggleStatus = (no, status) => {
    setBanners((prev) => prev.map((b) => (b.no === no ? { ...b, status } : b)));
  };

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (b) => { setEditing(b); setModalOpen(true); };

  const save = (form, editingItem) => {
    if (!form.file) return;
    if (editingItem) {
      setBanners((prev) => prev.map((b) => b.no === editingItem.no ? { ...b, file: form.file, text: form.text, width: form.width, height: form.height } : b));
      setSuccess('Banner berhasil diperbarui');
    } else {
      const no = banners.length ? Math.max(...banners.map((b) => b.no)) + 1 : 1;
      setBanners((prev) => [...prev, { no, title: 'Banner baru', file: form.file, width: form.width, height: form.height, text: form.text, status: 'ACTIVE' }]);
      setSuccess('Banner berhasil ditambahkan');
    }
    setModalOpen(false);
  };

  const remove = (no) => {
    setBanners((prev) => prev.filter((b) => b.no !== no));
    setConfirmDelete(null);
    setSuccess('Banner berhasil dihapus');
  };

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <i className="fa-solid fa-sort" aria-hidden="true"></i>;
    return <i className={`fa-solid ${sortDir === 1 ? 'fa-sort-up' : 'fa-sort-down'}`} aria-hidden="true"></i>;
  };

  return (
    <div>
      {/* Header halaman: background biru royal + breadcrumb di kanan (kelas dipakai bersama dgn Berita) */}
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon banner-topbar-icon" aria-hidden="true">
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
          <div>
            <h1 className="berita-topbar-title">Banner</h1>
            <p className="berita-topbar-sub">Daftar semua Banner</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}>
            <i className="fa-solid fa-house" aria-hidden="true"></i> Beranda
          </a>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Banner</span>
          <span aria-hidden="true">/</span>
        </nav>
      </div>

      <div aria-labelledby="banner-table-title">
        <div className="berita-card-head">
          <h2 id="banner-table-title">
            <i className="fa-solid fa-list-ul" aria-hidden="true"></i> TABEL BANNER
          </h2>
          <button type="button" className="berita-btn-add" onClick={openAdd}>
            <i className="fa-solid fa-plus" aria-hidden="true"></i> Tambah Banner
          </button>
        </div>
        <div className="bo-panel-body">
          {/* Entries dropdown (kiri) + Search box (kanan) */}
          <div className="berita-controls">
            <label className="berita-entries">
              Show
              <select
                className="form-select form-select-sm"
                value={entries}
                onChange={(e) => setEntries(Number(e.target.value))}
                aria-label="Show entries"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              entries
            </label>
            <div className="berita-search">
              <label className="visually-hidden" htmlFor="banner-search-input">
                Search
              </label>
              <input
                id="banner-search-input"
                type="search"
                className="form-control form-control-sm"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <caption className="visually-hidden">
                Daftar banner yang tampil di portal publik
              </caption>
              <thead className="table-secondary">
                <tr>
                  <th scope="col" className="text-center" style={{ width: '60px' }}>
                    <button type="button" className="banner-sort-btn" onClick={() => handleSort('no')} title="Urutkan berdasarkan No.">
                      No. <SortIcon col="no" />
                    </button>
                  </th>
                  <th scope="col" style={{ width: '190px' }}>Thumbnail</th>
                  <th scope="col">
                    <button type="button" className="banner-sort-btn" onClick={() => handleSort('teks')} title="Urutkan berdasarkan Teks Banner">
                      Teks Banner (Opsional) <SortIcon col="teks" />
                    </button>
                  </th>
                  <th scope="col" style={{ width: '150px' }}>
                    <button type="button" className="banner-sort-btn" onClick={() => handleSort('ukuran')} title="Urutkan berdasarkan Ukuran">
                      Ukuran <SortIcon col="ukuran" />
                    </button>
                  </th>
                  <th scope="col" className="text-center" style={{ width: '180px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((banner, idx) => (
                  <tr key={banner.no}>
                    <td className="text-center fw-semibold">{startIdx + idx + 1}</td>
                    <td>
                      <div className="bo-banner-thumb" title={banner.title}>
                        <img src={banner.file} alt={`Thumbnail ${banner.title}`} width={banner.width} height={banner.height} loading="lazy" decoding="async" />
                      </div>
                    </td>
                    <td>
                      <span className="bo-cell-strong d-block">{banner.text || '-'}</span>
                    </td>
                    <td>
                      <span className="bo-cell-mono">{banner.width} × {banner.height} px</span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-1">
                        <a
                          href={banner.file}
                          target="_blank"
                          rel="noreferrer"
                          className="banner-action"
                          title="Pratinjau Banner"
                        >
                          <i className="fa-solid fa-eye" aria-hidden="true"></i>
                          <span className="visually-hidden">Pratinjau</span>
                        </a>
                        <button
                          type="button"
                          className="banner-action"
                          title="Edit Banner"
                          onClick={() => openEdit(banner)}
                        >
                          <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                          <span className="visually-hidden">Edit</span>
                        </button>
                        <button
                          type="button"
                          className="banner-action"
                          title="Hapus Banner"
                          onClick={() => setConfirmDelete(banner.no)}
                        >
                          <i className="fa-solid fa-trash-can" aria-hidden="true"></i>
                          <span className="visually-hidden">Hapus</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-4">
                      {search
                        ? `Tidak ada banner yang cocok dengan "${search}".`
                        : 'Tidak ada data banner.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Info data (kiri) + Paginasi (kanan) */}
          <div className="berita-footer">
            <span className="small text-muted">
              Showing {sorted.length === 0 ? 0 : startIdx + 1} to{' '}
              {Math.min(startIdx + entries, sorted.length)} of {sorted.length} entries
            </span>
            <nav className="berita-pagination" aria-label="Navigasi halaman">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage(1)}
                title="Halaman pertama"
                aria-label="Halaman pertama"
              >
                <i className="fa-solid fa-angles-left" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage(safePage - 1)}
                title="Sebelumnya"
                aria-label="Sebelumnya"
              >
                <i className="fa-solid fa-angle-left" aria-hidden="true"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={n === safePage ? 'is-current' : ''}
                  onClick={() => setPage(n)}
                  aria-current={n === safePage ? 'page' : undefined}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage(safePage + 1)}
                title="Berikutnya"
                aria-label="Berikutnya"
              >
                <i className="fa-solid fa-angle-right" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage(totalPages)}
                title="Halaman terakhir"
                aria-label="Halaman terakhir"
              >
                <i className="fa-solid fa-angles-right" aria-hidden="true"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <TambahEditBanner show={modalOpen} editing={editing} onClose={() => setModalOpen(false)} onSave={save} />

      {confirmDelete && (
        <ConfirmModal
          title="Hapus Banner?"
          message="Banner akan dihapus permanen."
          confirmLabel="Hapus"
          confirmColor="#dc2626"
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => remove(confirmDelete)}
        />
      )}

      {success && <SuccessModal message={success} onClose={() => setSuccess('')} />}
    </div>
  );
}
