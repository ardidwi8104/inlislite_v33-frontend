import React, { useState } from 'react';
import CaptchaField, { useCaptcha } from './Captcha';
import VisitProofModal from './components/VisitProofModal';
import {
  countVerifiedVisitsToday,
  createVisitRequest,
  findMemberByCode,
  formatDateID,
  todayISO,
} from './lib/libraryStore';

const PRIMARY = '#1b3878';
const PROFESSIONS = ['PNS', 'Guru', 'Pegawai Swasta', 'Wiraswasta', 'Pelajar/Mahasiswa', 'Lainnya'];
const EDUCATIONS = ['SD', 'SMP', 'SMA/SMK', 'D1/D2/D3', 'S1', 'S2', 'S3', 'Lainnya'];
const GROUP_PROFESSIONS = [
  'PNS',
  'Guru',
  'Pegawai Swasta',
  'Peneliti',
  'Dosen',
  'Pensiunan',
  'TN/Polri',
  'Wiraswasta',
  'Pelajar',
  'Mahasiswa',
  'Lainnya',
];
const GROUP_EDUCATIONS = ['TK', 'SD', 'SMP', 'SMA', 'D1', 'D2', 'D3', 'S1', 'S2', 'S3'];

const initialNonForm = {
  name: '',
  profession: '',
  education: '',
  gender: '',
  address: '',
  purpose: '',
};

const initialGroupForm = {
  pjName: '',
  pjPhone: '',
  institution: '',
  institutionEmail: '',
  institutionAddress: '',
  total: '',
  male: '',
  female: '',
  institutionPhone: '',
  purpose: '',
  notes: '',
  profession: Object.fromEntries(GROUP_PROFESSIONS.map((item) => [item, ''])),
  education: Object.fromEntries(GROUP_EDUCATIONS.map((item) => [item, ''])),
};

function RequiredMark() {
  return <span className="text-danger">*</span>;
}

function FieldError({ message }) {
  if (!message) return null;
  return (
    <div className="text-danger small mt-1">
      <i className="fa-solid fa-circle-exclamation me-1"></i>
      {message}
    </div>
  );
}

export default function BukuTamu() {
  const [activeTab, setActiveTab] = useState('anggota');
  const [showWarning, setShowWarning] = useState(true);

  // CAPTCHA untuk masing-masing formulir buku tamu
  const captchaAnggota = useCaptcha();
  const captchaNonAnggota = useCaptcha();
  const captchaRombongan = useCaptcha();

  const [totalToday, setTotalToday] = useState(() => countVerifiedVisitsToday());
  const [proofVisit, setProofVisit] = useState(null);

  // Tab anggota
  const [memberQuery, setMemberQuery] = useState('');
  const [foundMember, setFoundMember] = useState(null);
  const [memberError, setMemberError] = useState('');
  const [memberPurpose, setMemberPurpose] = useState('Membaca');
  const [memberCaptchaError, setMemberCaptchaError] = useState(false);

  // Tab non anggota
  const [nonForm, setNonForm] = useState(initialNonForm);
  const [nonErrors, setNonErrors] = useState({});
  const [nonCaptchaError, setNonCaptchaError] = useState(false);

  // Tab rombongan
  const [groupForm, setGroupForm] = useState(initialGroupForm);
  const [groupErrors, setGroupErrors] = useState({});
  const [groupCaptchaError, setGroupCaptchaError] = useState(false);

  const refreshTotal = () => setTotalToday(countVerifiedVisitsToday());

  const tabButtonClass = (tab) => {
    const base = 'd-flex align-items-center justify-content-center gap-2 fw-semibold px-4 py-2 flex-fill';
    if (activeTab === tab) {
      return `${base} text-white`;
    }
    return `${base} text-secondary bg-white`;
  };

  const tabButtonStyle = (tab) => {
    if (activeTab === tab) {
      return {
        backgroundColor: PRIMARY,
        border: `1px solid ${PRIMARY}`,
        borderRadius: '0.375rem',
      };
    }
    return {
      backgroundColor: '#ffffff',
      border: '1px solid #dee2e6',
      borderRadius: '0.375rem',
    };
  };

  const openProof = (visit) => {
    setProofVisit(visit);
    refreshTotal();
  };

  const handleMemberSearch = (event) => {
    event.preventDefault();
    setMemberError('');
    setFoundMember(null);

    if (!memberQuery.trim()) {
      setMemberError('Masukkan nomor anggota, barcode, atau nomor identitas terlebih dahulu.');
      return;
    }

    const member = findMemberByCode(memberQuery);
    if (!member) {
      setMemberError('Data anggota tidak ditemukan. Periksa nomor anggota/barcode, atau daftar sebagai anggota terlebih dahulu.');
      return;
    }

    if (member.status === 'pending') {
      setMemberError(`Pendaftaran anggota ini masih menunggu verifikasi petugas. Kode pendaftaran: ${member.registrationCode}.`);
      return;
    }

    if (member.status !== 'active') {
      setMemberError('Data anggota belum aktif. Silakan hubungi petugas perpustakaan.');
      return;
    }

    setFoundMember(member);
  };

  const handleMemberVisit = () => {
    if (!foundMember) {
      setMemberError('Cari dan pilih anggota terlebih dahulu.');
      return;
    }

    const valid = captchaAnggota.validate();
    setMemberCaptchaError(!valid);
    if (!valid) return;

    const visit = createVisitRequest({
      type: 'anggota',
      name: foundMember.name,
      identityType: foundMember.identityType,
      identityNo: foundMember.identityNo,
      memberNo: foundMember.memberNo,
      email: foundMember.email,
      phone: foundMember.phone,
      address: foundMember.address?.alamatLengkap || '',
      gender: foundMember.gender,
      purpose: memberPurpose,
      visitDate: todayISO(),
    });

    openProof(visit);
    setMemberError('');
    setFoundMember(null);
    setMemberQuery('');
    captchaAnggota.refresh();
  };

  const updateNonField = (field, value) => {
    setNonForm((prev) => ({ ...prev, [field]: value }));
    setNonErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateNonForm = () => {
    const errors = {};
    if (!nonForm.name.trim()) errors.name = 'Nama pengunjung wajib diisi.';
    if (!nonForm.profession) errors.profession = 'Pekerjaan wajib dipilih.';
    if (!nonForm.education) errors.education = 'Pendidikan terakhir wajib dipilih.';
    if (!nonForm.gender) errors.gender = 'Jenis kelamin wajib dipilih.';
    if (!nonForm.purpose) errors.purpose = 'Tujuan kunjungan wajib dipilih.';
    return errors;
  };

  const handleSubmitNon = () => {
    const errors = validateNonForm();
    setNonErrors(errors);
    if (Object.keys(errors).length > 0) {
      setNonCaptchaError(false);
      return;
    }

    const valid = captchaNonAnggota.validate();
    setNonCaptchaError(!valid);
    if (!valid) return;

    const visit = createVisitRequest({
      type: 'nonanggota',
      ...nonForm,
      visitDate: todayISO(),
    });

    setNonForm(initialNonForm);
    openProof(visit);
    captchaNonAnggota.refresh();
  };

  const updateGroupField = (field, value) => {
    setGroupForm((prev) => ({ ...prev, [field]: value }));
    setGroupErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const updateGroupNested = (section, field, value) => {
    setGroupForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const validateGroupForm = () => {
    const errors = {};
    if (!groupForm.pjName.trim()) errors.pjName = 'Nama penanggung jawab wajib diisi.';
    if (!groupForm.pjPhone.trim()) errors.pjPhone = 'Nomor telepon wajib diisi.';
    if (!groupForm.institution.trim()) errors.institution = 'Nama instansi/organisasi wajib diisi.';
    if (!groupForm.total || Number(groupForm.total) < 1) errors.total = 'Total anggota rombongan minimal 1.';
    if (!groupForm.purpose) errors.purpose = 'Tujuan kunjungan wajib dipilih.';
    return errors;
  };

  const handleSubmitGroup = () => {
    const errors = validateGroupForm();
    setGroupErrors(errors);
    if (Object.keys(errors).length > 0) {
      setGroupCaptchaError(false);
      return;
    }

    const valid = captchaRombongan.validate();
    setGroupCaptchaError(!valid);
    if (!valid) return;

    const visit = createVisitRequest({
      type: 'rombongan',
      name: groupForm.pjName,
      phone: groupForm.pjPhone,
      institution: groupForm.institution,
      email: groupForm.institutionEmail,
      address: groupForm.institutionAddress,
      purpose: groupForm.purpose,
      notes: groupForm.notes,
      groupSize: groupForm.total,
      groupMale: groupForm.male,
      groupFemale: groupForm.female,
      groupProfession: groupForm.profession,
      groupEducation: groupForm.education,
      visitDate: todayISO(),
    });

    setGroupForm(initialGroupForm);
    openProof(visit);
    captchaRombongan.refresh();
  };

  return (
    <section className="py-4 py-lg-5" style={{ minHeight: '100vh', backgroundColor: '#F0FDF4', fontFamily: 'var(--font-sans)' }}>
      <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
        {/* BAGIAN ATAS: JUDUL & JUMLAH KUNJUNGAN */}
        <div className="card border-0 rounded-4 shadow-sm mb-4 overflow-hidden bg-white">
          <div className="p-4 p-md-5 pb-4">
            {/* Breadcrumb latar hijau muda */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3" style={{ backgroundColor: '#DCFCE7', color: '#166534', fontSize: '0.85rem' }}>
              <i className="fa-solid fa-house"></i>
              <span>Beranda / Buku Tamu / {activeTab === 'anggota' ? 'Anggota' : activeTab === 'nonanggota' ? 'Bukan Anggota' : 'Rombongan'}</span>
            </div>

            {/* Judul & Subjudul */}
            <h1 className="fw-bold mb-1" style={{ color: PRIMARY, fontSize: 'clamp(1.8rem, 3vw, 2.3rem)' }}>
              Ruang Baca Umum
            </h1>
            <p className="text-muted mb-0" style={{ fontSize: '1rem' }}>
              Perpustakaan Pusat
            </p>
          </div>

          {/* Bilah biru tua penuh di bawahnya */}
          <div className="w-100 py-3 px-4 px-md-5 d-flex align-items-center justify-content-between text-white" style={{ backgroundColor: PRIMARY }}>
            <span className="fw-bold fs-5">
              Total Kunjungan Hari ini {totalToday}
            </span>
            <span className="badge bg-white text-dark small px-3 py-1.5 rounded-pill fw-semibold">
              Terverifikasi
            </span>
          </div>
        </div>

        {/* BAGIAN TOMBOL TAB */}
        <div className="d-flex flex-column flex-md-row gap-2 mb-4">
          <button type="button" className={tabButtonClass('anggota')} style={tabButtonStyle('anggota')} onClick={() => setActiveTab('anggota')}>
            <i className="fa-solid fa-user"></i> Anggota
          </button>
          <button type="button" className={tabButtonClass('nonanggota')} style={tabButtonStyle('nonanggota')} onClick={() => setActiveTab('nonanggota')}>
            <i className="fa-solid fa-user-plus"></i> Bukan Anggota
          </button>
          <button type="button" className={tabButtonClass('rombongan')} style={tabButtonStyle('rombongan')} onClick={() => setActiveTab('rombongan')}>
            <i className="fa-solid fa-users"></i> Rombongan
          </button>
        </div>

        {/* TAB 1: ANGGOTA */}
        {activeTab === 'anggota' && (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-lg-5">
              <div className="text-center mb-4">
                <h4 className="fw-bold mb-2" style={{ color: PRIMARY }}>
                  Cari Anggota Perpustakaan
                </h4>
                <p className="text-muted mb-0">Masukkan nomor anggota, barcode kartu, atau nomor identitas untuk melanjutkan ke buku tamu</p>
              </div>

              <form className="row justify-content-center mb-4" onSubmit={handleMemberSearch}>
                <div className="col-lg-8">
                  <div className="d-flex flex-column flex-md-row gap-2">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Masukkan nomor anggota..."
                      style={{ borderRadius: '0.375rem' }}
                      value={memberQuery}
                      onChange={(event) => {
                        setMemberQuery(event.target.value);
                        setMemberError('');
                      }}
                    />
                    <button
                      type="submit"
                      className="btn btn-lg text-white d-flex align-items-center justify-content-center gap-2 px-4"
                      style={{ backgroundColor: PRIMARY, borderColor: PRIMARY, whiteSpace: 'nowrap' }}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                      Cari Anggota
                    </button>
                  </div>
                  {memberError && (
                    <div className="alert alert-danger small mt-3 mb-0" role="alert">
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      {memberError}
                    </div>
                  )}
                </div>
              </form>

              {foundMember && (
                <div className="row justify-content-center">
                  <div className="col-lg-9">
                    <div className="p-3 p-md-4 rounded-4 bg-white border mb-4" style={{ borderColor: '#dee2e6' }}>
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start gap-3 mb-3">
                        <div className="d-flex align-items-center gap-3">
                          <span
                            className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                            style={{ width: '52px', height: '52px', backgroundColor: '#f8f9fa', color: '#0e7490' }}
                          >
                            <i className="fa-solid fa-user-check fa-lg"></i>
                          </span>
                          <div>
                            <div className="fw-bold fs-5" style={{ color: PRIMARY }}>
                              {foundMember.name}
                            </div>
                            <div className="small text-muted">Anggota aktif</div>
                          </div>
                        </div>
                        <span className="badge bg-success px-3 py-2">AKTIF</span>
                      </div>
                      <div className="row g-3 small">
                        <div className="col-sm-6">
                          <div className="text-muted">Nomor Anggota</div>
                          <div className="fw-bold font-monospace">{foundMember.memberNo}</div>
                        </div>
                        <div className="col-sm-6">
                          <div className="text-muted">Identitas</div>
                          <div className="fw-semibold">
                            {foundMember.identityType} - {foundMember.identityNo}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="text-muted">Email / No. HP</div>
                          <div className="fw-semibold">{foundMember.email || '-'}</div>
                          <div>{foundMember.phone || '-'}</div>
                        </div>
                        <div className="col-sm-6">
                          <div className="text-muted">Masa Berlaku</div>
                          <div className="fw-semibold">{foundMember.validUntil ? formatDateID(foundMember.validUntil.slice(0, 10)) : '-'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Tujuan Kunjungan <RequiredMark />
                      </label>
                      <select className="form-select" value={memberPurpose} onChange={(event) => setMemberPurpose(event.target.value)}>
                        <option>Membaca</option>
                        <option>Meminjam Buku</option>
                        <option>Penelitian</option>
                        <option>Belajar</option>
                        <option>Kegiatan Perpustakaan</option>
                        <option>Lainnya</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <CaptchaField
                        id="captcha-anggota"
                        code={captchaAnggota.code}
                        value={captchaAnggota.input}
                        onChange={(value) => {
                          captchaAnggota.updateInput(value);
                          setMemberCaptchaError(false);
                        }}
                        onRefresh={() => {
                          captchaAnggota.refresh();
                          setMemberCaptchaError(false);
                        }}
                        error={memberCaptchaError}
                        accent={PRIMARY}
                        labelClassName="form-label fw-semibold"
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn text-white px-4 py-2 d-inline-flex align-items-center gap-2"
                        style={{ backgroundColor: PRIMARY, borderColor: PRIMARY }}
                        onClick={handleMemberVisit}
                      >
                        <i className="fa-solid fa-book-open"></i> Simpan Buku Tamu
                      </button>
                      <p className="small text-muted mt-3 mb-0">
                        Data kunjungan baru akan tercatat sebagai kunjungan setelah diverifikasi petugas.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!foundMember && showWarning && (
                <div className="row justify-content-center">
                  <div className="col-lg-9">
                    <div
                      className="alert d-flex align-items-start justify-content-between mb-0"
                      style={{ backgroundColor: '#fff9db', border: '1px solid #ffc107', color: '#664d03' }}
                      role="alert"
                    >
                      <div className="d-flex align-items-start gap-3">
                        <i className="fa-solid fa-triangle-exclamation mt-1"></i>
                        <div>
                          Perhatian! Silakan masukkan nomor anggota terlebih dahulu untuk melanjutkan pengisian buku tamu.
                          Buku tamu hanya dapat disimpan untuk anggota yang sudah terverifikasi.
                        </div>
                      </div>
                      <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowWarning(false)}></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: BUKAN ANGGOTA */}
        {activeTab === 'nonanggota' && (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-lg-5">
              <div className="text-center mb-4">
                <h4 className="fw-bold mb-2" style={{ color: PRIMARY }}>
                  Buku Tamu Non Anggota
                </h4>
                <p className="text-muted mb-0">Silakan isi data diri Anda untuk tercatat sebagai pengunjung perpustakaan</p>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmitNon();
                }}
              >
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Nama Pengunjung <RequiredMark />
                  </label>
                  <input
                    type="text"
                    className={`form-control ${nonErrors.name ? 'is-invalid' : ''}`}
                    placeholder="Masukkan nama lengkap Anda"
                    style={{ borderRadius: '0.375rem' }}
                    value={nonForm.name}
                    onChange={(event) => updateNonField('name', event.target.value)}
                  />
                  <FieldError message={nonErrors.name} />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Pekerjaan <RequiredMark />
                    </label>
                    <select
                      className={`form-select ${nonErrors.profession ? 'is-invalid' : ''}`}
                      style={{ borderRadius: '0.375rem' }}
                      value={nonForm.profession}
                      onChange={(event) => updateNonField('profession', event.target.value)}
                    >
                      <option value="">-- Pilih Pekerjaan --</option>
                      {PROFESSIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <FieldError message={nonErrors.profession} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Pendidikan Terakhir <RequiredMark />
                    </label>
                    <select
                      className={`form-select ${nonErrors.education ? 'is-invalid' : ''}`}
                      style={{ borderRadius: '0.375rem' }}
                      value={nonForm.education}
                      onChange={(event) => updateNonField('education', event.target.value)}
                    >
                      <option value="">-- Pilih Pendidikan --</option>
                      {EDUCATIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <FieldError message={nonErrors.education} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Jenis Kelamin <RequiredMark />
                    </label>
                    <select
                      className={`form-select ${nonErrors.gender ? 'is-invalid' : ''}`}
                      style={{ borderRadius: '0.375rem' }}
                      value={nonForm.gender}
                      onChange={(event) => updateNonField('gender', event.target.value)}
                    >
                      <option value="">-- Pilih Jenis Kelamin --</option>
                      <option>Laki-laki</option>
                      <option>Perempuan</option>
                    </select>
                    <FieldError message={nonErrors.gender} />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Alamat Sesuai Identitas</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Masukkan alamat lengkap sesuai identitas"
                    style={{ borderRadius: '0.375rem' }}
                    value={nonForm.address}
                    onChange={(event) => updateNonField('address', event.target.value)}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Tujuan Kunjungan <RequiredMark />
                  </label>
                  <select
                    className={`form-select ${nonErrors.purpose ? 'is-invalid' : ''}`}
                    style={{ borderRadius: '0.375rem' }}
                    value={nonForm.purpose}
                    onChange={(event) => updateNonField('purpose', event.target.value)}
                  >
                    <option value="">----- Pilih -----</option>
                    <option>Membaca</option>
                    <option>Meminjam Buku</option>
                    <option>Penelitian</option>
                    <option>Belajar</option>
                    <option>Kegiatan Perpustakaan</option>
                    <option>Lainnya</option>
                  </select>
                  <FieldError message={nonErrors.purpose} />
                </div>

                {/* CAPTCHA sebelum tombol simpan */}
                <div className="mb-4">
                  <CaptchaField
                    id="captcha-nonanggota"
                    code={captchaNonAnggota.code}
                    value={captchaNonAnggota.input}
                    onChange={(value) => {
                      captchaNonAnggota.updateInput(value);
                      setNonCaptchaError(false);
                    }}
                    onRefresh={() => {
                      captchaNonAnggota.refresh();
                      setNonCaptchaError(false);
                    }}
                    error={nonCaptchaError}
                    accent={PRIMARY}
                    labelClassName="form-label fw-semibold"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn text-white px-4 py-2 d-inline-flex align-items-center gap-2"
                    style={{ backgroundColor: PRIMARY, borderColor: PRIMARY }}
                  >
                    <i className="fa-solid fa-book-open"></i> Simpan Buku Tamu
                  </button>
                  <p className="small text-muted mt-3 mb-0">
                    Setelah tersimpan, Anda akan menerima kode booking 6 digit. Tunjukkan kode tersebut kepada petugas untuk
                    diverifikasi agar menjadi data kunjungan.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: ROMBONGAN */}
        {activeTab === 'rombongan' && (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-lg-5">
              <div className="text-center mb-4">
                <h4 className="fw-bold mb-2" style={{ color: PRIMARY }}>
                  Buku Tamu Rombongan
                </h4>
                <p className="text-muted mb-0">Silakan isi data rombongan dan detail anggota untuk tercatat sebagai pengunjung perpustakaan</p>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmitGroup();
                }}
              >
                {/* BAGIAN 1: Data Penanggung Jawab */}
                <div className="p-4 rounded mb-4" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="fa-solid fa-user" style={{ color: PRIMARY }}></i>
                    <h6 className="fw-bold mb-0" style={{ color: PRIMARY }}>
                      Data Penanggung Jawab
                    </h6>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Nama Penanggung Jawab <RequiredMark />
                      </label>
                      <input
                        type="text"
                        className={`form-control ${groupErrors.pjName ? 'is-invalid' : ''}`}
                        style={{ borderRadius: '0.375rem' }}
                        value={groupForm.pjName}
                        onChange={(event) => updateGroupField('pjName', event.target.value)}
                      />
                      <FieldError message={groupErrors.pjName} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Nomor Telepon <RequiredMark />
                      </label>
                      <input
                        type="text"
                        className={`form-control ${groupErrors.pjPhone ? 'is-invalid' : ''}`}
                        placeholder="Contoh: 08123456789"
                        style={{ borderRadius: '0.375rem' }}
                        value={groupForm.pjPhone}
                        onChange={(event) => updateGroupField('pjPhone', event.target.value)}
                      />
                      <FieldError message={groupErrors.pjPhone} />
                    </div>
                  </div>
                </div>

                {/* BAGIAN 2: Data Instansi/Organisasi */}
                <div className="p-4 rounded mb-4" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="fa-solid fa-building" style={{ color: PRIMARY }}></i>
                    <h6 className="fw-bold mb-0" style={{ color: PRIMARY }}>
                      Data Instansi/Organisasi
                    </h6>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Nama Instansi/Organisasi <RequiredMark />
                      </label>
                      <input
                        type="text"
                        className={`form-control ${groupErrors.institution ? 'is-invalid' : ''}`}
                        style={{ borderRadius: '0.375rem' }}
                        value={groupForm.institution}
                        onChange={(event) => updateGroupField('institution', event.target.value)}
                      />
                      <FieldError message={groupErrors.institution} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email Instansi</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Contoh: contoh@instansi.com"
                        style={{ borderRadius: '0.375rem' }}
                        value={groupForm.institutionEmail}
                        onChange={(event) => updateGroupField('institutionEmail', event.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label fw-semibold">Alamat Instansi</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Masukkan alamat lengkap instansi"
                      style={{ borderRadius: '0.375rem' }}
                      value={groupForm.institutionAddress}
                      onChange={(event) => updateGroupField('institutionAddress', event.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* BAGIAN 3: Jumlah Anggota Rombongan */}
                <div className="p-4 rounded mb-4" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="fa-solid fa-users" style={{ color: PRIMARY }}></i>
                    <h6 className="fw-bold mb-0" style={{ color: PRIMARY }}>
                      Jumlah Anggota Rombongan
                    </h6>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Total Anggota <RequiredMark />
                      </label>
                      <input
                        type="number"
                        min="1"
                        className={`form-control ${groupErrors.total ? 'is-invalid' : ''}`}
                        style={{ borderRadius: '0.375rem' }}
                        value={groupForm.total}
                        onChange={(event) => updateGroupField('total', event.target.value)}
                      />
                      <FieldError message={groupErrors.total} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Laki-laki</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        style={{ borderRadius: '0.375rem' }}
                        value={groupForm.male}
                        onChange={(event) => updateGroupField('male', event.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Perempuan</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        style={{ borderRadius: '0.375rem' }}
                        value={groupForm.female}
                        onChange={(event) => updateGroupField('female', event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* BAGIAN 4: Komposisi Berdasarkan Profesi */}
                <div className="p-4 rounded mb-4" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="fa-solid fa-briefcase" style={{ color: PRIMARY }}></i>
                    <h6 className="fw-bold mb-0" style={{ color: PRIMARY }}>
                      Komposisi Berdasarkan Profesi
                    </h6>
                  </div>
                  <div className="row g-3">
                    {GROUP_PROFESSIONS.map((item) => (
                      <div className="col-6 col-md-4 col-lg-2" key={item}>
                        <label className="form-label small">{item}</label>
                        <input
                          type="number"
                          min="0"
                          className="form-control form-control-sm"
                          style={{ borderRadius: '0.375rem' }}
                          value={groupForm.profession[item]}
                          onChange={(event) => updateGroupNested('profession', item, event.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* BAGIAN 5: Komposisi Berdasarkan Pendidikan */}
                <div className="p-4 rounded mb-4" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="fa-solid fa-graduation-cap" style={{ color: PRIMARY }}></i>
                    <h6 className="fw-bold mb-0" style={{ color: PRIMARY }}>
                      Komposisi Berdasarkan Pendidikan
                    </h6>
                  </div>
                  <div className="row g-3">
                    {GROUP_EDUCATIONS.map((item) => (
                      <div className="col-6 col-md-4 col-lg-2" key={item}>
                        <label className="form-label small">{item}</label>
                        <input
                          type="number"
                          min="0"
                          className="form-control form-control-sm"
                          style={{ borderRadius: '0.375rem' }}
                          value={groupForm.education[item]}
                          onChange={(event) => updateGroupNested('education', item, event.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* BAGIAN 6: Informasi Tambahan */}
                <div className="p-4 rounded mb-4" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="fa-solid fa-circle-info" style={{ color: PRIMARY }}></i>
                    <h6 className="fw-bold mb-0" style={{ color: PRIMARY }}>
                      Informasi Tambahan
                    </h6>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Telepon Instansi</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contoh: 021-1234567"
                        style={{ borderRadius: '0.375rem' }}
                        value={groupForm.institutionPhone}
                        onChange={(event) => updateGroupField('institutionPhone', event.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Tujuan Kunjungan <RequiredMark />
                      </label>
                      <select
                        className={`form-select ${groupErrors.purpose ? 'is-invalid' : ''}`}
                        style={{ borderRadius: '0.375rem' }}
                        value={groupForm.purpose}
                        onChange={(event) => updateGroupField('purpose', event.target.value)}
                      >
                        <option value="">----- Pilih -----</option>
                        <option>Kunjungan Study Banding</option>
                        <option>Membaca Bersama</option>
                        <option>Penelitian</option>
                        <option>Kegiatan Literasi</option>
                        <option>Lainnya</option>
                      </select>
                      <FieldError message={groupErrors.purpose} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label fw-semibold">Keterangan Tambahan (opsional)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Masukkan keterangan atau catatan tambahan (opsional)"
                      style={{ borderRadius: '0.375rem' }}
                      value={groupForm.notes}
                      onChange={(event) => updateGroupField('notes', event.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* CAPTCHA sebelum tombol simpan */}
                <div className="mb-4">
                  <CaptchaField
                    id="captcha-rombongan"
                    code={captchaRombongan.code}
                    value={captchaRombongan.input}
                    onChange={(value) => {
                      captchaRombongan.updateInput(value);
                      setGroupCaptchaError(false);
                    }}
                    onRefresh={() => {
                      captchaRombongan.refresh();
                      setGroupCaptchaError(false);
                    }}
                    error={groupCaptchaError}
                    accent={PRIMARY}
                    labelClassName="form-label fw-semibold"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn text-white px-4 py-2 d-inline-flex align-items-center gap-2"
                    style={{ backgroundColor: PRIMARY, borderColor: PRIMARY }}
                  >
                    <i className="fa-solid fa-book-open"></i> Simpan Buku Tamu Rombongan
                  </button>
                  <p className="small text-muted mt-3 mb-0">
                    Setelah tersimpan, Anda akan menerima kode booking 6 digit untuk diverifikasi petugas.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <VisitProofModal
        show={Boolean(proofVisit)}
        visit={proofVisit}
        onClose={() => {
          setProofVisit(null);
          refreshTotal();
        }}
      />
    </section>
  );
}
