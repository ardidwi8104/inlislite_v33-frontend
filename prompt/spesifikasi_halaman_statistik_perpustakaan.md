# Spesifikasi UI Halaman Statistik Perpustakaan

Dokumen ini berisi spesifikasi komponen visual, teks, data, dan ikon (Font Awesome v6) untuk pembuatan halaman-halaman **Statistik Perpustakaan**, mengecualikan Header dan Footer utama situs.

---

## 1. Halaman Utama Statistik (`/statistik`)

### 1.1 Breadcrumb & Header Halaman
- **Breadcrumb:**
  - `<i class="fa-solid fa-house"></i>` [Beranda](#) `/` **Statistik**
- **Judul Halaman:** `Statistik Perpustakaan`
- **Sub-deskripsi:** `Ringkasan statistik perpustakaan. Pilih salah satu untuk melihat detail.`

---

### 1.2 Grid Kartu Statistik Utama (3 Kartu)

#### Kartu 1: Statistik Pengunjung
- **Ikon:** `<i class="fa-solid fa-users"></i>` *(Warna Biru / Navy)*
- **Judul:** `Statistik Pengunjung`
- **Deskripsi:** `Rekap jumlah pengunjung perpustakaan per bulan.`
- **Tombol Action:** `Lihat Detail` `<i class="fa-solid fa-arrow-right"></i>`

#### Kartu 2: Statistik Peminjaman
- **Ikon:** `<i class="fa-solid fa-hand-holding-hand"></i>` *(Warna Hijau)*
- **Judul:** `Statistik Peminjaman`
- **Deskripsi:** `Rekap peminjaman dan pengembalian buku.`
- **Tombol Action:** `Lihat Detail` `<i class="fa-solid fa-arrow-right"></i>`

#### Kartu 3: Statistik Anggota
- **Ikon:** `<i class="fa-solid fa-id-card"></i>` *(Warna Kuning/Emas)*
- **Judul:** `Statistik Anggota`
- **Deskripsi:** `Rekap keanggotaan dan anggota aktif.`
- **Tombol Action:** `Lihat Detail` `<i class="fa-solid fa-arrow-right"></i>`

---

## 2. Halaman Detail: Statistik Pengunjung (`/statistik/pengunjung`)

### 2.1 Breadcrumb & Header Halaman
- **Breadcrumb:**
  - `<i class="fa-solid fa-house"></i>` [Beranda](#) `/` [Statistik](#) `/` **Statistik Pengunjung**
- **Judul Halaman:** `Statistik Pengunjung`
- **Sub-deskripsi:** `Rekapitulasi dan pemantauan jumlah pengunjung perpustakaan dengan grafik progress`
- **Filter Tahun:** Dropdown Select -> `Tahun: 2026`

---

### 2.2 Ringkasan KPI Cards (4 Kartu Mini)
1. **Total Tahun 2026**
   - **Ikon:** `<i class="fa-solid fa-users"></i>` *(Biru)*
   - **Nilai:** `1.644`
   - **Label:** `Total Tahun 2026`
2. **Pengunjung Hari Ini**
   - **Ikon:** `<i class="fa-solid fa-calendar-day"></i>` *(Hijau)*
   - **Nilai:** `42`
   - **Label:** `Pengunjung Hari Ini`
3. **Pengunjung Bulan Ini**
   - **Ikon:** `<i class="fa-solid fa-calendar-days"></i>` *(Kuning/Oranye)*
   - **Nilai:** `355`
   - **Label:** `Pengunjung Bulan Ini`
4. **Rata-rata Per Bulan**
   - **Ikon:** `<i class="fa-solid fa-chart-line"></i>` *(Merah/Pink)*
   - **Nilai:** `294`
   - **Label:** `Rata-rata Per Bulan`

---

### 2.3 Grafik Progress Pengunjung Per Bulan
- **Header Seksi:** `<i class="fa-solid fa-chart-simple"></i>` `Grafik Progress Pengunjung Per Bulan`
- **Filter Badge Top Right:** `Tahun 2026`
- **Item Progress Bars:**
  - **Januari:** Progress Bar `70%` | Label: `245 orang (70%)`
  - **Februari:** Progress Bar `57%` | Label: `198 orang (57%)`
  - **Maret:** Progress Bar `79%` | Label: `276 orang (79%)`
  - **April:** Progress Bar `89%` | Label: `312 orang (89%)`
  - **Mei:** Progress Bar `83%` | Label: `289 orang (83%)`
  - **Juni:** Badge `Ramai` | Progress Bar Hijau `93%` | Label: `324 orang (93%)`
  - **Juli:** Badge `Ramai` | Progress Bar Hijau `97%` | Label: `340 orang (97%)`
  - **Agustus:** Progress Bar `90%` | Label: `315 orang (90%)`
  - **September:** Progress Bar `85%` | Label: `298 orang (85%)`
  - **Oktober:** Badge `Ramai` | Progress Bar Hijau `96%` | Label: `335 orang (96%)`

---

### 2.4 Kategori Pengunjung (Panel Samping)
- **Header Seksi:** `<i class="fa-solid fa-chart-pie"></i>` `Kategori Pengunjung`
- **Sub-deskripsi:** `Persentase komposisi pengunjung berdasarkan kelompok pemustaka:`
- **Progress Breakdown:**
  - **Pelajar / Siswa:** Bar Biru | `820 (50%)`
  - **Mahasiswa:** Bar Hijau | `430 (26%)`
  - **Masyarakat Umum:** Bar Kuning | `260 (16%)`
  - **ASN / Instansi Pemerintah:** Bar Ungu | `134 (8%)`
- **Info Box Callout:**
  - **Ikon:** `<i class="fa-solid fa-lightbulb"></i>` *(Biru)*
  - **Teks:** `Pelajar dan mahasiswa merupakan pengunjung terbanyak dengan kontribusi lebih dari 75% dari total kunjungan.`

---

### 2.5 Tabel Rekapitulasi Pengunjung
- **Header Seksi:** `<i class="fa-solid fa-table-list"></i>` `Tabel Rekapitulasi Pengunjung`
- **Keterangan:** `Diperbarui secara berkala`
- **Struktur Kolom:** `No` | `Bulan` | `Visualisasi Progress` | `Status` | `Jumlah Pengunjung`
- **Data Tabel:**
  1. `1` | `Januari` | Bar 70% | Badge `Normal` | `245 Orang`
  2. `2` | `Februari` | Bar 57% | Badge `Normal` | `198 Orang`
  3. `3` | `Maret` | Bar 79% | Badge `Normal` | `276 Orang`
  4. `4` | `April` | Bar 89% | Badge `Tinggi` (Hijau) | `312 Orang`
  5. `5` | `Mei` | Bar 83% | Badge `Normal` | `289 Orang`
  6. `6` | `Juni` | Bar 93% | Badge `Tinggi` (Hijau) | `324 Orang`
  7. `7` | `Juli` | Bar 97% | Badge `Tinggi` (Hijau) | `340 Orang`
  8. `8` | `Agustus` | Bar 90% | Badge `Tinggi` (Hijau) | `315 Orang`
  9. `9` | `September` | Bar 85% | Badge `Normal` | `298 Orang`
  10. `10` | `Oktober` | Bar 96% | Badge `Tinggi` (Hijau) | `335 Orang`

---

## 3. Halaman Detail: Statistik Peminjaman & Pengembalian (`/statistik/peminjaman`)

### 3.1 Breadcrumb & Header Halaman
- **Breadcrumb:**
  - `<i class="fa-solid fa-house"></i>` [Beranda](#) `/` [Statistik](#) `/` **Statistik Peminjaman**
- **Judul Halaman:** `Statistik Peminjaman & Pengembalian`
- **Sub-deskripsi:** `Rekap peminjaman dan pengembalian buku per bulan`

---

### 3.2 Ringkasan KPI Cards (4 Kartu Mini)
1. **Total Dipinjam**
   - **Ikon:** `<i class="fa-solid fa-book-bookmark"></i>` *(Biru)*
   - **Nilai:** `1.070`
   - **Label:** `Total Dipinjam`
2. **Total Dikembalikan**
   - **Ikon:** `<i class="fa-solid fa-rotate-left"></i>` *(Hijau)*
   - **Nilai:** `1.008`
   - **Label:** `Total Dikembalikan`
3. **Sedang Dipinjam**
   - **Ikon:** `<i class="fa-solid fa-clock"></i>` *(Kuning)*
   - **Nilai:** `62`
   - **Label:** `Sedang Dipinjam`
4. **Terlambat**
   - **Ikon:** `<i class="fa-solid fa-triangle-exclamation"></i>` *(Merah)*
   - **Nilai:** `0`
   - **Label:** `Terlambat`

---

### 3.3 Tabel Rekap Peminjaman Per Bulan
- **Header Seksi:** `Rekap Peminjaman Per Bulan`
- **Struktur Kolom:** `No` | `Bulan` | `Dipinjam` | `Dikembalikan` | `Sisa`
- **Data Tabel:**
  1. `1` | `Januari` | `156` | `142` | `14`
  2. `2` | `Februari` | `134` | `128` | `6`
  3. `3` | `Maret` | `187` | `176` | `11`
  4. `4` | `April` | `203` | `195` | `8`
  5. `5` | `Mei` | `178` | `169` | `9`
  6. `6` | `Juni` | `212` | `198` | `14`

---

## 4. Halaman Detail: Statistik Anggota (`/statistik/anggota`)

### 4.1 Breadcrumb & Header Halaman
- **Breadcrumb:**
  - `<i class="fa-solid fa-house"></i>` [Beranda](#) `/` [Statistik](#) `/` **Statistik Anggota**
- **Judul Halaman:** `Statistik Anggota`
- **Sub-deskripsi:** `Data keanggotaan perpustakaan`

---

### 4.2 Ringkasan KPI Cards (4 Kartu Mini)
1. **Total Anggota**
   - **Ikon:** `<i class="fa-solid fa-address-card"></i>` *(Biru)*
   - **Nilai:** `710`
   - **Label:** `Total Anggota`
2. **Anggota Aktif**
   - **Ikon:** `<i class="fa-solid fa-user-check"></i>` *(Hijau)*
   - **Nilai:** `698`
   - **Label:** `Anggota Aktif`
3. **Bulan Ini**
   - **Ikon:** `<i class="fa-solid fa-user-plus"></i>` *(Kuning)*
   - **Nilai:** `24`
   - **Label:** `Bulan Ini`
4. **Tidak Aktif**
   - **Ikon:** `<i class="fa-solid fa-user-xmark"></i>` *(Merah)*
   - **Nilai:** `12`
   - **Label:** `Tidak Aktif`

---

### 4.3 Seksi Tampilan Grafik & Rekapitulasi Data

#### Panel Kiri: Berdasarkan Jenis Kelamin
- **Header Seksi:** `Berdasarkan Jenis Kelamin`
- **Progress Item:**
  - **Laki-laki:** Progress Bar Navy | `412 (58%)`
  - **Perempuan:** Progress Bar Cyan/Biru Muda | `298 (42%)`

#### Panel Kanan: Berdasarkan Kategori Anggota
- **Header Seksi:** `Berdasarkan Kategori Anggota`
- **Struktur Tabel:** `Kategori` | `Jumlah`
- **Data Tabel:**
  1. `Mahasiswa` | `245`
  2. `Pelajar` | `198`
  3. `Umum` | `167`
  4. `PNS` | `65`
  5. `Lainnya` | `35`