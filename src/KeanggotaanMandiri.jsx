import React, { useState } from 'react';

export default function KeanggotaanMandiri() {
  const [currentStep, setCurrentStep] = useState(1);
  const [samaAlamat, setSamaAlamat] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('48261');
  const [captchaInput, setCaptchaInput] = useState('');
  const [verified, setVerified] = useState(false);
  const [pernyataan, setPernyataan] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    noIdentitas: '',
    jenisIdentitas: 'KTP',
    email: '',
    namaLengkap: '',
    noHp: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    // Alamat Identitas
    alamatIdentitas: '',
    provinsiIdentitas: 'Kalimantan Timur',
    kotaIdentitas: 'Penajam Paser Utara',
    kecamatanIdentitas: 'Penajam',
    kelurahanIdentitas: 'Nipah-Nipah',
    // Alamat Saat Ini
    alamatSaatIni: '',
    provinsiSaatIni: 'Kalimantan Timur',
    kotaSaatIni: 'Penajam Paser Utara',
    kecamatanSaatIni: 'Penajam',
    kelurahanSaatIni: 'Nipah-Nipah',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (samaAlamat && name.includes('Identitas')) {
        const corresponding = name.replace('Identitas', 'SaatIni');
        updated[corresponding] = value;
      }
      return updated;
    });
  };

  const handleSamaAlamatChange = (e) => {
    const isChecked = e.target.checked;
    setSamaAlamat(isChecked);
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        alamatSaatIni: prev.alamatIdentitas,
        provinsiSaatIni: prev.provinsiIdentitas,
        kotaSaatIni: prev.kotaIdentitas,
        kecamatanSaatIni: prev.kecamatanIdentitas,
        kelurahanSaatIni: prev.kelurahanIdentitas,
      }));
    }
  };

  const handleVerifikasiData = () => {
    if (!formData.noIdentitas || !formData.email) {
      alert('Harap isi No. Identitas dan Email terlebih dahulu untuk verifikasi.');
      return;
    }
    setVerified(true);
    alert('Verifikasi data identitas awal berhasil!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.noIdentitas || !formData.namaLengkap || !formData.email || !formData.noHp) {
      alert('Mohon lengkapi seluruh field berbintang merah (*) yang wajib diisi.');
      return;
    }
    if (!pernyataan) {
      alert('Harap setujui pernyataan keabsahan data terlebih dahulu.');
      return;
    }
    if (captchaInput.trim() !== captchaCode) {
      alert('Kode CAPTCHA yang dimasukkan tidak sesuai. Silakan coba lagi.');
      return;
    }

    // Save to localStorage so petugas/admin can see it
    try {
      const raw = window.localStorage.getItem('inlislite.anggota.v1');
      const list = raw ? JSON.parse(raw) : [];
      const newAnggota = {
        id: Date.now(),
        no_anggota: formData.noIdentitas,
        nama: formData.namaLengkap,
        jenis_identitas: formData.jenisIdentitas,
        no_identitas: formData.noIdentitas,
        email: formData.email,
        hp: formData.noHp,
        alamat: formData.alamatIdentitas,
        kota: formData.kotaIdentitas,
        status: 'Aktif',
        tgl_daftar: new Date().toISOString().split('T')[0],
      };
      window.localStorage.setItem('inlislite.anggota.v1', JSON.stringify([newAnggota, ...list]));
    } catch (err) {}

    setSubmitted(true);
    setCurrentStep(3);
  };

  return (
    <div className="w-100 py-4 px-3 px-md-4" style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', color: '#1E293B' }}>
      <div className="container-fluid" style={{ maxWidth: '1200px' }}>
        
        {/* 2. Header Utama (Bagian Atas) */}
        <div className="bg-white rounded-3 shadow-sm p-4 mb-4 text-center border">
          <div className="d-inline-flex align-items-center justify-content-center gap-3">
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-circle"
              style={{ width: '48px', height: '48px', backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '1.5rem' }}
            >
              <i className="fa-solid fa-user-plus"></i>
            </span>
            <div className="text-start">
              <h1 className="h3 fw-bold mb-0" style={{ color: '#2563EB' }}>
                Pendaftaran Anggota
              </h1>
              <p className="mb-0 small" style={{ color: '#64748B' }}>
                Daftarkan diri Anda sebagai anggota perpustakaan
              </p>
            </div>
          </div>
        </div>

        {/* 3. Indikator Tahapan / Progress Bar Stepper */}
        <div className="bg-white rounded-3 shadow-sm p-3 mb-4 border">
          <div className="row text-center align-items-center position-relative">
            {/* Step 1 */}
            <div className="col-4">
              <div
                className="pb-2 border-bottom"
                style={{
                  borderColor: currentStep >= 1 ? '#2563EB' : '#E2E8F0',
                  borderBottomWidth: '3px',
                }}
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-1"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: currentStep >= 1 ? '#2563EB' : '#F1F5F9',
                    color: currentStep >= 1 ? '#FFFFFF' : '#94A3B8',
                  }}
                >
                  <i className="fa-solid fa-user-check"></i>
                </div>
                <div className={`small fw-bold ${currentStep >= 1 ? 'text-primary' : 'text-muted'}`}>
                  1. Verifikasi
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-4">
              <div
                className="pb-2 border-bottom"
                style={{
                  borderColor: currentStep >= 2 ? '#2563EB' : '#E2E8F0',
                  borderBottomWidth: '3px',
                }}
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-1"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: currentStep >= 2 ? '#2563EB' : '#F1F5F9',
                    color: currentStep >= 2 ? '#FFFFFF' : '#94A3B8',
                  }}
                >
                  <i className="fa-solid fa-file-pen"></i>
                </div>
                <div className={`small fw-bold ${currentStep >= 2 ? 'text-primary' : 'text-muted'}`}>
                  2. Data Diri
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-4">
              <div
                className="pb-2 border-bottom"
                style={{
                  borderColor: currentStep >= 3 ? '#2563EB' : '#E2E8F0',
                  borderBottomWidth: '3px',
                }}
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-1"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: currentStep >= 3 ? '#2563EB' : '#F1F5F9',
                    color: currentStep >= 3 ? '#FFFFFF' : '#94A3B8',
                  }}
                >
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div className={`small fw-bold ${currentStep >= 3 ? 'text-primary' : 'text-muted'}`}>
                  3. Selesai
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success View */}
        {submitted ? (
          <div className="bg-white rounded-3 shadow-sm p-5 border text-center">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
              style={{ width: '80px', height: '80px', backgroundColor: '#ECFDF5', color: '#10B981', fontSize: '2.5rem' }}
            >
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h3 className="fw-bold text-dark mb-2">Pendaftaran Berhasil!</h3>
            <p className="text-muted mb-4" style={{ maxWidth: '540px', margin: '0 auto' }}>
              Selamat, berkas formulir pendaftaran anggota Anda telah kami terima. Silakan bawa bukti nomor identitas{' '}
              <strong>({formData.noIdentitas})</strong> ke meja petugas perpustakaan untuk verifikasi fisik dan cetak kartu.
            </p>
            <button
              type="button"
              className="btn text-white fw-semibold px-4 py-2"
              style={{ backgroundColor: '#2563EB', borderRadius: '8px' }}
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  noIdentitas: '',
                  jenisIdentitas: 'KTP',
                  email: '',
                  namaLengkap: '',
                  noHp: '',
                  tempatLahir: '',
                  tanggalLahir: '',
                  jenisKelamin: '',
                  alamatIdentitas: '',
                  provinsiIdentitas: 'Kalimantan Timur',
                  kotaIdentitas: 'Penajam Paser Utara',
                  kecamatanIdentitas: 'Penajam',
                  kelurahanIdentitas: 'Nipah-Nipah',
                  alamatSaatIni: '',
                  provinsiSaatIni: 'Kalimantan Timur',
                  kotaSaatIni: 'Penajam Paser Utara',
                  kecamatanSaatIni: 'Penajam',
                  kelurahanSaatIni: 'Nipah-Nipah',
                });
              }}
            >
              <i className="fa-solid fa-arrow-left me-2"></i> Daftar Anggota Lain
            </button>
          </div>
        ) : (
          /* 4. Area Formulir Utama (Full-Width Card) */
          <div className="bg-white rounded-3 shadow-sm border p-4 p-md-5">
            <form onSubmit={handleSubmit}>
              
              {/* Seksi 1: Verifikasi Identitas */}
              <div className="mb-5">
                <div className="d-flex align-items-center gap-2 pb-2 mb-3 border-bottom">
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: '32px', height: '32px', backgroundColor: '#EFF6FF', color: '#2563EB' }}
                  >
                    <i className="fa-solid fa-shield-halved"></i>
                  </span>
                  <h5 className="fw-bold mb-0" style={{ color: '#2563EB' }}>
                    Verifikasi Identitas
                  </h5>
                </div>

                <div className="row g-3">
                  {/* Baris 1: No. Identitas & Jenis Identitas */}
                  <div className="col-md-6">
                    <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                      No. Identitas <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0" style={{ color: '#2563EB' }}>
                        <i className="fa-solid fa-id-card"></i>
                      </span>
                      <input
                        type="text"
                        name="noIdentitas"
                        className="form-control border-start-0"
                        placeholder="Masukkan Nomor Identitas"
                        value={formData.noIdentitas}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <span className="form-text" style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Akan digunakan sebagai Nomor Anggota
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                      Jenis Identitas <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <select
                      name="jenisIdentitas"
                      className="form-select"
                      value={formData.jenisIdentitas}
                      onChange={handleChange}
                      required
                    >
                      <option value="KTP">KTP (Kartu Tanda Penduduk)</option>
                      <option value="SIM">SIM (Surat Izin Mengemudi)</option>
                      <option value="Kartu Pelajar">Kartu Pelajar / Mahasiswa</option>
                      <option value="Paspor">Paspor / KITAS</option>
                    </select>
                  </div>

                  {/* Baris 2: Email & Tombol Verifikasi */}
                  <div className="col-md-6">
                    <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                      Email <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0" style={{ color: '#2563EB' }}>
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="form-control border-start-0"
                        placeholder="Masukkan Email Aktif"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <span className="form-text" style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Email aktif untuk menerima notifikasi pendaftaran
                    </span>
                  </div>

                  <div className="col-md-6 d-flex align-items-center pt-md-2">
                    <button
                      type="button"
                      className="btn fw-semibold w-100 d-inline-flex align-items-center justify-content-center gap-2 py-2 mt-md-2"
                      style={{
                        borderColor: '#2563EB',
                        color: '#2563EB',
                        backgroundColor: verified ? '#EFF6FF' : '#FFFFFF',
                      }}
                      onClick={handleVerifikasiData}
                    >
                      <i className={`fa-solid ${verified ? 'fa-check' : 'fa-magnifying-glass'}`}></i>
                      {verified ? 'Data Terverifikasi' : 'Verifikasi Data'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Seksi 2: Data Pribadi */}
              <div className="mb-5">
                <div className="d-flex align-items-center gap-2 pb-2 mb-3 border-bottom">
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: '32px', height: '32px', backgroundColor: '#EFF6FF', color: '#2563EB' }}
                  >
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <h5 className="fw-bold mb-0" style={{ color: '#2563EB' }}>
                    Data Pribadi
                  </h5>
                </div>

                <div className="row g-3">
                  {/* Baris 1: Nama Lengkap & No. HP */}
                  <div className="col-md-6">
                    <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                      Nama Lengkap <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0" style={{ color: '#2563EB' }}>
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <input
                        type="text"
                        name="namaLengkap"
                        className="form-control border-start-0"
                        placeholder="Masukkan Nama Lengkap"
                        value={formData.namaLengkap}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                      No. HP <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0" style={{ color: '#2563EB' }}>
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      <input
                        type="tel"
                        name="noHp"
                        className="form-control border-start-0"
                        placeholder="Masukkan No. HP"
                        value={formData.noHp}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Baris 2: Tempat Lahir, Tanggal Lahir, Jenis Kelamin */}
                  <div className="col-md-4">
                    <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                      Tempat Lahir <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="tempatLahir"
                      className="form-control"
                      placeholder="Tempat Lahir"
                      value={formData.tempatLahir}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                      Tanggal Lahir <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="date"
                        name="tanggalLahir"
                        className="form-control border-end-0"
                        placeholder="dd --- tttt"
                        value={formData.tanggalLahir}
                        onChange={handleChange}
                        required
                      />
                      <span className="input-group-text bg-white border-start-0" style={{ color: '#2563EB' }}>
                        <i className="fa-regular fa-calendar"></i>
                      </span>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                      Jenis Kelamin <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <select
                      name="jenisKelamin"
                      className="form-select"
                      value={formData.jenisKelamin}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Seksi 3: Alamat sesuai Identitas */}
              <div className="mb-5">
                <div className="d-flex align-items-center gap-2 pb-2 mb-3 border-bottom">
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: '32px', height: '32px', backgroundColor: '#EFF6FF', color: '#2563EB' }}
                  >
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                  <h5 className="fw-bold mb-0" style={{ color: '#2563EB' }}>
                    Alamat sesuai Identitas
                  </h5>
                </div>

                <div className="p-4 rounded-3 border" style={{ backgroundColor: '#F8FAFC' }}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                      Alamat Lengkap <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <textarea
                      name="alamatIdentitas"
                      rows="3"
                      className="form-control"
                      placeholder="Masukkan alamat lengkap sesuai identitas"
                      value={formData.alamatIdentitas}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                        Provinsi <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="provinsiIdentitas"
                        className="form-select form-select-sm"
                        value={formData.provinsiIdentitas}
                        onChange={handleChange}
                        required
                      >
                        <option value="Kalimantan Timur">Kalimantan Timur</option>
                        <option value="DKI Jakarta">DKI Jakarta</option>
                        <option value="Jawa Barat">Jawa Barat</option>
                        <option value="Jawa Timur">Jawa Timur</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                        Kota <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="kotaIdentitas"
                        className="form-select form-select-sm"
                        value={formData.kotaIdentitas}
                        onChange={handleChange}
                        required
                      >
                        <option value="Penajam Paser Utara">Penajam Paser Utara</option>
                        <option value="Balikpapan">Balikpapan</option>
                        <option value="Samarinda">Samarinda</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                        Kecamatan <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="kecamatanIdentitas"
                        className="form-select form-select-sm"
                        value={formData.kecamatanIdentitas}
                        onChange={handleChange}
                        required
                      >
                        <option value="Penajam">Penajam</option>
                        <option value="Waru">Waru</option>
                        <option value="Babulu">Babulu</option>
                        <option value="Sepaku">Sepaku</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                        Kelurahan <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="kelurahanIdentitas"
                        className="form-select form-select-sm"
                        value={formData.kelurahanIdentitas}
                        onChange={handleChange}
                        required
                      >
                        <option value="Nipah-Nipah">Nipah-Nipah</option>
                        <option value="Penajam">Penajam</option>
                        <option value="Girimukti">Girimukti</option>
                        <option value="Nenang">Nenang</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seksi 4: Alamat Saat Ini */}
              <div className="mb-5">
                <div className="d-flex align-items-center gap-2 pb-2 mb-3 border-bottom">
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: '32px', height: '32px', backgroundColor: '#EFF6FF', color: '#2563EB' }}
                  >
                    <i className="fa-solid fa-house"></i>
                  </span>
                  <h5 className="fw-bold mb-0" style={{ color: '#2563EB' }}>
                    Alamat Saat Ini
                  </h5>
                </div>

                {/* Option Box (Atas) */}
                <div className="p-3 rounded-3 mb-3 border" style={{ backgroundColor: '#F1F5F9' }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkSamaAlamat"
                      checked={samaAlamat}
                      onChange={handleSamaAlamatChange}
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="checkSamaAlamat" style={{ color: '#1E293B' }}>
                      Alamat saat ini sama dengan alamat identitas
                    </label>
                  </div>
                </div>

                <div className="p-4 rounded-3 border" style={{ backgroundColor: '#F8FAFC' }}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                      Alamat Lengkap <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <textarea
                      name="alamatSaatIni"
                      rows="3"
                      className="form-control"
                      placeholder="Masukkan alamat saat ini"
                      value={formData.alamatSaatIni}
                      onChange={handleChange}
                      disabled={samaAlamat}
                      required
                    ></textarea>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                        Provinsi <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="provinsiSaatIni"
                        className="form-select form-select-sm"
                        value={formData.provinsiSaatIni}
                        onChange={handleChange}
                        disabled={samaAlamat}
                        required
                      >
                        <option value="Kalimantan Timur">Kalimantan Timur</option>
                        <option value="DKI Jakarta">DKI Jakarta</option>
                        <option value="Jawa Barat">Jawa Barat</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                        Kota <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="kotaSaatIni"
                        className="form-select form-select-sm"
                        value={formData.kotaSaatIni}
                        onChange={handleChange}
                        disabled={samaAlamat}
                        required
                      >
                        <option value="Penajam Paser Utara">Penajam Paser Utara</option>
                        <option value="Balikpapan">Balikpapan</option>
                        <option value="Samarinda">Samarinda</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                        Kecamatan <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="kecamatanSaatIni"
                        className="form-select form-select-sm"
                        value={formData.kecamatanSaatIni}
                        onChange={handleChange}
                        disabled={samaAlamat}
                        required
                      >
                        <option value="Penajam">Penajam</option>
                        <option value="Waru">Waru</option>
                        <option value="Babulu">Babulu</option>
                        <option value="Sepaku">Sepaku</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-bold" style={{ color: '#1E293B' }}>
                        Kelurahan <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="kelurahanSaatIni"
                        className="form-select form-select-sm"
                        value={formData.kelurahanSaatIni}
                        onChange={handleChange}
                        disabled={samaAlamat}
                        required
                      >
                        <option value="Nipah-Nipah">Nipah-Nipah</option>
                        <option value="Penajam">Penajam</option>
                        <option value="Girimukti">Girimukti</option>
                        <option value="Nenang">Nenang</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seksi 5: Pernyataan */}
              <div className="mb-5">
                <div className="d-flex align-items-center gap-2 pb-2 mb-3 border-bottom">
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: '32px', height: '32px', backgroundColor: '#EFF6FF', color: '#2563EB' }}
                  >
                    <i className="fa-solid fa-file-contract"></i>
                  </span>
                  <h5 className="fw-bold mb-0" style={{ color: '#2563EB' }}>
                    Pernyataan
                  </h5>
                </div>

                <div className="p-3 rounded-3 border" style={{ backgroundColor: '#F1F5F9' }}>
                  <div className="form-check d-flex align-items-center gap-2">
                    <input
                      className="form-check-input mt-0"
                      type="checkbox"
                      id="checkPernyataan"
                      checked={pernyataan}
                      onChange={(e) => setPernyataan(e.target.checked)}
                      required
                    />
                    <label className="form-check-label fw-semibold small" htmlFor="checkPernyataan" style={{ color: '#1E293B' }}>
                      <i className="fa-solid fa-circle-check text-primary me-1"></i> Saya menyatakan bahwa data yang diisi adalah benar dan dapat dipertanggungjawabkan
                    </label>
                  </div>
                </div>
              </div>

              {/* Seksi 6: Keamanan CAPTCHA */}
              <div className="mb-5 p-4 rounded-3 border" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-6 text-center">
                    <label className="form-label fw-bold mb-2" style={{ color: '#1E293B' }}>
                      Masukkan angka pada gambar
                    </label>

                    {/* Box Gambar CAPTCHA */}
                    <div
                      className="p-3 rounded-3 d-inline-block position-relative border mb-2 shadow-sm"
                      style={{
                        backgroundColor: '#E5E7EB',
                        letterSpacing: '8px',
                        userSelect: 'none',
                        minWidth: '220px',
                      }}
                    >
                      <span
                        className="fw-bold fs-3 text-dark font-monospace fst-italic"
                        style={{
                          textDecoration: 'line-through',
                          transform: 'rotate(-2deg)',
                          display: 'inline-block',
                        }}
                      >
                        {captchaCode.split('').join(' ')}
                      </span>
                    </div>

                    <div className="small text-muted mb-3" style={{ fontSize: '0.8rem' }}>
                      Ilustrasi saja, bukan CAPTCHA aktif.
                    </div>

                    <div className="d-flex justify-content-center">
                      <input
                        type="text"
                        className="form-control text-center font-monospace"
                        style={{
                          maxWidth: '260px',
                          borderRadius: '50rem',
                          border: '1px solid #94A3B8',
                        }}
                        placeholder="Ketik angka CAPTCHA"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seksi 7: Tombol Aksi Utama (Submit Button) */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="btn text-white fw-bold px-5 py-3 shadow-sm d-inline-flex align-items-center gap-2"
                  style={{
                    backgroundColor: '#2563EB',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <i className="fa-solid fa-user-plus"></i>
                  Daftar Sebagai Anggota
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
