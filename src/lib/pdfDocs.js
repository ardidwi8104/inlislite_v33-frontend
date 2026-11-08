import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import {
  formatDateID,
  formatDateTimeID,
  memberQrPayload,
  visitQrPayload,
} from './libraryStore';

const NAVY = [30, 58, 138];
const DARK = [15, 23, 42];
const MUTED = [100, 116, 139];
const GREEN = [22, 163, 74];
const AMBER = [217, 119, 6];
const RED = [220, 38, 38];

function qrDataUrl(value, width = 320) {
  return QRCode.toDataURL(String(value), {
    width,
    margin: 1,
    errorCorrectionLevel: 'M',
    color: { dark: '#14245a', light: '#FFFFFF' },
  });
}

function barcodeDataUrl(value) {
  try {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, String(value), {
      format: 'CODE128',
      width: 2,
      height: 46,
      displayValue: false,
      margin: 2,
      lineColor: '#14245a',
      background: '#FFFFFF',
    });
    return canvas.toDataURL('image/png');
  } catch (error) {
    return '';
  }
}

function statusColor(status) {
  if (status === 'verified' || status === 'active') return GREEN;
  if (status === 'rejected') return RED;
  return AMBER;
}

function statusText(status) {
  if (status === 'verified') return 'TERVERIFIKASI';
  if (status === 'active') return 'ANGGOTA AKTIF';
  if (status === 'rejected') return 'DITOLAK';
  return 'MENUNGGU VERIFIKASI PETUGAS';
}

function addLabelValue(doc, label, value, x, y, labelWidth = 30) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(label, x, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK);
  doc.text(String(value || '-'), x + labelWidth, y);
}

export async function downloadVisitProofPdf(visit) {
  const doc = new jsPDF({ unit: 'mm', format: 'a5' });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageWidth, 34, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text('BUKTI KUNJUNGAN', 14, 14);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Perpustakaan Mitra - INLISLite', 14, 21);
  doc.setFontSize(7.5);
  doc.text(`Dicetak: ${formatDateTimeID(new Date().toISOString())}`, 14, 27);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(12, 40, pageWidth - 24, 33, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('KODE BOOKING', 18, 49);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(25);
  doc.setTextColor(...NAVY);
  doc.text(String(visit.bookingCode), 18, 60);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MUTED);
  doc.text('STATUS', 18, 67);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...statusColor(visit.status));
  doc.text(statusText(visit.status), 40, 67);

  const qr = await qrDataUrl(visitQrPayload(visit), 320);
  doc.addImage(qr, 'PNG', pageWidth - 47, 43, 30, 30);

  let y = 81;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  addLabelValue(doc, 'Nama Pengunjung', visit.name, 14, y);
  y += 6;
  addLabelValue(doc, 'Jenis Kunjungan', visit.type === 'anggota' ? 'Anggota' : visit.type === 'rombongan' ? 'Rombongan' : 'Non Anggota', 14, y);
  y += 6;
  addLabelValue(doc, 'Nomor Identitas', visit.identityNo || visit.memberNo || '-', 14, y);
  y += 6;
  addLabelValue(doc, 'Tanggal Kunjungan', formatDateID(visit.visitDate), 14, y);
  y += 6;
  addLabelValue(doc, 'Tujuan Kunjungan', visit.purpose || '-', 14, y);
  y += 6;
  addLabelValue(doc, 'Barcode', visit.barcode, 14, y);
  y += 6;
  addLabelValue(doc, 'Token', visit.token, 14, y);

  y += 10;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, pageWidth - 14, y);
  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...DARK);
  doc.text('INFORMASI PETUGAS', 14, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  addLabelValue(doc, 'Petugas Verifikator', visit.verification ? visit.verification.name : 'Belum diverifikasi', 14, y, 35);
  y += 5.5;
  addLabelValue(doc, 'NIP', visit.verification ? visit.verification.nip : '-', 14, y, 35);
  y += 5.5;
  addLabelValue(doc, 'Waktu Verifikasi', visit.verification ? formatDateTimeID(visit.verification.verifiedAt) : '-', 14, y, 35);

  y += 8;
  doc.setFillColor(255, 251, 235);
  doc.setDrawColor(251, 191, 36);
  doc.roundedRect(12, y, pageWidth - 24, 18, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 53, 15);
  doc.text(
    visit.status === 'verified'
      ? 'Bukti kunjungan ini sudah diverifikasi petugas dan sah sebagai data kunjungan perpustakaan.'
      : 'Bukti ini belum menjadi data kunjungan. Tunjukkan kode booking/barcode kepada petugas untuk verifikasi.',
    16,
    y + 7,
    { maxWidth: pageWidth - 32 }
  );

  doc.setFontSize(6.8);
  doc.setTextColor(...MUTED);
  doc.text('Dokumen dibuat otomatis oleh sistem INLISLite. Simpan bukti ini selama kunjungan.', 14, 205);

  doc.save(`Bukti-Kunjungan-${visit.bookingCode}.pdf`);
}

export async function downloadRegistrationProofPdf(member) {
  const doc = new jsPDF({ unit: 'mm', format: 'a5' });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageWidth, 34, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('BUKTI PENDAFTARAN ANGGOTA', 14, 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Perpustakaan Mitra - INLISLite', 14, 21);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(12, 40, pageWidth - 24, 33, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('KODE PENDAFTARAN', 18, 49);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...NAVY);
  doc.text(String(member.registrationCode), 18, 60);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MUTED);
  doc.text('STATUS', 18, 67);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...statusColor(member.status));
  doc.text(statusText(member.status), 40, 67);

  const qr = await qrDataUrl(memberQrPayload(member), 320);
  doc.addImage(qr, 'PNG', pageWidth - 47, 43, 30, 30);

  let y = 82;
  addLabelValue(doc, 'Nama Lengkap', member.name, 14, y, 33);
  y += 6;
  addLabelValue(doc, 'Nomor Identitas', member.identityNo, 14, y, 33);
  y += 6;
  addLabelValue(doc, 'Email', member.email, 14, y, 33);
  y += 6;
  addLabelValue(doc, 'No. HP', member.phone, 14, y, 33);
  y += 6;
  addLabelValue(doc, 'Tanggal Daftar', formatDateTimeID(member.submittedAt), 14, y, 33);
  y += 6;
  addLabelValue(doc, 'Barcode', member.barcode, 14, y, 33);

  if (member.status === 'active' && member.memberNo) {
    y += 8;
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(134, 239, 172);
    doc.roundedRect(12, y, pageWidth - 24, 20, 1.5, 1.5, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(22, 101, 52);
    doc.text('ANGGOTA SUDAH DIVERIFIKASI PETUGAS', 16, y + 6);
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    doc.text(`Nomor Anggota: ${member.memberNo}`, 16, y + 14);
    y += 27;
  } else {
    y += 8;
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(251, 191, 36);
    doc.roundedRect(12, y, pageWidth - 24, 20, 1.5, 1.5, 'FD');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 53, 15);
    doc.text(
      'Pendaftaran belum aktif. Tunjukkan kode pendaftaran/barcode ini kepada petugas untuk diverifikasi dan mencetak kartu anggota.',
      16,
      y + 8,
      { maxWidth: pageWidth - 32 }
    );
    y += 27;
  }

  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('Dokumen dibuat otomatis oleh sistem INLISLite.', 14, 205);

  doc.save(`Bukti-Pendaftaran-${member.registrationCode}.pdf`);
}

export async function downloadMemberCardPdf(member) {
  if (!member) return;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [85.6, 54] });

  doc.setFillColor(...NAVY);
  doc.rect(0, 0, 85.6, 15, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.4);
  doc.setTextColor(255, 255, 255);
  doc.text('KARTU ANGGOTA PERPUSTAKAAN', 4, 6.3);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.text('Perpustakaan Mitra - INLISLite', 4, 10.5);
  doc.setFontSize(4.8);
  doc.text('Kartu ini sah selama masa keanggotaan.', 4, 13.2);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(3, 18, 57, 32, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.2);
  doc.setTextColor(...MUTED);
  doc.text('NAMA ANGGOTA', 5, 22.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...DARK);
  const displayName = String(member.name || '').length > 34 ? `${String(member.name).slice(0, 30)}...` : member.name;
  doc.text(String(displayName || '-'), 5, 27);

  addLabelValueSmall(doc, 'NO. ANGGOTA', member.memberNo, 5, 32.5);
  addLabelValueSmall(doc, 'NPP/IDENTITAS', member.identityNo, 5, 37);
  addLabelValueSmall(doc, 'BERLAKU S.D.', member.validUntil ? formatDateID(new Date(member.validUntil).toISOString().slice(0, 10)) : '-', 5, 41.5);

  const qr = await qrDataUrl(memberQrPayload(member), 260);
  doc.addImage(qr, 'PNG', 63, 19, 19, 19);

  const barcode = barcodeDataUrl(member.memberNo || member.registrationCode);
  if (barcode) {
    doc.addImage(barcode, 'PNG', 61.5, 39, 22, 9);
  }

  doc.setDrawColor(226, 232, 240);
  doc.line(3, 52.5, 82.6, 52.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(4.3);
  doc.setTextColor(...MUTED);
  doc.text(
    `Diverifikasi: ${member.verification ? member.verification.name : '-'} | Token: ${member.token}`,
    4,
    54.2
  );

  doc.save(`Kartu-Anggota-${member.memberNo || member.registrationCode}.pdf`);
}

function addLabelValueSmall(doc, label, value, x, y) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(4.6);
  doc.setTextColor(...MUTED);
  doc.text(label, x, y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.6);
  doc.setTextColor(...DARK);
  doc.text(String(value || '-'), x + 19, y);
}
