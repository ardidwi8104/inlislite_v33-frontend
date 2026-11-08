// Pemetaan menu backoffice <-> slug URL.
// Halaman yang sama di admin & petugas memakai prefix /login-backoffice/shared/.
// Halaman khusus role memakai prefix /<role>/<menu>/<submenu>.

const SHARED_PAGES = ['dashboard', 'berita', 'banner'];

// role -> { path -> menuKey }
const ROLE_PATH_TO_MENU = {
  petugas: {
    '/petugas/buku-tamu': 'bukutamu',
    '/petugas/buku-tamu/validasi': 'bukutamu-validasi',
    '/petugas/buku-tamu/daftar': 'bukutamu-daftar',
    '/petugas/baca-di-tempat': 'bacatempat',
    '/petugas/koleksi/daftar-katalog': 'katalog',
    '/petugas/koleksi/karantina-katalog': 'karantina-katalog',
    '/petugas/koleksi/salin-katalog': 'salin-katalog',
    '/petugas/koleksi/daftar-eksemplar': 'eksemplar',
    '/petugas/koleksi/import-excel': 'import-excel',
    '/petugas/koleksi/karantina-eksemplar': 'karantina-eksemplar',
    '/petugas/keanggotaan/validasi-anggota': 'validasi-anggota',
    '/petugas/keanggotaan/keranjang-anggota': 'keranjang-anggota',
    '/petugas/keanggotaan/entri-anggota': 'entri-anggota',
    '/petugas/keanggotaan/daftar-anggota': 'daftar-anggota',
    '/petugas/keanggotaan/perpanjangan-anggota': 'perpanjangan-anggota',
    '/petugas/keanggotaan/import-anggota': 'import-anggota',
    '/petugas/keanggotaan/keranjang-anggota': 'keranjang-anggota',
    '/petugas/sirkulasi/entri-peminjaman': 'entri-peminjaman',
    '/petugas/sirkulasi/entri-perpanjangan': 'entri-perpanjangan',
    '/petugas/sirkulasi/entri-pengembalian': 'entri-pengembalian',
    '/petugas/sirkulasi/peminjaman': 'peminjaman',
    '/petugas/sirkulasi/perpanjangan': 'perpanjangan',
    '/petugas/sirkulasi/pengembalian': 'pengembalian',
    '/petugas/sirkulasi/pelanggaran': 'pelanggaran',
    '/petugas/laporan/katalog': 'laporan-katalog',
    '/petugas/laporan/eksemplar': 'laporan-eksemplar',
    '/petugas/laporan/anggota': 'laporan-anggota',
    '/petugas/laporan/peminjaman-buku': 'laporan-sirkulasi',
    '/petugas/laporan/buku-tamu': 'laporan-buku-tamu',
    '/petugas/laporan/baca-ditempat': 'laporan-baca-ditempat',
  },
  admin: {
    '/admin/otorisasi/akun-petugas': 'user',
  },
};

// menuKey -> path (role-aware untuk non-shared)
const MENU_TO_PATH = {
  // shared
  dashboard: '/login-backoffice/shared/dashboard',
  berita: '/login-backoffice/shared/berita',
  banner: '/login-backoffice/shared/banner',
  // petugas
  bukutamu: '/petugas/buku-tamu',
  bacatempat: '/petugas/baca-di-tempat',
  katalog: '/petugas/koleksi/daftar-katalog',
  'karantina-katalog': '/petugas/koleksi/karantina-katalog',
  'salin-katalog': '/petugas/koleksi/salin-katalog',
  eksemplar: '/petugas/koleksi/daftar-eksemplar',
  'import-excel': '/petugas/koleksi/import-excel',
  'karantina-eksemplar': '/petugas/koleksi/karantina-eksemplar',
  'validasi-anggota': '/petugas/keanggotaan/validasi-anggota',
  'anggota-aktif': '/petugas/keanggotaan/anggota-aktif',
  'entri-anggota': '/petugas/keanggotaan/entri-anggota',
  'daftar-anggota': '/petugas/keanggotaan/daftar-anggota',
  'perpanjangan-anggota': '/petugas/keanggotaan/perpanjangan-anggota',
  'import-anggota': '/petugas/keanggotaan/import-anggota',
  'bukutamu-validasi': '/petugas/buku-tamu/validasi',
  'bukutamu-daftar': '/petugas/buku-tamu/daftar',
  'entri-peminjaman': '/petugas/sirkulasi/entri-peminjaman',
  'entri-perpanjangan': '/petugas/sirkulasi/entri-perpanjangan',
  'entri-pengembalian': '/petugas/sirkulasi/entri-pengembalian',
  'peminjaman': '/petugas/sirkulasi/peminjaman',
  'perpanjangan': '/petugas/sirkulasi/perpanjangan',
  'pengembalian': '/petugas/sirkulasi/pengembalian',
  'pelanggaran': '/petugas/sirkulasi/pelanggaran',
  'laporan-katalog': '/petugas/laporan/katalog',
  'laporan-eksemplar': '/petugas/laporan/eksemplar',
  'laporan-anggota': '/petugas/laporan/anggota',
  'laporan-sirkulasi': '/petugas/laporan/peminjaman-buku',
  'laporan-buku-tamu': '/petugas/laporan/buku-tamu',
  'laporan-baca-ditempat': '/petugas/laporan/baca-ditempat',
  'keranjang-anggota': '/petugas/keanggotaan/keranjang-anggota',
  'profil': '/login-backoffice/shared/profil',
  // admin
  user: '/admin/otorisasi/akun-petugas',
};

export function menuToPath(menuKey) {
  return MENU_TO_PATH[menuKey] || `/login-backoffice/${menuKey}`;
}

export function pathToMenu(pathname, role) {
  const p = (pathname || '').toLowerCase().replace(/\/+$/, '');
  if (!p || p === '/' ) return null;
  // shared
  const sharedMatch = p.match(/^\/login-backoffice\/shared\/([a-z0-9-]+)$/);
  if (sharedMatch) {
    const slug = sharedMatch[1];
    if (slug === 'dashboard' || slug === 'berita' || slug === 'banner' || slug === 'profil') return slug;
  }
  // /login-backoffice (tanpa segmen) -> dashboard
  if (p === '/login-backoffice') return 'dashboard';
  // role-specific maps
  const r = role || 'petugas';
  const map = ROLE_PATH_TO_MENU[r] || {};
  if (map[p]) return map[p];
  // try other role maps (in case role mismatch)
  for (const rr of ['petugas', 'admin']) {
    if (ROLE_PATH_TO_MENU[rr] && ROLE_PATH_TO_MENU[rr][p]) return ROLE_PATH_TO_MENU[rr][p];
  }
  // fallback: last segment as key
  const segs = p.split('/').filter(Boolean);
  if (segs.length) {
    const last = segs[segs.length - 1];
    // convert kebab? keep as-is
    return last;
  }
  return null;
}

export function isBackofficePath(pathname) {
  const p = (pathname || '').toLowerCase();
  return (
    p.includes('login-backoffice') ||
    p.startsWith('/petugas') ||
    p.startsWith('/admin')
  );
}

export const SHARED_MENU_KEYS = SHARED_PAGES;
