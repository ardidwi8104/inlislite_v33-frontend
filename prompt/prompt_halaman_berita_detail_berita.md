# Prompt Development: Halaman Daftar & Detail Berita (News System)

Buatkan komponen dan halaman **Daftar Berita (News List)** serta **Detail Berita (News Detail)** menggunakan HTML, CSS (Tailwind CSS direkomendasikan), dan ikon dari **Font Awesome**. Tampilan harus presisi dan sama persis dengan referensi desain (tanpa mengimplementasikan Header/Navbar utama dan Footer utama). 

Sistem harus memiliki navigasi interaktif: **ketika salah satu card berita diklik, tampilan berpindah ke halaman Detail Berita**.

---

## 📄 HALAMAN 1: DAFTAR BERITA (NEWS LIST PAGE)

### 🎨 1. Header Halaman & Pencarian
* **Breadcrumb**: `Beranda` / `Berita` (Teks kecil abu-abu, item terakhir gelap).
* **Judul Utama**: `Berita Terbaru` (Font tebal, besar, warna gelap `text-slate-900`).
* **Input Pencarian (Search Bar)**:
  * Input text dengan placeholder: `"Cari berita..."`.
  * Style: Border halus, sudut membulat (`rounded-lg`), posisi di bawah judul utama rata kiri.

### 📰 2. Grid Card Berita (News Grid)
* **Layout**: Grid 4 Kolom responsive (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`).
* **Struktur Setiap Card Berita**:
  * **Background**: Putih (`bg-white`) dengan border tipis (`border border-slate-200`) dan shadow halus.
  * **Gambar Thumbnail**: Terletak di bagian atas card, membulat di sudut atas (`rounded-t-xl`), tinggi proporsional (`h-44 object-cover`).
  * **Area Konten (Padding Inside)**:
    * **Tanggal**: Icon `<i class="fa-regular fa-calendar"></i>` disusul tanggal (contoh: `25 Mei 2026`). Font kecil warna abu-abu.
    * **Judul Berita**: Text bold (`font-bold text-slate-800`), font medium, hover berubah warna biru. Max 2 baris.
    * **Ringkasan (Excerpt)**: Text abu-abu pendek (`text-sm text-slate-500 line-clamp-2`).
  * **Footer Card**:
    * **Penulis**: Icon `<i class="fa-regular fa-user"></i> admin` di sebelah kiri.
    * **Tombol Detail**: Link/Teks `Selengkapnya` disusul icon `<i class="fa-solid fa-arrow-right"></i>` di sebelah kanan (warna biru).
  * **Interaksi Klik**: Seluruh card atau tombol "Selengkapnya" memiliki cursor pointer. Ketika diklik, berpindah tampilan ke **Halaman Detail Berita**.

### 📄 3. Pagination
* Terletak di tengah bawah grid card.
* **Elemen**: 
  * Tombol `Prev` (disabled/grayed out jika di halaman 1).
  * Tombol Angka Halaman `1` (Aktif: background biru gelap, text putih).
  * Tombol `Next`.

---

## 📄 HALAMAN 2: DETAIL BERITA (NEWS DETAIL PAGE)

### 🎨 1. Breadcrumb (Navigasi Atas)
* **Item**: `Beranda` / `Berita` / `Detail Berita` (Teks `Detail Berita` aktif/gelap).

### 📐 2. Layout Grid 2 Kolom (Main Content & Sidebar)
* **Grid**: `grid grid-cols-1 lg:grid-cols-3 gap-8`.
* **Kolom Kiri (Utama)**: Span 2 kolom (\~66-70% lebar).
* **Kolom Kanan (Sidebar)**: Span 1 kolom (\~30-34% lebar).

### 📰 3. Kolom Utama (Konten Detail Berita)
* **A. Gambar Utama (Featured Image)**: Banner besar dengan sudut membulat (`rounded-2xl`).
* **B. Metadata Berita (Meta Bar Atas)**:
  * **Kiri**: 
    * Tanggal: `<i class="fa-regular fa-calendar"></i> 25 Mei 2026`
    * Penulis: `<i class="fa-regular fa-user"></i> admin`
    * Lokasi/Kategori: `<i class="fa-solid fa-location-dot"></i> Penajam`
  * **Kanan**: Tombol Dropdown Bagikan (`Bagikan` `<i class="fa-solid fa-chevron-down"></i>`).
* **C. Judul Berita**: `Sosialisasi INLISLite 3.3` (Bold, ukuran `text-2xl` / `text-3xl`).
* **D. Isi Artikel**: Paragraf teks berjarak rapi (*line-height* nyaman dibaca).
* **E. Galeri Foto**: 
  * Judul: `Galeri Foto`
  * Grid 3 kolom horizontal (`grid-cols-3 gap-4`) berisi thumbnail gambar pendukung dengan sudut membulat.
* **F. Footer Artikel (Social Share & Navigation)**:
  * **Kiri**: Label `Bagikan:` + Icon sosmed dalam lingkaran abu-abu halus:
    * WhatsApp: `<i class="fa-brands fa-whatsapp"></i>`
    * Facebook: `<i class="fa-brands fa-facebook-f"></i>`
    * Instagram: `<i class="fa-brands fa-instagram"></i>`
    * X / Twitter: `<i class="fa-brands fa-x-twitter"></i>`
    * Telegram: `<i class="fa-brands fa-telegram"></i>`
    * Copy Link: `<i class="fa-solid fa-link"></i>`
  * **Kanan**: Tombol pill/kapsul `<i class="fa-solid fa-arrow-up"></i> Ke Atas`.

### 📌 4. Kolom Kanan (Sidebar - Berita Lainnya)
* **Container Card**: Background putih, border tipis, rounded-xl, padding dalam.
* **Judul Sidebar**: `<i class="fa-solid fa-book-bookmark"></i> Berita Lainnya` dengan garis pemisah (*divider*) di bawahnya.
* **List Berita (4 Items Horizontal Flex)**:
  * **Item**: Thumbnail persegi kecil di kiri (`w-16 h-16 rounded-md object-cover`), disusul tanggal (`<i class="fa-regular fa-calendar"></i>`) dan judul berita di kanan.

---

## 🛠️ Persyaratan Teknis & Style Guide

1. **Font Awesome Icons**: Gunakan CDN Font Awesome v6 (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.x.x/css/all.min.css`).
2. **Skema Warna**:
   * Background Halaman: `#F8FAFC` atau `#F3F4F6`.
   * Background Card: `#FFFFFF`.
   * Primary Text: `#0F172A` / `#1E293B`.
   * Muted Text: `#64748B`.
   * Accent Blue (Ikon/Link): `#2563EB` / `#3B82F6`.
3. **Responsivitas**: 
   * Grid 4 kolom pada Daftar Berita menyesuaikan ke 2 kolom (Tablet) dan 1 kolom (Mobile).
   * Sidebar Detail Berita berpindah ke bawah konten utama pada layar handphone.