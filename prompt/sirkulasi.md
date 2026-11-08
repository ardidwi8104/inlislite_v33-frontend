# Prompt Developer: Frontend UI Menu Sirkulasi (INLISLite / Perpustakaan Mitra)

## Context & Objective
Buat tampilan halaman web frontend untuk modul **Sirkulasi** pada sistem aplikasi perpustakaan berbasis INLISLite ("Perpustakaan Mitra"). 
Tampilan UI/UX **HARUS SINKRON & SAMA PERSIS** dengan desain antarmuka yang sudah ada pada screenshot terlampir (Sidebar, Header Blue Banner, Content Cards, Table Style, Form Inputs, dan Button Styles).

---

## Technical & Design Requirements

### 1. Framework & Libraries
- **CSS Framework**: Tailwind CSS atau Bootstrap 5 (gunakan utility classes yang setara).
- **Icon Set**: **Font Awesome 6** (`fa-solid`, `fa-regular`, dll). 
  - *Catatan:* Semua icon pada sidebar, header, form, dan tombol wajib menggunakan Font Awesome.
- **Layout & Responsiveness**: 
  - Responsive sepenuhnya (Flexbox/Grid), namun **tinggi konten tidak boleh terlalu panjang ke bawah** (compact viewport/dashboard layout).
  - Area tabel atau form menggunakan *max-height* dengan *scrollbar* halus jika data meluap, atau batasi *page size* default 10 baris.

---

## UI Components & Design System Specs

### A. Sidebar (Kiri)
- **Background**: Putih (`#FFFFFF`) dengan *border-right* / shadow halus.
- **Header Sidebar**: Logo **inlis INLISLite** di bagian atas[cite: 1].
- **Menu Items**:
  - Menu Aktif / Expanded: **Sirkulasi** (Background rounded biru muda/ungu muda `#4F46E5` / `#E0E7FF` dengan indicator chevron up `fa-chevron-up`).
  - Sub-menu items di dalam Sirkulasi:
    1. `fa-edit` / `fa-file-signature` : **Entri Peminjaman** (URL: `/sirkulasi/peminjaman/create`)[cite: 6]
    2. `fa-rotate-right` / `fa-sync` : **Entri Perpanjangan** (URL: `/sirkulasi/perpanjangan/create`)[cite: 5]
    3. `fa-box-archive` / `fa-undo` : **Entri Pengembalian** (URL: `/sirkulasi/pengembalian/create`)[cite: 4]
    4. `fa-book-reader` / `fa-hand-holding` : **Peminjaman** (URL: `/sirkulasi/peminjaman`)[cite: 3]
    5. `fa-clock-rotate-left` : **Perpanjangan** (URL: `/sirkulasi/perpanjangan`)[cite: 2]
    6. `fa-rotate-left` / `fa-right-left` : **Pengembalian** (URL: `/sirkulasi/pengembalian`)[cite: 1]
    7. `fa-triangle-exclamation` : **Pelanggaran**[cite: 1]
- Item yang sedang dibuka harus ditandai dengan **highlight background biru pastel** dan teks tebal[cite: 1, 4, 5, 6].

### B. Top Header & Blue Banner
- **Header Top Right**: Tanggal & Jam realtime (misal: `8 November 2026 | 22:20:46 WIB`) dengan icon `fa-clock`, serta Tombol Profile dengan icon `fa-user`[cite: 1, 2, 3].
- **Hero Banner Area**:
  - Background: Gradient Biru (`#2563EB` ke `#1D4ED8` / Deep Blue)[cite: 1].
  - Judul Aplikasi: **Perpustakaan Mitra** (Putih, Bold, Font Size Besar)[cite: 1].
  - Card Judul Halaman Overlay: Box putih kecil berisi icon halaman + Nama Sub-Menu (misal: "Pengembalian", "Perpanjangan", "Peminjaman", atau "Entri ...").
  - Breadcrumb Right: `fa-home` Home > Nama Sub-menu[cite: 1, 2, 3, 4, 5, 6].

---

## Sub-Menu Page Variants

### Variant 1: Data Table Pages (`/sirkulasi/peminjaman`, `/perpanjangan`, `/pengembalian`)
1. **Card Header**:
   - Judul Card (Kiri): `fa-list-ul` DAFTAR PEMINJAMAN / DAFTAR PERPANJANGAN / DAFTAR PENGEMBALIAN[cite: 1, 2, 3].
   - Tombol Aksi (Kanan): 
     - Tombol Hijau `+ Peminjaman` / `+ Perpanjangan` / `+ Pengembalian` (menggunakan icon `fa-plus`)[cite: 1, 2, 3].
     - *Khusus Peminjaman:* Sertakan tombol Merah `fa-bell Notifikasi Semua Terlambat` di sebelah kiri tombol tambah[cite: 3].
2. **Filter & Search Bar**:
   - Select Show Entries (Dropdown 10, 25, 50)[cite: 1, 2, 3].
   - Search Bar di kanan dengan icon `fa-search`[cite: 1, 2, 3].
3. **Table Header & Data (Navy Blue `#1E3A8A` / `#1E293B`)**:
   - Headers: `No`, `No. Barcode`, `Penerbit / Judul`, `Tgl. Pinjam / Jatuh Tempo`, `Tgl. Kembali` / `Tgl. Perpanjang`, `Hari Terlambat` / `Status`, `Lokasi Perpustakaan`, `Updated Date`[cite: 1, 2, 3].
   - State Kosong: `"No data available in table"`[cite: 1, 2, 3].
4. **Footer Pagination**:
   - Kiri: `Showing 0 to 0 of 0 entries`[cite: 1, 2, 3].
   - Kanan: Control Pagination (`«`, `<`, `>`, `»`)[cite: 1, 2, 3].

---

### Variant 2: Form Entri Pages (`/sirkulasi/*/create`)

#### A. Entri Peminjaman (`/sirkulasi/peminjaman/create`)
- **Wizard Step Indicator**: 3 Langkah (`1. Anggota` -> `2. Scan Buku` -> `3. Konfirmasi`)[cite: 6].
- **Main Scan Box**:
  - Icon `fa-id-card` di dalam lingkaran biru muda[cite: 6].
  - Title: "Masukkan Nomor Anggota"[cite: 6].
  - Input field dengan icon `fa-id-card` di kiri[cite: 6].
  - Tombol Biru: `fa-search Validasi Anggota`[cite: 6].
- **Bottom Info Grid (2 Column/3 Column)**:
  - Card 1: **Langkah-langkah penggunaan** (Langkah 1, 2, 3 dengan icon)[cite: 6].
  - Card 2: **Tips Penggunaan** (`fa-lightbulb` / bullet list hijau)[cite: 6].
  - Card 3: **Perhatian** (`fa-exclamation-triangle` / bullet list oranye)[cite: 6].

#### B. Entri Perpanjangan & Entri Pengembalian (`/sirkulasi/perpanjangan/create` & `/pengembalian/create`)
- **Main Scan Card Header**: Dark Navy (`#1E293B`) dengan judul "Scan Barcode Buku" & icon `fa-undo` / `fa-rotate-right`[cite: 4, 5].
- **Scan Box Content**:
  - Icon Barcode `fa-barcode` di lingkaran abu-abu/biru[cite: 4, 5].
  - Text Prompt: "Scan atau Masukkan Barcode Buku"[cite: 4, 5].
  - Input Text dengan Icon `fa-barcode` di sebelah kiri[cite: 4, 5].
  - *(Khusus Perpanjangan)* Selection **Durasi Perpanjangan**: Card Pilihan Hari (7 Hari, 14 Hari, 21 Hari, 30 Hari) dengan active state border biru[cite: 5].
  - Action Buttons:
    - Tombol Outline Biru: `fa-search Cek Buku`[cite: 4, 5].
    - Tombol Hijau / Toska: `fa-rotate-right Perpanjang Buku` ATAU `fa-undo Kembalikan Buku`[cite: 4, 5].
- **Riwayat Terbaru Card**:
  - Card Header: Dark Green / Navy Banner[cite: 4, 5].
  - Content: List/Tabel "5 Perpanjangan/Pengembalian Terakhir" + Tombol `fa-sync Refresh` di pojok kanan[cite: 4, 5].

---

## Layout Limits & Rules
1. **No Overflow Kebawah (Strict Height Rule)**:
   - Konten halaman tidak boleh terlalu tinggi. Komponen form dan tabel dirancang ringkas (padding `py-2` hingga `py-3`, margin `my-2`).
2. **Footer Copyright**:
   - Terletak di paling bawah halaman: `© 2026 Licency By Perpustakaan Nasional RI. All rights reserved.`[cite: 1, 2, 3, 4, 5, 6] (Text Muted, Small, Center).