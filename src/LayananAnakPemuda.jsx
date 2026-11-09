import React from 'react';

export default function LayananAnakPemuda({ onPageChange }) {
  const goHome = (e) => { e.preventDefault(); if (onPageChange) onPageChange('home'); };
  return (
    <section className="py-4 py-lg-5" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
        <nav aria-label="breadcrumb" className="mb-2">
          <ol className="breadcrumb small mb-2">
            <li className="breadcrumb-item">
              <a href="#home" onClick={goHome} className="text-decoration-none text-primary fw-medium d-inline-flex align-items-center">
                <i className="fa fa-home text-primary me-1"></i> Beranda
              </a>
            </li>
            <li className="breadcrumb-item active text-muted" aria-current="page">Layanan Anak & Pemuda</li>
          </ol>
        </nav>
        <div className="mb-4" style={{ maxWidth: '70ch' }}>
          <p className="text-uppercase fw-bold mb-2" style={{ color: '#0e7490', fontSize: '0.66rem', letterSpacing: '0.14em' }}>
            Layanan Anak & Pemuda
          </p>
          <h1 className="mb-2" style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}>
            Layanan Anak & Pemuda
          </h1>
          <p className="text-muted mb-0">Kegiatan dan layanan khusus untuk anak-anak dan remaja.</p>
        </div>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <p className="text-muted mb-0">Halaman Layanan Anak & Pemuda sedang dalam pemulihan konten.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
