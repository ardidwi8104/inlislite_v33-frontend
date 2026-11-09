import React, { useState } from 'react';

export default function EntriPerpanjangan() {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [durasiHari, setDurasiHari] = useState(7);
  const [scannedItem, setScannedItem] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);

  const [history, setHistory] = useState([
    {
      no: 1,
      barcode: 'BC-202600101',
      judul: 'Laskar Pelangi / Andrea Hirata',
      peminjam: 'Ahmad Fauzi Rahman',
      tgl_lama: '2026-11-09',
      tgl_baru: '2026-11-16',
      durasi: '7 Hari',
    },
    {
      no: 2,
      barcode: 'BC-202600102',
      judul: 'Bumi Manusia / Pramoedya Ananta Toer',
      peminjam: 'Siti Nurhaliza',
      tgl_lama: '2026-11-08',
      tgl_baru: '2026-11-22',
      durasi: '14 Hari',
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
      judul: 'Pemrograman Web dengan Laravel 10',
      penerbit: 'Informatika Bandung',
      peminjam: 'Budi Santoso (202609002)',
      tgl_pinjam: '2026-11-02',
      jatuh_tempo_lama: '2026-11-09',
      jatuh_tempo_baru: new Date(Date.now() + durasiHari * 86400000).toISOString().split('T')[0],
      status: 'Sedang Dipinjam',
    });
  };

  const handleProsesPerpanjangan = () => {
    if (!scannedItem) return;

    const newRecord = {
      no: history.length + 1,
      barcode: scannedItem.barcode,
      judul: scannedItem.judul,
      peminjam: scannedItem.peminjam,
      tgl_lama: scannedItem.jatuh_tempo_lama,
      tgl_baru: scannedItem.jatuh_tempo_baru,
      durasi: `${durasiHari} Hari`,
    };

    setHistory([newRecord, ...history]);

    // Save to perpanjangan localStorage
    try {
      const raw = window.localStorage.getItem('inlislite.sirkulasi.perpanjangan');
      const list = raw ? JSON.parse(raw) : [];
      const rec = {
        id: Date.now(),
        no_barcode: scannedItem.barcode,
        judul_penerbit: scannedItem.judul,
        tgl_perpanjang: new Date().toISOString().split('T')[0],
        tgl_pinjam_tempo: `${scannedItem.tgl_pinjam} s/d ${scannedItem.jatuh_tempo_baru}`,
        status: 'Diperpanjang',
        lokasi: 'Perpustakaan Utama - Rak 05',
        updated_date: new Date().toISOString().split('T')[0],
      };
      window.localStorage.setItem('inlislite.sirkulasi.perpanjangan', JSON.stringify([rec, ...list]));
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
            <i className="fa-solid fa-rotate-right"></i>
          </span>
          <div>
            <h1 className="berita-topbar-title">Entri Perpanjangan</h1>
            <p className="berita-topbar-sub">Sirkulasi Layanan Perpanjangan Koleksi</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}>
            <i className="fa-solid fa-house" aria-hidden="true"></i> Beranda
          </a>
          <span aria-hidden="true">/</span>
          <span>Sirkulasi</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Entri Perpanjangan</span>
        </nav>
      </div>

      <div className="bo-panel-body p-0">
        {successAlert && (
          <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-3" role="alert">
            <i className="fa-solid fa-circle-check fs-5"></i>
            <div>
              <strong>Perpanjangan Berhasil!</strong> Buku telah diperpanjang sesuai dengan durasi pilihan.
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
                <i className="fa-solid fa-rotate-right text-primary"></i> Scan Barcode Buku untuk Perpanjangan
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
                  Posisikan scanner pada barcode buku atau ketik manual nomor barcode.
                </p>

                <form onSubmit={handleCekBuku} className="mb-3">
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-white" style={{ color: '#2563EB' }}>
                      <i className="fa-solid fa-barcode"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan No. Barcode Buku (contoh: BC-202600101)"
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                      autoFocus
                    />
                  </div>

                  {/* Durasi Perpanjangan Selection Cards */}
                  <div className="mb-3 text-start">
                    <label className="form-label small fw-bold text-muted">Pilih Durasi Perpanjangan:</label>
                    <div className="row g-2 text-center">
                      {[7].map((days) => (
                        <div key={days} className="col-12">
                          <button
                            type="button"
                            className={`btn w-100 py-2 small fw-bold ${
                              durasiHari === days
                                ? 'btn-primary shadow-sm'
                                : 'btn-outline-secondary'
                            }`}
                            onClick={() => setDurasiHari(days)}
                          >
                            {days} Hari
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-outline-primary fw-semibold w-100 d-inline-flex align-items-center justify-content-center gap-2 py-2"
                    >
                      <i className="fa-solid fa-search"></i> Cek Buku
                    </button>
                    {scannedItem && (
                      <button
                        type="button"
                        className="btn btn-success fw-semibold w-100 d-inline-flex align-items-center justify-content-center gap-2 py-2"
                        onClick={handleProsesPerpanjangan}
                      >
                        <i className="fa-solid fa-rotate-right"></i> Perpanjang Buku
                      </button>
                    )}
                  </div>
                </form>

                {/* Detail Buku Hasil Cek */}
                {scannedItem && (
                  <div className="text-start p-3 bg-light rounded border small">
                    <div className="fw-bold text-primary mb-1">{scannedItem.judul}</div>
                    <div className="text-muted">Peminjam: <strong className="text-dark">{scannedItem.peminjam}</strong></div>
                    <div className="text-muted">Jatuh Tempo Lama: <span className="badge bg-secondary">{scannedItem.jatuh_tempo_lama}</span></div>
                    <div className="text-muted mt-1">
                      Jatuh Tempo Baru: <span className="badge bg-success font-monospace">+{durasiHari} Hari ({scannedItem.jatuh_tempo_baru})</span>
                    </div>
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
                  <i className="fa-solid fa-clock-rotate-left text-success me-2"></i> 5 Perpanjangan Terakhir
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
                <table className="table table-bordered align-middle mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th className="text-center" style={{ width: 44 }}>No.</th>
                      <th style={{ width: 140 }}>No. Barcode</th>
                      <th>Judul</th>
                      <th style={{ width: 130 }}>Peminjam</th>
                      <th style={{ width: 120 }}>Tgl. Baru</th>
                      <th style={{ width: 100 }} className="text-center">Durasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 5).map((h, i) => (
                      <tr key={i}>
                        <td className="text-center fw-semibold">{i + 1}</td>
                        <td>
                          <span className="badge bg-light text-primary border font-monospace">
                            {h.barcode}
                          </span>
                        </td>
                        <td>
                          <div className="fw-bold text-dark">{h.judul}</div>
                        </td>
                        <td className="small text-muted">{h.peminjam}</td>
                        <td className="small">{h.tgl_baru}</td>
                        <td className="text-center">
                          <span className="badge bg-success-subtle text-success border">
                            {h.durasi}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {history.slice(0, 5).length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center text-muted py-4">
                          Tidak ada data riwayat
                        </td>
                      </tr>
                    )}
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
