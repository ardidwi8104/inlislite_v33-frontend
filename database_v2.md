# Skema Database Perpustakaan (Versi 2)

Dokumen ini berisi skema database dalam format DBML (untuk dbdiagram.io) berdasarkan SQL versi kedua. Nama tabel dan kolom menggunakan bahasa Indonesia.

```dbml
Table petugas {
  id integer [pk, increment]
  nama_pengguna varchar(50) [not null, unique]
  kata_sandi varchar(255) [not null]
  nama_lengkap varchar(255) [not null]
  email varchar(255)
  jabatan varchar(100)
  unit varchar(100)
  aktif boolean [default: true]
  dibuat_pada datetime [default: `now()`]
  diperbarui_pada datetime [default: `now()`]
}

Table anggota {
  id integer [pk, increment]
  no_anggota varchar(50) [not null, unique]
  nama_lengkap varchar(255) [not null]
  jenis_identitas varchar(30) [default: 'KTP']
  no_identitas varchar(100)
  email varchar(255)
  telepon varchar(50)
  tempat_lahir varchar(100)
  tanggal_lahir date
  jenis_kelamin varchar(20)
  alamat text
  kota varchar(100)
  provinsi varchar(100)
  alamat_sekarang text
  kota_sekarang varchar(100)
  provinsi_sekarang varchar(100)
  status varchar(20) [default: 'pending']
  tanggal_daftar datetime [default: `now()`]
  diverifikasi_oleh integer 
  tanggal_verifikasi datetime
  berlaku_sampai datetime
  alasan_ditolak text
  tanggal_cetak_kartu datetime
  dibuat_pada datetime [default: `now()`]
  diperbarui_pada datetime [default: `now()`]
}

Table koleksi {
  id integer [pk, increment]
  barcode varchar(50) [not null, unique]
  judul varchar(500) [not null]
  pengarang varchar(255)
  penerbit varchar(255)
  tahun_terbit varchar(10)
  isbn varchar(50)
  nomor_panggil varchar(100)
  kategori varchar(100)
  jenis_media varchar(50)
  lokasi varchar(100)
  status varchar(20) [default: 'tersedia']
  harga decimal(12,2)
  dibuat_oleh integer 
  dibuat_pada datetime [default: `now()`]
  diperbarui_oleh integer 
  diperbarui_pada datetime [default: `now()`]
}

Table peminjaman {
  id integer [pk, increment]
  kode_peminjaman varchar(50) [not null, unique]
  id_anggota integer [not null]
  id_koleksi integer [not null]
  tanggal_pinjam date [not null]
  tanggal_jatuh_tempo date [not null]
  status varchar(20) [default: 'dipinjam']
  catatan text
  dibuat_oleh integer 
  dibuat_pada datetime [default: `now()`]
  diperbarui_pada datetime [default: `now()`]
}

Table perpanjangan {
  id integer [pk, increment]
  id_peminjaman integer [not null]
  tanggal_perpanjangan date [not null]
  tanggal_jatuh_tempo_baru date [not null]
  hari_perpanjangan integer [default: 0]
  catatan text
  dibuat_oleh integer 
  dibuat_pada datetime [default: `now()`]
}

Table pengembalian {
  id integer [pk, increment]
  id_peminjaman integer [not null]
  id_koleksi integer [not null]
  id_anggota integer [not null]
  tanggal_kembali date [not null]
  kondisi varchar(20) [default: 'baik']
  denda decimal(12,2) [default: 0]
  catatan text
  dibuat_oleh integer 
  dibuat_pada datetime [default: `now()`]
}

Table baca_di_tempat {
  id integer [pk, increment]
  id_anggota integer 
  nama_pengunjung varchar(255)
  id_koleksi integer 
  tanggal_baca date [not null]
  lokasi varchar(100)
  catatan text
  dibuat_oleh integer 
  dibuat_pada datetime [default: `now()`]
}

Table buku_tamu {
  id integer [pk, increment]
  kode_booking varchar(20)
  barcode varchar(50)
  token varchar(50)
  jenis_pengunjung varchar(20) [default: 'nonanggota']
  nama varchar(255) [not null]
  jenis_identitas varchar(30)
  no_identitas varchar(100)
  id_anggota integer 
  email varchar(255)
  telepon varchar(50)
  alamat text
  pekerjaan varchar(100)
  pendidikan varchar(100)
  jenis_kelamin varchar(20)
  instansi varchar(255)
  tujuan varchar(100)
  jumlah_rombongan integer [default: 0]
  jumlah_laki integer [default: 0]
  jumlah_perempuan integer [default: 0]
  komposisi_pekerjaan text
  komposisi_pendidikan text
  catatan text
  tanggal_kunjungan date [not null]
  status varchar(20) [default: 'pending']
  diverifikasi_oleh integer 
  tanggal_verifikasi datetime
  alasan_ditolak text
  dibuat_pada datetime [default: `now()`]
}

Table berita {
  id integer [pk, increment]
  judul varchar(255) [not null]
  slug varchar(255)
  ringkasan varchar(500)
  isi text
  thumbnail text
  lokasi varchar(100)
  penerbit varchar(100)
  status varchar(20) [default: 'ACTIVE']
  dibuat_pada datetime [default: `now()`]
  diperbarui_pada datetime [default: `now()`]
}
```

## Primary Key dan Foreign Key

### Primary Key
- `petugas.id`
- `anggota.id`
- `koleksi.id`
- `peminjaman.id`
- `perpanjangan.id`
- `pengembalian.id`
- `baca_di_tempat.id`
- `buku_tamu.id`
- `berita.id`

### Foreign Key
- `anggota.diverifikasi_oleh` -> `petugas.id`
- `koleksi.dibuat_oleh` -> `petugas.id`
- `koleksi.diperbarui_oleh` -> `petugas.id`
- `peminjaman.id_anggota` -> `anggota.id`
- `peminjaman.id_koleksi` -> `koleksi.id`
- `peminjaman.dibuat_oleh` -> `petugas.id`
- `perpanjangan.id_peminjaman` -> `peminjaman.id`
- `perpanjangan.dibuat_oleh` -> `petugas.id`
- `pengembalian.id_peminjaman` -> `peminjaman.id`
- `pengembalian.id_koleksi` -> `koleksi.id`
- `pengembalian.id_anggota` -> `anggota.id`
- `pengembalian.dibuat_oleh` -> `petugas.id`
- `baca_di_tempat.id_anggota` -> `anggota.id`
- `baca_di_tempat.id_koleksi` -> `koleksi.id`
- `baca_di_tempat.dibuat_oleh` -> `petugas.id`
- `buku_tamu.id_anggota` -> `anggota.id`
- `buku_tamu.diverifikasi_oleh` -> `petugas.id`

## Relasi (Foreign Key)

Ref: anggota.diverifikasi_oleh > petugas.id

Ref: koleksi.dibuat_oleh > petugas.id
Ref: koleksi.diperbarui_oleh > petugas.id

Ref: peminjaman.id_anggota > anggota.id
Ref: peminjaman.id_koleksi > koleksi.id
Ref: peminjaman.dibuat_oleh > petugas.id

Ref: perpanjangan.id_peminjaman > peminjaman.id
Ref: perpanjangan.dibuat_oleh > petugas.id

Ref: pengembalian.id_peminjaman > peminjaman.id
Ref: pengembalian.id_koleksi > koleksi.id
Ref: pengembalian.id_anggota > anggota.id
Ref: pengembalian.dibuat_oleh > petugas.id

Ref: baca_di_tempat.id_anggota > anggota.id
Ref: baca_di_tempat.id_koleksi > koleksi.id
Ref: baca_di_tempat.dibuat_oleh > petugas.id

Ref: buku_tamu.id_anggota > anggota.id
Ref: buku_tamu.diverifikasi_oleh > petugas.id
