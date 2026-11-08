import React, { useEffect, useRef, useState } from 'react';

const isDesktop = () =>
  typeof window !== 'undefined' && window.matchMedia('(min-width: 992px)').matches;

const NAV_ITEMS = [
  { label: 'Beranda', page: 'home', icon: 'fa-solid fa-house' },
  {
    label: 'Profil',
    key: 'profil',
    icon: 'fa-solid fa-address-card',
    active: ['profil'],
    items: [
      { label: 'Sejarah Dinas Perpustakaan', page: 'profil' },
      { label: 'Visi & Misi', page: 'profil' },
      { label: 'Tugas Pokok dan Fungsi', page: 'profil' },
      { label: 'Struktur Organisasi', page: 'profil' },
      { label: 'Kepala Dinas & Pegawai', page: 'profil' },
      { label: 'Sarana dan Prasarana', page: 'profil' },
    ],
  },
  {
    label: 'Layanan',
    key: 'layanan',
    icon: 'fa-solid fa-desktop',
    active: ['layanan','keanggotaanmandiri','bukutamu','buku-tamu','peminjaman-pengembalian','layanan-referensi','layanan-penelusuran','layanan-anak-pemuda','layanan-digital','jam-operasional'],
    items: [
      { label: 'Layanan Keanggotaan', page: 'layanan' },
      { label: 'Peminjaman & Pengembalian Buku', page: 'peminjaman-pengembalian' },
      { label: 'Layanan Referensi', page: 'layanan-referensi' },
      { label: 'Layanan Penelusuran Informasi', page: 'layanan-penelusuran' },
      { label: 'Layanan Anak & Pemuda', page: 'layanan-anak-pemuda' },
      { label: 'Layanan Digital & E-Buku', page: 'layanan-digital' },
      { label: 'Jam Operasional & Tata Tertib', page: 'jam-operasional' },
      { label: 'Keanggotaan Mandiri', page: 'keanggotaanmandiri', href: '#keanggotaan-mandiri' },
      { label: 'Buku Tamu', page: 'bukutamu', href: '#buku-tamu' },
    ],
  },
  { label: 'OPAC', page: 'opac', icon: 'fa-solid fa-magnifying-glass' },
  {
    label: 'Berita',
    key: 'berita',
    icon: 'fa-regular fa-newspaper',
    active: ['berita', 'galeri'],
    items: [
      { label: 'Berita Terkait Perpustakaan', page: 'berita' },
      { label: 'Galeri', page: 'galeri' },
    ],
  },
  { label: 'Kontak', page: 'kontak', icon: 'fa-solid fa-address-book' },
  { label: 'Statistik', page: 'statistik', icon: 'fa-solid fa-chart-pie' },
];

export default function Navbar({ onPageChange, currentPage }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  const goTo = (page) => {
    if (onPageChange) onPageChange(page);
    setOpenDropdown(null);
    closeMobileMenu();
  };

  const isItemActive = (item) => {
    if (item.items) {
      return item.active.includes(currentPage) || (item.key === 'berita' && String(currentPage || '').startsWith('berita/'));
    }
    return currentPage === item.page;
  };

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };

  const closeMobileMenu = () => {
    const collapseEl = navRef.current ? navRef.current.querySelector('#navbarNav') : null;
    if (!collapseEl || !collapseEl.classList.contains('show')) return;
    const toggler = navRef.current.querySelector('.navbar-toggler');
    if (toggler) toggler.click();
  };

  const toggleMenu = (key) => {
    cancelClose();
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) { setOpenDropdown(null); closeMobileMenu(); }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { setOpenDropdown(null); closeMobileMenu(); }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      cancelClose();
    };
  }, []);

  useEffect(() => { setOpenDropdown(null); }, [currentPage]);

  useEffect(() => {
    const collapseEl = navRef.current ? navRef.current.querySelector('#navbarNav') : null;
    if (!collapseEl) return undefined;
    const handleCollapseHide = () => setOpenDropdown(null);
    collapseEl.addEventListener('hidden.bs.collapse', handleCollapseHide);
    return () => collapseEl.removeEventListener('hidden.bs.collapse', handleCollapseHide);
  }, []);

  const dropdownMenuClass = (key) => `dropdown-menu ${openDropdown === key ? 'show' : ''}`.trim();

  return (
    <nav ref={navRef} className="navbar navbar-expand-lg site-nav" aria-label="Navigasi utama">
      <div className="container-fluid site-nav-inner">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Buka menu navigasi">
          <i className="fa-solid fa-bars navbar-toggler-icon-custom" aria-hidden="true"></i>
          <span className="navbar-toggler-label">Menu</span>
        </button>

        <div className="collapse navbar-collapse justify-content-lg-center" id="navbarNav">
          <ul className="navbar-nav align-items-lg-center">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              if (!item.items) {
                return (
                  <li className="nav-item" key={item.label}>
                    <a
                      className={`nav-link d-inline-flex align-items-center gap-2${active ? ' active' : ''}`}
                      href={`#${item.page}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={(e) => { e.preventDefault(); goTo(item.page); }}
                    >
                      {item.icon ? <i className={`${item.icon} small`} aria-hidden="true"></i> : null}
                      {item.label}
                    </a>
                  </li>
                );
              }
              return (
                <li className="nav-item dropdown" key={item.label}>
                  <a
                    className={`nav-link dropdown-toggle d-inline-flex align-items-center gap-2${active ? ' active' : ''}`}
                    href={`#${item.key}`}
                    role="button"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.key}
                    onClick={(e) => { e.preventDefault(); toggleMenu(item.key); }}
                  >
                    {item.icon ? <i className={`${item.icon} small`} aria-hidden="true"></i> : null}
                    {item.label}
                  </a>
                  <ul className={dropdownMenuClass(item.key)}>
                    {item.items.map((child, index) => (
                      <React.Fragment key={child.label}>
                        {item.key === 'layanan' && index === 7 ? <li><hr className="dropdown-divider" /></li> : null}
                        <li>
                          <a
                            className="dropdown-item"
                            href={child.href || `#${child.page}`}
                            onClick={(e) => { e.preventDefault(); goTo(child.page); }}
                          >
                            {child.label}
                          </a>
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
