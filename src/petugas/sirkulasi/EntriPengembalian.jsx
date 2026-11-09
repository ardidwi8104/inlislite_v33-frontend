import React, { useState } from 'react';

export default function EntriPengembalian() {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scannedItem, setScannedItem] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);

  const [history, setHistory] = useState([
    {
      no: 1,
      barcode: 'PPU-2026-00201',
      judul: 'Metodologi Penelitian Kuantitatif',
      peminjam: 'Dewi Lestari',
      tgl_kembali: '2026-11-09',
      denda: 'Rp 0',
      status: 'Tepat Waktu',
    },
    {
      no: 2,
      barcode: 'PPU-2026-00103',
      judul: 'Pemrograman Web dengan Laravel 10',
      peminjam: 'Rian Pratama',
      tgl_kembali: '2026-11-08',
      denda: 'Rp 2.000',
      status: 'Terlambat 2 Hari',
    },
  ]);

  const handleCekBuku = (e) => {
    e.preventDefault();
    if (!barcodeInput.trim()) {
      alert('Masukkan atau scan barcode buku.');
      return;
    }

    setScannedItem({
      barcode: barcodeInput.trim().toUpperCase(),
      judul: 'Laskar Pelangi',
      pengarang: 'Andrea Hirata',
      peminjam: 'Ahmad Fauzi Rahman (64.09.26.00001)',
      tgl_pinjam: '2026-11-01',
      jatuh_tempo: '2026-11-08',
      hari_terlambat: 1,
      denda: 1000,
      lokasi_rak: 'Rak 08 - Sastra Indonesia',
    });
  };

  const handleProsesKembali = () => {
    if (!scannedItem) return;

    const newRecord = {
      no: history.length + 1,
      barcode: scannedItem.barcode,
      judul: `${scannedItem.judul} / ${scannedItem.pengarang}`,
      peminjam: scannedItem.peminjam,
      tgl_kembali: new Date().toISOString().split('T')[0],
      denda: scannedItem.denda > 0 ? `Rp ${scannedItem.denda.toLocaleString()}` : 'Rp 0',
      status: scannedItem.hari_terlambat > 0 ? `Terlambat ${scannedItem.hari_terlambat} Hari` : 'Tepat Waktu',
    };

    setHistory([newRecord, ...history]);

    // Save to pengembalian localStorage
    try {
      const raw = window.localStorage.getItem('inlislite.sirkulasi.pengembalian');
      const list = raw ? JSON.parse(raw) : [];
      const rec = {
        id: Date.now(),
        no_barcode: scannedItem.barcode,
        judul_penerbit: `${scannedItem.judul} / ${scannedItem.pengarang}`,
        tgl_pinjam_tempo: `${scannedItem.tgl_pinjam} s/d ${scannedItem.jatuh_tempo}`,
        tgl_kembali: new Date().toISOString().split('T')[0],
        status: scannedItem.hari_terlambat > 0 ? 'Kembali (Denda)' : 'Kembali Normal',
        lokasi: scannedItem.lokasi_rak,
        updated_date: new Date().toISOString().split('T')[0],
      };
      window.localStorage.setItem('inlislite.sirkulasi.pengembalian', JSON.stringify([rec, ...list]));
    } catch (e) {}

    setSuccessAlert(true);
    setScannedItem(null);
    setBarcodeInput('');
  };

  return (
    <>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true">
            <i className="fa-solid fa-rotate-left"></i>
          </span>
          <div>
            <h1 className="berita-topbar-title">Entri Pengembalian</h1>
            <p className="berita-topbar-sub">Sirkulasi Layanan Pengembalian Koleksi</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}>
            <i className="fa-solid fa-house" aria-hidden="true"></i> Beranda
          </a>
          <span aria-hidden="true">/</span>
          <span>Sirkulasi</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Entri Pengembalian</span>
        </nav>
      </div>

      <div className="bo-panel-body p-0">
        {successAlert && (
          <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-3" role="alert">
            <i className="fa-solid fa-circle-check fs-5"></i>
            <div>
              <strong>Pengembalian Berhasil!</strong> Buku fisik telah berhasil tercatat kembali ke perpustakaan.
            </div>
            <button
              type="button"
              className="btn-close ms-auto"
              onClick={() => setSuccessAlert(false)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="row g-3">
          {/* Main Scan Card */}
          <div className="col-12">
            <div className="card border shadow-sm">
              <div
                className="card-header py-2 text-white fw-bold d-flex align-items-center gap-2"
                style={{ backgroundColor: '#1E293B' }}
              >
                <i className="fa-solid fa-rotate-left text-success"></i> Scan Barcode Buku untuk Pengembalian
              </div>
              <div className="card-body p-4 text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
                  style={{ width: '56px', height: '56px', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '1.5rem' }}
                >
                  <i className="fa-solid fa-barcode"></i>
                </div>
                <h6 className="fw-bold text-dark mb-1">Scan atau Masukkan Barcode Buku</h6>
                <p className="text-muted small mb-3">
                  Posisikan scanner pada barcode buku yang dikembalikan pemustaka.
                </p>

                <form onSubmit={handleCekBuku} className="mb-3">
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-white" style={{ color: '#2563EB' }}>
                      <i className="fa-solid fa-barcode"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan No. Barcode Buku (contoh: PPU-2026-00101)"
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-outline-primary fw-semibold w-100 d-inline-flex align-items-center justify-content-center gap-2 py-2"
                    >
                      <i className="fa-solid fa-search"></i> Cek Status Buku
                    </button>
                    {scannedItem && (
                      <button
                        type="button"
                        className="btn btn-success fw-semibold w-100 d-inline-flex align-items-center justify-content-center gap-2 py-2"
                        onClick={handleProsesKembali}
                      >
                        <i className="fa-solid fa-rotate-left"></i> Kembalikan Buku
                      </button>
                    )}
                  </div>
                </form>

                {/* Detail Buku Hasil Cek */}
                {scannedItem && (
                  <div className="text-start p-3 bg-light rounded border small">
                    <div className="fw-bold text-primary mb-1">{scannedItem.judul}</div>
                    <div className="text-muted">Peminjam: <strong className="text-dark">{scannedItem.peminjam}</strong></div>
                    <div className="text-muted">Jatuh Tempo: <span className="badge bg-secondary">{scannedItem.jatuh_tempo}</span></div>
                    <div className="text-muted mt-1">
                      Keterlambatan:{' '}
                      {scannedItem.hari_terlambat > 0 ? (
                        <span className="badge bg-danger">
                          Terlambat {scannedItem.hari_terlambat} Hari (Denda: Rp {scannedItem.denda.toLocaleString()})
                        </span>
                      ) : (
                        <span className="badge bg-success">Tepat Waktu (Tidak Ada Denda)</span>
                      )}
                    </div>
                    <div className="text-muted mt-1">Kembalikan ke: <strong>{scannedItem.lokasi_rak}</strong></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Riwayat Terbaru Card */}
          <div className="col-12">
            <div className="card border shadow-sm h-100">
              <div
                className="card-header py-2 text-white fw-bold d-flex align-items-center justify-content-between"
                style={{ backgroundColor: '#1E293B' }}
              >
                <span>
                  <i className="fa-solid fa-rotate-left text-success me-2"></i> 5 Pengembalian Terakhir
                </span>
                <button
                  type="button"
                  className="btn btn-sm text-white-50 p-0"
                  title="Refresh"
                  onClick={() => alert('Data diperbarui.')}
                >
                  <i className="fa-solid fa-arrows-rotate"></i>
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-sm align-middle mb-0" style={{ fontSize: '0.8rem' }}>
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: 30 }} className="text-center">No</th>
                        <th>Barcode & Judul</th>
                        <th style={{ width: 90 }}>Status / Denda</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.slice(0, 5).map((h, i) => (
                        <tr key={i}>
                          <td className="text-center fw-bold">{i + 1}</td>
                          <td>
                            <span className="badge bg-light text-primary border font-monospace">{h.barcode}</span>
                            <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '180px' }}>
                              {h.judul}
                            </div>
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>{h.peminjam}</span>
                          </td>
                          <td>
                            <span className={`badge ${h.denda !== 'Rp 0' ? 'bg-danger' : 'bg-success-subtle text-success border'}`}>
                              {h.denda}
                            </span>
                            <div className="text-muted" style={{ fontSize: '0.7rem' }}>{h.status}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
