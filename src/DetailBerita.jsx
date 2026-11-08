import React, { useState } from 'react';
import { newsData } from './data/beritaData';

export default function DetailBerita({ slug, onPageChange }) {
  const [dropdownBagikanOpen, setDropdownBagikanOpen] = useState(false);

  // Ambil list berita lengkap dari localStorage atau fallback
  let allNews = newsData;
  try {
    const raw = window.localStorage.getItem('inlislite.berita.v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const mapped = parsed.map((item) => ({
          id: item.id,
          slug: item.slug || (item.judul ? item.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `berita-${item.id}`),
          title: item.judul,
          date: item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '25 Mei 2026',
          author: item.publisher || 'admin',
          image: item.thumbnail || '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg',
          desc: item.ket || '',
          lokasi: item.lokasi || 'Penajam',
          blocks: item.blocks || [],
          galeri: item.galeri && item.galeri.length ? item.galeri : [
            '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg',
            '/berita/thumb_20260517_1779015332_7f282eee5b93c76e694d.jpg',
            '/berita/20260517_1779015332_7f282eee5b93c76e694d.jpg',
          ],
        }));
        allNews = [...mapped, ...newsData];
      }
    }
  } catch (e) {}

  // Temukan berita yang sedang aktif
  const currentNews = allNews.find((item) => item.slug === slug || String(item.id) === slug) || {
    id: 1,
    slug: 'sosialisasi-inlislite-3-3',
    title: 'Sosialisasi INLISLite 3.3',
    date: '25 Mei 2026',
    author: 'admin',
    lokasi: 'Penajam',
    image: '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg',
    p1: 'PENAJAM — Dalam rangka meningkatkan efektivitas otomasi perpustakaan, Perpustakaan Mitra menyelenggarakan kegiatan Sosialisasi INLISLite versi 3.3. Sistem otomasi perpustakaan terpadu yang dikembangkan oleh Perpustakaan Nasional RI ini memberikan kemudahan pengelolaan data bibliografi, sirkulasi, dan katalog online (OPAC).',
    p2: 'Melalui implementasi sistem ini, pelayanan pemustaka diharapkan dapat berjalan lebih cepat, transparan, serta terintegrasi langsung dengan database perpustakaan secara mandiri.',
    galeri: [
      '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg',
      '/berita/thumb_20260517_1779015332_7f282eee5b93c76e694d.jpg',
      '/berita/20260517_1779015332_7f282eee5b93c76e694d.jpg',
    ],
  };

  // Berita Lainnya (4 Items untuk Sidebar)
  const sidebarItems = [
    {
      id: 2,
      slug: 'fgd-pengelolaan-perpustakaan-khusus',
      title: 'FGD Pengelolaan Perpustakaan Khusus Instansi Pemerintah',
      date: '24 Nov 2025',
      image: '/berita/thumb_20260517_1779015332_7f282eee5b93c76e694d.jpg',
    },
    {
      id: 3,
      slug: 'fgd-repositori-knowledge-management',
      title: 'FGD Pengelolaan Repositori dan Knowledge Management (KM)',
      date: '24 Nov 2025',
      image: '/berita/20260517_1779015332_7f282eee5b93c76e694d.jpg',
    },
    {
      id: 4,
      slug: 'sharing-knowledge-benchmarking-ui',
      title: 'Sharing Knowledge dan Benchmarking ke Perpustakaan UI, Depok',
      date: '07 Agu 2025',
      image: '/foto/FB_IMG_1649089559306.jpg',
    },
    {
      id: 5,
      slug: 'knowledge-sharing-tvone',
      title: 'Knowledge Sharing ke Perpustakaan tvOne',
      date: '05 Agu 2025',
      image: '/foto/IMG-20250425-WA0019.jpg',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert('Tautan berita berhasil disalin ke clipboard!');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '85vh', color: '#1E293B' }}>
      <div className="container-fluid px-3 px-md-5" style={{ maxWidth: '1200px' }}>
        
        {/* 1. Breadcrumb (Navigasi Atas) */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small mb-0 text-muted">
            <li className="breadcrumb-item">
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); if (onPageChange) onPageChange('home'); }}
                className="text-decoration-none text-muted d-inline-flex align-items-center"
              >
                <i className="fa-solid fa-house me-1 text-primary"></i> Beranda
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                href="#berita"
                onClick={(e) => { e.preventDefault(); if (onPageChange) onPageChange('berita'); }}
                className="text-decoration-none text-muted"
              >
                Berita
              </a>
            </li>
            <li className="breadcrumb-item active fw-bold text-dark" aria-current="page">
              Detail Berita
            </li>
          </ol>
        </nav>

        {/* 2. Layout Grid 2 Kolom (Main Content & Sidebar) */}
        <div className="row g-4">
          
          {/* Kolom Kiri: Konten Utama (~68% lebar) */}
          <div className="col-lg-8">
            <article className="bg-white rounded-3 p-4 p-md-5 shadow-sm border">
              
              {/* A. Gambar Utama (Featured Image) */}
              <div className="rounded-3 overflow-hidden mb-3 shadow-sm bg-light text-center">
                <img
                  src={currentNews.image || '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg'}
                  alt={currentNews.title}
                  className="img-fluid w-100"
                  style={{ maxHeight: '420px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg';
                  }}
                />
              </div>

              {/* B. Metadata Berita (Meta Bar Atas) */}
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 pb-3 mb-3 border-bottom small text-muted">
                {/* Kiri: Tanggal, Penulis, Lokasi */}
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <span className="d-inline-flex align-items-center gap-1">
                    <i className="fa-regular fa-calendar text-primary"></i> {currentNews.date || '25 Mei 2026'}
                  </span>
                  <span className="d-inline-flex align-items-center gap-1">
                    <i className="fa-regular fa-user text-primary"></i> {currentNews.author || 'admin'}
                  </span>
                  <span className="d-inline-flex align-items-center gap-1">
                    <i className="fa-solid fa-location-dot text-primary"></i> {currentNews.lokasi || 'Penajam'}
                  </span>
                </div>

                {/* Kanan: Tombol Dropdown Bagikan */}
                <div className="position-relative">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2 fw-semibold px-3 py-1"
                    style={{ borderRadius: '6px' }}
                    onClick={() => setDropdownBagikanOpen(!dropdownBagikanOpen)}
                  >
                    <span>Bagikan</span>
                    <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.75rem' }}></i>
                  </button>

                  {dropdownBagikanOpen && (
                    <div
                      className="dropdown-menu show shadow-sm border p-2 position-absolute end-0 mt-1"
                      style={{ minWidth: '160px', zIndex: 1050 }}
                    >
                      <button
                        type="button"
                        className="dropdown-item small d-flex align-items-center gap-2 py-1"
                        onClick={handleCopyLink}
                      >
                        <i className="fa-solid fa-link text-primary"></i> Salin Tautan
                      </button>
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentNews.title)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="dropdown-item small d-flex align-items-center gap-2 py-1"
                      >
                        <i className="fa-brands fa-whatsapp text-success"></i> WhatsApp
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="dropdown-item small d-flex align-items-center gap-2 py-1"
                      >
                        <i className="fa-brands fa-facebook-f text-primary"></i> Facebook
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* C. Judul Berita (Article Title) */}
              <h1 className="h2 fw-bold text-dark mb-4" style={{ lineHeight: 1.35 }}>
                {currentNews.title}
              </h1>

              {/* D. Isi Artikel (Article Body) */}
              <div className="article-body text-dark lh-lg mb-5" style={{ fontSize: '1.02rem' }}>
                {currentNews.blocks && currentNews.blocks.length > 0 ? (
                  currentNews.blocks.map((b, idx) => (
                    <div key={idx} className="mb-3" dangerouslySetInnerHTML={{ __html: b.content }} />
                  ))
                ) : (
                  <>
                    <p className="mb-3">
                      {currentNews.p1 || 'PENAJAM — Dalam rangka meningkatkan efektivitas otomasi perpustakaan, Perpustakaan Mitra menyelenggarakan kegiatan Sosialisasi INLISLite versi 3.3. Sistem otomasi perpustakaan terpadu yang dikembangkan oleh Perpustakaan Nasional RI ini memberikan kemudahan pengelolaan data bibliografi, sirkulasi, dan katalog online (OPAC).'}
                    </p>
                    <p className="mb-3">
                      {currentNews.p2 || 'Melalui implementasi sistem ini, pelayanan pemustaka diharapkan dapat berjalan lebih cepat, transparan, serta terintegrasi langsung dengan database perpustakaan secara mandiri.'}
                    </p>
                  </>
                )}
              </div>

              {/* E. Galeri Foto (Photo Gallery Section) */}
              <div className="galeri-section mb-5 pt-3 border-top">
                <h5 className="fw-bold text-dark mb-3">Galeri Foto</h5>
                <div className="row g-3">
                  {(currentNews.galeri && currentNews.galeri.length > 0
                    ? currentNews.galeri
                    : [
                        '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg',
                        '/berita/thumb_20260517_1779015332_7f282eee5b93c76e694d.jpg',
                        '/berita/20260517_1779015332_7f282eee5b93c76e694d.jpg',
                      ]
                  ).slice(0, 3).map((imgSrc, i) => (
                    <div key={i} className="col-4">
                      <div className="rounded-3 overflow-hidden shadow-sm border h-100" style={{ cursor: 'pointer' }}>
                        <img
                          src={imgSrc}
                          alt={`Galeri ${i + 1}`}
                          className="w-100 h-100 object-fit-cover transition-transform"
                          style={{ minHeight: '120px', maxHeight: '140px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg';
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* F. Footer Artikel (Social Share & Scroll to Top) */}
              <div className="pt-4 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
                {/* Sisi Kiri: Bagikan Ke Sosmed */}
                <div className="d-flex align-items-center gap-2">
                  <span className="small fw-bold text-muted me-1">Bagikan:</span>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentNews.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-success border"
                    style={{ width: '34px', height: '34px' }}
                    title="WhatsApp"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-primary border"
                    style={{ width: '34px', height: '34px' }}
                    title="Facebook"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-danger border"
                    style={{ width: '34px', height: '34px' }}
                    title="Instagram"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentNews.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-dark border"
                    style={{ width: '34px', height: '34px' }}
                    title="X / Twitter"
                  >
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(currentNews.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-info border"
                    style={{ width: '34px', height: '34px' }}
                    title="Telegram"
                  >
                    <i className="fa-brands fa-telegram"></i>
                  </a>
                  <button
                    type="button"
                    className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-secondary border"
                    style={{ width: '34px', height: '34px' }}
                    title="Salin Tautan"
                    onClick={handleCopyLink}
                  >
                    <i className="fa-solid fa-link"></i>
                  </button>
                </div>

                {/* Sisi Kanan: Tombol Ke Atas */}
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm rounded-pill fw-semibold px-3 py-1 d-inline-flex align-items-center gap-1"
                  onClick={handleScrollToTop}
                >
                  <i className="fa-solid fa-arrow-up"></i> Ke Atas
                </button>
              </div>

            </article>
          </div>

          {/* Kolom Kanan: Sidebar (~32% lebar) */}
          <div className="col-lg-4">
            <div className="bg-white rounded-3 p-4 shadow-sm border">
              
              {/* Judul Sidebar */}
              <div className="pb-3 mb-3 border-bottom">
                <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                  <i className="fa-solid fa-book-bookmark text-primary"></i> Berita Lainnya
                </h5>
              </div>

              {/* List Berita Lainnya (4 Items) */}
              <div className="d-flex flex-column gap-3">
                {sidebarItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex gap-3 align-items-center cursor-pointer p-2 rounded hover-bg-light transition"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (onPageChange) onPageChange(`berita/${item.slug}`);
                    }}
                  >
                    {/* Thumbnail Persegi Kecil */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded flex-shrink-0"
                      style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = '/berita/thumb_20260517_1779015332_7f282eee5b93c76e694d.jpg';
                      }}
                    />
                    
                    {/* Informasi Tanggal & Judul */}
                    <div>
                      <div className="small text-muted mb-1" style={{ fontSize: '0.78rem' }}>
                        <i className="fa-regular fa-calendar text-primary me-1"></i> {item.date}
                      </div>
                      <h6
                        className="fw-bold mb-0 text-dark"
                        style={{
                          fontSize: '0.88rem',
                          lineHeight: 1.35,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {item.title}
                      </h6>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
