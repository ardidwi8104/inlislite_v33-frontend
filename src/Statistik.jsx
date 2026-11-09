import React from 'react';

export default function Statistik({ onPageChange }) {
  const items = [
    {
      key: 'statistik-pengunjung',
      icon: 'fa-solid fa-users',
      iconColor: 'text-blue-600',
      iconStyle: { color: '#2563eb' },
      title: 'Statistik Pengunjung',
      desc: 'Rekap jumlah pengunjung perpustakaan per bulan.',
    },
    {
      key: 'statistik-peminjaman',
      icon: 'fa-solid fa-hand-holding-hand',
      iconColor: 'text-emerald-500',
      iconStyle: { color: '#10b981' },
      title: 'Statistik Peminjaman',
      desc: 'Rekap peminjaman dan pengembalian buku.',
    },
    {
      key: 'statistik-anggota',
      icon: 'fa-solid fa-id-card',
      iconColor: 'text-amber-400',
      iconStyle: { color: '#fbbf24' },
      title: 'Statistik Anggota',
      desc: 'Rekap keanggotaan dan anggota aktif.',
    },
  ];

  return (
    <div
      className="bg-slate-50 min-h-[80vh] py-4"
      style={{ backgroundColor: '#f8f9fa', minHeight: '80vh', paddingTop: '1rem', paddingBottom: '2rem', width: '100%' }}
    >
      <div
        className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5"
        style={{ width: '100%', maxWidth: 'none', marginLeft: 0, marginRight: 0, paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-2">
          <ol className="breadcrumb small mb-2">
            <li className="breadcrumb-item">
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); if (onPageChange) onPageChange('home'); }}
                className="text-decoration-none text-primary fw-medium d-inline-flex align-items-center"
              >
                <i className="fa fa-home text-primary me-1"></i> Beranda
              </a>
            </li>
            <li className="breadcrumb-item active text-muted" aria-current="page">Statistik</li>
          </ol>
        </nav>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
          style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1b3878', marginBottom: '0.5rem' }}
        >
          Statistik Perpustakaan
        </h1>
        <p
          className="text-slate-500 mb-8"
          style={{ color: '#6c757d', marginBottom: '2rem' }}
        >
          Ringkasan statistik perpustakaan. Pilih salah satu untuk melihat detail.
        </p>

        {/* Grid Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}
        >
          {items.map((it) => (
            <div
              key={it.key}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                border: '1px solid #f3f4f6',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <i
                className={`${it.icon} text-4xl ${it.iconColor} mb-4`}
                style={{ fontSize: '2.25rem', marginBottom: '1rem', ...it.iconStyle }}
              ></i>
              <h3
                className="font-bold text-lg text-slate-800 mb-2"
                style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1e293b', marginBottom: '0.5rem' }}
              >
                {it.title}
              </h3>
              <p
                className="text-sm text-slate-500 mb-6"
                style={{ fontSize: '0.875rem', color: '#6c757d', marginBottom: '1.5rem' }}
              >
                {it.desc}
              </p>
              <button
                type="button"
                onClick={() => { if (onPageChange) onPageChange(it.key); }}
                className="inline-flex items-center gap-2 rounded-full bg-slate-800 text-white px-5 py-2 text-sm font-medium hover:bg-slate-700 transition-colors"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: '#1b3878',
                  color: '#ffffff',
                  paddingLeft: '1.25rem',
                  paddingRight: '1.25rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Lihat Detail <i className="fa-solid fa-arrow-right ml-2" style={{ marginLeft: '0.5rem' }}></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}