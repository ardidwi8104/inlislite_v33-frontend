import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';

const EMPTY = {
  username: '',
  namaDepan: '',
  namaBelakang: '',
  email: '',
  telepon: '',
  password: '',
  konfirmasiPassword: '',
  aksesLokasi: [],
};

const LOKASI_OPTIONS = [
  'Perpustakaan Pusat',
  'Perpustakaan Cabang A',
  'Perpustakaan Cabang B',
  'Ruang Baca Anak',
];

export default function TambahPetugasModal({ show, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      setForm(EMPTY);
      setErrors({});
    }
  }, [show]);

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const toggleLokasi = (lokasi) => {
    setForm((p) => ({
      ...p,
      aksesLokasi: p.aksesLokasi.includes(lokasi)
        ? p.aksesLokasi.filter((x) => x !== lokasi)
        : [...p.aksesLokasi, lokasi],
    }));
  };

  const validate = () => {
    const next = {};
    if (!form.username.trim()) next.username = 'Username wajib diisi.';
    if (!form.email.trim()) next.email = 'Email wajib diisi.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Format email tidak valid.';
    if (form.password && form.password.length < 8) next.password = 'Password minimal 8 karakter.';
    if (form.password !== form.konfirmasiPassword) next.konfirmasiPassword = 'Konfirmasi password tidak cocok.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const ok = onSave ? onSave(form) : true;
    if (ok) onClose && onClose();
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Tambah Petugas"
      icon="fa-user-plus"
      accent="#1b3878"
      size="modal-lg"
      footer={
        <>
          <button type="button" className="btn btn-light border fw-semibold px-4" onClick={onClose}>Tutup</button>
          <button type="submit" form="tambah-petugas-form" className="btn text-white fw-semibold px-4" style={{ backgroundColor: '#2563eb' }}>
            <i className="fa-solid fa-floppy-disk me-1" aria-hidden="true"></i> Simpan
          </button>
        </>
      }
    >
      <form id="tambah-petugas-form" onSubmit={submit} noValidate>
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="tp-username" className="form-label small fw-semibold">Username<span className="text-danger">*</span></label>
            <input
              id="tp-username"
              type="text"
              className={`form-control${errors.username ? ' is-invalid' : ''}`}
              placeholder="Masukkan username"
              value={form.username}
              onChange={(e) => set('username', e.target.value)}
              autoComplete="off"
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="tp-nama-depan" className="form-label small fw-semibold">Nama Depan</label>
            <input id="tp-nama-depan" type="text" className="form-control" placeholder="Nama Depan" value={form.namaDepan} onChange={(e) => set('namaDepan', e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="tp-nama-belakang" className="form-label small fw-semibold">Nama Belakang</label>
            <input id="tp-nama-belakang" type="text" className="form-control" placeholder="Nama Belakang" value={form.namaBelakang} onChange={(e) => set('namaBelakang', e.target.value)} />
          </div>

          <div className="col-md-6">
            <label htmlFor="tp-email" className="form-label small fw-semibold">Email<span className="text-danger">*</span></label>
            <input
              id="tp-email"
              type="email"
              className={`form-control${errors.email ? ' is-invalid' : ''}`}
              placeholder="Email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="tp-telepon" className="form-label small fw-semibold">No. Telepon</label>
            <input id="tp-telepon" type="tel" className="form-control" placeholder="No. Telepon" value={form.telepon} onChange={(e) => set('telepon', e.target.value)} />
          </div>

          <div className="col-md-6">
            <label htmlFor="tp-password" className="form-label small fw-semibold">Password</label>
            <input
              id="tp-password"
              type="password"
              className={`form-control${errors.password ? ' is-invalid' : ''}`}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              autoComplete="new-password"
            />
            {errors.password ? (
              <div className="invalid-feedback">{errors.password}</div>
            ) : (
              <div className="form-text">Minimal 8 karakter. Biarkan kosong jika tidak ada perubahan.</div>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="tp-konfirmasi" className="form-label small fw-semibold">Konfirmasi Password</label>
            <input
              id="tp-konfirmasi"
              type="password"
              className={`form-control${errors.konfirmasiPassword ? ' is-invalid' : ''}`}
              placeholder="Konfirmasi Password"
              value={form.konfirmasiPassword}
              onChange={(e) => set('konfirmasiPassword', e.target.value)}
              autoComplete="new-password"
            />
            {errors.konfirmasiPassword && <div className="invalid-feedback">{errors.konfirmasiPassword}</div>}
          </div>

          <div className="col-12">
            <label htmlFor="tp-lokasi" className="form-label small fw-semibold">Akses Lokasi Perpustakaan</label>
            <select
              id="tp-lokasi"
              className="form-select"
              value=""
              onChange={(e) => { if (e.target.value) toggleLokasi(e.target.value); }}
            >
              <option value="">Pilih Akses Lokasi</option>
              {LOKASI_OPTIONS.map((opt) => (
                <option key={opt} value={opt} disabled={form.aksesLokasi.includes(opt)}>{opt}</option>
              ))}
            </select>
            {form.aksesLokasi.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-2">
                {form.aksesLokasi.map((lok) => (
                  <span key={lok} className="badge rounded-pill text-bg-light border d-inline-flex align-items-center gap-1 px-2 py-1">
                    {lok}
                    <button type="button" className="btn-close btn-close-sm" aria-label={`Hapus ${lok}`} style={{ fontSize: '0.55rem' }} onClick={() => toggleLokasi(lok)}></button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
