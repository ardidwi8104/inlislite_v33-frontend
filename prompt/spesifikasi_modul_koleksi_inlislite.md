# Spesifikasi UI & Prompt Implementasi Sub-Menu "Koleksi" (INLISLite Style)

Dokumen ini berisi spesifikasi desain antarmuka (UI), komponen layout, data dummy, serta instruksi prompt lengkap untuk membangun/mengembangkan seluruh sub-menu dalam modul **Koleksi** pada sistem manajemen perpustakaan (Petugas UI).

---

## 1. Daftar Sub-Menu Dalam Modul Koleksi

Modul **Koleksi** memiliki 6 (enam) sub-menu utama:
1. **Daftar Katalog** (`/katalog/index`)
2. **Karantina Katalog** (`/katalog/karantina`)
3. **Salin Katalog** (`/katalog/salin-marc`)
4. **Daftar Eksemplar** (`/eksemplar/index`)
5. **Import Excel** (`/eksemplar/import`)
6. **Karantina Eksemplar** (`/eksemplar/karantina`)

---

## 2. Palette Warna & Identitas Visual (Design System)

* **Primary Topbar Header:** `#4E65D0` / `#435EBE` (Royal Blue / Indigo)
* **Sidebar Active Background:** `#EAEFFD` (Soft Pastel Blue)
* **Sidebar Active Text/Icon:** `#435EBE`
* **Primary Button (Tambah/Simpan):** `#198754` (Green / Success) atau `#0D6EFD` (Blue / Action)
* **Warning Button (Karantina/Pulihkan):** `#FFC107` (Amber / Yellow)
* **Danger Button (Hapus Permanen):** `#DC3545` (Red)
* **Font Family:** Open Sans / Inter / Nunito Sans

---

## 3. Data Dummy Lintas Sub-Menu

Berikut adalah data dummy JSON yang siap dipakai untuk mengisi tampilan tabel agar tidak kosongan:

```json
{
  "katalog": [
    {
      "id": 1,
      "bibid": "BIB-2026-0001",
      "judul": "Laskar Pelangi",
      "edisi": "Edisi Revisi Cetakan Ke-12",
      "publisher": "Bentang Pustaka (Yogyakarta)",
      "deskripsi_fisik": "xii, 529 hlm. ; 20 cm",
      "no_panggil": "823 DAN l",
      "eksemplar_count": 5,
      "opac": true,
      "pedoman_katalog": "RDA",
      "status_karantina": false
    },
    {
      "id": 2,
      "bibid": "BIB-2026-0002",
      "judul": "Bumi Manusia",
      "edisi": "Cetakan Ke-5",
      "publisher": "Lentera Dipantara (Jakarta)",
      "deskripsi_fisik": "x, 535 hlm. ; 21 cm",
      "no_panggil": "813 TOE b",
      "eksemplar_count": 3,
      "opac": true,
      "pedoman_katalog": "AACR",
      "status_karantina": false
    },
    {
      "id": 3,
      "bibid": "BIB-2026-0003",
      "judul": "Pemrograman Web dengan Laravel 10 dan Tailwind CSS",
      "edisi": "Edisi Pertama",
      "publisher": "Informatika (Bandung)",
      "deskripsi_fisik": "viii, 340 hlm. ; 24 cm",
      "no_panggil": "005.133 UTW p",
      "eksemplar_count": 8,
      "opac": true,
      "pedoman_katalog": "RDA",
      "status_karantina": false
    },
    {
      "id": 4,
      "bibid": "BIB-2026-0004",
      "judul": "Metodologi Penelitian Kuantitatif & Kualitatif",
      "edisi": "Edisi 2",
      "publisher": "Rajawali Pers (Jakarta)",
      "deskripsi_fisik": "xiv, 412 hlm. ; 23 cm",
      "no_panggil": "001.42 SUG m",
      "eksemplar_count": 2,
      "opac": false,
      "pedoman_katalog": "AACR",
      "status_karantina": true
    }
  ],
  "eksemplar": [
    {
      "id": 101,
      "no_barcode": "BC-202600101",
      "tgl_pengadaan": "2026-01-15",
      "no_induk": "IND-2026-001",
      "data_bibliografis": "Laskar Pelangi / Andrea Hirata (Bentang Pustaka, 2018)",
      "drm": "Bebas",
      "karantina": "Tidak",
      "opac": "Tampil",
      "status": "Tersedia",
      "lokasi": "Perpustakaan Utama - Rak 08",
      "status_karantina": false
    },
    {
      "id": 102,
      "no_barcode": "BC-202600102",
      "tgl_pengadaan": "2026-01-15",
      "no_induk": "IND-2026-002",
      "data_bibliografis": "Laskar Pelangi / Andrea Hirata (Bentang Pustaka, 2018)",
      "drm": "Bebas",
      "karantina": "Tidak",
      "opac": "Tampil",
      "status": "Dipinjami",
      "lokasi": "Perpustakaan Utama - Rak 08",
      "status_karantina": false
    },
    {
      "id": 103,
      "no_barcode": "BC-202600201",
      "tgl_pengadaan": "2026-02-01",
      "no_induk": "IND-2026-089",
      "data_bibliografis": "Bumi Manusia / Pramoedya Ananta Toer (Lentera Dipantara, 2020)",
      "drm": "Bebas",
      "karantina": "Ya",
      "opac": "Sembunyi",
      "status": "Dalam Perbaikan",
      "lokasi": "Ruang Restorasi",
      "status_karantina": true
    }
  ]
}
```

---

## 4. Prompt Generasi Kode Frontend (Layout & 6 Halaman Sub-Menu)

Gunakan prompt berikut saat menyerahkan ke developer AI / LLM untuk membuat antarmuka halaman secara presisi:

```markdown
### SYSTEM PROMPT: INLISLITE PETUGAS UI GENERATOR

Anda adalah Frontend Web Developer senior yang ahli dalam membuat dashboard admin berbasis **HTML5, Tailwind CSS, dan FontAwesome Icons**, mengikuti gaya persis aplikasi **INLISLite v3.2 / Perpustakaan Mitra**.

Buat satu aplikasi Single Page (atau Blade Template / Component) yang memiliki sidebar collapsible dan topbar berwarna indigo (`bg-[#4E65D0]`), serta merender 6 sub-menu dalam dropdown **"Koleksi"**:

---

#### A. Komponen Sidebar & Topbar (Global Layout)
1. **Sidebar Left:**
   - Header: Logo INLISLite + Teks "INLISLite"
   - Menu Items:
     - Dashboard
     - Berita
     - Banner
     - **Koleksi** (Dropdown Active/Open)
       - 📄 Daftar Katalog
       - 🗑️ Karantina Katalog
       - 📋 Salin Katalog
       - 📚 Daftar Eksemplar
       - 📥 Import Excel
       - 🗑️ Karantina Eksemplar
     - Keanggotaan
     - Sirkulasi
2. **Topbar Right:**
   - Judul Aplikasi: "Perpustakaan Mitra"
   - Widget Waktu Live: "8 November 2026 | 15:34:00 WIB"
   - Button Profile dengan Icon User.

---

#### B. Spesifikasi Detail 6 Sub-Menu Koleksi

##### 1. Sub-Menu: Daftar Katalog (`/katalog/index`)
- **Header Section:** Icon Book + Title "Katalog" (Daftar semua Katalog).
- **Action Bar:**
  - Tombol Yellow: `[🛒 Pindahkan ke Karantina]`
  - Tombol Blue: `[☑ Tampilkan di OPAC]`
  - Tombol Success (Right): `[+ TAMBAH KATALOG RDA]` & `[+ TAMBAH KATALOG AACR]`
- **Filter Controls:** Dropdown Show Entries (10, 25, 50) + Input Search di kanan.
- **Table Columns:** `[Checkbox] | No | BIBID | Judul | Edisi | Publisher | Deskripsi Fisik | No. Panggil | Eksemplar | OPAC | Pedoman Katalog | Aksi`
- **Data Dummy:** Tampilkan minimal 3 data dari objek JSON Katalog.

##### 2. Sub-Menu: Karantina Katalog (`/katalog/karantina`)
- **Header Section:** Icon Trash/Storage + Title "Karantina Katalog" (Daftar semua Karantina Katalog).
- **Action Bar:**
  - Tombol Yellow: `[🔄 Pulihkan dari Karantina]`
  - Tombol Red: `[🗑 Hapus Permanen]`
- **Table Columns:** `[Checkbox] | No | BIBID | Judul | Edisi | Publisher | Deskripsi Fisik | No. Panggil | Eksemplar | Pedoman Katalog | Aksi`
- **Data Dummy:** Tampilkan minimal 1 data katalog berstatus karantina.

##### 3. Sub-Menu: Salin Katalog (`/katalog/salin-marc`)
- **Header Section:** Icon Upload/Cloud + Title "Impor Katalog dari File MARC".
- **Card Container (Step 1 - Pilih File MARC):**
  - Radio Button: `(o) MARC Binary (.mrc)` | `( ) MARC XML (.xml)`
  - File Input Input Field + Button `[Choose File]`.
  - Button Action: `[🔍 Preview Data]` (Blue Button).

##### 4. Sub-Menu: Daftar Eksemplar (`/eksemplar/index`)
- **Header Section:** Icon Books/Barcode + Title "Eksemplar" (Daftar semua Eksemplar).
- **Action Bar:**
  - Dropdown Action: `-- Pilih Aksi --` + Button Blue `[✓ Proses]`
  - Tombol Success Right: `[+ Tambah Eksemplar]`
- **Table Columns:** `No | [Checkbox] | No. Barcode | Tanggal Pengadaan | No. Induk | Data Bibliografis | DRM | Karantina | OPAC | Status | Lokasi | Aksi`
- **Data Dummy:** Tampilkan minimal 2 data eksemplar.

##### 5. Sub-Menu: Import Excel (`/eksemplar/import`)
- **Header Section:** Icon File Excel + Title "Import Eksemplar Excel".
- **Top Card (Upload Area):**
  - Drag & Drop Zone dengan Icon Upload + Button `[📁 Pilih File]`.
  - Tombol Right: `[📥 Download Template]` (Cyan/Teal Button).
- **Bottom Card (Informasi Format File):**
  - Grid 2 Kolom penjelasan atribut mandatory (Data Catalog: Judul Utama, Pengarang, Penerbit dll. Data Collection: Barcode, No Induk, Tgl Pengadaan dll).
  - Alert Box Soft Yellow: Catatan penting ukuran file & aturan penulisan data.

##### 6. Sub-Menu: Karantina Eksemplar (`/eksemplar/karantina`)
- **Header Section:** Icon Storage/Trash + Title "Karantina Eksemplar" (Daftar semua Karantina Eksemplar).
- **Action Bar:**
  - Tombol Green: `[🔄 Pulihkan ke Daftar Eksemplar]`
  - Tombol Red: `[🗑 Hapus Permanen]`
- **Table Columns:** `[Checkbox] | No. Barcode | Tanggal Pengadaan | No. Induk | Data Bibliografis | OPAC | Karantina | Aksi`
- **Data Dummy:** Tampilkan 1 data eksemplar yang dalam kondisi terisolasi/karantina.
```

---

## 5. Ringkasan Fitur Navigasi Sub-Menu

| Nama Sub-Menu | Fungsi Utama | Key Controls / Buttons |
| :--- | :--- | :--- |
| **Daftar Katalog** | Mengelola bibid & data bibliografi utama | `+ Tambah RDA`, `+ Tambah AACR`, `Pindahkan ke Karantina`, `Tampilkan OPAC` |
| **Karantina Katalog** | Penampungan katalog yang dihapus sementara | `Pulihkan dari Karantina`, `Hapus Permanen` |
| **Salin Katalog** | Import file data standar MARC21 (.mrc/.xml) | `Choose File`, `Preview Data` |
| **Daftar Eksemplar** | Mengelola copy fisik buku (barcode & lokasi) | `+ Tambah Eksemplar`, `Bulk Action Dropdown` |
| **Import Excel** | Batch upload data eksemplar & katalog via Excel | `Drag & Drop File`, `Download Template .xlsx` |
| **Karantina Eksemplar** | Penampungan fisik eksemplar rusak/di-quarantine | `Pulihkan ke Eksemplar`, `Hapus Permanen` |
```

eof

---

Dokumentasi spesifikasi prompt `.md` di atas sudah mencakup struktur lengkap UI, tata letak antarmuka perpustakaan **INLISLite v3.2**, hingga data dummy JSON agar tampilan halaman tidak kosong saat dimuat. 

Apakah Anda ingin saya membuatkan file skrip Single Page HTML/Tailwind CSS yang dapat langsung dibuka dan dijalankan di browser?