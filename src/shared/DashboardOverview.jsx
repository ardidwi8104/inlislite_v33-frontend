import React from 'react';

/* ------------------------------------------------------------------------ */
/* Dashboard: Sistem Manajemen Perpustakaan Digital                          */
/* Angka pada kartu-kartu berikut bersifat STATIS sesuai spesifikasi visual */
/* (Jumlah Anggota 0, User Aktif 6, Kunjungan Anggota 7, Kunjungan Non     */
/* Anggota 6, Anggota Bebas Pustaka 0, Total Katalog 0, Total Koleksi 0,    */
/* Total Peminjaman 0). Warna semua kartu SOLID, tanpa gradasi.             */
/* ------------------------------------------------------------------------ */

const cardBase = (bg) => ({
  backgroundColor: bg,
  borderRadius: '16px',
  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.10)',
  padding: '18px 20px',
  color: '#ffffff',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '112px',
  width: '100%',
  boxSizing: 'border-box',
});

const iconBox = (size = 54) => ({
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.22)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: size >= 50 ? '1.45rem' : '1.2rem',
  flexShrink: 0,
});

const ROW_ONE_CARDS = [
  { bg: '#0097e6', label: 'Jumlah Anggota', value: 0, icon: 'fa-solid fa-users' },
  { bg: '#10ac84', label: 'User Aktif', value: 6, icon: 'fa-solid fa-user-check' },
  { bg: '#e1b12c', label: 'Kunjungan Anggota', value: 7, icon: 'fa-solid fa-door-open' },
  { bg: '#e84118', label: 'Kunjungan Non Anggota', value: 6, icon: 'fa-solid fa-user-xmark' },
];

const ROW_TWO_CARDS = [
  { bg: '#5f27cd', label: 'Anggota Bebas Pustaka', value: 0, icon: 'fa-solid fa-graduation-cap' },
];

const ROW_THREE_CARDS = [
  { bg: '#575fcf', label: 'Total Katalog', value: 0, icon: 'fa-solid fa-book-bookmark' },
  { bg: '#ef5777', label: 'Total Koleksi', value: 0, icon: 'fa-solid fa-layer-group' },
  { bg: '#00d2d3', label: 'Total Peminjaman', value: 0, icon: 'fa-solid fa-handshake' },
];

function StatCard({ bg, label, value, icon }) {
  return (
    <div className="bo-stat-card" style={cardBase(bg)}>
      <div style={{ fontSize: '0.98rem', fontWeight: 600, opacity: 0.95, marginBottom: '4px', paddingRight: '64px', lineHeight: 1.3 }}>
        {label}
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.05 }}>{value}</div>
      <div style={{ position: 'absolute', top: '16px', right: '16px', ...iconBox(54) }}>
        <i className={icon} aria-hidden="true"></i>
      </div>
    </div>
  );
}

function WideStatCard({ bg, label, value, icon }) {
  return (
    <div className="bo-stat-card bo-stat-card--wide" style={{ ...cardBase(bg), minHeight: '128px' }}>
      <div className="d-flex align-items-center gap-3 mb-3">
        <span style={iconBox(44)}>
          <i className={icon} aria-hidden="true"></i>
        </span>
        <div style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.3 }}>{label}</div>
      </div>
      <div style={{ fontSize: '2.1rem', fontWeight: 700, lineHeight: 1.05 }}>{value}</div>
    </div>
  );
}

export default function DashboardOverview({ stats = {}, onSendReport, title = 'Dashboard', subtitle = 'Sistem Manajemen Perpustakaan Digital — Ringkasan data dan aktivitas.' }) {
  /* Prop `stats` tetap diterima agar kompatibel dengan pemanggil
     (DashboardAdmin / DashboardPetugas), namun kartu-kartu di bawah ini
     selalu memakai angka statis sesuai spesifikasi visual. */
  void stats;

  return (
    <div className="bo-dashboard" style={{ fontFamily: 'var(--font-sans)', width: '100%' }}>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-gauge-high"></i></span>
          <div>
            <h1 className="berita-topbar-title">{title}</h1>
            <p className="berita-topbar-sub">{subtitle}</p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-stretch align-items-lg-end gap-2">
          <button
            type="button"
            className="btn fw-semibold d-inline-flex align-items-center justify-content-center gap-2 px-3 py-2 shadow-sm"
            style={{ backgroundColor: '#ffffff', color: '#1b3878', borderRadius: '10px', border: 'none', whiteSpace: 'nowrap', fontSize: '0.9rem' }}
            onClick={onSendReport || (() => alert('Laporan perpustakaan berhasil dikirim ke Perpustakaan Nasional RI.'))}
          >
            <i className="fa-solid fa-paper-plane" aria-hidden="true"></i> Kirim Laporan
          </button>
        </div>
      </div>
      <div
        className="d-flex align-items-start gap-2 px-3 py-2 mb-4"
        style={{ backgroundColor: '#fee2e2', color: '#dc2626', fontSize: '0.9rem', borderRadius: '10px', fontWeight: 500, lineHeight: 1.35, border: '1px solid #fecaca' }}
      >
        <i className="fa-solid fa-circle-exclamation mt-1 flex-shrink-0" aria-hidden="true"></i>
        <span>Setiap Perpustakaan Wajib mengirimkan laporan total data setiap bulan</span>
      </div>

      {/* Baris 1: 4 kolom */}
      <div className="row g-3 g-md-4 mb-3 mb-md-4 align-items-stretch">
        {ROW_ONE_CARDS.map((card) => (
          <div key={card.label} className="col-12 col-sm-6 col-xl-3 d-flex">
            <StatCard bg={card.bg} label={card.label} value={card.value} icon={card.icon} />
          </div>
        ))}
      </div>

      {/* Baris 2: 1 kartu (lebar 1 kolom grid di atas) */}
      <div className="row g-3 g-md-4 mb-3 mb-md-4 align-items-stretch">
        {ROW_TWO_CARDS.map((card) => (
          <div key={card.label} className="col-12 col-sm-6 col-xl-3 d-flex">
            <StatCard bg={card.bg} label={card.label} value={card.value} icon={card.icon} />
          </div>
        ))}
      </div>

      {/* Baris 3: 3 kolom horizontal */}
      <div className="row g-3 g-md-4 align-items-stretch">
        {ROW_THREE_CARDS.map((card) => (
          <div key={card.label} className="col-12 col-md-4 d-flex">
            <WideStatCard bg={card.bg} label={card.label} value={card.value} icon={card.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}

