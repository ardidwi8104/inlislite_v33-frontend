import React, { useState } from 'react';

export default function EntriPeminjaman() {
  const [step, setStep] = useState(1);
  const [noAnggota, setNoAnggota] = useState('');
  const [anggotaData, setAnggotaData] = useState(null);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scannedBooks, setScannedBooks] = useState([]);
  const [durasiHari, setDurasiHari] = useState(7);
  const [successMsg, setSuccessMsg] = useState(false);

  // Validasi Anggota
  const handleValidasiAnggota = (e) => {
    e.preventDefault();
    if (!noAnggota.trim()) {
      alert('Masukkan nomor anggota terlebih dahulu.');
      return;
    }
    // Dummy check or localstorage check
    setAnggotaData({
      no_anggota: noAnggota.trim(),
      nama: 'Ahmad Fauzi Rahman',
      jenis: 'Mahasiswa / Reguler',
      status: 'Aktif',
      maks_pinjam: 3,
      pinjaman_berjalan: 0,
    });
    setStep(2);
  };

  // Scan Buku
  const handleScanBuku = (e) => {
    e.preventDefault();
    if (!barcodeInput.trim()) {
      alert('Masukkan atau scan nomor barcode buku.');
      return;
    }

    const newBook = {
      id: Date.now(),
      barcode: barcodeInput.trim().toUpperCase(),
      judul: 'Laskar Pelangi',
      pengarang: 'Andrea Hirata',
      penerbit: 'Bentang Pustaka',
      no_panggil: '823 DAN l',
      lokasi: 'Perpustakaan Utama - Rak 08',
      tgl_pinjam: new Date().toISOString().split('T')[0],
      jatuh_tempo: new Date(Date.now() + durasiHari * 86400000).toISOString().split('T')[0],
    };

    setScannedBooks((prev) => [newBook, ...prev]);
    setBarcodeInput('');
  };

  const handleRemoveBook = (id) => {
    setScannedBooks((prev) => prev.filter((b) => b.id !== id));
  };

  // Konfirmasi Final
  const handleKonfirmasiPinjam = () => {
    if (scannedBooks.length === 0) {
      alert('Minimal 1 buku harus di-scan sebelum konfirmasi.');
      return;
    }

    // Save to localstorage for sirkulasi peminjaman
    try {
      const raw = window.localStorage.getItem('inlislite.sirkulasi.peminjaman');
      const list = raw ? JSON.parse(raw) : [];
      const records = scannedBooks.map((b) => ({
        id: b.id,
        no_barcode: b.barcode,
        judul_penerbit: `${b.judul} / ${b.pengarang} (${b.penerbit})`,
        tgl_pinjam_tempo: `${b.tgl_pinjam} s/d ${b.jatuh_tempo}`,
        tgl_kembali: '-',
        hari_terlambat: '0 Hari',
        lokasi: b.lokasi,
        no_anggota: anggotaData.no_anggota,
        nama_peminjam: anggotaData.nama,
        updated_date: new Date().toISOString().split('T')[0],
      }));
      window.localStorage.setItem('inlislite.sirkulasi.peminjaman', JSON.stringify([...records, ...list]));
    } catch (e) {}

    setSuccessMsg(true);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setNoAnggota('');
    setAnggotaData(null);
    setBarcodeInput('');
    setScannedBooks([]);
    setSuccessMsg(false);
  };

  return (
    <>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true">
            <i className="fa-solid fa-file-signature"></i>
          </span>
          <div>
            <h1 className="berita-topbar-title">Entri Peminjaman</h1>
            <p className="berita-topbar-sub">Sirkulasi Layanan Peminjaman Koleksi</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}>
            <i className="fa-solid fa-house" aria-hidden="true"></i> Beranda
          </a>
          <span aria-hidden="true">/</span>
          <span>Sirkulasi</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Entri Peminjaman</span>
        </nav>
      </div>

      <div className="bo-panel-body p-0">
        {/* Wizard Step Indicator */}
        <div className="card border shadow-sm mb-3">
          <div className="card-body py-2 px-3">
            <div className="row text-center g-2">
              <div className="col-4">
                <div
                  className={`p-2 rounded d-flex align-items-center justify-content-center gap-2 ${
                    step >= 1 ? 'bg-primary text-white fw-bold' : 'bg-light text-muted'
                  }`}
                  style={{ fontSize: '0.85rem' }}
                >
                  <i className="fa-solid fa-id-card"></i> 1. Anggota
                </div>
              </div>
              <div className="col-4">
                <div
                  className={`p-2 rounded d-flex align-items-center justify-content-center gap-2 ${
                    step >= 2 ? 'bg-primary text-white fw-bold' : 'bg-light text-muted'
                  }`}
                  style={{ fontSize: '0.85rem' }}
                >
                  <i className="fa-solid fa-barcode"></i> 2. Scan Buku
                </div>
              </div>
              <div className="col-4">
                <div
                  className={`p-2 rounded d-flex align-items-center justify-content-center gap-2 ${
                    step >= 3 ? 'bg-primary text-white fw-bold' : 'bg-light text-muted'
                  }`}
                  style={{ fontSize: '0.85rem' }}
                >
                  <i className="fa-solid fa-circle-check"></i> 3. Konfirmasi
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Input & Validasi Anggota */}
        {step === 1 && (
          <div className="card border shadow-sm mb-3">
            <div className="card-body p-4 text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{ width: '64px', height: '64px', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '1.75rem' }}
              >
                <i className="fa-solid fa-id-card"></i>
              </div>
              <h5 className="fw-bold mb-1" style={{ color: '#1E293B' }}>
                Masukkan Nomor Anggota
              </h5>
              <p className="text-muted small mb-3">
                Ketikkan No. Anggota atau scan barcode pada Kartu Tanda Anggota perpustakaan.
              </p>

              <form onSubmit={handleValidasiAnggota} style={{ maxWidth: '480px', margin: '0 auto' }}>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white" style={{ color: '#2563EB' }}>
                    <i className="fa-solid fa-id-card"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contoh: 64.09.26.00001 / Nomor KTP"
                    value={noAnggota}
                    onChange={(e) => setNoAnggota(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="btn btn-primary fw-semibold d-inline-flex align-items-center gap-2"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i> Validasi Anggota
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Scan Buku */}
        {step === 2 && anggotaData && (
          <>
            <div className="card border shadow-sm mb-3">
              <div className="card-header bg-light py-2 d-flex align-items-center justify-content-between">
                <span className="fw-bold small text-dark">
                  <i className="fa-solid fa-user-check text-success me-2"></i> Data Anggota Peminjam
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary py-0 px-2"
                  onClick={() => setStep(1)}
                >
                  <i className="fa-solid fa-pen-to-square me-1"></i> Ganti Anggota
                </button>
              </div>
              <div className="card-body py-2 px-3 small">
                <div className="row g-2">
                  <div className="col-md-3"><strong>No. Anggota:</strong> {anggotaData.no_anggota}</div>
                  <div className="col-md-3"><strong>Nama:</strong> {anggotaData.nama}</div>
                  <div className="col-md-3"><strong>Status:</strong> <span className="badge bg-success">{anggotaData.status}</span></div>
                  <div className="col-md-3"><strong>Maks. Pinjam:</strong> {anggotaData.maks_pinjam} Buku</div>
                </div>
              </div>
            </div>

            <div className="card border shadow-sm mb-3">
              <div className="card-header bg-dark text-white py-2 d-flex align-items-center justify-content-between">
                <span className="fw-bold">
                  <i className="fa-solid fa-barcode me-2"></i> Scan Barcode Buku Koleksi
                </span>
                <div className="d-flex align-items-center gap-2">
                  <span className="small text-white-50">Durasi:</span>
                  <select
                    className="form-select form-select-sm py-0 bg-secondary text-white border-0"
                    style={{ width: '110px' }}
                    value={durasiHari}
                    onChange={(e) => setDurasiHari(Number(e.target.value))}
                  >
                    <option value={7}>7 Hari</option>
                    <option value={14}>14 Hari</option>
                    <option value={21}>21 Hari</option>
                    <option value={30}>30 Hari</option>
                  </select>
                </div>
              </div>
              <div className="card-body p-3">
                <form onSubmit={handleScanBuku} className="row g-2 align-items-center mb-3">
                  <div className="col-md-8">
                    <div className="input-group">
                      <span className="input-group-text bg-white" style={{ color: '#2563EB' }}>
                        <i className="fa-solid fa-barcode"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Scan atau ketik No. Barcode Buku (contoh: PPU-2026-00101)"
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <button
                      type="submit"
                      className="btn btn-success fw-semibold w-100 d-inline-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="fa-solid fa-plus"></i> Tambah ke Keranjang Pinjam
                    </button>
                  </div>
                </form>

                {/* Scanned Books Table */}
                <div className="table-responsive">
                  <table className="table table-bordered table-sm align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: 40 }} className="text-center">No</th>
                        <th style={{ width: 140 }}>No. Barcode</th>
                        <th>Judul Buku</th>
                        <th style={{ width: 130 }}>Tgl. Pinjam</th>
                        <th style={{ width: 130 }}>Jatuh Tempo</th>
                        <th style={{ width: 70 }} className="text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scannedBooks.map((b, idx) => (
                        <tr key={b.id}>
                          <td className="text-center">{idx + 1}</td>
                          <td><span className="badge bg-light text-primary border font-monospace">{b.barcode}</span></td>
                          <td className="fw-semibold text-dark">{b.judul} <span className="small text-muted">/ {b.pengarang}</span></td>
                          <td className="small">{b.tgl_pinjam}</td>
                          <td className="small text-danger fw-bold">{b.jatuh_tempo}</td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger py-0 px-2"
                              onClick={() => handleRemoveBook(b.id)}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {scannedBooks.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center text-muted py-3 small">
                            Belum ada buku yang di-scan. Silakan scan barcode buku di atas.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {scannedBooks.length > 0 && (
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="button"
                      className="btn btn-primary fw-bold px-4 d-inline-flex align-items-center gap-2 shadow-sm"
                      onClick={handleKonfirmasiPinjam}
                    >
                      <i className="fa-solid fa-circle-check"></i> Selesaikan & Konfirmasi Peminjaman
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="card border shadow-sm mb-3 text-center p-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2 mx-auto"
              style={{ width: '64px', height: '64px', backgroundColor: '#ECFDF5', color: '#10B981', fontSize: '2rem' }}
            >
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h5 className="fw-bold text-dark mb-1">Transaksi Peminjaman Berhasil!</h5>
            <p className="text-muted small mb-3">
              Koleksi buku telah berhasil dipinjamkan ke <strong>{anggotaData?.nama}</strong> ({anggotaData?.no_anggota}).
            </p>
            <div className="d-flex justify-content-center gap-2">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm fw-semibold"
                onClick={() => window.print()}
              >
                <i className="fa-solid fa-print me-1"></i> Cetak Struk Bukti Pinjam
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm fw-semibold"
                onClick={handleReset}
              >
                <i className="fa-solid fa-plus me-1"></i> Transaksi Baru
              </button>
            </div>
          </div>
        )}

        {/* Bottom Info Grid (3 Columns) */}
        <div className="row g-3">
          <div className="col-md-4">
            <div className="p-3 bg-white rounded border shadow-sm h-100">
              <h6 className="fw-bold small text-primary mb-2">
                <i className="fa-solid fa-list-check me-2"></i> Langkah-langkah Penggunaan
              </h6>
              <ul className="small text-muted mb-0 ps-3">
                <li>Masukkan nomor anggota atau scan kartu perpustakaan.</li>
                <li>Pilih durasi masa pinjam buku yang diizinkan.</li>
                <li>Scan satu per satu barcode buku fisik yang dipinjam.</li>
                <li>Klik tombol konfirmasi untuk menyelesaikan transaksi.</li>
              </ul>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-white rounded border shadow-sm h-100">
              <h6 className="fw-bold small text-success mb-2">
                <i className="fa-solid fa-lightbulb me-2"></i> Tips Penggunaan
              </h6>
              <ul className="small text-muted mb-0 ps-3">
                <li>Gunakan barcode scanner USB untuk mempercepat input.</li>
                <li>Pastikan kondisi fisik buku layak sebelum diserahkan.</li>
                <li>Periksa tanggal jatuh tempo agar terhindar dari denda.</li>
              </ul>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-white rounded border shadow-sm h-100">
              <h6 className="fw-bold small text-warning mb-2">
                <i className="fa-solid fa-triangle-exclamation me-2"></i> Perhatian
              </h6>
              <ul className="small text-muted mb-0 ps-3">
                <li>Anggota dengan status dibekukan tidak dapat meminjam.</li>
                <li>Koleksi bertanda "Referensi/Tandon" tidak boleh dipinjam keluar.</li>
                <li>Maksimal pinjaman sesuai kebijakan hak akses anggota.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
