import React, { useState } from 'react';

export default function ImportExcel() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [previewRows, setPreviewRows] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Pilih file Excel (.xlsx / .xls) terlebih dahulu.');
      return;
    }
    // Simulate read excel data
    setPreviewRows([
      {
        barcode: 'PPU-2026-00001',
        no_induk: 'IND-2026-901',
        judul: 'Algoritma dan Pemrograman Modern',
        pengarang: 'Rinaldi Munir',
        penerbit: 'Informatika Bandung',
        tahun: '2024',
        lokasi: 'Rak 02',
      },
      {
        barcode: 'PPU-2026-00002',
        no_induk: 'IND-2026-902',
        judul: 'Basis Data Terdistribusi',
        pengarang: 'Fathansyah',
        penerbit: 'Informatika Bandung',
        tahun: '2023',
        lokasi: 'Rak 02',
      },
      {
        barcode: 'PPU-2026-00003',
        no_induk: 'IND-2026-903',
        judul: 'Kecerdasan Buatan dan Implementasinya',
        pengarang: 'Suyanto',
        penerbit: 'Andi Offset',
        tahun: '2025',
        lokasi: 'Rak 04',
      },
    ]);
  };

  const handleFinalImport = () => {
    setSuccessMsg(true);
    setFile(null);
    setPreviewRows([]);
  };

  return (
    <>
      <div className="berita-card-head">
        <h2 id="import-excel-title">
          <i className="fa-solid fa-file-excel" aria-hidden="true"></i> FORM IMPORT DATA EKSEMPLAR EXCEL
        </h2>
        <a
          href="#download-template"
          onClick={(e) => {
            e.preventDefault();
            alert('File template template_eksemplar_inlislite.xlsx sedang diunduh.');
          }}
          className="btn btn-info btn-sm text-white fw-bold d-inline-flex align-items-center gap-1 shadow-sm"
          style={{ backgroundColor: '#0ea5e9', border: '0', borderRadius: '8px', padding: '0.45rem 0.95rem' }}
        >
          <i className="fa-solid fa-download"></i> Unduh Format Excel
        </a>
      </div>

      <div className="bo-panel-body">
        {successMsg && (
          <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-4" role="alert">
            <i className="fa-solid fa-circle-check fs-5"></i>
            <div>
              <strong>Import Berhasil!</strong> Seluruh record eksemplar dari file Excel telah berhasil diproses ke dalam koleksi.
            </div>
            <button
              type="button"
              className="btn-close ms-auto"
              onClick={() => setSuccessMsg(false)}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Drag & Drop Card */}
        <div className="card border shadow-sm mb-4">
          <div className="card-header bg-light py-2 fw-bold text-dark">
            <i className="fa-solid fa-upload me-2 text-primary"></i> Upload Berkas Spreadsheet
          </div>
          <div className="card-body p-4">
            <div
              className={`p-5 text-center border-2 border-dashed rounded-3 transition-all ${
                isDragging ? 'border-primary bg-primary-subtle' : 'border-secondary-subtle bg-light'
              }`}
              style={{ borderStyle: 'dashed' }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <i className="fa-solid fa-cloud-arrow-up fa-3x text-primary mb-3"></i>
              <h5 className="fw-bold mb-1">Tarik & Letakkan Berkas Excel ke Sini</h5>
              <p className="text-muted small mb-3">
                Mendukung format <strong>.xlsx</strong> atau <strong>.xls</strong> (Maksimal 10 MB)
              </p>

              <label className="btn btn-primary fw-semibold px-4 cursor-pointer shadow-sm">
                <i className="fa-solid fa-folder-open me-2"></i> Pilih Dari Komputer
                <input
                  type="file"
                  className="d-none"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                />
              </label>

              {file && (
                <div className="mt-3 p-2 bg-white rounded border d-inline-flex align-items-center gap-2">
                  <i className="fa-solid fa-file-excel text-success fs-5"></i>
                  <span className="fw-semibold text-dark">{file.name}</span>
                  <span className="text-muted small">({(file.size / 1024).toFixed(1)} KB)</span>
                  <button
                    type="button"
                    className="btn btn-sm text-danger"
                    onClick={() => setFile(null)}
                    title="Hapus file"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              )}
            </div>

            {file && previewRows.length === 0 && (
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-success fw-bold px-4"
                  onClick={handleUpload}
                >
                  <i className="fa-solid fa-magnifying-glass me-1"></i> Baca & Preview Data
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        {previewRows.length > 0 && (
          <div className="card border shadow-sm mb-4">
            <div className="card-header bg-success text-white d-flex align-items-center justify-content-between py-2">
              <span className="fw-bold">
                <i className="fa-solid fa-table me-2"></i> Preview Data Excel ({previewRows.length} Eksemplar Ditemukan)
              </span>
              <button
                type="button"
                className="btn btn-light btn-sm fw-bold px-3 text-success shadow-sm"
                onClick={handleFinalImport}
              >
                <i className="fa-solid fa-cloud-arrow-down me-1"></i> Konfirmasi & Masukkan ke Eksemplar
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th style={{ width: '40px' }} className="text-center">No</th>
                      <th style={{ width: '130px' }}>No. Barcode</th>
                      <th style={{ width: '120px' }}>No. Induk</th>
                      <th>Judul Utama</th>
                      <th style={{ width: '160px' }}>Pengarang</th>
                      <th style={{ width: '160px' }}>Penerbit</th>
                      <th style={{ width: '80px' }} className="text-center">Tahun</th>
                      <th style={{ width: '110px' }}>Lokasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((r, i) => (
                      <tr key={i}>
                        <td className="text-center fw-bold">{i + 1}</td>
                        <td><span className="badge bg-light text-primary border font-monospace">{r.barcode}</span></td>
                        <td><span className="badge bg-light text-dark border font-monospace">{r.no_induk}</span></td>
                        <td className="fw-bold text-dark">{r.judul}</td>
                        <td>{r.pengarang}</td>
                        <td className="small text-muted">{r.penerbit}</td>
                        <td className="text-center">{r.tahun}</td>
                        <td className="small">{r.lokasi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Petunjuk Format & Kolom Data */}
        <div className="card border shadow-sm">
          <div className="card-header bg-light py-2 fw-bold text-dark">
            <i className="fa-solid fa-circle-question me-2 text-info"></i> Petunjuk & Aturan Struktur Kolom
          </div>
          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded border h-100">
                  <h6 className="fw-bold text-primary mb-2">
                    <i className="fa-solid fa-book-bookmark me-2"></i> 1. Kolom Data Katalog (Bibliografis)
                  </h6>
                  <ul className="small text-muted mb-0 ps-3">
                    <li><strong>Judul Utama</strong> (Wajib): Judul lengkap monograf/buku.</li>
                    <li><strong>Pengarang / Penulis</strong>: Nama pengarang (Nama belakang, nama depan).</li>
                    <li><strong>Penerbit</strong>: Nama instansi atau badan penerbit.</li>
                    <li><strong>Tempat Terbit</strong>: Kota publikasi (contoh: Jakarta, Bandung).</li>
                    <li><strong>Tahun Terbit</strong>: 4 digit tahun (contoh: 2024).</li>
                    <li><strong>ISBN</strong>: Nomor standar internasional tanpa tanda pisah.</li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 bg-light rounded border h-100">
                  <h6 className="fw-bold text-success mb-2">
                    <i className="fa-solid fa-barcode me-2"></i> 2. Kolom Data Fisik Eksemplar
                  </h6>
                  <ul className="small text-muted mb-0 ps-3">
                    <li><strong>No. Barcode</strong> (Wajib & Unik): Label kode batang fisik buku.</li>
                    <li><strong>No. Induk</strong> (Wajib & Unik): Nomor registrasi inventaris perpustakaan.</li>
                    <li><strong>Tanggal Pengadaan</strong>: Format tanggal YYYY-MM-DD.</li>
                    <li><strong>Lokasi / Ruang</strong>: Nama ruangan rak buku diletakkan.</li>
                    <li><strong>Akses OPAC</strong>: Nilai <code>Tampil</code> atau <code>Sembunyi</code>.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="alert alert-warning d-flex align-items-center gap-2 mt-3 mb-0 small">
              <i className="fa-solid fa-triangle-exclamation fs-5 text-warning"></i>
              <div>
                <strong>Catatan Penting:</strong> Baris pertama pada dokumen Excel harus berisi Nama Kolom header sesuai template. Jangan mengubah susunan urutan kolom bawaan sistem agar pembacaan otomatis tidak gagal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
