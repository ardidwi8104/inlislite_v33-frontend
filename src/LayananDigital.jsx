import React from 'react';

export default function LayananDigital({ onPageChange }) {
  const goHome = (e) => { e.preventDefault(); if (onPageChange) onPageChange('home'); };
  return (
    <section className="py-4 py-lg-5" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
        <div className="mb-4" style={{ maxWidth: '70ch' }}>
          <p className="text-uppercase fw-bold mb-2" style={{ color: '#0e7490', fontSize: '0.78rem', letterSpacing: '0.12em' }}>
                         Layanan Digital
          </p>
          <h1 className="mb-2" style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}>
            Layanan Digital &amp; E-Buku
          </h1>
          <p className="text-muted mb-0">Akses koleksi buku digital dan sumber belajar elektronik.</p>
        </div>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <p className="text-muted mb-0">Halaman Layanan Digital &amp; E-Buku sedang dalam pemulihan konten.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
