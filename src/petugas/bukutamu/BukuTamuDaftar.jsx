import React from 'react';
import BukuTamuAnggotaContent from './BukuTamuAnggotaContent';

export default function BukuTamuDaftar() {
  return (
    <>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-list"></i></span>
          <div>
            <h1 className="berita-topbar-title">Buku Tamu</h1>
            <p className="berita-topbar-sub">Daftar</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-house" aria-hidden="true"></i> Beranda</a>
          <span aria-hidden="true">/</span>
          <span>Buku Tamu</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Daftar</span>
        </nav>
      </div>
      <div className="bo-panel-body">
        <BukuTamuAnggotaContent />
      </div>
    </>
  );
}
