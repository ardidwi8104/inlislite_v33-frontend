import React, { useState } from 'react';
import Modal from './Modal';
import QRCodeImage from './QRCodeImage';
import BarcodeImage from './BarcodeImage';
import {
  DEFAULT_DUTY_OFFICER,
  formatDateID,
  formatDateTimeID,
  visitQrPayload,
} from '../lib/libraryStore';
import { downloadVisitProofPdf } from '../lib/pdfDocs';

const TYPE_LABELS = {
  anggota: 'Anggota',
  nonanggota: 'Non Anggota',
  rombongan: 'Rombongan',
};

function StatusBadge({ status }) {
  const config = {
    pending: { className: 'bg-warning text-dark', icon: 'fa-clock', text: 'Menunggu Verifikasi Petugas' },
    verified: { className: 'bg-success text-white', icon: 'fa-circle-check', text: 'Kunjungan Terverifikasi' },
    rejected: { className: 'bg-danger text-white', icon: 'fa-circle-xmark', text: 'Pengajuan Ditolak' },
  }[status] || { className: 'bg-secondary text-white', icon: 'fa-circle-info', text: status };

  return (
    <span
      className={`badge ${config.className} px-3 py-2 d-inline-flex align-items-center gap-2`}
      style={{ fontSize: '0.875rem' }}
    >
      <i className={`fa-solid ${config.icon}`}></i>
      {config.text}
    </span>
  );
}

export default function VisitProofModal({ show, visit, onClose, onVerified }) {
  const [pdfError, setPdfError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!visit) return null;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(visit.bookingCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    setPdfError('');
    try {
      await downloadVisitProofPdf(visit);
    } catch (error) {
      setPdfError('Gagal membuat PDF. Silakan coba lagi.');
    } finally {
      setDownloading(false);
    }
  };

  const verifier = visit.verification;
  const dutyOfficer = DEFAULT_DUTY_OFFICER;

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={
        visit.status === 'verified'
          ? 'Bukti Kunjungan Terverifikasi'
          : visit.status === 'rejected'
          ? 'Pengajuan Kunjungan Ditolak'
          : 'Buku Tamu Berhasil Disimpan'
      }
      subtitle={`Kode booking ${visit.bookingCode} · ${formatDateID(visit.visitDate)}`}
      icon="fa-ticket-simple"
      accent={visit.status === 'verified' ? '#15803D' : '#1b3878'}
      size="lg"
      footer={
        <>
          <button type="button" className="btn btn-light border fw-semibold" onClick={onClose}>
            Tutup
          </button>
          <button
            type="button"
            className="btn btn-primary fw-semibold d-inline-flex align-items-center gap-2"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? (
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            ) : (
              <i className="fa-solid fa-file-pdf" aria-hidden="true"></i>
            )}
            Unduh Bukti PDF
          </button>
        </>
      }
    >
      {pdfError && (
        <div className="alert alert-danger py-2 px-3 small" role="alert">
          <i className="fa-solid fa-circle-exclamation me-2"></i>
          {pdfError}
        </div>
      )}

      <div className="text-center mb-3">
        <StatusBadge status={visit.status} />
      </div>

      <div
        className={`alert ${visit.status === 'verified' ? 'alert-success' : visit.status === 'rejected' ? 'alert-danger' : 'alert-warning'} small`}
        role="alert"
      >
        <i className="fa-solid fa-circle-info me-2"></i>
        {visit.status === 'verified'
          ? 'Kunjungan ini sudah diverifikasi petugas dan tercatat sebagai data kunjungan perpustakaan.'
          : visit.status === 'rejected'
          ? `Pengajuan kunjungan ditolak petugas.${visit.rejectedReason ? ` Alasan: ${visit.rejectedReason}` : ''}`
          : 'Kunjungan belum tercatat. Tunjukkan kode booking, barcode, atau QR Code ini kepada petugas perpustakaan untuk diverifikasi.'}
      </div>

      <div className="row g-4 align-items-center">
        <div className="col-md-7">
          <div
            className="p-3 p-md-4 rounded-4 text-white position-relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1b3878 0%, #14245a 100%)' }}
          >
            <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
              <div>
                <div className="small text-white-50 text-uppercase fw-semibold" style={{ letterSpacing: '0.08em' }}>
                  Kode Booking
                </div>
                <div className="display-5 fw-bold font-monospace" style={{ letterSpacing: '0.15em' }}>
                  {visit.bookingCode}
                </div>
              </div>
              <span className="badge bg-white text-dark px-3 py-2">{TYPE_LABELS[visit.type] || visit.type}</span>
            </div>

            <div className="rounded-3 bg-white p-2 mb-2">
              <BarcodeImage value={visit.barcode} height={44} fontSize={11} />
            </div>
            <div className="d-flex justify-content-between align-items-center gap-2">
              <div className="small text-white-50 font-monospace text-break">{visit.barcode}</div>
              <button
                type="button"
                className="btn btn-sm btn-light fw-semibold flex-shrink-0"
                onClick={copyCode}
                title="Salin kode booking"
              >
                <i className={`fa-solid ${copied ? 'fa-check text-success' : 'fa-copy'}`}></i>
                <span className="ms-1 d-none d-sm-inline">{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-5 text-center">
          <QRCodeImage value={visitQrPayload(visit)} size={190} alt={`QR Code kunjungan ${visit.bookingCode}`} />
        </div>
      </div>

      <div className="row g-3 mt-1">
        <div className="col-sm-6">
          <div className="border rounded-3 p-3 h-100 bg-light">
            <div className="text-muted small">Nama Pengunjung</div>
            <div className="fw-bold text-dark">{visit.name || '-'}</div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="border rounded-3 p-3 h-100 bg-light">
            <div className="text-muted small">Nomor Identitas / Anggota</div>
            <div className="fw-bold text-dark">{visit.identityNo || visit.memberNo || '-'}</div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="border rounded-3 p-3 h-100 bg-light">
            <div className="text-muted small">Tanggal / Waktu Pengajuan</div>
            <div className="fw-semibold text-dark">{formatDateID(visit.visitDate)}</div>
            <div className="small text-muted">{formatDateTimeID(visit.createdAt)}</div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="border rounded-3 p-3 h-100 bg-light">
            <div className="text-muted small">Tujuan Kunjungan</div>
            <div className="fw-semibold text-dark">{visit.purpose || '-'}</div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-1">
        <div className="col-md-6">
          <div className="border rounded-3 p-3 h-100" style={{ borderColor: '#DBEAFE' }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{ width: '32px', height: '32px', backgroundColor: '#f8f9fa', color: '#1b3878' }}
              >
                <i className="fa-solid fa-user-shield"></i>
              </span>
              <div className="fw-bold" style={{ color: '#1b3878' }}>
                Petugas Jaga
              </div>
            </div>
            <div className="fw-semibold">{dutyOfficer.name}</div>
            <div className="small text-muted">{dutyOfficer.jabatan}</div>
            <div className="small text-muted">NIP: {dutyOfficer.nip}</div>
            <div className="small text-muted">{dutyOfficer.shift}</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="border rounded-3 p-3 h-100" style={{ borderColor: visit.status === 'verified' ? '#BBF7D0' : '#FDE68A' }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: visit.status === 'verified' ? '#f0fff4' : '#fff9db',
                  color: visit.status === 'verified' ? '#15803D' : '#B45309',
                }}
              >
                <i className="fa-solid fa-user-check"></i>
              </span>
              <div className="fw-bold" style={{ color: visit.status === 'verified' ? '#15803D' : '#B45309' }}>
                Diverifikasi Oleh
              </div>
            </div>
            {verifier ? (
              <>
                <div className="fw-semibold">{verifier.name}</div>
                <div className="small text-muted">{verifier.jabatan}</div>
                <div className="small text-muted">NIP: {verifier.nip}</div>
                <div className="small text-muted">{formatDateTimeID(verifier.verifiedAt)}</div>
                {visit.verificationNote && <div className="small text-muted mt-1">Catatan: {visit.verificationNote}</div>}
              </>
            ) : (
              <>
                <div className="fw-semibold text-muted">Menunggu verifikasi petugas</div>
                <div className="small text-muted">Data ini belum masuk sebagai kunjungan sampai diverifikasi.</div>
              </>
            )}
          </div>
        </div>
      </div>

      {visit.status === 'pending' && (
        <div className="alert alert-info small mt-3 mb-0" role="status">
          <i className="fa-solid fa-barcode me-2"></i>
          Untuk validasi, petugas dapat memindai barcode atau memasukkan kode booking <strong>{visit.bookingCode}</strong> pada
          menu <strong>Backoffice &gt; Buku Tamu</strong>.
        </div>
      )}

      {onVerified && visit.status === 'verified' && (
        <div className="text-end mt-3">
          <button type="button" className="btn btn-sm btn-outline-success fw-semibold" onClick={onVerified}>
            <i className="fa-solid fa-arrow-right me-1"></i> Lihat Data Kunjungan
          </button>
        </div>
      )}
    </Modal>
  );
}

