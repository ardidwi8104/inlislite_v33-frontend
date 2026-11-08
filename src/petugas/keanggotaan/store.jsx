import React from 'react';

const STORAGE_KEY = 'inlislite.anggota.v1';
const CART_KEY = 'inlislite.anggota.cart.v1';
const EXT_KEY = 'inlislite.anggota.perpanjangan.v1';

const SEED = [
  { id: 1, nama: 'Ahmad Fauzi', noAnggota: 'AGT-2026-0001', jenisIdentitas: 'KTP', noIdentitas: '6401010101010001', tempatLahir: 'Penajam', tanggalLahir: '1998-05-12', agama: 'Islam', jenisKelamin: 'Laki-laki', email: 'ahmad.fauzi@mail.com', noHp: '081234567801', noTelp: '', jenisAnggota: 'Umum', tglRegister: '2026-01-10', tglBerakhir: '2027-01-10', statusAnggota: 'Aktif', koleksiPinjam: 'Semua Koleksi', lokasiPerpustakaan: 'Perpustakaan Utama', alamat: 'Jl. Merdeka No. 1', provinsi: 'Kalimantan Timur', kota: 'Penajam Paser Utara', kecamatan: 'Penajam', kelurahan: 'Nipah-Nipah', rt: '01', rw: '02', pekerjaan: 'Mahasiswa', pendidikan: 'S1', kelas: '-', foto: '' },
  { id: 2, nama: 'Siti Nurhaliza', noAnggota: 'AGT-2026-0002', jenisIdentitas: 'KTP', noIdentitas: '6401010202020002', tempatLahir: 'Balikpapan', tanggalLahir: '2001-08-20', agama: 'Islam', jenisKelamin: 'Perempuan', email: 'siti.nur@mail.com', noHp: '081234567802', noTelp: '', jenisAnggota: 'Pelajar', tglRegister: '2026-02-15', tglBerakhir: '2027-02-15', statusAnggota: 'Aktif', koleksiPinjam: 'Buku Umum', lokasiPerpustakaan: 'Perpustakaan Utama', alamat: 'Jl. Pahlawan No. 5', provinsi: 'Kalimantan Timur', kota: 'Penajam Paser Utara', kecamatan: 'Sepaku', kelurahan: 'Sepaku', rt: '03', rw: '01', pekerjaan: 'Pelajar', pendidikan: 'SMA', kelas: 'XII', foto: '' },
  { id: 3, nama: 'Budi Santoso', noAnggota: 'AGT-2025-0010', jenisIdentitas: 'KTP', noIdentitas: '6401010303030003', tempatLahir: 'Samarinda', tanggalLahir: '1995-11-03', agama: 'Islam', jenisKelamin: 'Laki-laki', email: 'budi.s@mail.com', noHp: '081234567803', noTelp: '', jenisAnggota: 'Umum', tglRegister: '2025-06-01', tglBerakhir: '2026-06-01', statusAnggota: 'Nonaktif', koleksiPinjam: 'Semua Koleksi', lokasiPerpustakaan: 'Perpustakaan Utama', alamat: 'Jl. Sudirman No. 8', provinsi: 'Kalimantan Timur', kota: 'Penajam Paser Utara', kecamatan: 'Penajam', kelurahan: 'Petung', rt: '02', rw: '04', pekerjaan: 'PNS', pendidikan: 'S1', kelas: '-', foto: '' },
];

function read(key, fallback) {
  try { const raw = localStorage.getItem(key); if (raw === null) return fallback; const p = JSON.parse(raw); return Array.isArray(fallback) ? (Array.isArray(p) ? p : fallback) : p; } catch { return fallback; }
}
function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }

export function loadAnggota() {
  const data = read(STORAGE_KEY, null);
  if (data === null) { write(STORAGE_KEY, SEED); return [...SEED]; }
  return data;
}
export function saveAnggota(list) { write(STORAGE_KEY, list); }
export function loadCart() { return read(CART_KEY, []); }
export function saveCart(list) { write(CART_KEY, list); }
export function loadPerpanjangan() { return read(EXT_KEY, []); }
export function savePerpanjangan(list) { write(EXT_KEY, list); }

export function nextNoAnggota(list) {
  const year = new Date().getFullYear();
  const nums = list.map((a) => { const m = String(a.noAnggota || '').match(/(\d+)$/); return m ? parseInt(m[1], 10) : 0; });
  const next = (Math.max(0, ...nums) + 1).toString().padStart(4, '0');
  return `AGT-${year}-${next}`;
}

export function fmtDate(iso) {
  if (!iso) return '-';
  try { const d = new Date(iso); if (isNaN(d)) return iso; return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }); } catch { return iso; }
}

export function useTable(rows, searchFn) {
  const [search, setSearch] = React.useState('');
  const [entries, setEntries] = React.useState(10);
  const [page, setPage] = React.useState(1);
  React.useEffect(() => { setPage(1); }, [search, entries]);
  const filtered = rows.filter((r) => searchFn(r, search));
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
          <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
        </select>
        entries
      </label>
      <div className="berita-search">
        <label className="visually-hidden" htmlFor="agt-search">Search</label>
        <input id="agt-search" type="search" className="form-control form-control-sm" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      </div>
    </div>
  );
}

export function TableFooter({ startIdx, entries, total, page, setPage, totalPages }) {
  return (
    <div className="berita-footer">
      <span className="small text-muted">Showing {total === 0 ? 0 : startIdx + 1} to {Math.min(startIdx + entries, total)} of {total} entries</span>
      <nav className="berita-pagination" aria-label="Navigasi halaman">
        <button type="button" disabled={page <= 1} onClick={() => setPage(1)} aria-label="Halaman pertama">«</button>
        <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Sebelumnya">‹</button>
        <button type="button" className="is-current" aria-current="page">{page}</button>
        <button type="button" disabled={page >= totalPages} onClick={() => setPage(page + 1)} aria-label="Berikutnya">›</button>
        <button type="button" disabled={page >= totalPages} onClick={() => setPage(totalPages)} aria-label="Halaman terakhir">»</button>
      </nav>
    </div>
  );
}

export function Topbar({ title, sub, crumbs }) {
  return (
    <div className="berita-topbar">
      <div className="d-flex align-items-center gap-3">
        <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-id-card"></i></span>
        <div>
          <h1 className="berita-topbar-title">{title}</h1>
          {sub && <p className="berita-topbar-sub">{sub}</p>}
        </div>
      </div>
      <nav className="berita-breadcrumb" aria-label="breadcrumb">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.active ? <span className="is-current" aria-current="page">{c.label}</span>
              : <a href="#" onClick={(e) => e.preventDefault()}>{c.icon && <i className={c.icon} aria-hidden="true"></i>} {c.label}</a>}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
