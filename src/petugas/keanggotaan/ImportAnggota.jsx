import React, { useRef, useState } from 'react';
import { Topbar } from './store.jsx';

export default function ImportAnggota() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const inputRef = useRef(null);

  const onFile = (e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setStatus(''); } };

  const submit = (e) => {
    e.preventDefault();
    if (!file) { setStatus('Pilih file Excel terlebih dahulu.'); return; }
    if (!/\.(xls|xlsx)$/i.test(file.name)) { setStatus('Format file harus .xls atau .xlsx.'); return; }
    if (file.size > 5 * 1024 * 1024) { setStatus('Ukuran file maksimal 5MB.'); return; }
    setStatus(`File "${file.name}" siap diunggah (simulasi). Integrasikan dengan API untuk memproses import.`);
  };

  return (
    <div>
      <Topbar title="Import Anggota" sub="Please complete the data in the following form" crumbs={[{ label: 'Home', icon: 'fa-solid fa-house' }, { label: 'Anggota' }, { label: 'Import Anggota', active: true }]} />
      <div className="berita-card-head">
        <h2><i className="fa-solid fa-file-import" aria-hidden="true"></i> FORM UPLOAD ANGGOTA</h2>
        <button type="button" className="btn btn-outline-secondary btn-sm fw-semibold d-inline-flex align-items-center gap-1" onClick={() => alert('Unduh template Excel anggota (simulasi).')}>
          <i className="fa-regular fa-file-excel"></i> Download Template
        </button>
      </div>
      <div className="bo-panel-body">
        <form onSubmit={submit} style={{ maxWidth: 640 }}>
          <div className="mb-3">
            <label className="form-label fw-semibold small">Pilih file Excel *</label>
            <input ref={inputRef} type="file" accept=".xls,.xlsx" className="form-control" onChange={onFile} />
            <div className="form-text">Format yang didukung: <strong>.xls / .xlsx</strong>, ukuran maksimal <strong>5MB</strong>. Gunakan template agar kolom sesuai.</div>
          </div>
          {status && <div className={`alert ${status.includes('siap') ? 'alert-success' : 'alert-warning'} py-2 small`}>{status}</div>}
          <button type="submit" className="btn btn-primary fw-semibold d-inline-flex align-items-center gap-2">
            <i className="fa-solid fa-upload"></i> Upload / Save
          </button>
        </form>
      </div>
    </div>
  );
}
