# Prompt Generator UI: Halaman Buku Tamu (INLISlite Theme)

Buatkan komponen **Halaman Konten Utama (tanpa sidebar)** untuk modul **Buku Tamu** yang presisi dan konsisten dengan antarmuka UI INLISlite pada gambar acuan. Halaman harus *fully responsive*, rapi, dan didesain pas di satu layar (*minimal scrolling* / *fit-to-screen*).

---

## 1. Teknologi & Core Requirements

* **Framework CSS:** Tailwind CSS (disertai custom styling jika diperlukan untuk presisi pixel).
* **Icon Set:** Font Awesome v6 (`fas`, `far`, `fab`).
* **Layout Structure:**
  * Hanya bagian konten utama (**Main Content Area**).
  * **TIDAK PERLU** menyertakan Sidebar kiri.
  * Tinggi halaman dipatok konsisten (`min-h-screen` atau `h-screen flex flex-col justify-between`) agar tampilan pas dan footer berada tepat di posisi paling bawah tanpa overflow berlebihan.

---

## 2. Struktur Visual & Header

### A. Header Topbar (Biru Tua Keunguan `#3B5998` / `#365394` Gradient)
* **Judul Utama:** Text "Perpustakaan Mitra" di sebelah kiri (Font bold, warna putih).
* **Info Kanan:**
  * Jam & Tanggal real-time: Icon clock `fa-clock` + `8 November 2026 | 23:21:42 WIB`.
  * Tombol Profile: Kapsul membulat (`rounded-full`) berlatar transparan/semi-white dengan icon user `fa-user` + "Profile".

### B. Header Sub-Title & Breadcrumb Section (Satu Area Gradient Biru)
* **Kiri:**
  * Box Icon: Kotak putih rounded dengan outline pink/merah muda berisi icon edit/pen `fa-pen-to-square` (warna pink/red).
  * Judul Halaman Dynamis: **Buku Tamu - [Kategori]** (Font bold, text putih, 1.25rem). Contoh: *Buku Tamu - Bukan Anggota* / *Buku Tamu - Rombongan*.
  * Sub-judul Dynamis: `Daftar semua Buku Tamu [Kategori]` (Font kecil, text abu-abu muda/putih transparan).
* **Kanan (Breadcrumb):**
  * Path navigation: `fa-house` Home / Buku Tamu / **[Kategori]** (Warna text putih/kuning terang untuk posisi aktif).

---

## 3. Sub-Menu & Navigasi Kategori

Terdapat 2 Level/Kelompok Navigasi:

1. **Sub-Menu Utama Modul (2 Tab Utama):**
   * **Validasi** (Icon `fa-user-check` / `fa-clipboard-check`)
   * **Daftar** (Icon `fa-list` / `fa-table`) -> *Posisi Aktif (Active Tab)*

2. **Tab Navigation 3 Kategori Pengunjung:**
   * **Anggota** (Tab Pill 1)
   * **Bukan Anggota** (Tab Pill 2)
   * **Rombongan** (Tab Pill 3)
   *(Sediakan logika switch tab/state dynamic UI untuk 3 kategori pengunjung ini)*.

---

## 4. Card Content Area (Datatable Buku Tamu Per Kategori)

* **Card Container:** Background putih (`bg-white`), `rounded-lg`, `shadow-md`, `border border-gray-200`.
* **Card Header:** Icon tabel `fa-list-ul` + Text Bold `TABEL BUKU TAMU` (Uppercase, abu-abu tua).
* **Filter & Search Controls:**
  * Left: Dropdown limit entri `10` entries per page (`select` box ringkas).
  * Right: Search Box ringkas dengan icon kaca pembesar `fa-magnifying-glass`.

### Dynamic Table Headers & Columns (Sesuai Kategori Pengunjung):

Sediakan tampilan struktur tabel yang menyesuaikan tab kategori yang aktif:

#### **Kategori 1: Anggota**
1. `No`
2. `Tgl. Kunjungan`
3. `Nama Anggota`
4. `Nomor Anggota` (Dilengkapi badge icon kartu biru `fa-id-card` + Nomor ID)
5. `Lokasi Perpustakaan`
6. `Lokasi Ruang`
7. `Aksi` (Tombol merah icon `fa-trash-can`)

#### **Kategori 2: Bukan Anggota**
1. `No`
2. `Tgl. Kunjungan`
3. `Nama Pengunjung`
4. `Pekerjaan` (contoh: Pelajar, Dosen, Pegawai Negeri Sipil, Mahasiswa)
5. `Pendidikan` (contoh: SMA, S3, S1)
6. `Lokasi Perpustakaan`
7. `Lokasi Ruang`
8. `Aksi` (Tombol merah icon `fa-trash-can`)

#### **Kategori 3: Rombongan**
1. `No`
2. `Tgl. Kunjungan`
3. `Nama Ketua`
4. `Asal Instansi` (contoh: Sekolah X, Diansyah & Partners, Milsg, Staipi Jakarta)
5. `Jumlah Personil` (Text rata tengah/kanan, contoh: 10, 5, 30, 11)
6. `Lokasi Perpustakaan`
7. `Lokasi Ruang`
8. `Aksi` (Tombol merah icon `fa-trash-can`)

---

## 5. Card Footer & Pagination

* **Left Side:** Info entri dynamic (`Showing 1 to X of Y entries`).
* **Right Side:** Pagination Control (`<<`, `<`, `1` [Active Blue], `2`, `3`, `4`, `5`, `...`, `20`, `>`, `>>`).

---

## 6. Footer Halaman

* Diletakkan di posisi paling bawah layout.
* Alignment Center: `© 2026 Licency By Perpustakaan Nasional RI. All rights reserved.`
* Style: Text abu-abu terang (`text-gray-500`), ukuran font `text-xs` / `text-sm`.

---

## 7. Responsive & Constraints Rules

1. **Non-Overflow Layout:** Atur padding dan margin vertikal sedemikian rupa agar konten tabel dan seluruh elemen muat dengan rapi di viewport desktop tanpa kepanjangan ke bawah.
2. **Table Responsiveness:** Gunakan `overflow-x-auto` pada kontainer tabel agar tampilan mobile/tablet tidak merusak layout utama.
```

eof

```