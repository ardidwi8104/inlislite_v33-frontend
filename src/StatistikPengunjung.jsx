import React, { useState } from 'react';

export default function StatistikPengunjung({ onPageChange }) {
  const [selectedTahun, setSelectedTahun] = useState('2026');

  const bulans = [
    { no: 1, nama: 'Januari', progress: 70, orang: 245, status: 'Normal', ramai: false },
    { no: 2, nama: 'Februari', progress: 57, orang: 198, status: 'Normal', ramai: false },
    { no: 3, nama: 'Maret', progress: 79, orang: 276, status: 'Normal', ramai: false },
    { no: 4, nama: 'April', progress: 89, orang: 312, status: 'Tinggi', ramai: false },
    { no: 5, nama: 'Mei', progress: 83, orang: 289, status: 'Normal', ramai: false },
    { no: 6, nama: 'Juni', progress: 93, orang: 324, status: 'Tinggi', ramai: true },
    { no: 7, nama: 'Juli', progress: 97, orang: 340, status: 'Tinggi', ramai: true },
    { no: 8, nama: 'Agustus', progress: 90, orang: 315, status: 'Tinggi', ramai: false },
    { no: 9, nama: 'September', progress: 85, orang: 298, status: 'Normal', ramai: false },
    { no: 10, nama: 'Oktober', progress: 96, orang: 335, status: 'Tinggi', ramai: true },
  ];

  const categories = [
    { label: 'Pelajar / Siswa', count: 820, percent: 50, color: '#2563EB' },
    { label: 'Mahasiswa', count: 430, percent: 26, color: '#10B981' },
    { label: 'Masyarakat Umum', count: 260, percent: 16, color: '#F59E0B' },
    { label: 'ASN / Instansi Pemerintah', count: 134, percent: 8, color: '#8B5CF6' },
  ];

  return (
    <section className="py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '85vh', color: '#1E293B' }}>
      <div className="container-fluid px-3 px-md-5" style={{ maxWidth: '1240px' }}>
        
        {/* 2.1 Breadcrumb & Header Halaman */}
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
              Statistik Pengunjung
            </li>
          </ol>
        </nav>

        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
          <div style={{ maxWidth: '70ch' }}>
            <p className="text-uppercase fw-bold mb-2" style={{ color: '#0e7490', fontSize: '0.78rem', letterSpacing: '0.12em' }}>
              Statistik Pengunjung
            </p>
            <h1 className="mb-2" style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}>
              Statistik Pengunjung
            </h1>
            <p className="text-muted small mb-0">
              Rekapitulasi dan pemantauan jumlah pengunjung perpustakaan dengan grafik progress
            </p>
          </div>
          <div className="d-flex align-items-center gap-2 ms-md-auto flex-shrink-0">
            <label className="small fw-semibold text-muted" htmlFor="statistik-pengunjung-tahun">Tahun:</label>
            <select
              id="statistik-pengunjung-tahun"
              className="form-select form-select-sm fw-bold border-primary shadow-sm"
              style={{ width: '110px' }}
              value={selectedTahun}
              onChange={(e) => setSelectedTahun(e.target.value)}
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        {/* 2.2 Ringkasan KPI Cards (4 Kartu Mini) */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-users"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">1.644</h4>
                <div className="text-muted small">Total Tahun {selectedTahun}</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#ECFDF5', color: '#10B981', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-calendar-day"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">42</h4>
                <div className="text-muted small">Pengunjung Hari Ini</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#FEF3C7', color: '#D97706', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-calendar-days"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">355</h4>
                <div className="text-muted small">Pengunjung Bulan Ini</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm border d-flex align-items-center gap-3">
              <span
                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '48px', height: '48px', backgroundColor: '#FEE2E2', color: '#EF4444', fontSize: '1.25rem' }}
              >
                <i className="fa-solid fa-chart-line"></i>
              </span>
              <div>
                <h4 className="fw-bold mb-0 text-dark">294</h4>
                <div className="text-muted small">Rata-rata Per Bulan</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2.3 & 2.4 Main Section: Progress Bars & Kategori Pengunjung */}
        <div className="row g-4 mb-4">
          {/* 2.3 Grafik Progress Pengunjung Per Bulan */}
          <div className="col-lg-8">
            <div className="bg-white rounded-3 p-4 shadow-sm border h-100">
              <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
                <h5 className="fw-bold mb-0" style={{ color: '#1E3A8A' }}>
                  <i className="fa-solid fa-chart-simple text-primary me-2"></i> Grafik Progress Pengunjung Per Bulan
                </h5>
                <span className="badge bg-primary-subtle text-primary border font-monospace">
                  Tahun {selectedTahun}
                </span>
              </div>

              <div className="d-flex flex-column gap-3">
                {bulans.map((b) => (
                  <div key={b.no}>
                    <div className="d-flex justify-content-between align-items-center small mb-1">
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold text-dark" style={{ minWidth: '80px' }}>{b.nama}</span>
                        {b.ramai && (
                          <span className="badge bg-success" style={{ fontSize: '0.75rem' }}>
                            <i className="fa-solid fa-fire me-1"></i> Ramai
                          </span>
                        )}
                      </div>
                      <span className="text-muted fw-semibold">
                        {b.orang} orang ({b.progress}%)
                      </span>
                    </div>
                    <div className="progress" style={{ height: '10px', borderRadius: '50rem' }}>
                      <div
                        className={`progress-bar ${b.ramai ? 'bg-success' : 'bg-primary'}`}
                        role="progressbar"
                        style={{ width: `${b.progress}%` }}
                        aria-valuenow={b.progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2.4 Kategori Pengunjung (Panel Samping) */}
          <div className="col-lg-4">
            <div className="bg-white rounded-3 p-4 shadow-sm border h-100 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold pb-2 mb-2 border-bottom" style={{ color: '#1E3A8A' }}>
                  <i className="fa-solid fa-chart-pie text-success me-2"></i> Kategori Pengunjung
                </h5>
                <p className="small text-muted mb-3">
                  Persentase komposisi pengunjung berdasarkan kelompok pemustaka:
                </p>

                <div className="d-flex flex-column gap-3 mb-4">
                  {categories.map((cat, idx) => (
                    <div key={idx}>
                      <div className="d-flex justify-content-between align-items-center small mb-1">
                        <span className="fw-semibold text-dark">{cat.label}</span>
                        <span className="text-muted fw-bold">{cat.count} ({cat.percent}%)</span>
                      </div>
                      <div className="progress" style={{ height: '8px', borderRadius: '50rem' }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                          aria-valuenow={cat.percent}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Box Callout */}
              <div className="p-3 rounded-3 border d-flex gap-2" style={{ backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }}>
                <i className="fa-solid fa-lightbulb text-primary fs-5 mt-1"></i>
                <div className="small text-dark lh-sm">
                  Pelajar dan mahasiswa merupakan pengunjung terbanyak dengan kontribusi lebih dari <strong>75%</strong> dari total kunjungan.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2.5 Tabel Rekapitulasi Pengunjung */}
        <div className="bg-white rounded-3 shadow-sm border overflow-hidden">
          <div className="p-3 bg-light border-bottom d-flex align-items-center justify-content-between">
            <h5 className="fw-bold mb-0 text-dark" style={{ fontSize: '1rem' }}>
              <i className="fa-solid fa-table-list text-primary me-2"></i> Tabel Rekapitulasi Pengunjung
            </h5>
            <span className="text-muted small">
              <i className="fa-solid fa-clock-rotate-left me-1"></i> Diperbarui secara berkala
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle mb-0">
              <thead className="table-secondary">
                <tr>
                  <th style={{ width: '50px' }} className="text-center">No</th>
                  <th style={{ width: '160px' }}>Bulan</th>
                  <th>Visualisasi Progress</th>
                  <th style={{ width: '130px' }} className="text-center">Status</th>
                  <th style={{ width: '180px' }} className="text-center">Jumlah Pengunjung</th>
                </tr>
              </thead>
              <tbody>
                {bulans.map((b) => (
                  <tr key={b.no}>
                    <td className="text-center fw-bold">{b.no}</td>
                    <td className="fw-semibold text-dark">{b.nama}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="progress flex-grow-1" style={{ height: '8px' }}>
                          <div
                            className={`progress-bar ${b.status === 'Tinggi' ? 'bg-success' : 'bg-primary'}`}
                            style={{ width: `${b.progress}%` }}
                          ></div>
                        </div>
                        <span className="small text-muted font-monospace">{b.progress}%</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className={`badge ${b.status === 'Tinggi' ? 'bg-success' : 'bg-secondary'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="text-center fw-bold text-primary font-monospace">
                      {b.orang} Orang
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
