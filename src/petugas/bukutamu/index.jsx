import React, { useEffect, useMemo, useState } from 'react';
import { findVisitByCode, listVisits, verifyVisit } from '../../lib/libraryStore';

const STATUS = {
  pending: { label: 'Menunggu', cls: 'bg-warning text-dark' },
  verified: { label: 'Terverifikasi', cls: 'bg-success text-white' },
  rejected: { label: 'Ditolak', cls: 'bg-danger text-white' },
};

export default function PetugasBukuTamu() {
  const [visits, setVisits] = useState(() => listVisits());
  const [code, setCode] = useState('');
  const [found, setFound] = useState(null);
  const [msg, setMsg] = useState(null);

  const refresh = () => setVisits(listVisits());

  useEffect(() => {
    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);
    window.addEventListener('storage', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onFocus);
    };
  }, []);

  const verified = useMemo(() => visits.filter((v) => v.status === 'verified'), [visits]);
  const pendingCount = useMemo(() => visits.filter((v) => v.status === 'pending').length, [visits]);

  const handleFind = (e) => {
    e?.preventDefault();
    const v = findVisitByCode(code);
    setFound(v || null);
    setMsg(v ? null : { type: 'warning', text: 'Kode booking/barcode tidak ditemukan.' });
  };

  const handleVerify = () => {
    if (!found) return;
    const res = verifyVisit(found.id, 'petugas');
    setMsg({ type: res.ok ? 'success' : 'danger', text: res.message });
    refresh();
    setFound(res.visit || findVisitByCode(code));
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100%' }}>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-user"></i></span>
          <div>
            <h1 className="berita-topbar-title">Buku Tamu</h1>
            <p className="berita-topbar-sub">Layanan harian</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-house" aria-hidden="true"></i> Beranda</a>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Buku Tamu</span>
        </nav>
      </div>

      <section className="bo-panel mb-4" aria-labelledby="verify-visit-title">
        <div className="bo-panel-head">
          <div>
            <h2 id="verify-visit-title">Verifikasi kode booking / scan barcode</h2>
            <p>Masukkan kode yang muncul di popup bukti kunjungan tamu, atau nilai barcode/ID kunjungan.</p>
          </div>
        </div>
        <div className="bo-panel-body">
          <form className="row g-2 align-items-end" onSubmit={handleFind}>
            <div className="col-12 col-md-6 col-lg-5">
              <label htmlFor="visit-code" className="form-label small fw-semibold">Kode booking / barcode</label>
              <input
                id="visit-code"
                className="form-control"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Contoh: A1B2C3 atau BT-20260501-A1B2C3"
                autoComplete="off"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                <i className="fa-solid fa-magnifying-glass me-1" aria-hidden="true"></i>Cari
              </button>
            </div>
          </form>

          {msg ? <div className={`alert alert-${msg.type} py-2 mt-3 mb-0`}>{msg.text}</div> : null}

          {found ? (
            <div className="border rounded-3 p-3 mt-3 bg-light">
              <div className="row g-2 small">
                <div className="col-sm-6"><span className="text-muted">Nama:</span> <strong>{found.visitorName}</strong></div>
                <div className="col-sm-6"><span className="text-muted">Status:</span>{' '}
                  <span className={`badge ${STATUS[found.status]?.cls || 'bg-secondary text-white'}`}>{STATUS[found.status]?.label || found.status}</span>
                </div>
                <div className="col-sm-6"><span className="text-muted">Kode booking:</span> <span className="font-monospace">{found.bookingCode}</span></div>
                <div className="col-sm-6"><span className="text-muted">Barcode:</span> <span className="font-monospace">{found.barcode}</span></div>
                <div className="col-sm-6"><span className="text-muted">Jenis:</span> {found.kind === 'member' ? 'Anggota' : found.kind === 'group' ? 'Rombongan' : 'Non-anggota'}</div>
                <div className="col-sm-6"><span className="text-muted">Tanggal:</span> {found.visitDate}{found.visitTime ? ` ${found.visitTime}` : ''}</div>
              </div>
              {found.status === 'pending' ? (
                <button type="button" className="btn btn-success btn-sm mt-3" onClick={handleVerify}>
                  <i className="fa-solid fa-circle-check me-1" aria-hidden="true"></i>Verifikasi kunjungan
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="bo-panel" aria-labelledby="buku-tamu-table-title">
        <div className="bo-panel-head">
          <div>
            <h2 id="buku-tamu-table-title">Data kunjungan terverifikasi</h2>
            <p>Kunjungan anggota/non-anggota yang sudah diverifikasi petugas.</p>
          </div>
        </div>
        <div className="bo-panel-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
              <thead className="table-light">
                <tr>
                  <th style={{ width: '50px' }}>No.</th>
                  <th>Tgl. Kunjungan</th>
                  <th>Nama</th>
                  <th>Kode Booking</th>
                  <th>Jenis</th>
                  <th>Tujuan</th>
                </tr>
              </thead>
              <tbody>
                {verified.length === 0 ? (
                  <tr><td colSpan={6} className="text-center text-muted py-4">Belum ada kunjungan terverifikasi.</td></tr>
                ) : verified.map((row, i) => (
                  <tr key={row.id}>
                    <td className="fw-semibold">{i + 1}</td>
                    <td>{row.visitDate}{row.visitTime ? ` ${row.visitTime}` : ''}</td>
                    <td className="fw-semibold">{row.visitorName}</td>
                    <td className="font-monospace small">{row.bookingCode}</td>
                    <td>{row.kind === 'member' ? 'Anggota' : row.kind === 'group' ? 'Rombongan' : 'Non-anggota'}</td>
                    <td>{row.visitPurpose || row.location || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
