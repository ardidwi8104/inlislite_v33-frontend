import React, { useState } from 'react';
import Modal from '../../components/Modal';

export default function SalinKatalog() {
  const [format, setFormat] = useState('mrc');
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreviewData(null);
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Pilih berkas MARC terlebih dahulu.');
      return;
    }

    // Dummy preview marc items
    setPreviewData([
      {
        tag001: '0000001092',
        tag020: '978-602-291-567-8',
        tag100: 'Hirata, Andrea',
        tag245: 'Laskar Pelangi : sebuah novel / Andrea Hirata',
        tag260: 'Yogyakarta : Bentang Pustaka, 2018',
        tag300: 'xii, 529 hlm. ; 20 cm',
        tag650: 'Fiksi Indonesia',
      },
      {
        tag001: '0000001093',
        tag020: '978-979-973-120-2',
        tag100: 'Toer, Pramoedya Ananta',
        tag245: 'Bumi Manusia / Pramoedya Ananta Toer',
        tag260: 'Jakarta : Lentera Dipantara, 2020',
        tag300: 'x, 535 hlm. ; 21 cm',
        tag650: 'Sejarah -- Fiksi',
      },
    ]);
  };

  const handleProsesImport = () => {
    setImportSuccess(true);
    setPreviewData(null);
    setFile(null);
  };

  return (
    <>
      <div className="berita-card-head">
        <h2 id="salin-marc-title">
          <i className="fa-solid fa-cloud-arrow-up" aria-hidden="true"></i> FORM IMPOR KATALOG DARI FILE MARC
        </h2>
      </div>

      <div className="bo-panel-body">
        {importSuccess && (
          <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-4" role="alert">
            <i className="fa-solid fa-circle-check fs-5"></i>
            <div>
              <strong>Berhasil Diimpor!</strong> 2 record MARC telah berhasil ditambahkan ke katalog utama.
            </div>
            <button
              type="button"
              className="btn-close ms-auto"
              onClick={() => setImportSuccess(false)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="card border shadow-sm mb-4">
          <div className="card-header bg-light py-2 fw-bold text-dark">
            <i className="fa-solid fa-gear me-2 text-primary"></i> Step 1 - Pilih Sumber & Berkas MARC
          </div>
          <div className="card-body p-4">
            <form onSubmit={handlePreview}>
              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">Format Berkas MARC</label>
                <div className="d-flex align-items-center gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="formatMarc"
                      id="formatMrc"
                      value="mrc"
                      checked={format === 'mrc'}
                      onChange={() => setFormat('mrc')}
                    />
                    <label className="form-check-label" htmlFor="formatMrc">
                      <strong>MARC Binary</strong> (.mrc)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="formatMarc"
                      id="formatXml"
                      value="xml"
                      checked={format === 'xml'}
                      onChange={() => setFormat('xml')}
                    />
                    <label className="form-check-label" htmlFor="formatXml">
                      <strong>MARC XML</strong> (.xml)
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-muted" htmlFor="fileMarcInput">
                  Pilih Berkas MARC
                </label>
                <input
                  id="fileMarcInput"
                  type="file"
                  className="form-control"
                  accept={format === 'mrc' ? '.mrc' : '.xml'}
                  onChange={handleFileChange}
                />
                <div className="form-text">
                  Dukungan standar format MARC 21 Bibliographic record. Pastikan encoding UTF-8 / MARC-8.
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary d-inline-flex align-items-center gap-2 fw-semibold px-4"
                >
                  <i className="fa-solid fa-magnifying-glass"></i> Preview Data
                </button>
                {file && (
                  <button
                    type="button"
                    className="btn btn-light border fw-semibold"
                    onClick={() => {
                      setFile(null);
                      setPreviewData(null);
                    }}
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {previewData && (
          <div className="card border shadow-sm">
            <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between py-2">
              <span className="fw-bold">
                <i className="fa-solid fa-table-list me-2"></i> Hasil Preview Berkas MARC ({previewData.length} Data)
              </span>
              <button
                type="button"
                className="btn btn-success btn-sm fw-bold px-3 d-inline-flex align-items-center gap-1 shadow-sm"
                onClick={handleProsesImport}
              >
                <i className="fa-solid fa-cloud-arrow-down"></i> Proses Impor ke Katalog
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th style={{ width: '50px' }} className="text-center">No</th>
                      <th style={{ width: '130px' }}>Tag 001 (Control)</th>
                      <th style={{ width: '150px' }}>Tag 020 (ISBN)</th>
                      <th style={{ width: '180px' }}>Tag 100 (Pengarang)</th>
                      <th>Tag 245 (Judul Utama)</th>
                      <th style={{ width: '220px' }}>Tag 260 (Penerbitan)</th>
                      <th style={{ width: '150px' }}>Tag 300 (Fisik)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((item, idx) => (
                      <tr key={idx}>
                        <td className="text-center fw-bold">{idx + 1}</td>
                        <td className="font-monospace text-primary">{item.tag001}</td>
                        <td className="font-monospace">{item.tag020}</td>
                        <td className="fw-semibold">{item.tag100}</td>
                        <td className="fw-bold text-dark">{item.tag245}</td>
                        <td className="small text-muted">{item.tag260}</td>
                        <td className="small">{item.tag300}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
