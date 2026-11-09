import React, { useState } from 'react';
import { newsData } from './data/beritaData';

export default function Berita({ onPageChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = newsData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (news) => {
    if (onPageChange) {
      // Navigasi ke detail berita menggunakan slug judul berita
      onPageChange(`berita/${news.slug}`);
    }
  };

  return (
    <section className="py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-2">
          <ol className="breadcrumb small mb-2">
            <li className="breadcrumb-item">
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); if (onPageChange) onPageChange('home'); }}
                className="text-decoration-none text-primary fw-medium d-inline-flex align-items-center"
              >
                <i className="fa fa-home text-primary me-1"></i> Beranda
              </a>
            </li>
            <li className="breadcrumb-item active text-muted" aria-current="page">Berita</li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className="mb-4" style={{ maxWidth: '70ch' }}>
          <p
            className="text-uppercase fw-bold mb-2"
            style={{ color: '#0e7490', fontSize: '0.78rem', letterSpacing: '0.12em' }}
          >
            Kabar perpustakaan
          </p>
          <h1
            className="mb-2"
            style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}
          >
            Berita terbaru
          </h1>
          <p className="text-muted mb-0">Kegiatan, pengumuman, dan liputan perpustakaan.</p>
        </div>

        {/* Search Input */}
        <div className="mb-4" style={{ maxWidth: '320px' }}>
          <label className="visually-hidden" htmlFor="berita-search">
            Cari berita
          </label>
          <input
            id="berita-search"
            type="search"
            className="form-control py-2 px-3"
            placeholder="Cari berita..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* News Cards Grid */}
        <div className="row g-4">
          {filteredNews.map((news) => (
            <div key={news.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div
                className="card news-card h-100 overflow-hidden"
                style={{ cursor: 'pointer' }}
                onClick={() => handleCardClick(news)}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    height: '180px',
                    overflow: 'hidden',
                    backgroundColor: '#dee2e6',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = 'linear-gradient(135deg, #1b3878 0%, #14245a 100%)';
                      e.target.parentElement.insertAdjacentHTML('beforeend',
                        '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;position:absolute;top:0;left:0">' +
                        '<i class="fa-solid fa-newspaper" style="font-size:2.5rem;color:rgba(255,255,255,0.4)"></i></div>'
                      );
                    }}
                  />
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column p-3">
                  {/* Date */}
                  <div className="d-flex align-items-center gap-1 mb-2 text-muted" style={{ fontSize: '0.78rem' }}>
                    <i className="fa-regular fa-calendar text-primary" style={{ fontSize: '0.75rem' }}></i>
                    {news.date}
                  </div>

                  <h6 className="fw-bold mb-2 lh-sm" style={{ color: '#1b3878', fontSize: '0.93rem' }}>
                    {news.title}
                  </h6>
                  <p className="text-muted small mb-3 flex-grow-1" style={{ fontSize: '0.82rem', lineHeight: '1.5' }}>
                    {news.desc}
                  </p>

                  {/* Card Footer */}
                  <div
                    className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top"
                    style={{ borderColor: '#dee2e6' }}
                  >
                    <span className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.78rem' }}>
                      <i className="fa-solid fa-user text-primary" style={{ fontSize: '0.72rem' }}></i> {news.author}
                    </span>
                    <span
                      className="fw-semibold text-decoration-none"
                      style={{ color: '#1b3878', fontSize: '0.78rem' }}
                    >
                      Selengkapnya <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.7rem' }}></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredNews.length === 0 && (
            <div className="col-12 text-center py-5">
              <p className="text-muted">Tidak ada berita yang sesuai dengan kata kunci "{searchTerm}".</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div
          className="flex justify-center items-center gap-2 mt-10"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '40px' }}
        >
          <button
            disabled
            className="text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg text-sm cursor-not-allowed"
            style={{ color: '#9ca3af', backgroundColor: '#f3f4f6', padding: '6px 12px', borderRadius: '8px', fontSize: '14px', cursor: 'not-allowed', border: 'none' }}
          >
            Prev
          </button>
          <button
            className="bg-blue-900 text-white px-3.5 py-1.5 rounded-lg text-sm font-semibold shadow-sm"
            style={{ backgroundColor: '#1e3a8a', color: '#ffffff', padding: '6px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, border: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          >
            1
          </button>
          <button
            className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ color: '#374151', backgroundColor: '#ffffff', border: '1px solid #d1d5db', padding: '6px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
