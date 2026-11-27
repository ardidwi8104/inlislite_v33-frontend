import React from 'react';

export default function JamOperasional({ onPageChange }) {
  const goHome = (e) => { e.preventDefault(); if (onPageChange) onPageChange('home'); };
  return (
    <section className="py-4 py-lg-5" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
        <div className="mb-4" style={{ maxWidth: '70ch' }}>
          <p className="fw-semibold mb-2" style={{ color: '#0e7490', fontSize: '0.78rem', letterSpacing: '0.02em' }}>
            Jam Operasional
          </p>
          <h1 className="mb-2" style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}>
            Jam Operasional &amp; Tata Tertib
          </h1>
          <p className="text-muted mb-0">Jadwal layanan perpustakaan dan tata tertib yang berlaku bagi pengunjung.</p>
        </div>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <p className="text-muted mb-0">Halaman Jam Operasional &amp; Tata Tertib sedang dalam pemulihan konten.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
