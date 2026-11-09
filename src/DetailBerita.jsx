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
          image: item.thumbnail || item.image || '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg',
          desc: item.ket || item.desc || '',
          lokasi: item.lokasi || 'Penajam',
          blocks: item.blocks || [],
          p1: item.p1,
          p2: item.p2,
          galeri: item.galeri && item.galeri.length ? item.galeri : undefined,
        }));
        allNews = [...mapped, ...newsData];
        // Hapus duplikat id agar key React unik di sidebar
        const seenIds = new Set();
        allNews = allNews.filter((item) => {
          if (seenIds.has(item.id)) return false;
          seenIds.add(item.id);
          return true;
        });
      }
    }
  } catch (e) {}

  const fallback = newsData[0];
  // Temukan berita yang sedang aktif
  const currentNews = allNews.find((item) => item.slug === slug || String(item.id) === String(slug)) || fallback;

  // Berita Lainnya (sidebar) - dari data, kecuali yang sedang dibuka
  const sidebarItems = allNews.filter((item) => item.id !== currentNews.id && item.slug !== currentNews.slug).slice(0, 6);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert('Tautan berita berhasil disalin ke clipboard!');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gallery = (currentNews.galeri && currentNews.galeri.length > 0
    ? currentNews.galeri
    : [currentNews.image, currentNews.image, currentNews.image]).slice(0, 3);

  return (
    <div className="py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '85vh', color: '#1b3878' }}>
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
            <li className="breadcrumb-item active fw-bold text-primary" aria-current="page">
              {currentNews.title}
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
                  src={currentNews.image || fallback.image}
                  alt={currentNews.title}
                  className="img-fluid w-100"
                  style={{ maxHeight: '420px', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = fallback.image; }}
                />
              </div>

              {/* B. Metadata Berita (Meta Bar Atas) */}
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 pb-3 mb-3 border-bottom small text-muted">
                {/* Kiri: Tanggal, Penulis, Lokasi */}
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <span className="d-inline-flex align-items-center gap-1">
                    <i className="fa-regular fa-calendar text-primary"></i> {currentNews.date || fallback.date}
                  </span>
                  <span className="d-inline-flex align-items-center gap-1">
                    <i className="fa-regular fa-user text-primary"></i> {currentNews.author || 'admin'}
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
                    <i className="fa-solid fa-share-nodes me-1"></i>
                    <span>Bagikan</span>
                    <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.75rem' }}></i>
                  </button>

                  {dropdownBagikanOpen && (
                    <div
                      className="dropdown-menu show shadow-sm border p-2 position-absolute end-0 mt-1"
                      style={{ minWidth: '160px', zIndex: 1050 }}
                    >
                      <button type="button" className="dropdown-item small d-flex align-items-center gap-2 py-1" onClick={handleCopyLink}>
                        <i className="fa-solid fa-link text-primary"></i> Salin Tautan
                      </button>
                      <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentNews.title)}`} target="_blank" rel="noreferrer" className="dropdown-item small d-flex align-items-center gap-2 py-1">
                        <i className="fa-brands fa-whatsapp text-success"></i> WhatsApp
                      </a>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="dropdown-item small d-flex align-items-center gap-2 py-1">
                        <i className="fa-brands fa-facebook-f text-primary"></i> Facebook
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* C. Judul Berita (Article Title) */}
              <h1 className="h2 fw-bold text-primary mb-4" style={{ lineHeight: 1.35 }}>
                {currentNews.title}
              </h1>

              {/* D. Isi Artikel (Article Body) */}
              <div className="article-body text-primary lh-lg mb-5" style={{ fontSize: '1.02rem' }}>
                {currentNews.blocks && currentNews.blocks.length > 0 ? (
                  currentNews.blocks.map((b, idx) => (
                    <div key={idx} className="mb-3" dangerouslySetInnerHTML={{ __html: b.content }} />
                  ))
                ) : (
                  <>
                    <p className="mb-3">{currentNews.p1 || currentNews.desc || fallback.p1}</p>
                    {(currentNews.p2 || fallback.p2) && <p className="mb-3">{currentNews.p2 || fallback.p2}</p>}
                  </>
                )}
              </div>

              {/* E. Galeri Foto (Photo Gallery Section) */}
              <div className="galeri-section mb-5 pt-3 border-top">
                <h5 className="fw-bold text-primary mb-3">Galeri Foto</h5>
                <div className="row g-3">
                  {gallery.map((imgSrc, i) => (
                    <div key={i} className="col-4">
                      <div className="rounded-3 overflow-hidden shadow-sm border h-100" style={{ cursor: 'pointer' }}>
                        <img
                          src={imgSrc}
                          alt={`Galeri ${i + 1}`}
                          className="w-100 h-100 object-fit-cover transition-transform"
                          style={{ minHeight: '120px', maxHeight: '140px', objectFit: 'cover' }}
                          onError={(e) => { e.target.src = fallback.image; }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* F. Footer Artikel (Social Share & Scroll to Top) */}
              <div className="pt-4 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="small fw-bold text-muted me-1">Bagikan:</span>
                  <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentNews.title)}`} target="_blank" rel="noreferrer" className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-success border" style={{ width: '34px', height: '34px' }} title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-primary border" style={{ width: '34px', height: '34px' }} title="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center border" style={{ width: '34px', height: '34px', color: '#E1306C' }} title="Instagram"><i className="fa-brands fa-instagram"></i></a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentNews.title)}`} target="_blank" rel="noreferrer" className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-primary border" style={{ width: '34px', height: '34px' }} title="X / Twitter"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(currentNews.title)}`} target="_blank" rel="noreferrer" className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-info border" style={{ width: '34px', height: '34px' }} title="Telegram"><i className="fa-brands fa-telegram"></i></a>
                  <button type="button" className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center text-secondary border" style={{ width: '34px', height: '34px' }} title="Salin Tautan" onClick={handleCopyLink}><i className="fa-solid fa-link"></i></button>
                </div>
                <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill fw-semibold px-3 py-1 d-inline-flex align-items-center gap-1" onClick={handleScrollToTop}>
                  <i className="fa-solid fa-arrow-up"></i> Ke Atas
                </button>
              </div>

            </article>
          </div>

          {/* Kolom Kanan: Sidebar (~32% lebar) */}
          <div className="col-lg-4">
            <div className="bg-white rounded-3 p-4 shadow-sm border">
              <div className="pb-3 mb-3 border-bottom">
                <h5 className="fw-bold mb-0 text-primary d-flex align-items-center gap-2">
                  <i className="fa-solid fa-newspaper text-primary"></i> Berita Lainnya
                </h5>
              </div>
              <div className="d-flex flex-column gap-3">
                {sidebarItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex gap-3 align-items-center p-2 rounded"
                    style={{ cursor: 'pointer' }}
                    onClick={() => { if (onPageChange) onPageChange(`berita/${item.slug}`); }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded flex-shrink-0"
                      style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = fallback.image; }}
                    />
                    <div>
                      <div className="small text-muted mb-1" style={{ fontSize: '0.78rem' }}>
                        <i className="fa-regular fa-calendar text-primary me-1"></i> {item.date}
                      </div>
                      <h6 className="fw-bold mb-0 text-primary" style={{ fontSize: '0.88rem', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
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
