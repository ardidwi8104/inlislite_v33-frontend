import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';

export default function TambahEditBanner({ show, editing, onClose, onSave }) {
  const [form, setForm] = useState({ file: '', text: '', width: 0, height: 0 });

  useEffect(() => {
    if (show) {
      if (editing) {
        setForm({ file: editing.file, text: editing.text || '', width: editing.width, height: editing.height });
      } else {
        setForm({ file: '', text: '', width: 0, height: 0 });
      }
    }
  }, [show, editing]);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => setForm((prev) => ({ ...prev, file: url, width: img.naturalWidth, height: img.naturalHeight }));
    img.src = url;
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={editing ? 'Edit Banner' : 'Tambahkan Banner'}
      icon={editing ? 'fa-pen-to-square' : 'fa-plus'}
      accent="#1b3878"
      size="md"
      footer={
        <>
          <button type="button" className="btn btn-light border fw-semibold" onClick={onClose}>Batal</button>
          <button type="button" className="btn text-white fw-semibold" style={{ backgroundColor: '#1b3878' }} onClick={() => onSave(form, editing)}>Simpan</button>
        </>
      }
    >
      <div className="mb-3">
        <label className="form-label">Upload Banner</label>
        <input type="file" accept="image/*" className="form-control" onChange={handleFile} />
      </div>
      {form.file && (
        <div className="mb-3">
          <img src={form.file} alt="preview" className="w-100 rounded-3" style={{ maxHeight: 160, objectFit: 'cover' }} />
          <div className="text-muted small mt-1">Ukuran terdeteksi: {form.width} × {form.height} px</div>
        </div>
      )}
      <div className="mb-0">
        <label className="form-label">Teks yang ditampilkan di banner (opsional)</label>
        <input type="text" className="form-control" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Selamat datang..." />
      </div>
    </Modal>
  );
}
