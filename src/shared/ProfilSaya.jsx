import React, { useState } from 'react';
import Modal from '../components/Modal';
import { SuccessModal } from '../petugas/koleksi/helpers';
import { useBackofficeAvatar } from '../backoffice/useBackofficeAvatar';

export default function ProfilSaya({ role = 'admin' }) {
  const isAdmin = role === 'admin';
  const initial = {
    name: isAdmin ? 'Admin Pusat' : 'Petugas Layanan',
    username: isAdmin ? 'admin' : 'petugas',
    email: isAdmin ? 'admin@admin.com' : 'petugas@perpus.id',
    phone: isAdmin ? '08118055666' : '081234567890',
    provinsi: 'DKI Jakarta',
    kota: 'Kota Jakarta Selatan',
  };
  const [profile, setProfile] = useState(initial);
  const [profileOpen, setProfileOpen] = useState(false);
  const [form, setForm] = useState(initial);
  const [avatar, setAvatar] = useBackofficeAvatar(role);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [success, setSuccess] = useState('');

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const saveProfile = (e) => {
    e.preventDefault();
    setProfile(form);
    setProfileOpen(false);
    setSuccess('Profil berhasil diperbarui');
  };

  const handleAvatar = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setTempAvatar(event.target.result);
    };
    reader.readAsDataURL(f);
  };

  const saveAvatar = () => {
    if (tempAvatar) {
      setAvatar(tempAvatar);
    }
    setAvatarOpen(false);
    setSuccess('Avatar berhasil diperbarui');
  };

  const status = 'ACTIVE';
  const group = isAdmin ? 'ADMIN' : 'PETUGAS';

  return (
    <>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-user"></i></span>
          <div>
            <h1 className="berita-topbar-title">Profil Saya</h1>
            <p className="berita-topbar-sub">Home / Profil Saya</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-house" aria-hidden="true"></i> Beranda</a>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">Profil Saya</span>
        </nav>
      </div>

      {/* Hero profile card */}
      <div className="card border-0 shadow-sm mb-3 overflow-hidden">
        <div className="p-4" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' }}>
          <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle bg-white d-flex align-items-center justify-content-center overflow-hidden" style={{ width: 72, height: 72, border: '3px solid #fff' }}>
                {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fa-solid fa-user fa-2x text-primary"></i>}
              </div>
              <div>
                <h4 className="fw-bold text-white mb-0">{profile.name}</h4>
                <span className="badge bg-light text-dark">{profile.username}</span>
              </div>
            </div>
            <div className="ms-md-auto d-flex gap-2">
              <button type="button" className="btn btn-sm text-white" style={{ backgroundColor: '#2563EB' }} onClick={() => { setTempAvatar(avatar); setAvatarOpen(true); }}>
                <i className="fa-solid fa-camera me-1"></i> Update Avatar
              </button>
                <button type="button" className="btn btn-sm" style={{ backgroundColor: '#F59E0B', color: '#0F172A', fontWeight: 600 }} onClick={() => { setForm(profile); setProfileOpen(true); }}>
                  <i className="fa-solid fa-pen-to-square me-1"></i> Update Profil
                </button>
            </div>
          </div>
        </div>
        {/* Info list */}
        <div className="p-3 p-md-4">
          <div className="list-group list-group-flush">
            {[
              { icon: 'fa-user', label: 'Username', value: profile.username },
              { icon: 'fa-envelope', label: 'Email', value: profile.email },
              { icon: 'fa-phone', label: 'No. Telepon', value: profile.phone },
              { icon: 'fa-circle-check', label: 'Status', value: <span className="badge" style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}>{status}</span> },
              { icon: 'fa-users', label: 'Group', value: <span className="badge bg-secondary">{group}</span> },
              { icon: 'fa-map-pin', label: 'Provinsi', value: profile.provinsi },
              { icon: 'fa-map-pin', label: 'Kabupaten / Kota', value: profile.kota },
            ].map((row) => (
              <div key={row.label} className="list-group-item d-flex align-items-center gap-3 px-0 py-2 border-bottom">
                <i className={`fa-solid ${row.icon} text-secondary`} style={{ width: 20 }}></i>
                <span className="fw-semibold" style={{ minWidth: 140, color: '#1F2937' }}>{row.label}</span>
                <span className="ms-auto text-end" style={{ color: '#0F172A' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        show={profileOpen}
        onClose={() => setProfileOpen(false)}
        title="Update Profil"
        icon="fa-solid fa-user-pen"
        accent="#1b3878"
        size="md"
        footer={
          <>
            <button type="button" className="btn btn-light border fw-semibold" onClick={() => setProfileOpen(false)}>Batal</button>
            <button type="submit" form="profil-page-form" className="btn text-white fw-semibold" style={{ backgroundColor: '#1b3878' }}>
              <i className="fa-solid fa-floppy-disk me-1" aria-hidden="true"></i> Simpan
            </button>
          </>
        }
      >
        <form id="profil-page-form" onSubmit={saveProfile} className="row g-2">
          <div className="col-12">
            <label className="form-label small fw-semibold">Nama Lengkap</label>
            <input type="text" className="form-control form-control-sm" value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </div>
          <div className="col-sm-6">
            <label className="form-label small fw-semibold">Email</label>
            <input type="email" className="form-control form-control-sm" value={form.email} onChange={(e) => set('email', e.target.value)} />
          </div>
          <div className="col-sm-6">
            <label className="form-label small fw-semibold">No. Telepon</label>
            <input type="text" className="form-control form-control-sm" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>
          <div className="col-sm-6">
            <label className="form-label small fw-semibold">Provinsi</label>
            <input type="text" className="form-control form-control-sm" value={form.provinsi} onChange={(e) => set('provinsi', e.target.value)} />
          </div>
          <div className="col-sm-6">
            <label className="form-label small fw-semibold">Kabupaten / Kota</label>
            <input type="text" className="form-control form-control-sm" value={form.kota} onChange={(e) => set('kota', e.target.value)} />
          </div>
        </form>
      </Modal>

      <Modal
        show={avatarOpen}
        onClose={() => setAvatarOpen(false)}
        title="Update Avatar"
        icon="fa-solid fa-camera"
        accent="#2563EB"
        size="sm"
        footer={
          <>
            <button type="button" className="btn btn-light border fw-semibold" onClick={() => setAvatarOpen(false)}>Batal</button>
            <button type="button" className="btn text-white fw-semibold" style={{ backgroundColor: '#2563EB' }} onClick={saveAvatar}>Simpan</button>
          </>
        }
      >
        <input type="file" accept="image/*" className="form-control mb-3" onChange={handleAvatar} />
        {(tempAvatar || avatar) && <img src={tempAvatar || avatar} alt="Preview avatar" className="w-100 rounded-3" style={{ maxHeight: 180, objectFit: 'cover' }} />}
      </Modal>
      {success && <SuccessModal message={success} onClose={() => setSuccess('')} />}
    </>
  );
}
