import React, { useState } from 'react';

const PRIMARY = '#1b3878';
const ACCENT = '#0e7490';

export default function Kontak() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="site-page">
      <section className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
          <div className="mb-4" style={{ maxWidth: '70ch' }}>
            <p
              className="text-uppercase fw-bold mb-2"
              style={{ color: ACCENT, fontSize: '0.78rem', letterSpacing: '0.12em' }}
            >
              Hubungi Kami
            </p>
            <h1
              className="mb-2"
              style={{ color: PRIMARY, fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}
            >
              Hubungi Kami
            </h1>
            <p className="text-muted mb-0">
              Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0, paddingBottom: '2.5rem', backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid" style={{ maxWidth: 'var(--page-max)', padding: '0 var(--page-pad)' }}>
          <div className="row g-4 mb-4 align-items-stretch">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100 rounded-4">
                <div className="card-body p-4 p-lg-5 d-flex flex-column justify-content-between">
                  <div>
                    <h2 className="h4 fw-bold mb-4 pb-3 border-bottom" style={{ color: '#111827' }}>
                      Informasi Kontak
                    </h2>

                    <div className="d-flex flex-column gap-4">
                      <div className="d-flex align-items-start gap-3">
                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                          style={{ width: 48, height: 48, backgroundColor: '#dbeafe', color: PRIMARY }}
                          aria-hidden="true"
                        >
                          <i className="fa-solid fa-location-dot fs-5"></i>
                        </span>
                        <div>
                          <h3 className="h6 fw-bold mb-1" style={{ color: '#111827' }}>Alamat Kantor</h3>
                          <p className="text-muted mb-0" style={{ lineHeight: 1.7 }}>
                            Jl. KORPRI KM. 9, Kelurahan Nipah-Nipah, Kecamatan Penajam, Kabupaten Penajam Paser Utara, Kalimantan Timur
                          </p>
                        </div>
                      </div>

                      <div className="d-flex align-items-start gap-3">
                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                          style={{ width: 48, height: 48, backgroundColor: '#dbeafe', color: PRIMARY }}
                          aria-hidden="true"
                        >
                          <i className="fa-brands fa-facebook-f fs-5"></i>
                        </span>
                        <div>
                          <h3 className="h6 fw-bold mb-1" style={{ color: '#111827' }}>Facebook Resmi</h3>
                          <a
                            href="https://www.facebook.com/perpustakaankab/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none fw-medium"
                            style={{ color: '#2563eb' }}
                          >
                            Dinas Perpustakaan Kabupaten PPU
                          </a>
                        </div>
                      </div>

                      <div className="d-flex align-items-start gap-3">
                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                          style={{ width: 48, height: 48, backgroundColor: '#fee2e2', color: '#dc2626' }}
                          aria-hidden="true"
                        >
                          <i className="fa-solid fa-bullhorn fs-5"></i>
                        </span>
                        <div>
                          <h3 className="h6 fw-bold mb-1" style={{ color: '#111827' }}>Layanan Pengaduan Official</h3>
                          <p className="text-muted small mb-1">Kirim laporan atau aspirasi Anda melalui SP4N-LAPOR!:</p>
                          <a
                            href="https://www.lapor.go.id/instansi/dinas-perpustakaan-dan-arsip-kabupaten-penajam-paser-utara/done"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none fw-semibold d-inline-flex align-items-center gap-1"
                            style={{ color: '#dc2626' }}
                          >
                            Portal SP4N-LAPOR! Dispusip PPU
                            <i className="fa-solid fa-arrow-up-right-from-square small" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-top">
                    <p className="small text-muted mb-0 d-flex align-items-center gap-2">
                      <i className="fa-solid fa-clock text-secondary" aria-hidden="true"></i>
                      <span>Jam Pelayanan: Senin - Jumat (08.00 - 16.00 WITA)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                <div className="card-body p-2 h-100" style={{ minHeight: 420 }}>
                  <iframe
                    title="Lokasi Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7737641647927!2d116.7377538!3d-1.3111019000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df13edc85cffef9%3A0x6dee952e5d5b841b!2sDinas%20Perpustakaan%20Dan%20Arsip!5e0!3m2!1sen!2sid!4v1794163772188!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block', minHeight: 400, borderRadius: '0.75rem' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-lg-5">
              <div className="mx-auto" style={{ maxWidth: 860 }}>
                <h2 className="h4 fw-bold mb-2 text-center" style={{ color: '#111827' }}>Kirim Pesan</h2>
                <p className="text-muted text-center mb-4">Punya pertanyaan atau saran? Silakan isi formulir di bawah ini.</p>

                {sent && (
                  <div className="alert alert-success py-2 mb-4" role="status">
                    <i className="fa-solid fa-circle-check me-2" aria-hidden="true"></i>
                    Pesan Anda telah dicatat (simulasi). Untuk pengaduan resmi, gunakan kanal SP4N-LAPOR!.
                  </div>
                )}

                <form onSubmit={onSubmit} className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="k-name" className="form-label fw-semibold">Nama Lengkap</label>
                    <input
                      id="k-name"
                      name="name"
                      className="form-control form-control-lg fs-6"
                      placeholder="Masukkan nama Anda"
                      value={form.name}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="k-email" className="form-label fw-semibold">Alamat Email</label>
                    <input
                      id="k-email"
                      name="email"
                      type="email"
                      className="form-control form-control-lg fs-6"
                      placeholder="nama@email.com"
                      value={form.email}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="k-subject" className="form-label fw-semibold">Subjek / Perihal</label>
                    <input
                      id="k-subject"
                      name="subject"
                      className="form-control form-control-lg fs-6"
                      placeholder="Topik pesan Anda"
                      value={form.subject}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="k-message" className="form-label fw-semibold">Pesan</label>
                    <textarea
                      id="k-message"
                      name="message"
                      className="form-control fs-6"
                      rows={5}
                      placeholder="Tuliskan pesan Anda di sini..."
                      value={form.message}
                      onChange={onChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 text-center pt-2">
                    <button
                      type="submit"
                      className="btn btn-lg text-white fw-semibold px-4 d-inline-flex align-items-center gap-2"
                      style={{ backgroundColor: PRIMARY, borderColor: PRIMARY }}
                    >
                      <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                      Kirim Pesan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
