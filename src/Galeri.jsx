import React from 'react';

const galleryData = [
  { id: 1, title: 'Kegiatan Literasi', image: '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg' },
  { id: 2, title: 'FGD Pengelolaan Perpustakaan', image: '/berita/thumb_20260517_1779015332_7f282eee5b93c76e694d.jpg' },
  { id: 3, title: 'Sharing Knowledge ke Perpustakaan UI', image: '/berita/20260517_1779015332_7f282eee5b93c76e694d.jpg' },
  { id: 4, title: 'Sosialisasi INLISLite 3.3', image: '/berita/thumb_20260525_1779692444_56ff96b0e43c16323dd6.jpg' },
  { id: 5, title: 'Kunjungan dan Benchmarking', image: '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg' },
  { id: 6, title: 'Pembinaan Perpustakaan', image: '/berita/thumb_20260517_1779015332_7f282eee5b93c76e694d.jpg' },
];

/* Foto galeri dari Berita (diunggah lewat popup tambah/edit Berita di backoffice).
   Data tersimpan di localStorage kunci 'inlislite.berita.v1'. */
function loadBeritaGaleri() {
  try {
    const raw = window.localStorage.getItem('inlislite.berita.v1');
    const parsed = raw ? JSON.parse(raw) : [];
    return (Array.isArray(parsed) ? parsed : []).flatMap((item) =>
      (item.galeri || []).map((src, i) => ({
        id: `${item.id}-galeri-${i}`,
        title: item.judul || 'Berita',
        image: src,
      }))
    );
  } catch (error) {
    return [];
  }
}

export default function Galeri({ onPageChange }) {
  const beritaGaleri = React.useMemo(loadBeritaGaleri, []);
  const seenImages = new Set();
  const allGallery = [...beritaGaleri, ...galleryData].filter((item) => {
    if (!item?.image || seenImages.has(item.image)) return false;
    seenImages.add(item.image);
    return true;
  });
  return (
    <section className="py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
        <div className="mb-4" style={{ maxWidth: '70ch' }}>
          <p
            className="text-uppercase fw-bold mb-2"
            style={{ color: '#0e7490', fontSize: '0.78rem', letterSpacing: '0.12em' }}
          >
            Dokumentasi
          </p>
          <h1
            className="mb-2"
            style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}
          >
            Galeri kegiatan
          </h1>
          <p className="text-muted mb-0">
            Dokumentasi kegiatan Dinas Perpustakaan Kabupaten Penajam Paser Utara.
          </p>
        </div>

        <div className="row g-3 g-md-4">
          {allGallery.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="card h-100 overflow-hidden">
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = 'linear-gradient(135deg, #1b3878 0%, #14245a 100%)';
                    }}
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)' }}>
                    <h6 className="text-white mb-0 fw-semibold">{item.title}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
