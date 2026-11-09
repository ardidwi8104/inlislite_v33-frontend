import React from 'react';

export default function Opac({ onPageChange }) {
  const goTo = (page) => {
    if (onPageChange) onPageChange(page);
  };

  return (
    <section className="py-4 py-lg-5" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
        <div className="mb-4 mb-lg-5" style={{ maxWidth: '68ch' }}>
          <p
            className="text-uppercase fw-bold mb-2"
            style={{ color: '#0e7490', fontSize: '0.78rem', letterSpacing: '0.12em' }}
          >
            Katalog
          </p>
          <h1
            className="mb-2"
            style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}
          >
            OPAC &amp; browse
          </h1>
          <p className="text-muted mb-0">
            Katalog daring untuk mencari koleksi perpustakaan.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card h-100">
              <div className="card-body p-4 p-lg-5">
                <p
                  className="text-uppercase fw-bold mb-2"
                  style={{ color: '#495057', fontSize: '0.75rem', letterSpacing: '0.12em' }}
                >
                  Status modul
                </p>
                <h2 className="mb-3" style={{ color: '#1b3878', fontSize: '1.35rem' }}>
                  Katalog daring belum tersedia
                </h2>
                <p className="text-muted mb-4">
                  Pencarian koleksi melalui OPAC belum dapat dilakukan dari portal ini.
                  Katalog koleksi masih diakses melalui komputer katalog di ruang layanan
                  perpustakaan.
                </p>
                <div className="alert mb-0" role="note">
                  <i className="fa-solid fa-circle-info me-2" aria-hidden="true"></i>
                  Petugas layanan referensi dapat membantu pencarian judul, penulis, atau
                  subjek tertentu selama jam layanan.
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card h-100">
              <div className="card-body p-4 d-flex flex-column">
                <h2 className="mb-3" style={{ color: '#1b3878', fontSize: '1.05rem' }}>
                  Yang dapat dilakukan saat ini
                </h2>
                <ul className="list-unstyled small mb-4">
                  <li className="d-flex gap-2 mb-2">
                    <i className="fa-solid fa-angle-right mt-1" aria-hidden="true" style={{ color: '#0e7490', fontSize: '0.7rem' }}></i>
                    <span className="text-muted">Mencari koleksi melalui komputer katalog di ruang layanan.</span>
                  </li>
                  <li className="d-flex gap-2 mb-2">
                    <i className="fa-solid fa-angle-right mt-1" aria-hidden="true" style={{ color: '#0e7490', fontSize: '0.7rem' }}></i>
                    <span className="text-muted">Meminta bantuan petugas referensi untuk penelusuran judul.</span>
                  </li>
                  <li className="d-flex gap-2 mb-0">
                    <i className="fa-solid fa-angle-right mt-1" aria-hidden="true" style={{ color: '#0e7490', fontSize: '0.7rem' }}></i>
                    <span className="text-muted">Mendaftar sebagai anggota agar dapat meminjam koleksi.</span>
                  </li>
                </ul>
                <div className="d-flex flex-column gap-2 mt-auto">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => goTo('keanggotaanmandiri')}
                  >
                    Daftar anggota
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => goTo('kontak')}
                  >
                    Hubungi petugas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
