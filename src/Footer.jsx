import React from 'react';

export default function Footer() {
  return (
    <footer
      className="w-100 text-white"
      style={{
        backgroundColor: '#0B132B',
        fontFamily: 'var(--font-sans)',
        padding: '40px 5% 24px',
      }}
    >
      <div className="w-100" style={{ maxWidth: '100%', margin: '0 auto' }}>
        <div className="row g-4 align-items-start">
          {/* Kolom 1: Branding & Deskripsi */}
          <div className="col-lg-4 col-md-12">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="bg-white rounded-3 p-2 d-inline-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '130px', height: '62px' }}
              >
                <img
                  src="/logo/Logo-Inlislite.png"
                  alt="INLISLite 3.3"
                  style={{ maxHeight: '46px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              <h3 className="fw-bold text-white mb-0" style={{ fontSize: '1.4rem', lineHeight: 1.2 }}>
                Perpustakaan<br />Mitra
              </h3>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: '390px' }}>
              Dinas Perpustakaan Mitra berkomitmen untuk menyediakan layanan perpustakaan berkualitas bagi seluruh lapisan masyarakat di wilayah Daerah kami.
            </p>
            <div className="d-flex gap-2 mt-3">
              {[
                { icon: 'fa-brands fa-facebook-f', href: '#' },
                { icon: 'fa-brands fa-instagram', href: '#' },
                { icon: 'fa-solid fa-link', href: '#' },
                { icon: 'fa-solid fa-envelope', href: 'mailto:kpa.kab.ppu@gmail.com' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="d-inline-flex align-items-center justify-content-center rounded-circle footer-social text-decoration-none"
                  style={{ width: 38, height: 38, backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', transition: 'all .2s ease' }}
                  aria-label={s.icon}
                >
                  <i className={s.icon} style={{ fontSize: '.95rem' }}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Layanan */}
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-bold text-white mb-3" style={{ fontSize: '1.15rem' }}>Layanan</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: '0.9rem' }}>
              {[
                'Daftar Anggota Online',
                'Katalog OPAC',
                'Buku Tamu Digital',
                'Layanan Digital & E-Buku',
                'Layanan Referensi',
                'Layanan Penelusuran Informasi',
                'Layanan Anak & Pemuda',
                'Jam Operasional & Tata Tertib',
              ].map((l) => (
                <li key={l}>
                  <a href="#" className="text-decoration-none footer-link" style={{ color: '#94A3B8', transition: 'color .2s ease' }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kontak & Lokasi */}
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-bold text-white mb-3" style={{ fontSize: '1.15rem' }}>Kontak &amp; Lokasi</h4>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0" style={{ fontSize: '0.9rem' }}>
              <li className="d-flex gap-3">
                <i className="fa-solid fa-location-dot flex-shrink-0" style={{ color: '#38BDF8', fontSize: '1.05rem', width: 20, textAlign: 'center', marginTop: 2 }}></i>
                <span style={{ color: '#94A3B8' }}>Jl. Korpri KM. 9, Kelurahan Nipah-Nipah, Kecamatan Penajam, Kabupaten Penajam Paser Utara, Kalimantan Timur</span>
              </li>
              <li className="d-flex gap-3">
                <i className="fa-solid fa-envelope flex-shrink-0" style={{ color: '#38BDF8', fontSize: '1.05rem', width: 20, textAlign: 'center', marginTop: 2 }}></i>
                <a href="mailto:kpa.kab.ppu@gmail.com" className="text-decoration-none footer-link" style={{ color: '#94A3B8' }}>kpa.kab.ppu@gmail.com</a>
              </li>
              <li className="d-flex gap-3">
                <i className="fa-brands fa-instagram flex-shrink-0" style={{ color: '#38BDF8', fontSize: '1.05rem', width: 20, textAlign: 'center', marginTop: 2 }}></i>
                <span style={{ color: '#94A3B8' }}>@perpustakaankabppu</span>
              </li>
              <li className="d-flex gap-3">
                <i className="fa-regular fa-clock flex-shrink-0" style={{ color: '#38BDF8', fontSize: '1.05rem', width: 20, textAlign: 'center', marginTop: 2 }}></i>
                <div style={{ color: '#94A3B8' }}>
                  <div className="fw-bold text-white" style={{ fontSize: '0.9rem' }}>Jam Operasional:</div>
                  <div>• Senin – Jumat: Pukul 08.00 – 19.00 WITA</div>
                  <div>• Sabtu – Minggu: Pukul 09.00 – 15.30 WITA</div>
                  <div className="fst-italic mt-1" style={{ fontSize: '0.8rem' }}>*Perpustakaan tutup pada hari Libur Nasional dan Cuti Bersama.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0 24px', opacity: 1 }} />

        <div className="text-center" style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
          © 2026 Perpustakaan Mitra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}



