SET FOREIGN_KEY_CHECKS = 0;

/*Table structure for table `petugas` */
DROP TABLE IF EXISTS `petugas`;
CREATE TABLE `petugas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_pengguna` varchar(50) NOT NULL,
  `kata_sandi` varchar(255) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `aktif` tinyint(1) NOT NULL DEFAULT 1,
  `dibuat_pada` datetime DEFAULT CURRENT_TIMESTAMP,
  `diperbarui_pada` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `petugas_nama_pengguna` (`nama_pengguna`),
  KEY `petugas_aktif` (`aktif`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `anggota` */
DROP TABLE IF EXISTS `anggota`;
CREATE TABLE `anggota` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no_anggota` varchar(50) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `jenis_identitas` varchar(30) DEFAULT 'KTP',
  `no_identitas` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telepon` varchar(50) DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` varchar(20) DEFAULT NULL,
  `alamat` text,
  `kota` varchar(100) DEFAULT NULL,
  `provinsi` varchar(100) DEFAULT NULL,
  `alamat_sekarang` text,
  `kota_sekarang` varchar(100) DEFAULT NULL,
  `provinsi_sekarang` varchar(100) DEFAULT NULL,
  `status` enum('pending','active','rejected') NOT NULL DEFAULT 'pending',
  `tanggal_daftar` datetime DEFAULT CURRENT_TIMESTAMP,
  `diverifikasi_oleh` int(11) DEFAULT NULL,
  `tanggal_verifikasi` datetime DEFAULT NULL,
  `berlaku_sampai` datetime DEFAULT NULL,
  `alasan_ditolak` text,
  `tanggal_cetak_kartu` datetime DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT CURRENT_TIMESTAMP,
  `diperbarui_pada` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `anggota_no_anggota` (`no_anggota`),
  KEY `anggota_status` (`status`),
  KEY `anggota_diverifikasi_oleh` (`diverifikasi_oleh`),
  CONSTRAINT `anggota_diverifikasi_oleh_fk` FOREIGN KEY (`diverifikasi_oleh`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `koleksi` */
DROP TABLE IF EXISTS `koleksi`;
CREATE TABLE `koleksi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barcode` varchar(50) NOT NULL,
  `judul` varchar(500) NOT NULL,
  `pengarang` varchar(255) DEFAULT NULL,
  `penerbit` varchar(255) DEFAULT NULL,
  `tahun_terbit` varchar(10) DEFAULT NULL,
  `isbn` varchar(50) DEFAULT NULL,
  `nomor_panggil` varchar(100) DEFAULT NULL,
  `kategori` varchar(100) DEFAULT NULL,
  `jenis_media` varchar(50) DEFAULT NULL,
  `lokasi` varchar(100) DEFAULT NULL,
  `status` enum('tersedia','dipinjam','rusak','hilang') NOT NULL DEFAULT 'tersedia',
  `harga` decimal(12,2) DEFAULT NULL,
  `dibuat_oleh` int(11) DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT CURRENT_TIMESTAMP,
  `diperbarui_oleh` int(11) DEFAULT NULL,
  `diperbarui_pada` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `koleksi_barcode` (`barcode`),
  KEY `koleksi_status` (`status`),
  KEY `koleksi_judul` (`judul`(191)),
  KEY `koleksi_dibuat_oleh` (`dibuat_oleh`),
  KEY `koleksi_diperbarui_oleh` (`diperbarui_oleh`),
  CONSTRAINT `koleksi_dibuat_oleh_fk` FOREIGN KEY (`dibuat_oleh`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `koleksi_diperbarui_oleh_fk` FOREIGN KEY (`diperbarui_oleh`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `peminjaman` */
DROP TABLE IF EXISTS `peminjaman`;
CREATE TABLE `peminjaman` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode_peminjaman` varchar(50) NOT NULL,
  `id_anggota` int(11) NOT NULL,
  `id_koleksi` int(11) NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_jatuh_tempo` date NOT NULL,
  `status` enum('dipinjam','terlambat') NOT NULL DEFAULT 'dipinjam',
  `catatan` text,
  `dibuat_oleh` int(11) DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT CURRENT_TIMESTAMP,
  `diperbarui_pada` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `peminjaman_kode_peminjaman` (`kode_peminjaman`),
  KEY `peminjaman_id_anggota` (`id_anggota`),
  KEY `peminjaman_id_koleksi` (`id_koleksi`),
  KEY `peminjaman_status` (`status`),
  CONSTRAINT `peminjaman_id_anggota_fk` FOREIGN KEY (`id_anggota`) REFERENCES `anggota` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `peminjaman_id_koleksi_fk` FOREIGN KEY (`id_koleksi`) REFERENCES `koleksi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `peminjaman_dibuat_oleh_fk` FOREIGN KEY (`dibuat_oleh`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `perpanjangan` */
DROP TABLE IF EXISTS `perpanjangan`;
CREATE TABLE `perpanjangan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_peminjaman` int(11) NOT NULL,
  `tanggal_perpanjangan` date NOT NULL,
  `tanggal_jatuh_tempo_baru` date NOT NULL,
  `hari_perpanjangan` int(11) DEFAULT 0,
  `catatan` text,
  `dibuat_oleh` int(11) DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `perpanjangan_id_peminjaman` (`id_peminjaman`),
  CONSTRAINT `perpanjangan_id_peminjaman_fk` FOREIGN KEY (`id_peminjaman`) REFERENCES `peminjaman` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `perpanjangan_dibuat_oleh_fk` FOREIGN KEY (`dibuat_oleh`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `pengembalian` */
DROP TABLE IF EXISTS `pengembalian`;
CREATE TABLE `pengembalian` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_peminjaman` int(11) NOT NULL,
  `id_koleksi` int(11) NOT NULL,
  `id_anggota` int(11) NOT NULL,
  `tanggal_kembali` date NOT NULL,
  `kondisi` enum('baik','rusak','hilang') NOT NULL DEFAULT 'baik',
  `denda` decimal(12,2) DEFAULT 0,
  `catatan` text,
  `dibuat_oleh` int(11) DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `pengembalian_id_peminjaman` (`id_peminjaman`),
  KEY `pengembalian_id_koleksi` (`id_koleksi`),
  KEY `pengembalian_id_anggota` (`id_anggota`),
  CONSTRAINT `pengembalian_id_peminjaman_fk` FOREIGN KEY (`id_peminjaman`) REFERENCES `peminjaman` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pengembalian_id_koleksi_fk` FOREIGN KEY (`id_koleksi`) REFERENCES `koleksi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pengembalian_id_anggota_fk` FOREIGN KEY (`id_anggota`) REFERENCES `anggota` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pengembalian_dibuat_oleh_fk` FOREIGN KEY (`dibuat_oleh`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `baca_di_tempat` */
DROP TABLE IF EXISTS `baca_di_tempat`;
CREATE TABLE `baca_di_tempat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_anggota` int(11) DEFAULT NULL,
  `nama_pengunjung` varchar(255) DEFAULT NULL,
  `id_koleksi` int(11) DEFAULT NULL,
  `tanggal_baca` date NOT NULL,
  `lokasi` varchar(100) DEFAULT NULL,
  `catatan` text,
  `dibuat_oleh` int(11) DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `baca_di_tempat_id_anggota` (`id_anggota`),
  KEY `baca_di_tempat_id_koleksi` (`id_koleksi`),
  CONSTRAINT `baca_di_tempat_id_anggota_fk` FOREIGN KEY (`id_anggota`) REFERENCES `anggota` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `baca_di_tempat_id_koleksi_fk` FOREIGN KEY (`id_koleksi`) REFERENCES `koleksi` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `baca_di_tempat_dibuat_oleh_fk` FOREIGN KEY (`dibuat_oleh`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `buku_tamu` */
DROP TABLE IF EXISTS `buku_tamu`;
CREATE TABLE `buku_tamu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode_booking` varchar(20) DEFAULT NULL,
  `barcode` varchar(50) DEFAULT NULL,
  `token` varchar(50) DEFAULT NULL,
  `jenis_pengunjung` enum('anggota','nonanggota','rombongan') NOT NULL DEFAULT 'nonanggota',
  `nama` varchar(255) NOT NULL,
  `jenis_identitas` varchar(30) DEFAULT NULL,
  `no_identitas` varchar(100) DEFAULT NULL,
  `id_anggota` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telepon` varchar(50) DEFAULT NULL,
  `alamat` text,
  `pekerjaan` varchar(100) DEFAULT NULL,
  `pendidikan` varchar(100) DEFAULT NULL,
  `jenis_kelamin` varchar(20) DEFAULT NULL,
  `instansi` varchar(255) DEFAULT NULL,
  `tujuan` varchar(100) DEFAULT NULL,
  `jumlah_rombongan` int(11) DEFAULT 0,
  `jumlah_laki` int(11) DEFAULT 0,
  `jumlah_perempuan` int(11) DEFAULT 0,
  `komposisi_pekerjaan` longtext,
  `komposisi_pendidikan` longtext,
  `catatan` text,
  `tanggal_kunjungan` date NOT NULL,
  `status` enum('pending','verified','rejected') NOT NULL DEFAULT 'pending',
  `diverifikasi_oleh` int(11) DEFAULT NULL,
  `tanggal_verifikasi` datetime DEFAULT NULL,
  `alasan_ditolak` text,
  `dibuat_pada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `buku_tamu_id_anggota` (`id_anggota`),
  KEY `buku_tamu_status` (`status`),
  KEY `buku_tamu_tanggal_kunjungan` (`tanggal_kunjungan`),
  CONSTRAINT `buku_tamu_id_anggota_fk` FOREIGN KEY (`id_anggota`) REFERENCES `anggota` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `buku_tamu_diverifikasi_oleh_fk` FOREIGN KEY (`diverifikasi_oleh`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `berita` */
DROP TABLE IF EXISTS `berita`;
CREATE TABLE `berita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `ringkasan` varchar(500) DEFAULT NULL,
  `isi` longtext,
  `thumbnail` text,
  `lokasi` varchar(100) DEFAULT NULL,
  `penerbit` varchar(100) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `dibuat_pada` datetime DEFAULT CURRENT_TIMESTAMP,
  `diperbarui_pada` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `berita_status` (`status`),
  KEY `berita_dibuat_pada` (`dibuat_pada`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

/* Seed data: akun petugas */
INSERT INTO `petugas` (`nama_pengguna`, `kata_sandi`, `nama_lengkap`, `email`, `jabatan`, `unit`, `aktif`)
VALUES
  ('petugas', 'petugas123', 'Petugas Layanan', 'petugas@perpustakaan.id', 'Petugas Layanan Referensi', 'Layanan Pengguna', 1);
