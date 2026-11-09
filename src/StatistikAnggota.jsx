import React from 'react';

export default function StatistikAnggota({ onPageChange }) {
  const genderData = [
    { label: 'Laki-laki', count: 412, percent: 58, color: '#1E3A8A' },
    { label: 'Perempuan', count: 298, percent: 42, color: '#06B6D4' },
  ];

  const categoryData = [
    { no: 1, kategori: 'Mahasiswa', jumlah: 245 },
    { no: 2, kategori: 'Pelajar', jumlah: 198 },
    { no: 3, kategori: 'Umum', jumlah: 167 },
    { no: 4, kategori: 'PNS', jumlah: 65 },
    { no: 5, kategori: 'Lainnya', jumlah: 35 },
  ];

  return (
    <section className="py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '85vh', color: '#1E293B' }}>
      <div className="container-fluid px-3 px-md-5" style={{ maxWidth: '1240px' }}>
        
        {/* 4.1 Breadcrumb & Header Halaman */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb small mb-1">
            <li className="breadcrumb-item">
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); if (onPageChange) onPageChange('home'); }}
                className="text-decoration-none text-primary fw-medium d-inline-flex align-items-center"
              >
                <i className="fa-solid fa-house me-1"></i> Beranda
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                href="#statistik"
                onClick={(e) => { e.preventDefault(); if (onPageChange) onPageChange('statistik'); }}
                className="text-decoration-none text-primary fw-medium"
              >
                Statistik
              </a>
            </li>
            <li className="breadcrumb-item active text-muted" aria-current="page">
              Statistik Anggota
            </li>
          </ol>
        </nav>

        <div className="mb-4" style={{ maxWidth: '70ch' }}>
          <p className="text-uppercase fw-bold mb-2" style={{ color: '#0e7490', fontSize: '0.78rem', letterSpacing: '0.12em' }}>
            Statistik Anggota
          </p>
          <h1 className="mb-2" style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}>
            Statistik Anggota
          </h1>
          <p className="text-muted small mb-0">
            Data keanggotaan perpustakaan
          </p>
        </div>

        {/* 4.2 Ringkasan KPI Cards (4 Kartu Mini) */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-address-card"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">710</h4>
                <div className="text-muted small">Total Anggota</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#ECFDF5', color: '#10B981', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-user-check"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">698</h4>
                <div className="text-muted small">Anggota Aktif</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#FEF3C7', color: '#D97706', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-user-plus"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">24</h4>
                <div className="text-muted small">Bulan Ini</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#FEE2E2', color: '#EF4444', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-user-xmark"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">12</h4>
                <div className="text-muted small">Tidak Aktif</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4.3 Seksi Tampilan Grafik & Rekapitulasi Data */}
        <div className="row g-4">
          {/* Panel Kiri: Berdasarkan Jenis Kelamin */}
          <div className="col-lg-6">
            <div className="bg-white rounded-3 p-4 shadow-sm border h-100">
              <h5 className="fw-bold pb-2 mb-3 border-bottom" style={{ color: '#1E3A8A' }}>
                <i className="fa-solid fa-venus-mars text-primary me-2"></i> Berdasarkan Jenis Kelamin
              </h5>

              <div className="d-flex flex-column gap-4 py-2">
                {genderData.map((g, idx) => (
                  <div key={idx}>
                    <div className="d-flex justify-content-between align-items-center small mb-2">
                      <span className="fw-bold text-dark fs-6">{g.label}</span>
                      <span className="text-muted fw-bold font-monospace">
                        {g.count} ({g.percent}%)
                      </span>
                    </div>
                    <div className="progress" style={{ height: '14px', borderRadius: '50rem' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${g.percent}%`, backgroundColor: g.color }}
                        aria-valuenow={g.percent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-light rounded border text-muted small">
                <i className="fa-solid fa-circle-info text-primary me-2"></i>
                Rasio proporsi anggota pria dan wanita berimbang untuk mendukung program literasi inklusif di perpustakaan.
              </div>
            </div>
          </div>

          {/* Panel Kanan: Berdasarkan Kategori Anggota */}
          <div className="col-lg-6">
            <div className="bg-white rounded-3 p-4 shadow-sm border h-100">
              <h5 className="fw-bold pb-2 mb-3 border-bottom" style={{ color: '#1E3A8A' }}>
                <i className="fa-solid fa-id-badge text-success me-2"></i> Berdasarkan Kategori Anggota
              </h5>

              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th style={{ width: '60px' }} className="text-center">No</th>
                      <th>Kategori</th>
                      <th style={{ width: '140px' }} className="text-center">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.map((c) => (
                      <tr key={c.no}>
                        <td className="text-center fw-bold">{c.no}</td>
                        <td className="fw-semibold text-dark">{c.kategori}</td>
                        <td className="text-center">
                          <span className="badge bg-primary-subtle text-primary border font-monospace px-3 py-1">
                            {c.jumlah}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
