export const KATALOG_SEED = [
  { id: 1, bibid: 'BIB-2026-0001', judul: 'Laskar Pelangi', edisi: 'Edisi Revisi Cetakan Ke-12', publisher: 'Bentang Pustaka (Yogyakarta)', deskripsi_fisik: 'xii, 529 hlm. ; 20 cm', no_panggil: '823 DAN l', eksemplar_count: 5, opac: true, pedoman: 'RDA', karantina: false },
  { id: 2, bibid: 'BIB-2026-0002', judul: 'Bumi Manusia', edisi: 'Cetakan Ke-5', publisher: 'Lentera Dipantara (Jakarta)', deskripsi_fisik: 'x, 535 hlm. ; 21 cm', no_panggil: '813 TOE b', eksemplar_count: 3, opac: true, pedoman: 'AACR', karantina: false },
  { id: 3, bibid: 'BIB-2026-0003', judul: 'Pemrograman Web dengan Laravel 10 dan Tailwind CSS', edisi: 'Edisi Pertama', publisher: 'Informatika (Bandung)', deskripsi_fisik: 'viii, 340 hlm. ; 24 cm', no_panggil: '005.133 UTW p', eksemplar_count: 8, opac: true, pedoman: 'RDA', karantina: false },
  { id: 4, bibid: 'BIB-2026-0004', judul: 'Metodologi Penelitian Kuantitatif & Kualitatif', edisi: 'Edisi 2', publisher: 'Rajawali Pers (Jakarta)', deskripsi_fisik: 'xiv, 412 hlm. ; 23 cm', no_panggil: '001.42 SUG m', eksemplar_count: 2, opac: false, pedoman: 'AACR', karantina: true },
];

export const EKSEMPLAR_SEED = [
  { id: 101, no_barcode: 'BC-202600101', tgl_pengadaan: '2026-01-15', no_induk: 'IND-2026-001', data_bib: 'Laskar Pelangi / Andrea Hirata (Bentang Pustaka, 2018)', drm: 'Bebas', karantina: 'Tidak', opac: 'Tampil', status: 'Tersedia', lokasi: 'Perpustakaan Utama - Rak 08', karantina_flag: false },
  { id: 102, no_barcode: 'BC-202600102', tgl_pengadaan: '2026-01-15', no_induk: 'IND-2026-002', data_bib: 'Laskar Pelangi / Andrea Hirata (Bentang Pustaka, 2018)', drm: 'Bebas', karantina: 'Tidak', opac: 'Tampil', status: 'Dipinjami', lokasi: 'Perpustakaan Utama - Rak 08', karantina_flag: false },
  { id: 103, no_barcode: 'BC-202600201', tgl_pengadaan: '2026-02-01', no_induk: 'IND-2026-089', data_bib: 'Bumi Manusia / Pramoedya Ananta Toer (Lentera Dipantara, 2020)', drm: 'Bebas', karantina: 'Ya', opac: 'Sembunyi', status: 'Dalam Perbaikan', lokasi: 'Ruang Restorasi', karantina_flag: true },
];
