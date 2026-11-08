import React, { useState } from 'react';

export default function Kontak() {
  const [form, setForm] = useState({ nama: '', email: '', subjek: '', pesan: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ nama: '', email: '', subjek: '', pesan: '' });
  };

  return (
    <div className="site-page">
      <section className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
          <div className="mb-4" style={{ maxWidth: '70ch' }}>
            <p
              className="text-uppercase fw-bold mb-2"
              style={{ color: '#0e7490', fontSize: '0.66rem', letterSpacing: '0.14em' }}
            >
              Hubungi Kami
            </p>
            <h1
              className="mb-2"
              style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}
            >
              Kontak
            </h1>
            <p className="text-muted mb-0">
              Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara — informasi alamat, layanan pengaduan, dan peta lokasi.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0, paddingBottom: '1.5rem', backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid" style={{ maxWidth: 'var(--page-max)', padding: '0 var(--page-pad)' }}>
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3" style={{ color: '#1b3878' }}>
                    <i className="fa-solid fa-building-columns me-2" aria-hidden="true"></i>Informasi Kontak
                  </h2>
                  <ul className="list-unstyled mb-4" style={{ color: 'var(--ink-soft)' }}>
                    <li className="d-flex gap-3 mb-3">
                      <i className="fa-solid fa-location-dot mt-1" style={{ color: '#2563eb', width: 18 }} aria-hidden="true"></i>
                      <span>
                        <strong style={{ color: 'var(--ink)' }}>Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara</strong><br />
                        Jl. KORPRI KM. 9, Komplek Islamic Center,<br />
                        Kelurahan Nipah-Nipah, Kecamatan Penajam,<br />
                        Kabupaten Penajam Paser Utara, Kalimantan Timur.
                      </span>
                    </li>
                  </ul>

                  <h3 className="h6 fw-bold mb-2" style={{ color: '#1b3878' }}>Media Sosial & Pengaduan</h3>
                  <div className="d-grid gap-2">
                    <a className="btn btn-outline-primary text-start" href="https://www.facebook.com/perpustakaankab/" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-facebook me-2" aria-hidden="true"></i>Facebook: Dinas Perpustakaan Kab. PPU
                    </a>
                    <a className="btn btn-outline-primary text-start" href="https://www.lapor.go.id/instansi/dinas-perpustakaan-dan-arsip-kabupaten-penajam-paser-utara/" target="_blank" rel="noreferrer">
                      <i className="fa-solid fa-bullhorn me-2" aria-hidden="true"></i>SP4N-LAPOR! — Kirim Aspirasi/Pengaduan
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3" style={{ color: '#1b3878' }}>
                    <i className="fa-solid fa-envelope me-2" aria-hidden="true"></i>Kirim Pesan
                  </h2>
                  {sent && (
                    <div className="alert alert-success py-2 small" role="status">
                      <i className="fa-solid fa-circle-check me-1" aria-hidden="true"></i>
                      Pesan Anda telah dicatat (simulasi). Untuk pengaduan resmi, gunakan kanal SP4N-LAPOR!.
                    </div>
                  )}
                  <form onSubmit={onSubmit} className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="k-nama" className="form-label fw-semibold small">Nama</label>
                      <input id="k-nama" name="nama" className="form-control" value={form.nama} onChange={onChange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="k-email" className="form-label fw-semibold small">Email</label>
                      <input id="k-email" name="email" type="email" className="form-control" value={form.email} onChange={onChange} required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="k-subjek" className="form-label fw-semibold small">Subjek</label>
                      <input id="k-subjek" name="subjek" className="form-control" value={form.subjek} onChange={onChange} required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="k-pesan" className="form-label fw-semibold small">Pesan</label>
                      <textarea id="k-pesan" name="pesan" className="form-control" rows={4} value={form.pesan} onChange={onChange} required></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary fw-semibold">
                        <i className="fa-solid fa-paper-plane me-2" aria-hidden="true"></i>Kirim Pesan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body p-0 overflow-hidden" style={{ borderRadius: 'var(--radius)' }}>
              <div className="p-3 border-bottom">
                <h2 className="h6 fw-bold mb-0" style={{ color: '#1b3878' }}>
                  <i className="fa-solid fa-map-location-dot me-2" aria-hidden="true"></i>Peta Lokasi
                </h2>
              </div>
              <iframe
                title="Lokasi Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7737641647927!2d116.7377538!3d-1.3111019000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df13edc85cffef9%3A0x6dee952e5d5b841b!2sDinas%20Perpustakaan%20Dan%20Arsip!5e0!3m2!1sen!2sid!4v1794163772188!5m2!1sen!2sid"
                width="100%"
                height="420"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
