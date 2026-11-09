SET FOREIGN_KEY_CHECKS = 0;

/*Table structure for table `petugas` */
DROP TABLE IF EXISTS `petugas`;
CREATE TABLE `petugas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `petugas_username` (`username`),
  KEY `petugas_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `anggota` */
DROP TABLE IF EXISTS `anggota`;
CREATE TABLE `anggota` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_no` varchar(50) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `identity_type` varchar(30) DEFAULT 'KTP',
  `identity_no` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `place_of_birth` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `address` text,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `current_address` text,
  `current_city` varchar(100) DEFAULT NULL,
  `current_province` varchar(100) DEFAULT NULL,
  `status` enum('pending','active','rejected') NOT NULL DEFAULT 'pending',
  `registered_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `verified_by` int(11) DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `valid_until` datetime DEFAULT NULL,
  `rejected_reason` text,
  `card_printed_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `anggota_member_no` (`member_no`),
  KEY `anggota_status` (`status`),
  KEY `anggota_verified_by` (`verified_by`),
  CONSTRAINT `anggota_verified_by_fk` FOREIGN KEY (`verified_by`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `koleksi` */
DROP TABLE IF EXISTS `koleksi`;
CREATE TABLE `koleksi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barcode` varchar(50) NOT NULL,
  `title` varchar(500) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `publish_year` varchar(10) DEFAULT NULL,
  `isbn` varchar(50) DEFAULT NULL,
  `call_number` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `media_type` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `status` enum('tersedia','dipinjam','rusak','hilang') NOT NULL DEFAULT 'tersedia',
  `price` decimal(12,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `koleksi_barcode` (`barcode`),
  KEY `koleksi_status` (`status`),
  KEY `koleksi_title` (`title`(191)),
  KEY `koleksi_created_by` (`created_by`),
  KEY `koleksi_updated_by` (`updated_by`),
  CONSTRAINT `koleksi_created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `koleksi_updated_by_fk` FOREIGN KEY (`updated_by`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `peminjaman` */
DROP TABLE IF EXISTS `peminjaman`;
CREATE TABLE `peminjaman` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_code` varchar(50) NOT NULL,
  `member_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `loan_date` date NOT NULL,
  `due_date` date NOT NULL,
  `status` enum('dipinjam','terlambat') NOT NULL DEFAULT 'dipinjam',
  `notes` text,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `peminjaman_loan_code` (`loan_code`),
  KEY `peminjaman_member_id` (`member_id`),
  KEY `peminjaman_collection_id` (`collection_id`),
  KEY `peminjaman_status` (`status`),
  CONSTRAINT `peminjaman_member_fk` FOREIGN KEY (`member_id`) REFERENCES `anggota` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `peminjaman_collection_fk` FOREIGN KEY (`collection_id`) REFERENCES `koleksi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `peminjaman_created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `perpanjangan` */
DROP TABLE IF EXISTS `perpanjangan`;
CREATE TABLE `perpanjangan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_id` int(11) NOT NULL,
  `extend_date` date NOT NULL,
  `new_due_date` date NOT NULL,
  `extended_days` int(11) DEFAULT 0,
  `notes` text,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `perpanjangan_loan_id` (`loan_id`),
  CONSTRAINT `perpanjangan_loan_fk` FOREIGN KEY (`loan_id`) REFERENCES `peminjaman` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `perpanjangan_created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `pengembalian` */
DROP TABLE IF EXISTS `pengembalian`;
CREATE TABLE `pengembalian` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `return_date` date NOT NULL,
  `condition_status` enum('baik','rusak','hilang') NOT NULL DEFAULT 'baik',
  `fine` decimal(12,2) DEFAULT 0,
  `notes` text,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `pengembalian_loan_id` (`loan_id`),
  KEY `pengembalian_collection_id` (`collection_id`),
  KEY `pengembalian_member_id` (`member_id`),
  CONSTRAINT `pengembalian_loan_fk` FOREIGN KEY (`loan_id`) REFERENCES `peminjaman` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pengembalian_collection_fk` FOREIGN KEY (`collection_id`) REFERENCES `koleksi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pengembalian_member_fk` FOREIGN KEY (`member_id`) REFERENCES `anggota` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pengembalian_created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `baca_di_tempat` */
DROP TABLE IF EXISTS `baca_di_tempat`;
CREATE TABLE `baca_di_tempat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) DEFAULT NULL,
  `visitor_name` varchar(255) DEFAULT NULL,
  `collection_id` int(11) DEFAULT NULL,
  `read_date` date NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `notes` text,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `baca_di_tempat_member_id` (`member_id`),
  KEY `baca_di_tempat_collection_id` (`collection_id`),
  CONSTRAINT `baca_di_tempat_member_fk` FOREIGN KEY (`member_id`) REFERENCES `anggota` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `baca_di_tempat_collection_fk` FOREIGN KEY (`collection_id`) REFERENCES `koleksi` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `baca_di_tempat_created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `buku_tamu` */
DROP TABLE IF EXISTS `buku_tamu`;
CREATE TABLE `buku_tamu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_code` varchar(20) DEFAULT NULL,
  `barcode` varchar(50) DEFAULT NULL,
  `token` varchar(50) DEFAULT NULL,
  `visitor_type` enum('anggota','nonanggota','rombongan') NOT NULL DEFAULT 'nonanggota',
  `name` varchar(255) NOT NULL,
  `identity_type` varchar(30) DEFAULT NULL,
  `identity_no` varchar(100) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text,
  `profession` varchar(100) DEFAULT NULL,
  `education` varchar(100) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `purpose` varchar(100) DEFAULT NULL,
  `group_size` int(11) DEFAULT 0,
  `group_male` int(11) DEFAULT 0,
  `group_female` int(11) DEFAULT 0,
  `group_profession` longtext,
  `group_education` longtext,
  `notes` text,
  `visit_date` date NOT NULL,
  `status` enum('pending','verified','rejected') NOT NULL DEFAULT 'pending',
  `verified_by` int(11) DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `rejected_reason` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `buku_tamu_member_id` (`member_id`),
  KEY `buku_tamu_status` (`status`),
  KEY `buku_tamu_visit_date` (`visit_date`),
  CONSTRAINT `buku_tamu_member_fk` FOREIGN KEY (`member_id`) REFERENCES `anggota` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `buku_tamu_verified_by_fk` FOREIGN KEY (`verified_by`) REFERENCES `petugas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `berita` */
DROP TABLE IF EXISTS `berita`;
CREATE TABLE `berita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `summary` varchar(500) DEFAULT NULL,
  `content` longtext,
  `thumbnail` text,
  `location` varchar(100) DEFAULT NULL,
  `publisher` varchar(100) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `berita_status` (`status`),
  KEY `berita_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

/* Seed data: akun petugas */
INSERT INTO `petugas` (`username`, `password`, `full_name`, `email`, `jabatan`, `unit`, `is_active`)
VALUES
  ('petugas', 'petugas123', 'Petugas Layanan', 'petugas@perpustakaan.id', 'Petugas Layanan Referensi', 'Layanan Pengguna', 1);
