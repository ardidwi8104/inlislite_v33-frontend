import React from 'react';
import { newsData } from './data/beritaData';

export default function Home({ onPageChange }) {
  const go = (p) => { if (onPageChange) onPageChange(p); };
  const goBerita = (slug) => { if (onPageChange) onPageChange(`berita/${slug}`); };

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
                <button type="submit" className="btn text-white px-4 py-2 rounded-3 fw-semibold d-flex align-items-center gap-2" style={{ backgroundColor: '#1E3A8A', borderColor: '#1E3A8A', fontSize: '0.95rem' }}>
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
            { icon: 'fa-solid fa-book-open', label: 'Koleksi Buku', value: '0', color: '#1E3A8A' },
            { icon: 'fa-solid fa-users', label: 'Anggota Aktif', value: '0', color: '#1E3A8A' },
            { icon: 'fa-solid fa-hand-holding-hand', label: 'Buku Dipinjam', value: '0', color: '#1E3A8A' },
            { icon: 'fa-solid fa-person-walking', label: 'Pengunjung Hari Ini', value: '0', color: '#1E3A8A' },
          ].map((s) => (
            <div key={s.label} className="col-12 col-md-3">
              <div className="bg-white rounded-4 shadow-sm p-3 text-center h-100" style={{  }}>
                <i className={`${s.icon} mb-2`} style={{ fontSize: '2rem', color: s.color }}></i>
                <div className="fw-bold" style={{ fontSize: '1.6rem', color: '#1E3A8A' }}>{s.value}</div>
                <div className="text-muted text-uppercase" style={{ fontSize: '.8rem', letterSpacing: '.05em' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <button type="button" className="btn text-white rounded-pill px-4 py-2" style={{ backgroundColor: '#1E3A8A', borderColor: '#1E3A8A' }} onClick={() => go('statistik')}>
            Lihat Semua Statistik <i className="fa-solid fa-arrow-right ms-2" style={{ transition: "transform .2s" }}></i>
          </button>
        </div>
      </section>

      <section className="px-3 px-md-4 px-xl-5 py-4">
        <h2 className="fw-bold mb-1" style={{ fontSize: '1.5rem', color: '#1E3A8A' }}>Koleksi Terbaru</h2>
        <p className="mb-3" style={{ color: '#475569', fontSize: '.95rem' }}>Buku-buku yang baru saja ditambahkan.</p>
        <div className="bg-white border rounded-4 shadow-sm d-flex flex-column align-items-center justify-content-center text-center p-5">
          <i className="fa-solid fa-book-open mb-3" style={{ fontSize: '3rem', color: '#94a3b8' }}></i>
          <p className="mb-3 fw-medium" style={{ color: '#475569' }}>Koleksi buku masih belum tersedia</p>
          <button type="button" className="btn text-white rounded-pill px-4 py-2" style={{ backgroundColor: '#1E3A8A' }} onClick={() => go('opac')}>
            Lihat Semua Koleksi <i className="fa-solid fa-arrow-right ms-2"></i>
          </button>
        </div>
      </section>

      <section className="px-3 px-md-4 px-xl-5 py-5" style={{ backgroundColor: '#f8fafc' }}>
        <h2 className="fw-bold mb-4" style={{ fontSize: '1.5rem', color: '#1E3A8A' }}>Berita &amp; Pengumuman</h2>
        <div className="row g-4 align-items-start">
          {/* Featured News (Kolom Kiri) */}
          <div className="col-12 col-lg-7">
            <a
              href={`#berita/${newsData[0].slug}`}
              onClick={(e) => { e.preventDefault(); goBerita(newsData[0].slug); }}
              className="text-decoration-none d-block position-relative rounded-3 overflow-hidden shadow-sm"
              style={{
                minHeight: 320,
                backgroundImage: `url(${newsData[0].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform .2s ease, box-shadow .2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.015)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,.18)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <button type="button" className="position-absolute top-0 end-0 m-3 p-2 rounded-circle bg-white bg-opacity-90 text-dark" style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', border: 'none', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,.15)' }} aria-hidden="true">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <div className="position-absolute bottom-0 start-0 end-0 p-4" style={{ background: 'linear-gradient(transparent 0%, rgba(0,0,0,.75) 100%)' }}>
                <span className="badge mb-2" style={{ backgroundColor: '#1E3A8A', color: '#ffffff', fontSize: '.7rem', padding: '4px 10px', borderRadius: '999px' }}>{newsData[0].date}</span>
                <h3 className="fw-bold mb-2" style={{ color: '#ffffff', fontSize: '1.25rem', lineHeight: 1.35, margin: 0 }}>{newsData[0].title}</h3>
                <p className="mb-0" style={{ color: 'rgba(255,255,255,.85)', fontSize: '.9rem', lineHeight: 1.5, maxWidth: '88%', margin: 0 }}>{newsData[0].desc}</p>
              </div>
            </a>
          </div>

          {/* Recent News List (Kolom Kanan) */}
          <div className="col-12 col-lg-5">
            <div className="d-flex flex-column gap-3">
              {newsData.slice(1, 4).map((n) => (
                <a
                  key={n.slug}
                  href={`#berita/${n.slug}`}
                  onClick={(e) => { e.preventDefault(); goBerita(n.slug); }}
                  className="text-decoration-none bg-white rounded-3 border p-3 d-flex gap-3 align-items-start shadow-sm"
                  style={{ borderColor: '#E5E7EB', cursor: 'pointer', transition: 'border-color .2s ease, box-shadow .2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1E3A8A'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(30,58,138,.12)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = ''; }}
                >
                  <img src={n.thumbnail} alt="" className="rounded-2 flex-shrink-0" style={{ width: 80, height: 60, objectFit: 'cover' }} />
                  <div className="flex-grow-1 d-flex flex-column">
                    <div className="text-muted d-flex align-items-center gap-1 mb-1" style={{ fontSize: '.72rem' }}>
                      <i className="fa-regular fa-calendar" style={{ color: '#9ca3af' }}></i> {n.date}
                    </div>
                    <div className="fw-semibold" style={{ fontSize: '.88rem', color: '#111827', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', maxHeight: '3.2rem', margin: 0 }}>{n.title}</div>
                    <span className="mt-auto text-decoration-none" style={{ fontSize: '.8rem', color: '#1E3A8A', fontWeight: 500, marginTop: '.5rem' }}>                    Baca Selengkapnya <i className="fa-solid fa-arrow-right" style={{ fontSize: '.6rem', marginLeft: '.2rem' }}></i></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <button type="button" className="btn text-white rounded-pill px-5 py-2" style={{ backgroundColor: '#1E3A8A', borderColor: '#1E3A8A' }} onClick={() => go('berita')}>
            Lihat Semua Berita <i className="fa-solid fa-arrow-right ms-2" style={{ transition: "transform .2s" }}></i>
          </button>
        </div>
      </section>
    </main>
  );
}
