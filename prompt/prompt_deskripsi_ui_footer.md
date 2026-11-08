# Prompt UI Component: Full-Width Website Footer

Buatkan komponen footer website responsive dengan desain modern, elegan, berukuran **full-width (lebar 100% layar)**, serta presisi sesuai dengan spesifikasi berikut:

---

## 1. Spesifikasi Utama & Skema Warna (General Styling)

* **Layout Container:** Full width `100%` (tanpa margin luar).
* **Background Color:** Dark Navy Blue / Dark Slate (`#0B132B` / `#0A1128`).
* **Font Family:** Sans-serif modern (Inter, Plus Jakarta Sans, atau Roboto).
* **Warna Utama Teks (Primary):** Putih (`#FFFFFF`).
* **Warna Teks Sekunder (Secondary/Muted):** Light Blue Gray / Muted Gray (`#94A3B8` / `#8C9BAE`).
* **Warna Ikon Kontak:** Cyan / Light Blue Bright (`#38BDF8` / `#3B82F6`).
* **Padding:** Padding atas-bawah `60px`, padding samping `5%` hingga `64px`.

---

## 2. Tata Letak Konten (Grid 3 Kolom)

Gunakan **Grid 3 Kolom** (atau Flexbox responsive) dengan pembagian ruang yang proporsional:

### **Kolom 1: Branding, Deskripsi & Sosial Media (Kiri)**

1. **Logo & Nama Branding:**
   * **Logo Box:** Berada di sebelah kiri. Berbentuk persegi panjang tumpul (rounded box) warna putih bersih. Di dalamnya terdapat logo "Inlis Lite 3.3" (awan cyan + buku).
   * **Teks Judul Branding:** **"Perpustakaan Mitra"** berada di samping kanan logo box.
     * Ukuran Font: `22px` - `24px`
     * Ketebalan: `Bold` (700)
     * Warna: Putih (`#FFFFFF`)

2. **Deskripsi Teks:**
   * Terletak di bawah logo & nama brand (margin-top: `16px`).
   * Teks: *"Dinas Perpustakaan Mitra berkomitmen untuk menyediakan layanan perpustakaan berkualitas bagi seluruh lapisan masyarakat di wilayah Daerah kami."*
   * Ukuran Font: `14px`
   * Warna: Muted Gray (`#94A3B8`)
   * Alignment: Left (Rata kiri)

3. **Ikon Sosial Media:**
   * Terletak di bawah deskripsi (margin-top: `20px`).
   * Berupa **4 Tombol Lingkaran (Circular Buttons)** berlatar belakang biru gelap transparan / slate (`#1E293B` / `rgba(255,255,255,0.1)`).
   * Warna Ikon di dalam lingkaran: Putih (`#FFFFFF`).
   * Urutan Ikon:
     1. Facebook (`fa-facebook-f`)
     2. Instagram (`fa-instagram`)
     3. Tree/Custom Link (misal: Linktree)
     4. Email / Message Envelope (`fa-envelope`)
   * Efek Hover: Berubah warna latar/ikon menjadi lebih terang saat di-hover.

---

### **Kolom 2: Layanan (Tengah)**

1. **Judul Seksi:** **"Layanan"**
   * Ukuran Font: `18px` - `20px`
   * Ketebalan: `Bold` (700)
   * Warna: Putih (`#FFFFFF`)
   * Margin Bottom: `20px`

2. **Daftar Menu Layanan (Vertical List):**
   * Jarak antar item (vertical gap): `12px`
   * Ukuran Font: `14px`
   * Warna Teks: Muted Gray (`#94A3B8`)
   * Efek Hover: Warna teks menjadi Putih (`#FFFFFF`).
   * **Item Teks (urut dari atas ke bawah):**
     * Daftar Anggota Online
     * Katalog OPAC
     * Buku Tamu Digital
     * Layanan Digital & E-Buku
     * Layanan Referensi
     * Layanan Penelusuran Informasi
     * Layanan Anak & Pemuda
     * Jam Operasional & Tata Tertib

---

### **Kolom 3: Kontak & Lokasi (Kanan)**

1. **Judul Seksi:** **"Kontak & Lokasi"**
   * Ukuran Font: `18px` - `20px`
   * Ketebalan: `Bold` (700)
   * Warna: Putih (`#FFFFFF`)
   * Margin Bottom: `20px`

2. **Daftar Detail Kontak (Icon + Text Row):**
   * Setiap baris memiliki **Ikon berwarna Cyan/Light Blue** di sebelah kiri dan **Teks** di sebelah kanan.
   * Jarak antar baris: `14px`

   * **Baris 1 (Lokasi):**
     * Ikon: Pin Marker / Map Marker Cyan
     * Teks: `Jl. Korpri KM. 9, Kelurahan Nipah-Nipah, Kecamatan Penajam, Kabupaten Penajam Paser Utara, Kalimantan Timur`
     * Ukuran Font: `14px`
     * Warna: Muted Gray (`#94A3B8`)

   * **Baris 2 (Email):**
     * Ikon: Amplop / Mail Cyan
     * Teks: `kpa.kab.ppu@gmail.com`
     * Ukuran Font: `14px`
     * Warna: Muted Gray (`#94A3B8`)

   * **Baris 3 (Instagram):**
     * Ikon: Kamera Instagram Cyan
     * Teks: `@perpustakaankabppu`
     * Ukuran Font: `14px`
     * Warna: Muted Gray (`#94A3B8`)

   * **Baris 4 (Jam Operasional):**
     * Ikon: Jam / Clock Cyan
     * **Judul Jam:** **"Jam Operasional:"** (Teks Bold Putih, `14px`)
     * **Sub-list (Bullet points):**
       * `• Senin – Jumat: Pukul 08.00 – 19.00 WITA`
       * `• Sabtu – Minggu: Pukul 09.00 – 15.30 WITA`
     * **Catatan Tambahan (Italic/Small):**
       * `*Perpustakaan tutup pada hari Libur Nasional dan Cuti Bersama.` (Warna: Muted Gray, Ukuran: `12px` - `13px`)

---

## 3. Garis Pembatas Horizontal (Divider Line)

* Garis tipis horizontal membentang secara full-width di bawah seksi 3 kolom.
* **Warna:** Border Gray Dark (`rgba(255, 255, 255, 0.1)` atau `#1E293B`).
* **Ketebalan:** `1px`
* **Margin:** `40px` di atas garis, `24px` di bawah garis.

---

## 4. Hak Cipta / Copyright (Bottom Bar)

* **Alignment / Posisi:** **Tepat di Tengah (Center Aligned)**.
* **Teks:** `© 2026 Perpustakaan Mitra. All rights reserved.`
* **Ukuran Font:** `13px` - `14px`
* **Warna Teks:** Muted Gray (`#94A3B8`)
* **Styling CSS:** `text-align: center; width: 100%; display: block;`