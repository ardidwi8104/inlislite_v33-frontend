import React, { useState } from 'react';
import Modal from '../components/Modal';
import QRCodeImage from '../components/QRCodeImage';
import BarcodeImage from '../components/BarcodeImage';
import {
  findMemberByCode,
  formatDateID,
  formatDateTimeID,
  getActiveOfficer,
  getLibraryStats,
  markMemberCardPrinted,
  memberQrPayload,
  rejectMemberRegistration,
  searchMembers,
  verifyMemberRegistration,
} from '../lib/libraryStore';
import { downloadMemberCardPdf } from '../lib/pdfDocs';

const STATUS_CONFIG = {
  pending: { className: 'bg-warning text-dark', icon: 'fa-clock', text: 'Menunggu Verifikasi' },
  active: { className: 'bg-success text-white', icon: 'fa-circle-check', text: 'Anggota Aktif' },
  rejected: { className: 'bg-danger text-white', icon: 'fa-circle-xmark', text: 'Ditolak' },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { className: 'bg-secondary text-white', icon: 'fa-circle-info', text: status };
  return (
    <span className={`badge ${config.className} px-2 py-1`} style={{ fontSize: '0.72rem' }}>
      <i className={`fa-solid ${config.icon} me-1`}></i>
      {config.text}
    </span>
  );
}

function DataLine({ label, value }) {
  return (
    <div className="mb-2">
      <div className="text-muted small">{label}</div>
      <div className="fw-semibold text-dark">{value || '-'}</div>
    </div>
  );
}

function AddressBlock({ title, address }) {
  if (!address) return null;
  const parts = [address.alamatLengkap, address.kelurahan, address.kecamatan, address.kota, address.provinsi].filter(Boolean);
  return (
    <div className="mb-3">
      <div className="text-muted small">{title}</div>
      <div className="fw-semibold text-dark">{parts.join(', ')}</div>
    </div>
  );
}

function MemberCardPreview({ member }) {
  return (
    <div
      className="rounded-3 text-white p-3 position-relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1b3878 0%, #14245a 100%)', minHeight: '178px' }}
    >
      <div className="d-flex justify-content-between align-items-start gap-2">
        <div>
          <div className="fw-bold" style={{ fontSize: '0.95rem' }}>
            KARTU ANGGOTA PERPUSTAKAAN
          </div>
          <div className="small text-white-50">Perpustakaan Mitra - INLISLite</div>
        </div>
        <i className="fa-solid fa-book-open-reader fa-lg opacity-75"></i>
      </div>
      <div className="row g-2 mt-2 align-items-end">
        <div className="col-7">
          <div className="text-white-50" style={{ fontSize: '0.875rem' }}>
            NAMA ANGGOTA
          </div>
          <div className="fw-bold text-truncate">{member.name}</div>
          <div className="text-white-50 mt-2" style={{ fontSize: '0.875rem' }}>
            NO. ANGGOTA
          </div>
          <div className="fw-bold font-monospace small">{member.memberNo}</div>
          <div className="text-white-50 mt-2" style={{ fontSize: '0.875rem' }}>
            BERLAKU S.D.
          </div>
          <div className="fw-semibold small">
            {member.validUntil ? formatDateID(new Date(member.validUntil).toISOString().slice(0, 10)) : '-'}
          </div>
        </div>
        <div className="col-5 text-center">
          <div className="bg-white rounded p-1 d-inline-block">
            <QRCodeImage value={memberQrPayload(member)} size={72} alt="QR kartu anggota" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded p-1 mt-2">
        <BarcodeImage value={member.memberNo} height={26} fontSize={9} />
      </div>
    </div>
  );
}

export default function KeanggotaanValidation({ role = 'petugas', initialStatus = 'pending' }) {
  const officer = getActiveOfficer(role);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [dateFilter, setDateFilter] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [actionMessage, setActionMessage] = useState(null);
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [printing, setPrinting] = useState(false);
  const [, setRefreshKey] = useState(0);

  const stats = getLibraryStats();
  const members = searchMembers({ query: appliedQuery, status: statusFilter, date: dateFilter });
  const refresh = () => setRefreshKey((value) => value + 1);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchError('');
    setActionMessage(null);
    const key = query.trim();
    setAppliedQuery(key);

    if (!key) return;

    const found = findMemberByCode(key);
    if (found) {
      setSelectedMember(found);
      setRejectMode(false);
      setRejectReason('');
      return;
    }

    const matches = searchMembers({ query: key, status: 'all', date: '' });
    if (matches.length === 0) {
      setSearchError(`Kode pendaftaran/barcode "${key}" tidak ditemukan. Periksa kembali kode yang diberikan pendaftar.`);
    }
  };

  const openDetail = (member) => {
    setSelectedMember(member);
    setActionMessage(null);
    setRejectMode(false);
    setRejectReason('');
  };

  const handleVerify = () => {
    if (!selectedMember) return;
    const result = verifyMemberRegistration(selectedMember.id, officer);
    if (!result.ok) {
      setActionMessage({ type: 'danger', text: result.message });
      return;
    }
    setSelectedMember(result.member);
    setActionMessage({ type: 'success', text: `${result.message} Kartu anggota sudah dapat dicetak.` });
    refresh();
  };

  const handleReject = () => {
    if (!selectedMember) return;
    if (!rejectReason.trim()) {
      setActionMessage({ type: 'danger', text: 'Alasan penolakan wajib diisi.' });
      return;
    }

    const result = rejectMemberRegistration(selectedMember.id, officer, rejectReason);
    if (!result.ok) {
      setActionMessage({ type: 'danger', text: result.message });
      return;
    }
    setSelectedMember(result.member);
    setActionMessage({ type: 'success', text: result.message });
    setRejectMode(false);
    refresh();
  };

  const handlePrintCard = async () => {
    if (!selectedMember || selectedMember.status !== 'active') return;
    setPrinting(true);
    try {
      await downloadMemberCardPdf(selectedMember);
      markMemberCardPrinted(selectedMember.id);
      setSelectedMember((prev) => ({ ...prev, cardPrintedAt: new Date().toISOString() }));
      setActionMessage({ type: 'success', text: 'Kartu anggota berhasil dibuat dalam format PDF.' });
      refresh();
    } catch (error) {
      setActionMessage({ type: 'danger', text: 'Gagal membuat kartu anggota PDF. Silakan coba lagi.' });
    } finally {
      setPrinting(false);
    }
  };

  return (
    <div>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true"><i className="fa-solid fa-user-check"></i></span>
          <div>
            <h1 className="berita-topbar-title">{initialStatus === 'active' ? 'Anggota Aktif' : 'Validasi & Kartu Anggota'}</h1>
            <p className="berita-topbar-sub">Keanggotaan</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-house" aria-hidden="true"></i> Beranda</a>
          <span aria-hidden="true">/</span>
          <span>Keanggotaan</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">{initialStatus === 'active' ? 'Anggota Aktif' : 'Validasi & Kartu Anggota'}</span>
        </nav>
      </div>

      {actionMessage && (
        <div className={`alert alert-${actionMessage.type} d-flex align-items-center gap-2 py-2 px-3`} role="alert">
          <i className={`fa-solid ${actionMessage.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
          {actionMessage.text}
        </div>
      )}

      <div className="bo-stat-grid" role="list" aria-label="Ringkasan keanggotaan">
        <div className="bo-stat" role="listitem">
          <span className="bo-stat-label">Menunggu validasi</span>
          <strong className="bo-stat-value">{stats.pendingMembers}</strong>
          <span className="bo-stat-note">Pendaftaran yang perlu diperiksa</span>
        </div>
        <div className="bo-stat" role="listitem">
          <span className="bo-stat-label">Anggota aktif</span>
          <strong className="bo-stat-value">{stats.activeMembers}</strong>
          <span className="bo-stat-note">Sudah diverifikasi</span>
        </div>
        <div className="bo-stat" role="listitem">
          <span className="bo-stat-label">Pendaftaran ditolak</span>
          <strong className="bo-stat-value">{stats.rejectedMembers}</strong>
          <span className="bo-stat-note">Tidak lolos verifikasi</span>
        </div>
        <div className="bo-stat" role="listitem">
          <span className="bo-stat-label">Total pendaftar</span>
          <strong className="bo-stat-value">{stats.activeMembers + stats.pendingMembers}</strong>
          <span className="bo-stat-note">Anggota aktif dan yang menunggu</span>
        </div>
      </div>

      <div className="bo-panel mb-4">
        <div className="p-3 p-md-4">
          <form onSubmit={handleSearch}>
            <label className="form-label fw-semibold" style={{ color: '#1b3878' }}>
              <i className="fa-solid fa-barcode me-2 text-primary"></i>
              Input / Scan Barcode atau Kode Pendaftaran
            </label>
            <div className="d-flex flex-column flex-md-row gap-2">
              <input
                type="text"
                className="form-control form-control-lg font-monospace"
                placeholder="Contoh: REG-2026-300001"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSearchError('');
                }}
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary btn-lg px-4 fw-semibold flex-shrink-0">
                <i className="fa-solid fa-magnifying-glass me-2"></i>
                Cari Pendaftaran
              </button>
            </div>
            <div className="small text-muted mt-2">
              Gunakan scanner barcode (mode keyboard) atau ketik kode pendaftaran, nomor identitas, atau nomor anggota.
            </div>
            {searchError && (
              <div className="alert alert-danger small mt-3 mb-0" role="alert">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {searchError}
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="bo-panel">
        <div className="p-3 p-md-4">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-3">
            <div>
              <h6 className="fw-bold mb-0" style={{ color: '#1b3878' }}>
                <i className="fa-solid fa-list-check me-2 text-primary"></i>
                Daftar Pendaftaran Anggota
              </h6>
              <div className="small text-muted">Validasi data pendaftar sebelum menerbitkan kartu anggota.</div>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <input
                type="date"
                className="form-control form-control-sm"
                style={{ width: '165px' }}
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                title="Filter tanggal pendaftaran"
              />
              <select
                className="form-select form-select-sm"
                style={{ width: '175px' }}
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="pending">Menunggu Verifikasi</option>
                <option value="active">Anggota Aktif</option>
                <option value="rejected">Ditolak</option>
              </select>
              <button type="button" className="btn btn-sm btn-outline-secondary fw-semibold" onClick={() => setDateFilter('')}>
                Semua Tanggal
              </button>
            </div>
          </div>

          {appliedQuery && (
            <div className="alert alert-info py-2 px-3 small d-flex justify-content-between align-items-center">
              <span>
                Filter pencarian: <strong>{appliedQuery}</strong>
              </span>
              <button
                type="button"
                className="btn btn-sm btn-link p-0 text-decoration-none"
                onClick={() => {
                  setAppliedQuery('');
                  setQuery('');
                }}
              >
                Hapus filter
              </button>
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
              <thead className="table-light">
                <tr>
                  <th>Kode Pendaftaran</th>
                  <th>Nama</th>
                  <th>Identitas</th>
                  <th>Tanggal Daftar</th>
                  <th>Status</th>
                  <th>No. Anggota</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      <i className="fa-regular fa-folder-open fa-2x mb-2 d-block opacity-50"></i>
                      Tidak ada data pendaftaran untuk filter ini.
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member.id}>
                      <td>
                        <div className="fw-bold font-monospace" style={{ color: '#0e7490' }}>
                          {member.registrationCode}
                        </div>
                        <div className="small text-muted font-monospace">{member.barcode}</div>
                      </td>
                      <td>
                        <div className="fw-semibold">{member.name}</div>
                        <div className="small text-muted">{member.email || member.phone || '-'}</div>
                      </td>
                      <td>
                        <div>{member.identityType}</div>
                        <div className="small text-muted font-monospace">{member.identityNo}</div>
                      </td>
                      <td>
                        <div>{formatDateID(String(member.submittedAt).slice(0, 10))}</div>
                        <div className="small text-muted">{formatDateTimeID(member.submittedAt)}</div>
                      </td>
                      <td>
                        <StatusBadge status={member.status} />
                      </td>
                      <td className="font-monospace small">{member.memberNo || '-'}</td>
                      <td className="text-center">
                        <div className="d-inline-flex gap-1">
                          <button type="button" className="btn btn-sm btn-primary" onClick={() => openDetail(member)} title="Periksa data / kartu anggota">
                            <i className="fa-solid fa-clipboard-check"></i>
                          </button>
                          {member.status === 'active' && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={async () => {
                                setPrinting(true);
                                try {
                                  await downloadMemberCardPdf(member);
                                  markMemberCardPrinted(member.id);
                                  setActionMessage({ type: 'success', text: `Kartu anggota ${member.name} berhasil dibuat (PDF).` });
                                  refresh();
                                } catch (e) {
                                  setActionMessage({ type: 'danger', text: 'Gagal membuat kartu anggota PDF. Silakan coba lagi.' });
                                } finally {
                                  setPrinting(false);
                                }
                              }}
                              disabled={printing}
                              title="Cetak kartu anggota (PDF)"
                              aria-label={`Cetak kartu anggota PDF ${member.name}`}
                            >
                              <i className="fa-solid fa-file-pdf" aria-hidden="true"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        show={Boolean(selectedMember)}
        onClose={() => setSelectedMember(null)}
        title={selectedMember?.status === 'active' ? 'Kartu Anggota & Data Pendaftaran' : 'Periksa Pendaftaran Anggota'}
        subtitle={selectedMember ? `Kode pendaftaran ${selectedMember.registrationCode}` : ''}
        icon="fa-id-card"
        accent="#0e7490"
        size="lg"
        footer={
          selectedMember ? (
            <>
              <button type="button" className="btn btn-light border fw-semibold" onClick={() => setSelectedMember(null)}>
                Tutup
              </button>
              {selectedMember.status === 'pending' && (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-danger fw-semibold"
                    onClick={() => setRejectMode((value) => !value)}
                  >
                    <i className="fa-solid fa-ban me-1"></i> Tolak
                  </button>
                  <button type="button" className="btn btn-success fw-semibold" onClick={handleVerify}>
                    <i className="fa-solid fa-circle-check me-1"></i> Verifikasi &amp; Aktifkan
                  </button>
                </>
              )}
              {selectedMember.status === 'active' && (
                <button
                  type="button"
                  className="btn text-white fw-semibold d-inline-flex align-items-center gap-2"
                  style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
                  onClick={handlePrintCard}
                  disabled={printing}
                  title="Unduh kartu anggota format PDF"
                >
                  {printing ? (
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  ) : (
                    <i className="fa-solid fa-file-pdf" aria-hidden="true"></i>
                  )}
                  {printing ? 'Membuat PDF...' : 'Cetak Kartu Anggota (PDF)'}
                </button>
              )}
            </>
          ) : null
        }
      >
        {selectedMember && (
          <>
            {actionMessage && (
              <div className={`alert alert-${actionMessage.type} py-2 px-3 small`} role="alert">
                {actionMessage.text}
              </div>
            )}

            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
              <StatusBadge status={selectedMember.status} />
              {selectedMember.memberNo && (
                <span className="badge bg-light text-dark border font-monospace">No. Anggota: {selectedMember.memberNo}</span>
              )}
            </div>

            {selectedMember.status === 'active' && (
              <div className="mb-4">
                <MemberCardPreview member={selectedMember} />
                <div className="small text-muted mt-2">
                  Pratinjau kartu. Klik "Cetak Kartu Anggota PDF" untuk mengunduh kartu ukuran standar (85,6 x 54 mm).
                </div>
              </div>
            )}

            <div className="row g-3">
              <div className="col-md-6">
                <div className="border rounded-3 p-3 h-100 bg-light">
                  <DataLine label="Nama Lengkap" value={selectedMember.name} />
                  <DataLine label="Jenis Identitas" value={selectedMember.identityType} />
                  <DataLine label="Nomor Identitas" value={selectedMember.identityNo} />
                  <DataLine label="Email" value={selectedMember.email} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded-3 p-3 h-100 bg-light">
                  <DataLine label="No. HP" value={selectedMember.phone} />
                  <DataLine label="Tempat / Tanggal Lahir" value={`${selectedMember.placeOfBirth || '-'}, ${formatDateID(selectedMember.dateOfBirth)}`} />
                  <DataLine label="Jenis Kelamin" value={selectedMember.gender} />
                  <DataLine label="Tanggal Daftar" value={formatDateTimeID(selectedMember.submittedAt)} />
                </div>
              </div>
            </div>

            <div className="border rounded-3 p-3 mt-3 bg-light">
              <AddressBlock title="Alamat Sesuai Identitas" address={selectedMember.address} />
              <AddressBlock title="Alamat Saat Ini" address={selectedMember.currentAddress} />
            </div>

            {selectedMember.status === 'pending' && (
              <>
                <div className="border rounded-3 p-3 mt-3" style={{ borderColor: '#DBEAFE' }}>
                  <div className="fw-semibold small mb-2" style={{ color: '#1b3878' }}>
                    <i className="fa-solid fa-user-shield me-1"></i> Petugas yang memverifikasi
                  </div>
                  <div className="row g-2 small">
                    <div className="col-sm-6">
                      <span className="text-muted">Nama: </span>
                      <span className="fw-semibold">{officer.name}</span>
                    </div>
                    <div className="col-sm-6">
                      <span className="text-muted">NIP: </span>
                      <span className="fw-semibold">{officer.nip}</span>
                    </div>
                    <div className="col-sm-6">
                      <span className="text-muted">Jabatan: </span>
                      <span className="fw-semibold">{officer.jabatan}</span>
                    </div>
                    <div className="col-sm-6">
                      <span className="text-muted">Shift: </span>
                      <span className="fw-semibold">{officer.shift}</span>
                    </div>
                  </div>
                </div>

                {rejectMode && (
                  <div className="mt-3">
                    <label className="form-label small fw-semibold text-danger">Alasan penolakan *</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Contoh: data identitas tidak sesuai / dokumen pendukung tidak lengkap"
                      value={rejectReason}
                      onChange={(event) => setRejectReason(event.target.value)}
                    ></textarea>
                    <button type="button" className="btn btn-danger btn-sm mt-2 fw-semibold" onClick={handleReject}>
                      <i className="fa-solid fa-ban me-1"></i> Konfirmasi Tolak
                    </button>
                  </div>
                )}
              </>
            )}

            {selectedMember.verification && (
              <div className="alert alert-success small mt-3 mb-0">
                <div className="fw-semibold mb-1">
                  <i className="fa-solid fa-user-check me-1"></i>
                  {selectedMember.status === 'rejected' ? 'Ditolak oleh' : 'Diverifikasi oleh'}
                </div>
                {selectedMember.verification.name} Â· NIP {selectedMember.verification.nip}
                <br />
                {formatDateTimeID(selectedMember.verification.verifiedAt)}
                {selectedMember.rejectedReason && (
                  <>
                    <br />
                    Alasan: {selectedMember.rejectedReason}
                  </>
                )}
              </div>
            )}

            {selectedMember.status === 'active' && selectedMember.cardPrintedAt && (
              <div className="small text-muted mt-2">
                <i className="fa-solid fa-print me-1"></i>
                Kartu terakhir dicetak: {formatDateTimeID(selectedMember.cardPrintedAt)}
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}



