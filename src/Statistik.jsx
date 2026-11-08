import React from 'react';

export default function Statistik({ onPageChange }) {
  const items = [
    {
      key: 'statistik-pengunjung',
      icon: 'fa-solid fa-users',
      title: 'Statistik Pengunjung',
      desc: 'Rekap jumlah pengunjung perpustakaan per bulan.',
    },
    {
      key: 'statistik-peminjaman',
      icon: 'fa-solid fa-hand-holding-hand',
      title: 'Statistik Peminjaman',
      desc: 'Rekap peminjaman dan pengembalian buku.',
    },
    {
      key: 'statistik-anggota',
      icon: 'fa-solid fa-id-badge',
      title: 'Statistik Anggota',
      desc: 'Rekap keanggotaan dan anggota aktif.',
    },
  ];

  return (
    <section className="py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
        <nav aria-label="breadcrumb" className="mb-2">
          <ol className="breadcrumb small mb-2">
            <li className="breadcrumb-item">
              <a href="#" onClick={(e) => { e.preventDefault(); if (onPageChange) onPageChange('home'); }} className="text-decoration-none text-primary">
                <i className="fa fa-home text-primary me-1"></i> Beranda
              </a>
            </li>
            <li className="breadcrumb-item active text-muted" aria-current="page">Statistik</li>
          </ol>
        </nav>

        <div className="mb-4">
          <p
            className="text-uppercase fw-bold mb-2"
            style={{ color: '#0e7490', fontSize: '0.66rem', letterSpacing: '0.14em' }}
          >
            Statistik
          </p>
          <h1 className="mb-2" style={{ color: '#1b3878', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
            Statistik perpustakaan
          </h1>
          <p className="text-muted mb-0">Ringkasan data perpustakaan. Pilih salah satu untuk melihat detail.</p>
        </div>

        <div className="row g-3 g-md-4">
          {items.map((it) => (
            <div className="col-md-4" key={it.key}>
              <div className="card h-100">
                <div className="card-body p-4">
                  <span className="d-block mb-3" style={{ color: '#0e7490', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.12em' }}>
                    <i className={`${it.icon} me-2`} aria-hidden="true"></i>
                    Data
                  </span>
                  <h5 className="mb-2" style={{ color: '#1b3878' }}>{it.title}</h5>
                  <p className="text-muted small mb-4">{it.desc}</p>
                  <button
                    className="btn btn-sm btn-outline-primary fw-semibold"
                    onClick={() => { if (onPageChange) onPageChange(it.key); }}
                  >
                    Lihat detail <i className="fa-solid fa-arrow-right ms-1" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
