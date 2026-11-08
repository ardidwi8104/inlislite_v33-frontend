import React from 'react';

export default function StatistikPeminjaman({ onPageChange }) {
  const dataBulan = [
    { no: 1, bulan: 'Januari', dipinjam: 156, dikembalikan: 142, sisa: 14 },
    { no: 2, bulan: 'Februari', dipinjam: 134, dikembalikan: 128, sisa: 6 },
    { no: 3, bulan: 'Maret', dipinjam: 187, dikembalikan: 176, sisa: 11 },
    { no: 4, bulan: 'April', dipinjam: 203, dikembalikan: 195, sisa: 8 },
    { no: 5, bulan: 'Mei', dipinjam: 178, dikembalikan: 169, sisa: 9 },
    { no: 6, bulan: 'Juni', dipinjam: 212, dikembalikan: 198, sisa: 14 },
  ];

  return (
    <section className="py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '85vh', color: '#1E293B' }}>
      <div className="container-fluid px-3 px-md-5" style={{ maxWidth: '1240px' }}>
        
        {/* 3.1 Breadcrumb & Header Halaman */}
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
              Statistik Peminjaman
            </li>
          </ol>
        </nav>

        <div className="mb-4">
          <h1 className="h3 fw-bold mb-1" style={{ color: '#1E3A8A' }}>
            Statistik Peminjaman & Pengembalian
          </h1>
          <p className="text-muted small mb-0">
            Rekap peminjaman dan pengembalian buku per bulan
          </p>
        </div>

        {/* 3.2 Ringkasan KPI Cards (4 Kartu Mini) */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-book-bookmark"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">1.070</h4>
                <div className="text-muted small">Total Dipinjam</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#ECFDF5', color: '#10B981', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-rotate-left"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">1.008</h4>
                <div className="text-muted small">Total Dikembalikan</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#FEF3C7', color: '#D97706', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-clock"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">62</h4>
                <div className="text-muted small">Sedang Dipinjam</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#FEE2E2', color: '#EF4444', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-triangle-exclamation"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">0</h4>
                <div className="text-muted small">Terlambat</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3.3 Tabel Rekap Peminjaman Per Bulan */}
        <div className="bg-white rounded-3 shadow-sm border overflow-hidden">
          <div className="p-3 bg-light border-bottom d-flex align-items-center justify-content-between">
            <h5 className="fw-bold mb-0 text-dark" style={{ fontSize: '1rem' }}>
              <i className="fa-solid fa-table me-2 text-primary"></i> Rekap Peminjaman Per Bulan
            </h5>
            <span className="badge bg-primary">Tahun 2026</span>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle mb-0">
              <thead className="table-secondary">
                <tr>
                  <th style={{ width: '60px' }} className="text-center">No</th>
                  <th>Bulan</th>
                  <th style={{ width: '180px' }} className="text-center">Dipinjam</th>
                  <th style={{ width: '180px' }} className="text-center">Dikembalikan</th>
                  <th style={{ width: '160px' }} className="text-center">Sisa</th>
                </tr>
              </thead>
              <tbody>
                {dataBulan.map((r) => (
                  <tr key={r.no}>
                    <td className="text-center fw-bold">{r.no}</td>
                    <td className="fw-semibold text-dark">{r.bulan}</td>
                    <td className="text-center">
                      <span className="badge bg-primary-subtle text-primary border font-monospace px-3 py-2">
                        {r.dipinjam} Buku
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-success-subtle text-success border font-monospace px-3 py-2">
                        {r.dikembalikan} Buku
                      </span>
                    </td>
                    <td className="text-center fw-bold text-warning-emphasis font-monospace">
                      {r.sisa} Buku
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
