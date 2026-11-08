import React from 'react';

const services = [
  {
    key: 'keanggotaanmandiri',
    icon: 'fa-user-plus',
    title: 'Layanan keanggotaan',
    desc: 'Pendaftaran anggota baru dan pengelolaan kartu anggota perpustakaan.',
    action: 'Daftar anggota',
  },
  {
    key: 'peminjaman-pengembalian',
    icon: 'fa-book',
    title: 'Peminjaman & pengembalian',
    desc: 'Ketentuan peminjaman, perpanjangan, dan pengembalian koleksi bagi anggota.',
    action: 'Lihat ketentuan',
  },
  {
    key: 'layanan-referensi',
    icon: 'fa-file-lines',
    title: 'Layanan referensi',
    desc: 'Bantuan pencarian informasi dan referensi untuk penelitian maupun studi.',
    action: 'Buka layanan',
  },
  {
    key: 'layanan-penelusuran',
    icon: 'fa-magnifying-glass',
    title: 'Penelusuran informasi',
    desc: 'Pendampingan menelusuri sumber informasi cetak dan elektronik.',
    action: 'Buka layanan',
  },
  {
    key: 'layanan-anak-pemuda',
    icon: 'fa-child',
    title: 'Layanan anak & pemuda',
    desc: 'Kegiatan dan layanan khusus untuk anak-anak dan remaja.',
    action: 'Buka layanan',
  },
  {
    key: 'layanan-digital',
    icon: 'fa-tablet-screen-button',
    title: 'Layanan digital & e-buku',
    desc: 'Akses koleksi buku digital dan sumber belajar elektronik.',
    action: 'Buka layanan',
  },
  {
    key: 'jam-operasional',
    icon: 'fa-clock',
    title: 'Jam operasional & tata tertib',
    desc: 'Jadwal layanan perpustakaan dan tata tertib yang berlaku bagi pengunjung.',
    action: 'Lihat jadwal',
  },
];

export default function Layanan({ onPageChange }) {
  const goTo = (page) => {
    if (onPageChange) onPageChange(page);
  };

  return (
    <section className="py-4 py-lg-5" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
        <div className="row g-4 align-items-end mb-4 mb-lg-5">
          <div className="col-lg-8">
            <p
              className="text-uppercase fw-bold mb-2"
              style={{ color: '#0e7490', fontSize: '0.66rem', letterSpacing: '0.14em' }}
            >
              Layanan
            </p>
            <h1
              className="mb-2"
              style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}
            >
              Layanan perpustakaan
            </h1>
            <p className="text-muted mb-0" style={{ maxWidth: '62ch' }}>
              Berbagai jasa yang kami sediakan untuk masyarakat. Pilih layanan untuk melihat
              ketentuan dan alur pengajuannya.
            </p>
          </div>
          <div className="col-lg-4">
            <div
              className="d-flex align-items-center justify-content-lg-end gap-3 pt-3 pt-lg-0"
              style={{ borderTop: '1px solid #dee2e6' }}
            >
              <span className="text-uppercase fw-bold" style={{ color: '#495057', fontSize: '0.6rem', letterSpacing: '0.12em' }}>
                Tersedia
              </span>
              <strong style={{ color: '#1b3878' }}>{services.length} layanan</strong>
            </div>
          </div>
        </div>

        <div className="row g-3 g-lg-4">
          {services.map((service, index) => (
            <div className="col-md-6" key={service.key}>
              <a
                href={`#${service.key}`}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(service.key);
                }}
                className="card h-100 text-decoration-none service-card"
                aria-label={`${service.title} - ${service.action}`}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="service-card-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <i className={`fa-solid ${service.icon}`} aria-hidden="true" style={{ color: '#0e7490' }}></i>
                  </div>
                  <h2 className="mb-2" style={{ color: '#1b3878', fontSize: '1.12rem' }}>
                    {service.title}
                  </h2>
                  <p className="text-muted small flex-grow-1 mb-3">{service.desc}</p>
                  <span className="service-card-action">
                    {service.action} <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div
          className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 mt-4 pt-3"
          style={{ borderTop: '1px solid #dee2e6' }}
        >
          <span className="small text-muted">
            Belum menemukan layanan yang Anda cari?
          </span>
          <a
            href="#kontak"
            className="small fw-semibold text-decoration-none"
            style={{ color: '#1b3878' }}
            onClick={(event) => {
              event.preventDefault();
              goTo('kontak');
            }}
          >
            Hubungi petugas <i className="fa-solid fa-arrow-right ms-1" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
