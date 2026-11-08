# Prompt UI Component: Full-Width Website Footer

Buatkan komponen footer website responsive dengan tampilan modern, elegan, dan berukuran **full-width (100% lebar layar)** sesuai dengan spesifikasi berikut:

---

## 1. Spesifikasi Umum (General Styling)
- **Background Color:** Dark Navy Blue / Dark Slate (`#0B132B` atau `#0D1527`).
- **Width:** `100%` (Full Width tanpa margin luar).
- **Text Color Primary:** Putih (`#FFFFFF`).
- **Text Color Secondary (Muted):** Muted Gray / Slate Light (`#8C9BAE` atau `#94A3B8`).
- **Font Family:** Sans-serif modern (misal: Inter, Poppins, atau Roboto).
- **Padding:** Padding atas-bawah `60px` hingga `80px`, padding samping `5%` atau `64px`.

---

## 2. Struktur Tata Letak (Layout Grid)
Gunakan tata letak **Grid 3 Kolom** (atau Flexbox responsive) pada bagian konten utama:

### **Kolom 1: Branding & Deskripsi (Kiri)**
- **Logo & Judul Utama:**
  - **Logo:** Berada di sebelah kiri teks "Perpustakaan Mitra". Logo berlatar belakang putih berbentuk persegi panjang tumpul (rounded corner) dengan tulisan "inlis Lite Integrated Library System 3.3" beserta ikon awan dan buku cyan/blue.
  - **Teks Branding:** Tulisan **"Perpustakaan Mitra"** berada tepat di samping kanan logo.
    - Ukuran Font: `22px` - `24px`
    - Ketebalan: `Bold` (700)
    - Warna: Putih (`#FFFFFF`)
- **Deskripsi Singkat:**
  - Terletak di bawah logo & nama brand dengan jarak (margin-top) sekitar `20px`.
  - Teks: *"Dinas Perpustakaan Mitra berkomitmen untuk menyediakan layanan perpustakaan berkualitas bagi seluruh lapisan masyarakat di wilayah Daerah kami"*
  - Ukuran Font: `14px` - `15px`
  - Warna: Muted Gray (`#8C9BAE`)
  - Alignment: Left (rata kiri)

---

### **Kolom 2: Navigasi Layanan (Tengah)**
- **Judul Seksi:** **"Layanan"**
  - Ukuran Font: `18px` - `20px`
  - Ketebalan: `Bold` (700)
  - Warna: Putih (`#FFFFFF`)
  - Margin Bottom: `20px`
- **Daftar Link (Unordered List):**
  - Jarak antar item (vertical gap): `12px` - `16px`
  - Ukuran Font: `14px` - `15px`
  - Warna: Muted Gray (`#8C9BAE`) dengan efek hover menjadi putih (`#FFFFFF`).
  - **Daftar Teks:**
    1. Keanggotaan Online
    2. Peminjaman Mandiri
    3. Pengembalian Mandiri
    4. OPAC

---

### **Kolom 3: Kontak & Lokasi (Kanan)**
- **Judul Seksi:** **"Kontak & Lokasi"**
  - Ukuran Font: `18px` - `20px`
  - Ketebalan: `Bold` (700)
  - Warna: Putih (`#FFFFFF`)
  - Margin Bottom: `20px`
- **Daftar Informasi Kontak:**
  - Setiap baris terdiri dari **Ikon di sebelah kiri** dan **Teks di sebelah kanan** (align-items: center).
  - Warna Ikon: Bright Cyan / Light Blue (`#2563EB` atau `#3B82F6`).
  - Ukuran Font Teks: `14px` - `15px`
  - Warna Teks: Muted Gray (`#8C9BAE`)
  - Jarak antar baris: `14px` - `18px`
  - **Detail Baris:**
    1. **Ikon Lokasi (Pin/Map Marker):** `Jalan Gebang Sari Nomor 38, RT.2/RW.5`
    2. **Ikon Telepon (Phone):** `08118055777`
    3. **Ikon Email (Envelope/Mail):** `perpustakaansrma9@gmail.com`
    4. **Ikon Jam / Waktu (Clock):** `Jam Operasional Perpustakaan Mitra`

---

## 3. Garis Pembatas (Divider)
- Terletak horizontal di bawah seluruh konten grid 3 kolom.
- **Warna Garis:** Dark Border Gray / Blue (`#1E293B` atau `rgba(255, 255, 255, 0.1)`).
- **Ketebalan:** `1px`
- **Margin:** `40px 0 24px 0` (jarak ke atas `40px`, ke bawah `24px`).

---

## 4. Bagian Hak Cipta (Bottom Copyright)
- **Posisi Teks:** **Rata Tengah (Center Aligned)**.
- **Teks:** `© 2026 Perpustakaan Mitra. All rights reserved.`
- **Ukuran Font:** `13px` - `14px`
- **Warna Teks:** Muted Gray (`#8C9BAE`)
- **Alignment:** `text-align: center; width: 100%;`