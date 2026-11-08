// Penyimpanan data demo berbasis localStorage.
// Di aplikasi produksi, fungsi-fungsi di sini harus diganti dengan panggilan API backend.
// Tujuannya: alur buku tamu -> verifikasi petugas -> data kunjungan,
// serta pendaftaran anggota -> validasi petugas -> kartu anggota tetap utuh di demo frontend.

const STORAGE_KEYS = {
  visits: 'inlislite.visits.v1',
  members: 'inlislite.members.v1',
};

const SESSION_KEY = 'inlislite.backoffice-session';

export const OFFICERS = {
  petugas: {
    id: 'PGS-001',
    name: 'Rina Kusumawati',
    nip: '198805122015032001',
    jabatan: 'Petugas Layanan Referensi',
    unit: 'Layanan Pengguna',
    shift: 'Pagi (08.00 - 16.00 WIB)',
  },
  admin: {
    id: 'ADM-001',
    name: 'Administrator Perpustakaan',
    nip: '197904172006041002',
    jabatan: 'Administrator Sistem',
    unit: 'Teknologi Informasi',
    shift: 'Pagi (08.00 - 16.00 WIB)',
  },
};

export const DEFAULT_DUTY_OFFICER = OFFICERS.petugas;

export const STATUS_LABELS = {
  pending: 'Menunggu Verifikasi',
  verified: 'Terverifikasi',
  rejected: 'Ditolak',
  active: 'Aktif',
};

export function getSessionRole() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return 'petugas';
    const parsed = JSON.parse(raw);
    return parsed && parsed.role === 'admin' ? 'admin' : 'petugas';
  } catch (error) {
    return 'petugas';
  }
}

export function getActiveOfficer(role = getSessionRole()) {
  return OFFICERS[role] || OFFICERS.petugas;
}

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    // localStorage penuh/diblokir: aplikasi tetap berjalan tanpa persistensi.
    return false;
  }
}

const pad = (value, length = 2) => String(value).padStart(length, '0');

export function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function formatDateID(dateInput) {
  if (!dateInput) return '-';
  const datePart = String(dateInput).slice(0, 10);
  const [year, month, day] = datePart.split('-').map(Number);
  if (!year || !month || !day) return dateInput;
  try {
    return new Date(year, month - 1, day).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch (error) {
    return datePart;
  }
}

export function formatDateTimeID(isoString) {
  if (!isoString) return '-';
  try {
    return new Date(isoString).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch (error) {
    return isoString;
  }
}

function makeId(prefix) {
  const randomPart =
    typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID
      ? window.crypto.randomUUID().replace(/-/g, '').slice(0, 10)
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  return `${prefix}-${randomPart}`.toUpperCase();
}

function makeToken(prefix = 'TKN') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 10; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${result}`;
}

function normalizeCode(input) {
  return String(input || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '');
}

function uniqueBookingCode(visits) {
  let code = '';
  const used = new Set(visits.map((visit) => String(visit.bookingCode)));
  do {
    code = pad(Math.floor(Math.random() * 1000000), 6);
  } while (used.has(code));
  return code;
}

function uniqueRegistrationCode(members) {
  const year = new Date().getFullYear();
  const used = new Set(members.map((member) => String(member.registrationCode)));
  let code = '';
  do {
    code = `REG-${year}-${pad(Math.floor(Math.random() * 1000000), 6)}`;
  } while (used.has(code));
  return code;
}

export function visitQrPayload(visit) {
  if (!visit) return '';
  return [
    'INLISLITE-PERPUS',
    'BUKTI-KUNJUNGAN',
    `KODE=${visit.bookingCode}`,
    `TOKEN=${visit.token}`,
    `TANGGAL=${visit.visitDate}`,
    `BARCODE=${visit.barcode}`,
  ].join('|');
}

export function memberQrPayload(member) {
  if (!member) return '';
  return [
    'INLISLITE-PERPUS',
    'KARTU-ANGGOTA',
    `NO=${member.memberNo || member.registrationCode}`,
    `NAMA=${member.name}`,
    `TOKEN=${member.token}`,
    `BARCODE=${member.barcode}`,
  ].join('|');
}

/* ------------------------------------------------------------------ */
/*  Data buku tamu / kunjungan                                          */
/* ------------------------------------------------------------------ */

export function listVisits() {
  const data = readStorage(STORAGE_KEYS.visits, []);
  return Array.isArray(data) ? data : [];
}

function persistVisits(visits) {
  writeStorage(STORAGE_KEYS.visits, visits);
}

export function createVisitRequest({
  type,
  name,
  identityType = 'KTP',
  identityNo = '',
  memberNo = '',
  email = '',
  phone = '',
  address = '',
  profession = '',
  education = '',
  gender = '',
  purpose = '',
  institution = '',
  groupSize = 0,
  groupMale = 0,
  groupFemale = 0,
  groupProfession = {},
  groupEducation = {},
  notes = '',
  visitDate = todayISO(),
}) {
  const now = new Date().toISOString();
  const code = uniqueBookingCode(listVisits());
  const visit = {
    id: makeId('VST'),
    type,
    bookingCode: code,
    barcode: `BT-${String(visitDate).replace(/-/g, '')}-${code}`,
    token: makeToken('BT'),
    name: String(name || '').trim(),
    identityType,
    identityNo: String(identityNo || '').trim(),
    memberNo: String(memberNo || '').trim(),
    email: String(email || '').trim(),
    phone: String(phone || '').trim(),
    address: String(address || '').trim(),
    profession: String(profession || '').trim(),
    education: String(education || '').trim(),
    gender: String(gender || '').trim(),
    purpose: String(purpose || '').trim(),
    institution: String(institution || '').trim(),
    groupSize: Number(groupSize) || 0,
    groupMale: Number(groupMale) || 0,
    groupFemale: Number(groupFemale) || 0,
    groupProfession,
    groupEducation,
    notes: String(notes || '').trim(),
    visitDate,
    createdAt: now,
    status: 'pending',
    verification: null,
    rejectedReason: '',
  };

  const visits = listVisits();
  visits.unshift(visit);
  persistVisits(visits);
  return visit;
}

export function findVisitByCode(code) {
  const key = normalizeCode(code);
  if (!key) return null;
  return (
    listVisits().find((visit) => {
      return (
        normalizeCode(visit.bookingCode) === key ||
        normalizeCode(visit.barcode) === key ||
        normalizeCode(visit.token) === key ||
        String(visit.id).toUpperCase() === key
      );
    }) || null
  );
}

export function getVisitById(id) {
  return listVisits().find((visit) => visit.id === id) || null;
}

export function verifyVisit(id, officer, note = '') {
  const visits = listVisits();
  const index = visits.findIndex((visit) => visit.id === id);
  if (index === -1) return { ok: false, message: 'Data kunjungan tidak ditemukan.' };

  const visit = visits[index];
  if (visit.status === 'verified') {
    return { ok: false, message: 'Kunjungan ini sudah diverifikasi sebelumnya.' };
  }
  if (visit.status === 'rejected') {
    return { ok: false, message: 'Kunjungan ini sudah ditolak. Minta pengunjung mengisi ulang buku tamu.' };
  }

  const updated = {
    ...visit,
    status: 'verified',
    verification: {
      officerId: officer.id,
      name: officer.name,
      nip: officer.nip,
      jabatan: officer.jabatan,
      unit: officer.unit,
      shift: officer.shift,
      verifiedAt: new Date().toISOString(),
    },
    verificationNote: String(note || '').trim(),
  };
  visits[index] = updated;
  persistVisits(visits);
  return { ok: true, visit: updated, message: `Kunjungan ${updated.bookingCode} berhasil diverifikasi.` };
}

export function rejectVisit(id, officer, reason) {
  const visits = listVisits();
  const index = visits.findIndex((visit) => visit.id === id);
  if (index === -1) return { ok: false, message: 'Data kunjungan tidak ditemukan.' };
  if (visits[index].status === 'verified') {
    return { ok: false, message: 'Kunjungan yang sudah diverifikasi tidak dapat ditolak.' };
  }

  visits[index] = {
    ...visits[index],
    status: 'rejected',
    rejectedReason: String(reason || '').trim(),
    verification: {
      officerId: officer.id,
      name: officer.name,
      nip: officer.nip,
      jabatan: officer.jabatan,
      unit: officer.unit,
      shift: officer.shift,
      verifiedAt: new Date().toISOString(),
      decision: 'rejected',
    },
  };
  persistVisits(visits);
  return { ok: true, visit: visits[index], message: 'Pengajuan kunjungan ditolak.' };
}

export function searchVisits({ query = '', date = '', status = 'all' } = {}) {
  const key = normalizeCode(query);
  const data = listVisits().filter((visit) => {
    const matchDate = !date || visit.visitDate === date;
    const matchStatus = status === 'all' || visit.status === status;
    const matchQuery =
      !key ||
      normalizeCode(visit.bookingCode) === key ||
      normalizeCode(visit.barcode) === key ||
      normalizeCode(visit.token) === key ||
      normalizeCode(visit.name).includes(key) ||
      normalizeCode(visit.identityNo) === key ||
      normalizeCode(visit.memberNo) === key;
    return matchDate && matchStatus && matchQuery;
  });

  if (!key) return data;

  return data.sort((a, b) => {
    const aExact = normalizeCode(a.bookingCode) === key ? 1 : 0;
    const bExact = normalizeCode(b.bookingCode) === key ? 1 : 0;
    return bExact - aExact;
  });
}

export function countVerifiedVisitsToday() {
  const today = todayISO();
  return listVisits().filter((visit) => visit.status === 'verified' && visit.visitDate === today).length;
}

/* ------------------------------------------------------------------ */
/*  Data pendaftaran anggota                                            */
/* ------------------------------------------------------------------ */

export function listMembers() {
  const data = readStorage(STORAGE_KEYS.members, []);
  return Array.isArray(data) ? data : [];
}

function persistMembers(members) {
  writeStorage(STORAGE_KEYS.members, members);
}

function nextMemberNumber(members) {
  const year = String(new Date().getFullYear()).slice(-2);
  const prefix = `3175101E${year}`;
  const sequences = members
    .filter((member) => String(member.memberNo || '').startsWith(prefix))
    .map((member) => Number(String(member.memberNo).slice(prefix.length)) || 0);
  const next = Math.max(0, ...sequences) + 1;
  return `${prefix}${pad(next, 6)}`;
}

export function findMemberByCode(code) {
  const key = normalizeCode(code);
  if (!key) return null;
  return (
    listMembers().find((member) => {
      return (
        normalizeCode(member.registrationCode) === key ||
        normalizeCode(member.barcode) === key ||
        normalizeCode(member.token) === key ||
        normalizeCode(member.memberNo) === key ||
        normalizeCode(member.identityNo) === key
      );
    }) || null
  );
}

export function getMemberById(id) {
  return listMembers().find((member) => member.id === id) || null;
}

export function createMemberRegistration(data) {
  const members = listMembers();
  const identityNo = String(data.identityNo || '').trim();
  const duplicate = members.find(
    (member) =>
      normalizeCode(member.identityNo) === normalizeCode(identityNo) &&
      ['pending', 'active'].includes(member.status)
  );

  if (duplicate) {
    return {
      ok: false,
      message:
        duplicate.status === 'pending'
          ? 'Nomor identitas ini sudah didaftarkan dan masih menunggu verifikasi petugas.'
          : 'Nomor identitas ini sudah terdaftar sebagai anggota aktif.',
    };
  }

  const registrationCode = uniqueRegistrationCode(members);
  const now = new Date().toISOString();
  const member = {
    id: makeId('MBR'),
    registrationCode,
    barcode: registrationCode,
    token: makeToken('REG'),
    name: String(data.name || '').trim(),
    identityType: String(data.identityType || 'KTP').trim(),
    identityNo,
    email: String(data.email || '').trim(),
    phone: String(data.phone || '').trim(),
    placeOfBirth: String(data.placeOfBirth || '').trim(),
    dateOfBirth: String(data.dateOfBirth || '').trim(),
    gender: String(data.gender || '').trim(),
    address: { ...(data.address || {}) },
    currentAddress: { ...(data.currentAddress || {}) },
    submittedAt: now,
    status: 'pending',
    memberNo: '',
    barcodeMember: '',
    verification: null,
    rejectedReason: '',
    validUntil: '',
    cardPrintedAt: '',
  };

  members.unshift(member);
  persistMembers(members);
  return { ok: true, member, message: 'Pendaftaran berhasil dikirim.' };
}

export function verifyMemberRegistration(id, officer) {
  const members = listMembers();
  const index = members.findIndex((member) => member.id === id);
  if (index === -1) return { ok: false, message: 'Data pendaftaran tidak ditemukan.' };

  const member = members[index];
  if (member.status === 'active') {
    return { ok: false, message: 'Pendaftaran ini sudah diverifikasi dan anggota sudah aktif.' };
  }
  if (member.status === 'rejected') {
    return { ok: false, message: 'Pendaftaran ini sudah ditolak. Pendaftar harus mengirim ulang data.' };
  }

  const now = new Date();
  const validUntil = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()).toISOString();
  const memberNo = nextMemberNumber(members);

  const updated = {
    ...member,
    status: 'active',
    memberNo,
    barcodeMember: `MBR-${memberNo}`,
    validUntil,
    verification: {
      officerId: officer.id,
      name: officer.name,
      nip: officer.nip,
      jabatan: officer.jabatan,
      unit: officer.unit,
      shift: officer.shift,
      verifiedAt: new Date().toISOString(),
    },
  };

  members[index] = updated;
  persistMembers(members);
  return { ok: true, member: updated, message: `Pendaftaran diverifikasi. Nomor anggota: ${memberNo}` };
}

export function rejectMemberRegistration(id, officer, reason) {
  const members = listMembers();
  const index = members.findIndex((member) => member.id === id);
  if (index === -1) return { ok: false, message: 'Data pendaftaran tidak ditemukan.' };
  if (members[index].status === 'active') {
    return { ok: false, message: 'Anggota yang sudah aktif tidak dapat ditolak dari halaman ini.' };
  }

  members[index] = {
    ...members[index],
    status: 'rejected',
    rejectedReason: String(reason || '').trim(),
    verification: {
      officerId: officer.id,
      name: officer.name,
      nip: officer.nip,
      jabatan: officer.jabatan,
      unit: officer.unit,
      shift: officer.shift,
      verifiedAt: new Date().toISOString(),
      decision: 'rejected',
    },
  };
  persistMembers(members);
  return { ok: true, member: members[index], message: 'Pendaftaran anggota ditolak.' };
}

export function markMemberCardPrinted(id) {
  const members = listMembers();
  const index = members.findIndex((member) => member.id === id);
  if (index === -1) return;
  members[index] = { ...members[index], cardPrintedAt: new Date().toISOString() };
  persistMembers(members);
}

export function searchMembers({ query = '', status = 'all', date = '' } = {}) {
  const key = normalizeCode(query);
  return listMembers().filter((member) => {
    const matchStatus = status === 'all' || member.status === status;
    const submittedDate = String(member.submittedAt || '').slice(0, 10);
    const matchDate = !date || submittedDate === date;
    const matchQuery =
      !key ||
      normalizeCode(member.registrationCode) === key ||
      normalizeCode(member.barcode) === key ||
      normalizeCode(member.token) === key ||
      normalizeCode(member.memberNo) === key ||
      normalizeCode(member.identityNo) === key ||
      normalizeCode(member.name).includes(key) ||
      normalizeCode(member.email).includes(key);
    return matchStatus && matchDate && matchQuery;
  });
}

/* ------------------------------------------------------------------ */
/*  Statistik dashboard                                                 */
/* ------------------------------------------------------------------ */

export function getLibraryStats() {
  const visits = listVisits();
  const members = listMembers();
  const today = todayISO();
  const verifiedToday = visits.filter((visit) => visit.status === 'verified' && visit.visitDate === today);
  const visitsTodayMembers = verifiedToday.filter((visit) => visit.type === 'anggota').length;
  const visitsTodayNonMembers = verifiedToday.filter((visit) => visit.type !== 'anggota').length;
  return {
    totalVisits: visits.filter((visit) => visit.status === 'verified').length,
    visitsToday: verifiedToday.length,
    verifiedToday: verifiedToday.length,
    visitsTodayMembers,
    visitsTodayNonMembers,
    pendingVisits: visits.filter((visit) => visit.status === 'pending').length,
    rejectedVisits: visits.filter((visit) => visit.status === 'rejected').length,
    activeMembers: members.filter((member) => member.status === 'active').length,
    pendingMembers: members.filter((member) => member.status === 'pending').length,
    rejectedMembers: members.filter((member) => member.status === 'rejected').length,
  };
}

/* ------------------------------------------------------------------ */
/*  Akun petugas (login backoffice)                                    */
/* ------------------------------------------------------------------ */
const PETUGAS_ACCOUNTS_KEY = 'inlislite.petugas-accounts.v1';

const DEFAULT_PETUGAS_ACCOUNTS = [
  {
    id: 'PGS-001',
    username: 'petugas',
    name: 'Petugas Layanan',
    password: 'petugas123',
    status: 'AKTIF',
    createdAt: new Date().toISOString(),
  },
];

export function listPetugasAccounts() {
  const data = readStorage(PETUGAS_ACCOUNTS_KEY, null);
  if (Array.isArray(data)) return data;
  writeStorage(PETUGAS_ACCOUNTS_KEY, DEFAULT_PETUGAS_ACCOUNTS);
  return DEFAULT_PETUGAS_ACCOUNTS;
}

export function addPetugasAccount({ username, name, password }) {
  const accounts = listPetugasAccounts();
  if (accounts.some((a) => String(a.username).toLowerCase() === String(username).toLowerCase())) {
    return { ok: false, message: 'Username sudah digunakan.' };
  }
  const account = {
    id: makeId('PGS'),
    username: String(username).trim(),
    name: String(name).trim(),
    password: String(password),
    status: 'AKTIF',
    createdAt: new Date().toISOString(),
  };
  accounts.unshift(account);
  writeStorage(PETUGAS_ACCOUNTS_KEY, accounts);
  return { ok: true, account };
}

export function removePetugasAccount(id) {
  const accounts = listPetugasAccounts().filter((a) => a.id !== id);
  writeStorage(PETUGAS_ACCOUNTS_KEY, accounts);
}

/* ------------------------------------------------------------------ */
/*  Seed data demo                                                      */
/* ------------------------------------------------------------------ */

function seedDemoData() {
  if (readStorage(STORAGE_KEYS.members, null) === null) {
    const now = new Date().toISOString();
    const activeMember = {
      id: 'MBR-DEMO-0001',
      registrationCode: 'REG-2026-100007',
      barcode: 'REG-2026-100007',
      token: 'REG-TKN-DEMO0001',
      name: 'Siti Rahmawati',
      identityType: 'KTP',
      identityNo: '3175101200000007',
      email: 'siti.rahmawati@example.com',
      phone: '081234567890',
      placeOfBirth: 'Jakarta',
      dateOfBirth: '1990-01-12',
      gender: 'Perempuan',
      address: {
        alamatLengkap: 'Jl. Kebon Sirih No. 12',
        provinsi: 'DKI Jakarta',
        kota: 'Jakarta Pusat',
        kecamatan: 'Gambir',
        kelurahan: 'Gambir',
      },
      currentAddress: {
        alamatLengkap: 'Jl. Kebon Sirih No. 12',
        provinsi: 'DKI Jakarta',
        kota: 'Jakarta Pusat',
        kecamatan: 'Gambir',
        kelurahan: 'Gambir',
      },
      submittedAt: '2026-09-01T03:20:00.000Z',
      status: 'active',
      memberNo: '3175101E26000001',
      barcodeMember: 'MBR-3175101E26000001',
      verification: {
        officerId: OFFICERS.petugas.id,
        name: OFFICERS.petugas.name,
        nip: OFFICERS.petugas.nip,
        jabatan: OFFICERS.petugas.jabatan,
        unit: OFFICERS.petugas.unit,
        shift: OFFICERS.petugas.shift,
        verifiedAt: '2026-09-01T04:10:00.000Z',
      },
      rejectedReason: '',
      validUntil: '2027-09-01T04:10:00.000Z',
      cardPrintedAt: '',
    };

    const pendingMember = {
      id: 'MBR-DEMO-0002',
      registrationCode: 'REG-2026-300001',
      barcode: 'REG-2026-300001',
      token: 'REG-TKN-DEMO0002',
      name: 'Budi Santoso',
      identityType: 'KTP',
      identityNo: '3175101200000012',
      email: 'budi.santoso@example.com',
      phone: '085678901234',
      placeOfBirth: 'Bandung',
      dateOfBirth: '1998-03-20',
      gender: 'Laki-laki',
      address: {
        alamatLengkap: 'Jl. Cikini Raya No. 8',
        provinsi: 'DKI Jakarta',
        kota: 'Jakarta Pusat',
        kecamatan: 'Gambir',
        kelurahan: 'Gambir',
      },
      currentAddress: {
        alamatLengkap: 'Jl. Cikini Raya No. 8',
        provinsi: 'DKI Jakarta',
        kota: 'Jakarta Pusat',
        kecamatan: 'Gambir',
        kelurahan: 'Gambir',
      },
      submittedAt: now,
      status: 'pending',
      memberNo: '',
      barcodeMember: '',
      verification: null,
      rejectedReason: '',
      validUntil: '',
      cardPrintedAt: '',
    };

    persistMembers([pendingMember, activeMember]);
  }
}

seedDemoData();
