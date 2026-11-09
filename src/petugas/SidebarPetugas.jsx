import React, { useState } from 'react';
import LogoutConfirmPopup from '../shared/LogoutConfirmPopup';
import Modal from '../components/Modal';
import { useBackofficeAvatar } from '../backoffice/useBackofficeAvatar';

const MENU = [
  { key: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-display' },
  { key: 'berita', label: 'Berita', icon: 'fa-regular fa-newspaper' },
  { key: 'banner', label: 'Banner', icon: 'fa-regular fa-image' },
  { key: 'koleksi', label: 'Koleksi', icon: 'fa-solid fa-book', dropdown: true, children: ['Daftar Katalog', 'Karantina Katalog', 'Salin Katalog', 'Daftar Eksemplar', 'Import Excel', 'Karantina Eksemplar'] },
  { key: 'keanggotaan', label: 'Keanggotaan', icon: 'fa-solid fa-id-card', dropdown: true, children: ['Validasi & Kartu Anggota', 'Anggota Aktif', 'Entri Anggota', 'Daftar Anggota', 'Perpanjangan Anggota', 'Import Anggota', 'Keranjang Anggota'] },
  { key: 'sirkulasi', label: 'Sirkulasi', icon: 'fa-solid fa-rotate', dropdown: true, children: ['Entri Peminjaman', 'Entri Perpanjangan', 'Entri Pengembalian', 'Peminjaman', 'Perpanjangan', 'Pengembalian', 'Pelanggaran'] },
  { key: 'stockopname', label: 'Stockopname', icon: 'fa-solid fa-file-lines' },
  { key: 'bukutamu', label: 'Buku Tamu', icon: 'fa-solid fa-user', dropdown: true, children: ['Validasi', 'Daftar'] },
  { key: 'bacatempat', label: 'Baca di Tempat', icon: 'fa-solid fa-book-open' },
  { key: 'laporan', label: 'Laporan', icon: 'fa-solid fa-box-archive', dropdown: true, children: ['Laporan Katalog', 'Laporan Eksemplar', 'Laporan Anggota', 'Laporan Peminjaman Buku', 'Laporan Buku Tamu', 'Laporan Baca Ditempat'] },
  { key: 'pengaturan-umum', label: 'Pengaturan Umum', icon: 'fa-solid fa-folder', dropdown: true, children: ['Identitas Perpustakaan', 'Jam Operasional', 'Preferensi'] },
  { key: 'pengaturan-katalog', label: 'Pengaturan Katalog', icon: 'fa-solid fa-box', dropdown: true, children: ['Format Katalog', 'Bidang Data', 'Template'] },
  { key: 'pengaturan-eksemplar', label: 'Pengaturan Eksemplar', icon: 'fa-solid fa-book', dropdown: true, children: ['Lokasi', 'Status Eksemplar', 'Barcode'] },
  { key: 'pengaturan-keanggotaan', label: 'Pengaturan Keanggotaan', icon: 'fa-solid fa-address-book', dropdown: true, children: ['Jenis Anggota', 'Masa Berlaku', 'Kartu Anggota'] },
  { key: 'pengaturan-sirkulasi', label: 'Pengaturan Sirkulasi', icon: 'fa-solid fa-repeat', dropdown: true, children: ['Aturan Pinjam', 'Denda', 'Hari Libur'] },
  { key: 'pengaturan-bukutamu', label: 'Pengaturan Buku Tamu', icon: 'fa-solid fa-tablet-screen-button', dropdown: true, children: ['Formulir', 'Tujuan Kunjungan', 'Tampilan'] },
  { key: 'setelan', label: 'Setelan', icon: 'fa-solid fa-wrench', dropdown: true, children: ['Preferensi Sistem', 'Backup & Restore'] },
];

const CHILD_ICONS = {
  'Dashboard': 'fa-solid fa-display',
  'Berita': 'fa-regular fa-newspaper',
  'Banner': 'fa-regular fa-image',
  'Daftar Katalog': 'fa-solid fa-book',
  'Karantina Katalog': 'fa-solid fa-trash-can',
  'Salin Katalog': 'fa-solid fa-cloud-arrow-up',
  'Daftar Eksemplar': 'fa-solid fa-barcode',
  'Import Excel': 'fa-solid fa-file-excel',
  'Karantina Eksemplar': 'fa-solid fa-dumpster',
  'Validasi & Kartu Anggota': 'fa-solid fa-user-check',
  'Anggota Aktif': 'fa-solid fa-users',
  'Entri Anggota': 'fa-solid fa-user-plus',
  'Daftar Anggota': 'fa-solid fa-users',
  'Perpanjangan Anggota': 'fa-solid fa-id-card',
  'Import Anggota': 'fa-solid fa-file-import',
  'Keranjang Anggota': 'fa-solid fa-shopping-cart',
  'Tambah Anggota': 'fa-solid fa-user-plus',
  'Entri Peminjaman': 'fa-solid fa-arrow-right-from-bracket',
  'Entri Perpanjangan': 'fa-solid fa-rotate-right',
  'Entri Pengembalian': 'fa-solid fa-arrow-right-to-bracket',
  'Peminjaman': 'fa-solid fa-book-bookmark',
  'Pengembalian': 'fa-solid fa-reply',
  'Perpanjangan': 'fa-solid fa-rotate',
  'Pelanggaran': 'fa-solid fa-triangle-exclamation',
  'Stockopname': 'fa-solid fa-clipboard-list',
  'Buku Tamu': 'fa-solid fa-user',
  'Validasi': 'fa-solid fa-user-check',
  'Daftar': 'fa-solid fa-list',
  'Baca di Tempat': 'fa-solid fa-book-open',
  'Laporan Katalog': 'fa-solid fa-file-lines',
  'Laporan Eksemplar': 'fa-solid fa-file-lines',
  'Laporan Anggota': 'fa-solid fa-file-lines',
  'Laporan Peminjaman Buku': 'fa-solid fa-file-lines',
  'Laporan Buku Tamu': 'fa-solid fa-file-lines',
  'Laporan Baca Ditempat': 'fa-solid fa-file-lines',
  'Identitas Perpustakaan': 'fa-solid fa-building',
  'Jam Operasional': 'fa-solid fa-clock',
  'Preferensi': 'fa-solid fa-sliders',
  'Format Katalog': 'fa-solid fa-file-code',
  'Bidang Data': 'fa-solid fa-database',
  'Template': 'fa-solid fa-file',
  'Lokasi': 'fa-solid fa-location-dot',
  'Status Eksemplar': 'fa-solid fa-circle-info',
  'Barcode': 'fa-solid fa-barcode',
  'Jenis Anggota': 'fa-solid fa-users',
  'Masa Berlaku': 'fa-solid fa-calendar',
  'Kartu Anggota': 'fa-solid fa-id-card',
  'Aturan Pinjam': 'fa-solid fa-gavel',
  'Denda': 'fa-solid fa-money-bill',
  'Hari Libur': 'fa-solid fa-calendar-day',
  'Formulir': 'fa-solid fa-file-pen',
  'Tujuan Kunjungan': 'fa-solid fa-bullseye',
  'Tampilan': 'fa-solid fa-eye',
  'Preferensi Sistem': 'fa-solid fa-sliders',
  'Backup & Restore': 'fa-solid fa-database',
};
const CHILD_TO_MENU = {
  'Daftar Katalog': 'katalog',
  'Karantina Katalog': 'karantina-katalog',
  'Salin Katalog': 'salin-katalog',
  'Daftar Eksemplar': 'eksemplar',
  'Import Excel': 'import-excel',
  'Karantina Eksemplar': 'karantina-eksemplar',
  'Laporan Katalog': 'laporan-katalog',
  'Laporan Eksemplar': 'laporan-eksemplar',
  'Laporan Anggota': 'laporan-anggota',
  'Laporan Peminjaman Buku': 'laporan-sirkulasi',
  'Laporan Buku Tamu': 'laporan-buku-tamu',
  'Laporan Baca Ditempat': 'laporan-baca-ditempat',
  'Validasi': 'bukutamu-validasi',
  'Daftar': 'bukutamu-daftar',
  'Validasi & Kartu Anggota': 'validasi-anggota',
  'Anggota Aktif': 'anggota-aktif',
  'Entri Anggota': 'entri-anggota',
  'Daftar Anggota': 'daftar-anggota',
  'Perpanjangan Anggota': 'perpanjangan-anggota',
  'Import Anggota': 'import-anggota',
  'Keranjang Anggota': 'keranjang-anggota',
  'Entri Peminjaman': 'entri-peminjaman',
  'Entri Perpanjangan': 'entri-perpanjangan',
  'Entri Pengembalian': 'entri-pengembalian',
  'Peminjaman': 'peminjaman',
  'Perpanjangan': 'perpanjangan',
  'Pengembalian': 'pengembalian',
  'Pelanggaran': 'pelanggaran',
};

export default function SidebarPetugas({
  activeMenu,
  setActiveMenu,
  sidebarOpen,
  setSidebarOpen,
  stats = {},
  onLogout,
  onProfile,
}) {
  const [avatar] = useBackofficeAvatar('petugas');
  const [open, setOpen] = useState({ keanggotaan: true });
  const [showLogout, setShowLogout] = useState(false);

  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }));
  const select = (key) => {
    setActiveMenu(key);
    setSidebarOpen(false);
  };

  const badgeFor = (key) => {
    if (key === 'bukutamu' && stats.pendingVisits > 0) return stats.pendingVisits;
    if (key === 'keanggotaan' && stats.pendingMembers > 0) return stats.pendingMembers;
    return null;
  };

  return (
    <aside
      id="sidebar-petugas"
      className={`bo-sidebar${sidebarOpen ? ' is-open' : ''}`}
      aria-label="Navigasi petugas"
    >
      <div className="bo-sidebar-brand">
        <img src="/logo/logo-inlislite-icon.png" alt="" />
        <div>
          <strong>INLISLite</strong>
          <span>Ruang kerja petugas</span>
        </div>
        <button type="button" className="bo-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Tutup menu">
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div className="bo-sidebar-body">
        <nav aria-label="Menu petugas">
          <div className="bo-nav">
            {MENU.map((item) => {
              const hasChildren = item.dropdown && item.children?.length;
              const isOpen = !!open[item.key];
              const isActive = activeMenu === item.key || (item.key === 'keanggotaan' && ['validasi-anggota','anggota-aktif','entri-anggota','daftar-anggota','perpanjangan-anggota','import-anggota','keranjang-anggota'].includes(activeMenu)) || (item.key === 'sirkulasi' && ['entri-peminjaman','entri-perpanjangan','entri-pengembalian','peminjaman','perpanjangan','pengembalian','pelanggaran'].includes(activeMenu)) || (item.key === 'bukutamu' && ['bukutamu-validasi','bukutamu-daftar','bukutamu'].includes(activeMenu)) || (item.key === 'laporan' && activeMenu.startsWith('laporan-')) || (item.key === 'koleksi' && ['katalog','karantina-katalog','salin-katalog','eksemplar','import-excel','karantina-eksemplar'].includes(activeMenu));
              const badge = badgeFor(item.key);

              if (!hasChildren) {
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => select(item.key)}
                    className={`bo-nav-item${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <i className={item.icon} aria-hidden="true"></i>
                    <span>{item.label}</span>
                    {badge ? <span className="bo-nav-badge">{badge}</span> : null}
                  </button>
                );
              }

              return (
                <div key={item.key}>
                  <button
                    type="button"
                    onClick={() => toggle(item.key)}
                    className={`bo-nav-item bo-nav-item--parent${isActive ? ' is-active' : ''}`}
                    aria-expanded={isOpen}
                  >
                    <i className={item.icon} aria-hidden="true"></i>
                    <span>{item.label}</span>
                    {badge ? <span className="bo-nav-badge">{badge}</span> : null}
                    <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} bo-nav-chevron`} aria-hidden="true"></i>
                  </button>
                  {isOpen && (
                    <div className="bo-nav-children">
                      {item.children.map((child) => {
                        const childKey = CHILD_TO_MENU[child] || null;
                        const childActive = childKey && activeMenu === childKey;
                        return (
                          <button
                            key={child}
                            type="button"
                            onClick={() => childKey ? select(childKey) : toggle(item.key)}
                            className={`bo-nav-child${childActive ? ' is-active' : ''}`}
                            title={!childKey ? 'Belum tersedia' : undefined}
                          >
                          <i className={CHILD_ICONS[child] || 'fa-solid fa-circle'} aria-hidden="true" style={{ width: '16px', textAlign: 'center', fontSize: '0.85rem' }}></i>
                          <span>{child}</span>
                            {!childKey ? <span className="bo-nav-soon">Segera</span> : null}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="bo-sidebar-user">
        <div className="bo-sidebar-profile">
          <span className="bo-sidebar-avatar" aria-hidden="true">
            {avatar ? (
              <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <i className="fa-solid fa-circle-user"></i>
            )}
          </span>
          <span className="bo-sidebar-profile-text">
            <strong>petugas</strong>
            <span>Petugas layanan</span>
          </span>
        </div>
        <button type="button" className="bo-sidebar-logout" onClick={() => setShowLogout(true)} title="Keluar dari akun">
          <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>
          <span className="visually-hidden">Keluar</span>
        </button>
      </div>

      <LogoutConfirmPopup
        show={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => onLogout && onLogout()}
      />
    </aside>
  );
}
