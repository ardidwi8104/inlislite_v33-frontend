# Prompt Development: Halaman Detail Berita (News Detail Page)

Buatkan komponen/halaman **Detail Berita** (News Detail Page) menggunakan HTML, CSS (Tailwind CSS direkomendasikan), dan ikon dari **Font Awesome**. Tampilan harus presisi dan sama persis dengan referensi desain (tanpa mengimplementasikan Header/Navbar utama dan Footer utama).

---

## 🎨 Tampilan & Tata Letak Utama (Layout Structure)

### 1. Breadcrumb (Navigasi Atas)
*   **Posisi**: Di atas kontainer konten utama.
*   **Item**: `Beranda` / `Berita` / `Detail Berita`
*   **Style**: Text kecil warna abu-abu, ikon `fa-solid fa-house` untuk Beranda (opsional) atau pemisah `/` antar item. Teks terakhir (`Detail Berita`) aktif/gelap.

---

### 2. Layout Grid 2 Kolom (Main Content & Sidebar)
Gunakan layout responsive grid (misal: `grid grid-cols-1 lg:grid-cols-3 gap-8`).
*   **Kolom Kiri (Utama)**: Span 2 kolom (Luas: ~66-70% lebar).
*   **Kolom Kanan (Sidebar)**: Span 1 kolom (Luas: ~30-34% lebar).

---

## 📰 Komponen Kolom Utama (Konten Detail Berita)

### A. Gambar Utama (Featured Image)
*   Gambar banner berukuran besar dengan sudut membulat (*rounded corners*, misal `rounded-2xl`).
*   Menggambarkan ilustrasi/foto berita utama.

### B. Metadata Berita (Meta Bar Atas)
Terletak langsung di bawah Gambar Utama dengan alignment sejajar:
*   **Kiri**:
    *   Tanggal: `<i class="fa-regular fa-calendar"></i> 25 Mei 2026`
    *   Penulis: `<i class="fa-regular fa-user"></i> admin`
    *   Lokasi/Kategori: `<i class="fa-solid fa-location-dot"></i> Penajam`
*   **Kanan**:
    *   Tombol Dropdown Bagikan: Tombol berukuran kecil/sedang dengan border halus, berisi teks "Bagikan" dan ikon `<i class="fa-solid fa-chevron-down"></i>`.

### C. Judul Berita (Article Title)
*   **Teks**: `Sosialisasi INLISLite 3.3`
*   **Style**: Text bold/tebal, ukuran besar (`text-2xl` atau `text-3xl`), warna gelap (`text-slate-900`), marjin atas dan bawah secukupnya.

### D. Isi Artikel (Article Body)
*   Paragraf berjarak rapi (*line-height* nyaman dibaca).
*   **Contoh Paragraf 1**: `PENAJAM — Dalam rangka meningkatkan efektivitas otomasi perpustakaan, Perpustakaan Mitra menyelenggarakan kegiatan Sosialisasi INLISLite versi 3.3. Sistem otomasi perpustakaan terpadu yang dikembangkan oleh Perpustakaan Nasional RI ini memberikan kemudahan pengelolaan data bibliografi, sirkulasi, dan katalog online (OPAC).`
*   **Contoh Paragraf 2**: `Melalui implementasi sistem ini, pelayanan pemustaka diharapkan dapat berjalan lebih cepat, transparan, serta terintegrasi langsung dengan database perpustakaan secara mandiri.`

### E. Galeri Foto (Photo Gallery Section)
*   **Judul Section**: `Galeri Foto` (Font semi-bold / bold).
*   **Grid Galeri**: Grid 3 kolom horizontal (`grid-cols-3 gap-4`).
*   **Item**: Thumbnail gambar pendukung berita dengan efek *hover* halus dan sudut membulat (`rounded-lg`).

### F. Footer Artikel (Social Share & Scroll to Top)
Terletak di bagian paling bawah kolom utama dengan divider border halus di atasnya atau posisi rata kiri-kanan (*flex justify-between*):
*   **Sisi Kiri (Bagikan Ke Sosmed)**:
    *   Label teks: `Bagikan:`
    *   Ikon Sosial Media berbentuk bulat dengan background abu-abu muda halus:
        *   WhatsApp: `<i class="fa-brands fa-whatsapp"></i>`
        *   Facebook: `<i class="fa-brands fa-facebook-f"></i>`
        *   Instagram: `<i class="fa-brands fa-instagram"></i>`
        *   X / Twitter: `<i class="fa-brands fa-x-twitter"></i>`
        *   Telegram: `<i class="fa-brands fa-telegram"></i>`
        *   Copy Link: `<i class="fa-solid fa-link"></i>`
*   **Sisi Kanan (Tombol Ke Atas)**:
    *   Tombol kapsul/rounded border: `<i class="fa-solid fa-arrow-up"></i> Ke Atas`

---

## 📌 Komponen Kolom Kanan (Sidebar - Berita Lainnya)

### Container Card Sidebar
*   Background putih dengan shadow tipis (`shadow-sm` / `border border-slate-100`) dan sudut membulat (`rounded-xl`).
*   Padding dalam yang cukup.

### Judul Sidebar
*   `<i class="fa-solid fa-book-bookmark"></i> Berita Lainnya` (Teks tebal warna biru/gelap dengan ikon berita di sebelahnya).
*   Garis pemisah (*divider line*) di bawah judul.

### List Berita Lainnya (4 Items)
Setiap item berupa flexbox horizontal (Thumbnail Kecil di kiri, Informasi di kanan):

1.  **Item 1**:
    *   *Thumbnail*: Gambar persegi kecil (`w-16 h-16 rounded-md object-cover`).
    *   *Tanggal*: `<i class="fa-regular fa-calendar"></i> 24 Nov 2025`
    *   *Judul*: `FGD Pengelolaan Perpustakaan Khusus Instansi Pemerintah` (Teks 2 baris max, hover warna biru).
2.  **Item 2**:
    *   *Thumbnail*: Gambar persegi kecil.
    *   *Tanggal*: `<i class="fa-regular fa-calendar"></i> 24 Nov 2025`
    *   *Judul*: `FGD Pengelolaan Repositori dan Knowledge Management (KM)`
3.  **Item 3**:
    *   *Thumbnail*: Gambar persegi kecil.
    *   *Tanggal*: `<i class="fa-regular fa-calendar"></i> 07 Agu 2025`
    *   *Judul*: `Sharing Knowledge dan Benchmarking ke Perpustakaan UI, Depok`
4.  **Item 4**:
    *   *Thumbnail*: Gambar persegi kecil.
    *   *Tanggal*: `<i class="fa-regular fa-calendar"></i> 05 Agu 2025`
    *   *Judul*: `Knowledge Sharing ke Perpustakaan tvOne`

---

## 🛠️ Persyaratan Teknis & Styling
1. **Font Awesome Icons**: Gunakan CDN Font Awesome v6 (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.x.x/css/all.min.css`).
2. **Color Palette**:
   * Background Halaman: Abu-abu sangat muda / bersih (`#F8FAFC` atau `#F3F4F6`).
   * Background Card: Putih murni (`#FFFFFF`).
   * Primary Text: Dark Slate (`#0F172A` / `#1E293B`).
   * Muted Text: Gray/Slate (`#64748B`).
   * Accent Blue (Ikon/Link): Biru lembut (`#2563EB` / `#3B82F6`).
3. **Responsif**:
   * Pada layar handphone (Mobile), sidebar berada di bawah konten utama.
   * Pada layar laptop/desktop (Desktop), tampilan menjadi 2 kolom sesuai sketsa.