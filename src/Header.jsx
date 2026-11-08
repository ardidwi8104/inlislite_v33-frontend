import React from 'react';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#home" className="site-brand" aria-label="Perpustakaan Mitra — Beranda">
          <img
            src="/logo/logo-inlislite-icon.png"
            alt="Logo INLISLITE"
            width="1116"
            height="905"
          />
          <span className="site-brand-copy">
            <strong>Perpustakaan Mitra</strong>
            <span>INLISLITE 3.3</span>
          </span>
        </a>

        <div className="site-header-title">
          <span style={{ fontWeight: 700 }}>Perpustakaan Daerah</span>
          <strong style={{ fontWeight: 600 }}>Kabupaten Penajam Paser Utara</strong>
        </div>

        <div className="site-header-logos">
          <img
            src="/logo/logo PPU.png"
            alt="Logo Kabupaten Penajam Paser Utara"
            width="868"
            height="999"
          />
          <span className="site-header-divider" aria-hidden="true"></span>
          <img
            src="/perpusnas header.svg"
            alt="Logo Perpustakaan Nasional RI"
            width="1201"
            height="1075"
          />
        </div>
      </div>
    </header>
  );
}
