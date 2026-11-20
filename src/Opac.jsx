import React, { useMemo, useState } from 'react';
import { katalogBuku } from './data/katalogData';

const NAVY = '#1E3A6E';
const NAVY_GRAD = '#244785';
const BLUE = '#2B5292';
const BLUE_HOVER = '#1E3A6E';
const BG = '#F4F6F9';
const TEXT_DARK = '#1E293B';
const TEXT_MUTED = '#64748B';
const TEXT_PLACEHOLDER = '#94A3B8';
const BORDER = '#E2E8F0';
const FILTER_BG = '#F8FAFC';

export default function Opac({ onPageChange }) {
  void onPageChange;
  const [kategori, setKategori] = useState('Judul');
  const [keyword, setKeyword] = useState('');
  const [pengarang, setPengarang] = useState('');
  const [penerbit, setPenerbit] = useState('');
  const [subjek, setSubjek] = useState('');
  const [tahun, setTahun] = useState('');
  const [applied, setApplied] = useState({ kategori: 'Judul', keyword: '', pengarang: '', penerbit: '', subjek: '', tahun: '' });
  const [loadTick, setLoadTick] = useState(0);
  const [hoverCari, setHoverCari] = useState(false);
  const [hoverReload, setHoverReload] = useState(false);

  const muatWaktu = useMemo(() => (0.2554 + (loadTick % 7) * 0.0131).toFixed(4), [loadTick]);

  const hasil = useMemo(() => {
    const q = (applied.keyword || '').trim().toLowerCase();
    const fPengarang = (applied.pengarang || '').trim().toLowerCase();
    const fPenerbit = (applied.penerbit || '').trim().toLowerCase();
    const fSubjek = (applied.subjek || '').trim().toLowerCase();
    const fTahun = (applied.tahun || '').trim();

    return katalogBuku.filter((b) => {
      if (q) {
        let field = '';
        switch (applied.kategori) {
          case 'Pengarang': field = b.pengarang; break;
          case 'Penerbit': field = b.penerbit; break;
          case 'Subjek': field = b.subjek; break;
          case 'Tahun': field = String(b.tahun); break;
          case 'ISBN': field = b.isbn; break;
          default: field = b.judul;
        }
        if (!String(field || '').toLowerCase().includes(q)) return false;
      }
      if (fPengarang && !String(b.pengarang || '').toLowerCase().includes(fPengarang)) return false;
      if (fPenerbit && !String(b.penerbit || '').toLowerCase().includes(fPenerbit)) return false;
      if (fSubjek && !String(b.subjek || '').toLowerCase().includes(fSubjek)) return false;
      if (fTahun && !String(b.tahun || '').includes(fTahun)) return false;
      return true;
    }).sort((a, b) => b.tahun - a.tahun);
  }, [applied]);

  const onCari = (e) => {
    e.preventDefault();
    setApplied({ kategori, keyword, pengarang, penerbit, subjek, tahun });
  };

  const onReload = () => {
    setKategori('Judul');
    setKeyword('');
    setPengarang('');
    setPenerbit('');
    setSubjek('');
    setTahun('');
    setApplied({ kategori: 'Judul', keyword: '', pengarang: '', penerbit: '', subjek: '', tahun: '' });
    setLoadTick((n) => n + 1);
  };

  const inputBase = {
    width: '100%',
    border: `1px solid ${BORDER}`,
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '0.95rem',
    color: TEXT_DARK,
    outline: 'none',
    backgroundColor: '#FFFFFF',
  };

  const filterInput = {
    ...inputBase,
    backgroundColor: FILTER_BG,
    fontSize: '0.9rem',
  };

  return (
    <div className="opac-page" style={{ backgroundColor: BG, minHeight: '100vh', width: '100%', overflowX: 'hidden', fontFamily: "'Inter', 'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}>
      {/* A. Hero Search Section */}
      <section
        className="opac-hero"
        style={{
          width: '100%',
          background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_GRAD} 100%)`,
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          padding: '56px 24px 48px',
        }}
      >
        <div className="opac-hero-inner" style={{ width: '100%', maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
          <h1
            style={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 3vw, 2.5rem)',
              margin: '0 0 10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <i className="fa-solid fa-book-open" aria-hidden="true" style={{ color: '#FFFFFF' }}></i>
            <span>Katalog Perpustakaan</span>
          </h1>
          <p style={{ color: '#E2E8F0', fontSize: '0.95rem', margin: '0 auto 28px', maxWidth: '720px' }}>
            Temukan referensi, buku, dan koleksi literatur dengan mudah dan cepat.
          </p>

          {/* Floating Search Card */}
          <form
            onSubmit={onCari}
            className="opac-search-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              width: '100%',
              maxWidth: '100%',
              margin: '0 auto',
              textAlign: 'left',
            }}
          >
            {/* Baris 1 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 20%) 1fr minmax(110px, 15%)',
                gap: '12px',
                marginBottom: '14px',
              }}
              className="opac-search-row1"
            >
              <select
                aria-label="Kategori pencarian"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                style={{ ...inputBase, cursor: 'pointer' }}
              >
                <option>Judul</option>
                <option>Pengarang</option>
                <option>Penerbit</option>
                <option>Subjek</option>
                <option>Tahun</option>
                <option>ISBN</option>
              </select>
              <input
                type="text"
                aria-label="Kata kunci pencarian"
                placeholder="Masukkan kata kunci pencarian..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={inputBase}
              />
              <button
                type="submit"
                onMouseEnter={() => setHoverCari(true)}
                onMouseLeave={() => setHoverCari(false)}
                style={{
                  backgroundColor: hoverCari ? BLUE_HOVER : BLUE,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                <span>Cari</span>
              </button>
            </div>

            {/* Baris 2 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: '12px',
              }}
              className="opac-search-row2"
            >
              <input
                type="text"
                aria-label="Filter Pengarang"
                placeholder="Filter Pengarang..."
                value={pengarang}
                onChange={(e) => setPengarang(e.target.value)}
                style={filterInput}
              />
              <input
                type="text"
                aria-label="Filter Penerbit"
                placeholder="Filter Penerbit..."
                value={penerbit}
                onChange={(e) => setPenerbit(e.target.value)}
                style={filterInput}
              />
              <input
                type="text"
                aria-label="Filter Subjek"
                placeholder="Filter Subjek..."
                value={subjek}
                onChange={(e) => setSubjek(e.target.value)}
                style={filterInput}
              />
              <input
                type="text"
                aria-label="Filter Tahun"
                placeholder="Filter Tahun..."
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                style={filterInput}
              />
            </div>
          </form>
        </div>
      </section>

      {/* B. Main Content Area */}
      <section className="opac-main-section" style={{ width: '100%', padding: '40px 24px 0' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 320px) minmax(0, 1fr)',
            gap: '28px',
            alignItems: 'start',
          }}
          className="opac-main-grid"
        >
          {/* Kolom Kiri (Sidebar) */}
          <aside>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div
                style={{
                  backgroundColor: NAVY,
                  padding: '12px 16px',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.98rem',
                }}
              >
                <i className="fa-solid fa-chart-pie" aria-hidden="true"></i>
                <span>Statistik Koleksi</span>
              </div>
              <div style={{ padding: '20px' }}>
                <div
                  style={{
                    backgroundColor: FILTER_BG,
                    borderRadius: '10px',
                    padding: '16px 18px',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: TEXT_DARK, lineHeight: 1.1 }}>
                    {katalogBuku.length}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: TEXT_MUTED, marginTop: '4px' }}>Total Katalog</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Kolom Kanan */}
          <main>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '14px',
                color: TEXT_DARK,
              }}
            >
              <i className="fa-solid fa-bars" aria-hidden="true" style={{ color: NAVY }}></i>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: TEXT_DARK }}>Koleksi Terbaru</h2>
            </div>

            <div
              className="opac-results-wrap"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                minHeight: '300px',
                padding: hasil.length ? '18px' : '24px',
              }}
            >
              {hasil.length === 0 ? (
                <div
                  style={{
                    minHeight: '260px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <i
                    className="fa-solid fa-magnifying-glass-minus"
                    aria-hidden="true"
                    style={{ fontSize: '3.5rem', color: TEXT_MUTED }}
                  ></i>
                  <div style={{ fontWeight: 700, color: TEXT_DARK, fontSize: '1.15rem', marginTop: '16px' }}>
                    Mulai temukan koleksi
                  </div>
                  <button
                    type="button"
                    onClick={onReload}
                    onMouseEnter={() => setHoverReload(true)}
                    onMouseLeave={() => setHoverReload(false)}
                    style={{
                      marginTop: '16px',
                      backgroundColor: hoverReload ? BLUE_HOVER : BLUE,
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <i className="fa-solid fa-rotate" aria-hidden="true"></i>
                    <span>Muat Ulang Katalog</span>
                  </button>
                </div>
              ) : (
                <div className="opac-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
                  {hasil.map((b) => (
                    <article
                      key={b.id}
                      className="opac-result-card"
                      style={{
                        border: `1px solid ${BORDER}`,
                        borderRadius: '12px',
                        padding: '14px',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        minWidth: 0,
                      }}
                    >
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', minWidth: 0 }}>
                        <div
                          style={{
                            width: '46px',
                            height: '62px',
                            borderRadius: '8px',
                            background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_GRAD} 100%)`,
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        >
                          <i className="fa-solid fa-book"></i>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: TEXT_DARK, lineHeight: 1.3, overflowWrap: 'anywhere' }}>
                            {b.judul}
                          </h3>
                          <div style={{ fontSize: '0.85rem', color: TEXT_MUTED, marginTop: '2px', overflowWrap: 'anywhere' }}>{b.pengarang}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: TEXT_MUTED, lineHeight: 1.45, overflowWrap: 'anywhere' }}>
                        <div><strong style={{ color: TEXT_DARK, fontWeight: 600 }}>Penerbit:</strong> {b.penerbit}</div>
                        <div><strong style={{ color: TEXT_DARK, fontWeight: 600 }}>Tahun:</strong> {b.tahun}</div>
                        <div><strong style={{ color: TEXT_DARK, fontWeight: 600 }}>Subjek:</strong> {b.subjek}</div>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, overflowWrap: 'anywhere' }}>{b.sinopsis}</p>
                      <div
                        style={{
                          marginTop: 'auto',
                          paddingTop: '8px',
                          borderTop: `1px dashed ${BORDER}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: String(b.ketersediaan).startsWith('Tersedia') ? '#15803d' : '#b45309',
                            backgroundColor: String(b.ketersediaan).startsWith('Tersedia') ? '#ecfdf3' : '#fff7ed',
                            padding: '4px 8px',
                            borderRadius: '999px',
                          }}
                        >
                          {b.ketersediaan}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: TEXT_PLACEHOLDER }}>{b.bibid}</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>

        {/* C. Meta Info */}
        <div style={{ textAlign: 'center', marginTop: '32px', marginBottom: '48px' }}>
          <div style={{ color: TEXT_MUTED, fontSize: '0.85rem' }}>
            <i className="fa-solid fa-list-ul" aria-hidden="true" style={{ color: '#3B82F6', marginRight: '8px' }}></i>
            <span>
              Total <strong style={{ fontWeight: 700 }}>{hasil.length}</strong> koleksi ditemukan
            </span>
          </div>
          <div style={{ color: TEXT_MUTED, fontSize: '0.85rem', marginTop: '6px' }}>
            <i className="fa-solid fa-bolt" aria-hidden="true" style={{ color: '#F59E0B', marginRight: '8px' }}></i>
            <span>
              Waktu muat: <strong style={{ fontWeight: 700 }}>{muatWaktu}</strong> detik
            </span>
          </div>
        </div>
      </section>

      <style>{`
        .opac-page, .opac-page * { box-sizing: border-box; }
        .opac-search-row1 input::placeholder,
        .opac-search-row2 input::placeholder { color: ${TEXT_PLACEHOLDER}; opacity: 1; }
        .opac-search-row1 input:focus,
        .opac-search-row1 select:focus,
        .opac-search-row2 input:focus { border-color: #93c5fd; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); }
        @media (max-width: 991.98px) {
          .opac-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767.98px) {
          .opac-search-row1 { grid-template-columns: 1fr !important; }
          .opac-search-row2 { grid-template-columns: 1fr 1fr !important; }
          .opac-hero { padding: 40px 16px 36px !important; border-bottom-left-radius: 24px !important; border-bottom-right-radius: 24px !important; }
          .opac-main-section { padding: 28px 16px 0 !important; }
        }
        @media (max-width: 479.98px) {
          .opac-search-row2 { grid-template-columns: 1fr !important; }
          .opac-search-card { padding: 16px !important; border-radius: 12px !important; }
          .opac-hero { padding: 32px 12px 28px !important; border-bottom-left-radius: 18px !important; border-bottom-right-radius: 18px !important; }
          .opac-hero h1 { font-size: 1.6rem !important; gap: 10px !important; }
          .opac-hero p { font-size: 0.9rem !important; }
          .opac-main-section { padding: 20px 12px 0 !important; }
          .opac-main-grid { gap: 18px !important; }
          .opac-results-wrap { padding: 14px !important; }
          .opac-cards-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .opac-result-card { padding: 12px !important; }
        }
        @media (max-width: 359.98px) {
          .opac-search-card { padding: 12px !important; }
          .opac-hero h1 { font-size: 1.45rem !important; }
        }
      `}</style>
    </div>
  );
}
