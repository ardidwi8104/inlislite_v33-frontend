import React from 'react';

export default function Home({ onPageChange }) {
  const go = (p) => { if (onPageChange) onPageChange(p); };

  return (
    <main className="w-100">
      <section className="position-relative px-0 pt-0 pb-6">
        <div id="homeBanner" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">
          <div className="carousel-inner rounded-0 overflow-hidden" style={{ maxHeight: 600 } }>
            {[
              { src: '/banner/20260527_1779891359_4b7007248d38c0dac1c4.webp', title: 'Layanan Perpustakaan' },
              { src: '/banner/20260527_1779891390_317be78295d8b6700d3d.webp', title: 'Perpustakaan Mitra' },
              { src: '/foto/FB_IMG_1649089559306.jpg', title: 'Selamat datang di INLISLite 3.3' },
              { src: '/foto/IMG-20250425-WA0019.jpg', title: 'Selamat datang di Layanan Digital' },
              { src: '/foto/WhatsApp-Image-2022-04-18-at-04.59.57-780x470.jpeg', title: 'Selamat datang di Perpustakaan Mitra' },
            ].map((sl, i) => (
              <div key={sl.src} className={`carousel-item${i===0?' active':''}`}>
                <img src={sl.src} className="d-block w-100" alt={sl.title} style={{ height: 600, objectFit: 'cover' }} />
                <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
                  <h2 className="fw-bold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,.6)', fontSize: '2rem' }}>{sl.title}</h2>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#homeBanner" data-bs-slide="prev">
            <span className="carousel-control-prev-icon p-4" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#homeBanner" data-bs-slide="next">
            <span className="carousel-control-next-icon p-4 " aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="container position-relative z-3 px-2 px-md-4" style={{ marginTop: "-2rem" }}>
          <div className="bg-white p-2 p-md-3 rounded-4 shadow border border-1 border-light">
            <form onSubmit={(e) => { e.preventDefault(); go('opac'); }} className="row g-2 align-items-center">
              <div className="col">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted ps-3 rounded-start-3">
                    <i className="fa-solid fa-search"></i>
                  </span>
                  <input type="text" className="form-control border-0 bg-light py-2 text-secondary shadow-none rounded-end-3" placeholder="Cari judul buku, penulis, pengarang, atau subjek..." aria-label="Cari buku" style={{ fontSize: '0.95rem' }} />
                </div>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn text-white px-4 py-2 rounded-3 fw-semibold d-flex align-items-center gap-2" style={{ backgroundColor: '#1b365d', borderColor: '#1b365d', fontSize: '0.95rem' }}>
                  <i className="fa-solid fa-search"></i>
                  <span>Cari Buku</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="px-3 px-md-4 px-xl-5 py-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="row g-3">
          {[
            { icon: 'fa-solid fa-book-open', label: 'Koleksi Buku', value: '0', color: '#1e40af' },
            { icon: 'fa-solid fa-users', label: 'Anggota Aktif', value: '0', color: '#1e40af' },
            { icon: 'fa-solid fa-hand-holding-hand', label: 'Buku Dipinjam', value: '0', color: '#1e40af' },
            { icon: 'fa-solid fa-person-walking', label: 'Pengunjung Hari Ini', value: '0', color: '#1e40af' },
          ].map((s) => (
            <div key={s.label} className="col-12 col-md-3">
              <div className="bg-white rounded-4 shadow-sm p-3 text-center h-100" style={{  }}>
                <i className={`${s.icon} mb-2`} style={{ fontSize: '2rem', color: s.color }}></i>
                <div className="fw-bold" style={{ fontSize: '1.6rem', color: '#1e40af' }}>{s.value}</div>
                <div className="text-muted text-uppercase" style={{ fontSize: '.8rem', letterSpacing: '.05em' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <button type="button" className="btn text-white rounded-pill px-4 py-2" style={{ backgroundColor: '#1e40af', borderColor: '#1e40af' }} onClick={() => go('statistik')}>
            Lihat Semua Statistik <i className="fa-solid fa-arrow-right ms-2" style={{ transition: "transform .2s" }}></i>
          </button>
        </div>
      </section>

      <section className="px-3 px-md-4 px-xl-5 py-4">
        <h2 className="fw-bold mb-1" style={{ fontSize: '1.5rem', color: '#1e40af' }}>Koleksi Terbaru</h2>
        <p className="mb-3" style={{ color: '#475569', fontSize: '.95rem' }}>Buku-buku yang baru saja ditambahkan.</p>
        <div className="bg-white border rounded-4 shadow-sm d-flex flex-column align-items-center justify-content-center text-center p-5">
          <i className="fa-solid fa-book-open mb-3" style={{ fontSize: '3rem', color: '#94a3b8' }}></i>
          <p className="mb-3 fw-medium" style={{ color: '#475569' }}>Koleksi buku masih belum tersedia</p>
          <button type="button" className="btn text-white rounded-pill px-4 py-2" style={{ backgroundColor: '#1e40af' }} onClick={() => go('opac')}>
            Lihat Semua Koleksi <i className="fa-solid fa-arrow-right ms-2"></i>
          </button>
        </div>
      </section>

      <section className="px-3 px-md-4 px-xl-5 py-4" style={{ backgroundColor: '#f8fafc' }}>
        <h2 className="fw-bold mb-3" style={{ fontSize: '1.5rem', color: '#1e40af', borderColor: '#1e40af' }}>Berita &amp; Pengumuman</h2>
        <div className="row g-3">
          <div className="col-12 col-md-5">
            <a href="#berita" onClick={(e)=>{e.preventDefault();go('berita')}} className="text-decoration-none d-block position-relative rounded-4 overflow-hidden shadow-sm" style={{ minHeight: 240, backgroundImage: `url('/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer' }}>
              <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white" style={{ background: 'linear-gradient(transparent 0%, rgba(0,0,0,.85) 100%)' }}>
                <span className="badge mb-1" style={{ backgroundColor: 'rgba(255,255,255,.2)', fontSize: '.7rem' }}>25 May 2026</span>
                <div className="fw-bold" style={{ fontSize: '1.05rem' }}>Bimbingan Teknis Otomasi Perpustakaan Berbasis INLISLite</div>
              </div>
            </a>
          </div>
          <div className="col-12 col-md-7">
            <div className="d-flex flex-column gap-2">
              {[
                { date: '24 Nov 2025', title: 'FGD Pengelolaan Perpustakaan Khusus Instansi Pemerintah', img: '/berita/thumb_20260517_1779015332_7f282eee5b93c76e694d.jpg' },
                { date: '24 Nov 2025', title: 'FGD Pengelolaan Repositori dan Knowledge Management (KM)', img: '/berita/thumb_20260525_1779692444_56ff96b0e43c16323dd6.jpg' },
                { date: '07 Aug 2025', title: 'Sharing Knowledge dan Benchmarking ke Perpustakaan UI, Depok', img: '/berita/20260517_1779015332_7f282eee5b93c76e694d.jpg' },
              ].map((n) => (
                <a key={n.title} href="#berita" onClick={(e)=>{e.preventDefault();go('berita')}} className="text-decoration-none bg-white rounded-3 border p-2 d-flex gap-3 align-items-center" style={{ cursor: 'pointer' }}>
                  <img src={n.img} alt="" className="rounded-2 flex-shrink-0" style={{ width: 64, height: 48, objectFit: 'cover' }} />
                  <div className="flex-grow-1">
                    <div className="text-muted d-flex align-items-center gap-1 mb-1" style={{ fontSize: '.7rem' }}>
                      <i className="fa-regular fa-calendar"></i> {n.date}
                    </div>
                    <div className="fw-semibold" style={{ fontSize: '.85rem', color: '#1E3A8A' }}>{n.title}</div>
                    <span className="text-decoration-none" style={{ fontSize: '.75rem', color: '#1E3A8A', fontWeight: 500 }}>Baca Selengkapnya <i className="fa-solid fa-arrow-right" style={{ fontSize: '.65rem' }}></i></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button type="button" className="btn text-white rounded-pill px-4 py-2" style={{ backgroundColor: '#1e40af' }} onClick={() => go('berita')}>
            Lihat Semua Berita <i className="fa-solid fa-arrow-right ms-2"></i>
          </button>
        </div>
      </section>
    </main>
  );
}
