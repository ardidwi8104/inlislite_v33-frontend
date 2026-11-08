import React, { useEffect, useRef, useState } from 'react';
import { loadAnggota, saveAnggota, nextNoAnggota, Topbar } from './store.jsx';

const today = () => new Date().toISOString().slice(0, 10);
const plusYear = (d) => { const x = new Date(d || today()); x.setFullYear(x.getFullYear() + 1); return x.toISOString().slice(0, 10); };

const EMPTY = {
  nama: '', jenisIdentitas: 'KTP', noIdentitas: '', tempatLahir: '', tanggalLahir: '', agama: 'Islam', jenisKelamin: 'Laki-laki',
  email: '', noHp: '', noTelp: '',
  jenisAnggota: 'Umum', tglRegister: today(), tglBerakhir: plusYear(today()), statusAnggota: 'Aktif', koleksiPinjam: 'Semua Koleksi', lokasiPerpustakaan: 'Perpustakaan Utama',
  alamat: '', provinsi: '', kota: '', kecamatan: '', kelurahan: '', rt: '', rw: '',
  domisiliSama: false, domAlamat: '', domProvinsi: '', domKota: '', domKecamatan: '', domKelurahan: '', domRt: '', domRw: '',
  pekerjaan: '', pendidikan: '', kelas: '', foto: '',
};

function Section({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-3 mb-2 overflow-hidden">
      <button type="button" className="w-100 d-flex align-items-center justify-content-between px-3 py-2 border-0 bg-light text-start" onClick={() => setOpen((o) => !o)}>
        <span className="fw-semibold small text-uppercase" style={{ color: '#14245a' }}><i className={`${icon} me-2 text-primary`}></i>{title}</span>
        <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'} small text-muted`}></i>
      </button>
      {open && <div className="p-3">{children}</div>}
    </div>
  );
}
function F({ label, required, children, col = 'col-md-4' }) {
  return <div className={col}><label className="form-label fw-semibold small mb-1">{label}{required && ' *'}</label>{children}</div>;
}

export default function EntriAnggota({ onNavigate }) {
  const [form, setForm] = useState(EMPTY);
  const [saved, setSaved] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [camOn, setCamOn] = useState(false);

  useEffect(() => () => { if (videoRef.current?.srcObject) videoRef.current.srcObject.getTracks().forEach((t) => t.stop()); }, []);
  useEffect(() => { if (form.domisiliSama) setForm((f) => ({ ...f, domAlamat: f.alamat, domProvinsi: f.provinsi, domKota: f.kota, domKecamatan: f.kecamatan, domKelurahan: f.kelurahan, domRt: f.rt, domRw: f.rw })); }, [form.domisiliSama, form.alamat, form.provinsi, form.kota, form.kecamatan, form.kelurahan, form.rt, form.rw]);

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => {
      const n = { ...f, [k]: v };
      if (k === 'tglRegister') n.tglBerakhir = plusYear(v);
      return n;
    });
  };

  const onFoto = (e) => { const file = e.target.files?.[0]; if (!file) return; const r = new FileReader(); r.onload = () => setForm((f) => ({ ...f, foto: r.result })); r.readAsDataURL(file); };

  const openCam = async () => {
    try { const s = await navigator.mediaDevices.getUserMedia({ video: true }); if (videoRef.current) { videoRef.current.srcObject = s; setCamOn(true); } }
    catch { alert('Kamera tidak dapat diakses.'); }
  };
  const snap = () => {
    const v = videoRef.current, c = canvasRef.current; if (!v || !c) return;
    c.width = v.videoWidth || 320; c.height = v.videoHeight || 240; c.getContext('2d').drawImage(v, 0, 0);
  };
  const saveSnap = () => { const c = canvasRef.current; if (!c || !c.width) { alert('Ambil snapshot terlebih dahulu.'); return; } setForm((f) => ({ ...f, foto: c.toDataURL('image/png') })); };

  const submit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.email || !form.jenisAnggota || !form.statusAnggota || !form.koleksiPinjam || !form.lokasiPerpustakaan) { alert('Lengkapi field bertanda *.'); return; }
    const list = loadAnggota();
    const item = { ...form, id: Date.now(), noAnggota: nextNoAnggota(list), foto: form.foto || '' };
    saveAnggota([item, ...list]);
    setSaved(true);
    setTimeout(() => { setSaved(false); onNavigate && onNavigate('daftar-anggota'); }, 900);
  };

  return (
    <div>
      <Topbar title="Anggota" sub="Update Anggota / Tambah Anggota" crumbs={[{ label: 'Home', icon: 'fa-solid fa-house' }, { label: 'Anggota' }, { label: 'Tambah Anggota', active: true }]} />
      <form onSubmit={submit}>
        <div className="berita-card-head">
          <h2><i className="fa-solid fa-user-plus" aria-hidden="true"></i> TAMBAH ANGGOTA</h2>
        </div>
        <div className="bo-panel-body pt-2">
          {saved && <div className="alert alert-success py-2 small"><i className="fa-solid fa-check me-1"></i>Anggota berhasil disimpan.</div>}

          <Section title="Info Personal" icon="fa-solid fa-user">
            <div className="row g-2">
              <F label="Nama Anggota" required><input className="form-control form-control-sm" value={form.nama} onChange={set('nama')} required /></F>
              <F label="Jenis Identitas"><select className="form-select form-select-sm" value={form.jenisIdentitas} onChange={set('jenisIdentitas')}><option>KTP</option><option>SIM</option><option>Paspor</option><option>Kartu Pelajar</option></select></F>
              <F label="Nomor Identitas"><input className="form-control form-control-sm" value={form.noIdentitas} onChange={set('noIdentitas')} /></F>
              <F label="Tempat Lahir"><input className="form-control form-control-sm" value={form.tempatLahir} onChange={set('tempatLahir')} /></F>
              <F label="Tanggal Lahir"><input type="date" className="form-control form-control-sm" value={form.tanggalLahir} onChange={set('tanggalLahir')} /></F>
              <F label="Agama"><select className="form-select form-select-sm" value={form.agama} onChange={set('agama')}><option>Islam</option><option>Kristen</option><option>Katolik</option><option>Hindu</option><option>Buddha</option><option>Konghucu</option></select></F>
              <F label="Jenis Kelamin"><select className="form-select form-select-sm" value={form.jenisKelamin} onChange={set('jenisKelamin')}><option>Laki-laki</option><option>Perempuan</option></select></F>
            </div>
          </Section>

          <Section title="Kontak" icon="fa-solid fa-address-book">
            <div className="row g-2">
              <F label="Alamat Email" required><input type="email" className="form-control form-control-sm" value={form.email} onChange={set('email')} required /></F>
              <F label="No. HP"><input className="form-control form-control-sm" value={form.noHp} onChange={set('noHp')} /></F>
              <F label="No. Telepon"><input className="form-control form-control-sm" value={form.noTelp} onChange={set('noTelp')} /></F>
            </div>
          </Section>

          <Section title="Info Anggota" icon="fa-solid fa-id-card">
            <div className="row g-2">
              <F label="Jenis Anggota" required><select className="form-select form-select-sm" value={form.jenisAnggota} onChange={set('jenisAnggota')} required><option>Umum</option><option>Pelajar</option><option>Mahasiswa</option><option>PNS</option><option>Peneliti</option></select></F>
              <F label="Tanggal Pendaftaran"><input type="date" className="form-control form-control-sm" value={form.tglRegister} onChange={set('tglRegister')} /></F>
              <F label="Masa Berlaku"><input type="date" className="form-control form-control-sm" value={form.tglBerakhir} onChange={set('tglBerakhir')} /></F>
              <F label="Status Anggota" required><select className="form-select form-select-sm" value={form.statusAnggota} onChange={set('statusAnggota')} required><option>Aktif</option><option>Nonaktif</option><option>Ditangguhkan</option></select></F>
              <F label="Koleksi yang dapat dipinjam" required><select className="form-select form-select-sm" value={form.koleksiPinjam} onChange={set('koleksiPinjam')} required><option>Semua Koleksi</option><option>Buku Umum</option><option>Referensi</option><option>Terbatas</option></select></F>
              <F label="Lokasi Perpustakaan" required><select className="form-select form-select-sm" value={form.lokasiPerpustakaan} onChange={set('lokasiPerpustakaan')} required><option>Perpustakaan Utama</option><option>Cabang Sepaku</option><option>Cabang Waru</option></select></F>
            </div>
          </Section>

          <Section title="Info Alamat" icon="fa-solid fa-location-dot">
            <div className="row g-2">
              <F label="Alamat sesuai identitas" col="col-12"><input className="form-control form-control-sm" value={form.alamat} onChange={set('alamat')} /></F>
              <F label="Provinsi" col="col-md-3"><input className="form-control form-control-sm" value={form.provinsi} onChange={set('provinsi')} /></F>
              <F label="Kota/Kabupaten" col="col-md-3"><input className="form-control form-control-sm" value={form.kota} onChange={set('kota')} /></F>
              <F label="Kecamatan" col="col-md-3"><input className="form-control form-control-sm" value={form.kecamatan} onChange={set('kecamatan')} /></F>
              <F label="Kelurahan" col="col-md-3"><input className="form-control form-control-sm" value={form.kelurahan} onChange={set('kelurahan')} /></F>
              <F label="RT" col="col-md-2"><input className="form-control form-control-sm" value={form.rt} onChange={set('rt')} /></F>
              <F label="RW" col="col-md-2"><input className="form-control form-control-sm" value={form.rw} onChange={set('rw')} /></F>
              <div className="col-12"><div className="form-check"><input id="domSama" type="checkbox" className="form-check-input" checked={form.domisiliSama} onChange={set('domisiliSama')} /><label htmlFor="domSama" className="form-check-label small fw-semibold">Sama dengan alamat identitas (domisili)</label></div></div>
              {!form.domisiliSama && (
                <>
                  <F label="Alamat domisili" col="col-12"><input className="form-control form-control-sm" value={form.domAlamat} onChange={set('domAlamat')} /></F>
                  <F label="Provinsi" col="col-md-3"><input className="form-control form-control-sm" value={form.domProvinsi} onChange={set('domProvinsi')} /></F>
                  <F label="Kota" col="col-md-3"><input className="form-control form-control-sm" value={form.domKota} onChange={set('domKota')} /></F>
                  <F label="Kecamatan" col="col-md-3"><input className="form-control form-control-sm" value={form.domKecamatan} onChange={set('domKecamatan')} /></F>
                  <F label="Kelurahan" col="col-md-3"><input className="form-control form-control-sm" value={form.domKelurahan} onChange={set('domKelurahan')} /></F>
                </>
              )}
            </div>
          </Section>

          <Section title="Info Tambahan" icon="fa-solid fa-circle-info">
            <div className="row g-2">
              <F label="Pekerjaan"><input className="form-control form-control-sm" value={form.pekerjaan} onChange={set('pekerjaan')} /></F>
              <F label="Jenjang Pendidikan"><select className="form-select form-select-sm" value={form.pendidikan} onChange={set('pendidikan')}><option value="">-</option><option>SD</option><option>SMP</option><option>SMA</option><option>D3</option><option>S1</option><option>S2</option><option>S3</option></select></F>
              <F label="Kelas"><input className="form-control form-control-sm" value={form.kelas} onChange={set('kelas')} placeholder="-" /></F>
            </div>
          </Section>

          <Section title="Upload Foto" icon="fa-solid fa-camera" defaultOpen={false}>
            <div className="row g-3 align-items-start">
              <div className="col-md-5">
                <label className="border rounded-3 d-flex flex-column align-items-center justify-content-center text-muted bg-light" style={{ minHeight: 140, cursor: 'pointer' }}>
                  {form.foto ? <img src={form.foto} alt="Foto anggota" style={{ maxHeight: 130, maxWidth: '100%', objectFit: 'cover' }} /> : <><i className="fa-solid fa-cloud-arrow-up fa-2x mb-2"></i><span className="small">Drag & drop / pilih foto</span></>}
                  <input type="file" accept="image/*" className="d-none" onChange={onFoto} />
                </label>
              </div>
              <div className="col-md-7">
                <div className="d-flex flex-wrap gap-2 mb-2">
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={openCam}><i className="fa-solid fa-camera me-1"></i>Open Camera</button>
                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={snap} disabled={!camOn}><i className="fa-solid fa-circle-dot me-1"></i>Take Snapshot</button>
                  <button type="button" className="btn btn-primary btn-sm" onClick={saveSnap}><i className="fa-solid fa-save me-1"></i>Save Snapshot</button>
                </div>
                <div className="d-flex gap-2">
                  <video ref={videoRef} autoPlay playsInline muted className="border rounded bg-dark" style={{ width: 160, height: 120, objectFit: 'cover', display: camOn ? 'block' : 'none' }} />
                  <canvas ref={canvasRef} className="border rounded bg-light" style={{ width: 160, height: 120 }} />
                </div>
              </div>
            </div>
          </Section>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary fw-semibold d-inline-flex align-items-center gap-2 px-4">
              <i className="fa-solid fa-save"></i> Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
