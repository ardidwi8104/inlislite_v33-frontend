# System Prompt / Task Specification: Modul Keanggotaan INLISLite UI

## 1. Overview & General Requirements
Buatkan UI/UX antarmuka modul **Keanggotaan** pada aplikasi Perpustakaan berbasis Web (desain mengacu pada gaya INLISLite). Seluruh antarmuka harus **seragam**, **responsif**, dan **tidak terlalu panjang ke bawah** (compact layout).

### General Design & Style Guide:
- **Framework & CSS**: Responsive Layout (Bootstrap / Tailwind CSS).
- **Icon Set**: Font Awesome (Gunakan ikon Font Awesome yang sesuai di sidebar, tombol, header card, dan tabel).
- **Color Palette**:
  - Header & Topbar: Dark Royal Blue (`#2c449c` / `#3b5998`)
  - Main Sidebar Active/Focus: Purple Blue accent (`#4a54d1` / `#6366f1`)
  - Background Body: Light Gray / Soft Off-white (`#f4f6f9`)
  - Card Header / Container: White background dengan border tipis dan font shadow halus.
  - Action Buttons: Primary Blue (Simpan/Save), Green Success (Tambah/Aktifkan), Warning Yellow (Pindahkan/Pulihkan), Danger Red (Hapus/Trash).
- **Layout & Structure Constraints**:
  - **Sidebar Navigation**: Menu "Keanggotaan" aktif (expanded). Sub-menu wajib:
    1. `Entri Anggota` (Ikon `fa-user-plus`)
    2. `Daftar Anggota` (Ikon `fa-users`)
    3. `Perpanjangan Anggota` (Ikon `fa-id-card` / `fa-clock`)
    4. `Import Anggota` (Ikon `fa-file-import`)
    5. `Keranjang Anggota` (Ikon `fa-shopping-cart`)
    *(Catatan: Hapus / Jangan tampilkan sub-menu "Sumbangan")*.
  - **Header Banner**: Terdapat title halaman (kiri), breadcrumb navigasi (kanan atas), serta informasi waktu & profil user.
  - **Viewport Constraint**: Form dan tabel dirancang ringkas agar minim scrolling ke bawah pada resolusi monitor standar desktop (1080p).

---

## 2. Halaman & Sub-Menu Specifications

### Sub-Menu 1: Entri Anggota (`/anggota/create`)
- **Header Title**: `Update Anggota` / `Tambah Anggota`
- **Breadcrumb**: `Home` / `Anggota` / `Tambah Anggota`
- **Main Container**: Card bertajuk `TAMBAH ANGGOTA` dengan beberapa accordion/section yang ringkas:
  1. **Info Personal**:
     - Nama Anggota*, Jenis Identitas, Nomor Identitas, Tempat Lahir, Tanggal Lahir, Agama, Jenis Kelamin.
  2. **Kontak**:
     - Alamat Email*, No. HP, No. Telepon.
  3. **Info Anggota**:
     - Jenis Anggota*, Tanggal Pendaftaran, Masa Berlaku, Status Anggota*, Koleksi yang dapat dipinjam*, Lokasi Perpustakaan*.
  4. **Info Alamat**:
     - Alamat sesuai identitas (Alamat, Provinsi, Kota, Kecamatan, Kelurahan, RT, RW).
     - Alamat domisili (Checkbox: "Sama dengan alamat identitas").
  5. **Info Tambahan**:
     - Pekerjaan, Pendidikan (Jenjang Pendidikan, Kelas).
  6. **Upload Foto**:
     - Box drag & drop foto (`fa-cloud-upload-alt`).
     - Area Snapshot Kamera dengan tombol: `Open Camera`, `Take Snapshot`, `Save Snapshot`.
- **Action Button**: Tombol `Simpan` (Warna Biru Utama) di bagian paling bawah kiri form.

---

### Sub-Menu 2: Daftar Anggota (`/anggota`)
- **Header Title**: `Anggota` (Subtitle: *Daftar semua Anggota*)
- **Breadcrumb**: `Keanggotaan` / `Daftar Anggota`
- **Top Control Bar**:
  - Tombol aksi masal (Kiri): `Pindahkan ke Keranjang` (Kuning), `Print Kartu` (Biru), `Aktifkan Online` (Hijau).
  - Tombol utama (Kanan): `+ Tambah Anggota` (Hijau Utama).
- **Data Table**:
  - Filter: Dropdown jumlah entri (10, 25, 50) di kiri; Kolom Pencarian Search Bar di kanan.
  - Columns: `[Checkbox]`, `No`, `Nama Anggota`, `No. Anggota`, `Tgl. Register`, `Tgl. Berakhir`, `Status Anggota`, `Aksi`.
  - Empty State: Teks centered *"No data available in table"*.
  - Pagination: Info total data di kiri bawah (`Showing 0 to 0 of 0 entries`) dan kontrol halaman di kanan bawah (`« < > »`).

---

### Sub-Menu 3: Perpanjangan Anggota (`/perpanjangan-anggota`)
- **Header Title**: `Anggota` (Subtitle: *Perpanjangan semua Anggota*)
- **Breadcrumb**: `Keanggotaan` / `Perpanjangan Anggota`
- **Top Control Bar**:
  - Tombol aksi (Kanan): `+ Tambah Perpanjangan Anggota` (Hijau Utama).
- **Data Table**:
  - Columns: `No`, `Nama`, `Nomor Anggota`, `Keterangan`, `Biaya`, `Lunas` (Toggle/Badge), `Aksi` (Tombol Hapus Merah).
  - Pagination & Filter: Sinkron dengan komponen tabel standar modul lain.

---

### Sub-Menu 4: Import Anggota (`/anggota/import-view`)
- **Header Title**: `Import Anggota` (Subtitle: *Please complete the data in the following form*)
- **Breadcrumb**: `Home` / `Anggota` / `Import Anggota`
- **Card Container**: `FORM UPLOAD ANGGOTA`
  - Tombol Kanan Card Header: `Download Template` (Warna Abu-Abu/Bordered dengan ikon `fa-file-excel`).
- **Form Inputs**:
  - Input File: `Pilih file Excel` (Support format `.xls` / `.xlsx`, max size 5MB).
  - Help text format di bawah input file.
- **Action Button**: Tombol `Save` / `Upload` (Ikon `fa-upload`, warna Biru Utama).

---

### Sub-Menu 5: Keranjang Anggota (`/keranjang-anggota`)
- **Header Title**: `Keranjang Anggota` (Subtitle: *Daftar semua Keranjang Anggota*)
- **Breadcrumb**: `Keanggotaan` / `Keranjang Anggota`
- **Data Table**:
  - Columns: `[Checkbox]`, `Nama Anggota`, `No. Anggota`, `Tgl. Register`, `Tgl. Berakhir`, `Aksi`.
  - Bottom Action: Tombol `Pulihkan dari Keranjang` (Warna Kuning/Warning dengan ikon `fa-undo` / `fa-history`) diletakkan tepat di bawah tabel sebelah kiri.

---

## 3. Footer
- Teks Footer (Centered): `© 2026 Licency By Perpustakaan Nasional RI. All rights reserved.`