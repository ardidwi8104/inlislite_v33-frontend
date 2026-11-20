# Prompt: Desain Halaman Utama OPAC (Katalog Perpustakaan)

Buatkan halaman web untuk antarmuka OPAC (Online Public Access Catalog) dengan desain modern, bersih, dan responsif. **Kecualikan bagian Header (Navbar atas) dan Footer (bagian bawah).** Gunakan **FontAwesome** untuk seluruh ikon, serta terapkan skema warna, tipografi, dan tata letak berikut agar identik dengan referensi:

---

## 1. Palet Warna & Tipografi
- **Background Halaman Utama:** Abu-abu sangat terang (`#F4F6F9`)
- **Biru Utama (Hero Banner & Aksen Gelap):** Biru Navy Tua (`#1E3A6E` hingga `#244785` untuk gradasi halus)
- **Biru Sekunder (Tombol Utama):** Biru Royal (`#2B5292` dengan efek hover `#1E3A6E`)
- **Kartu & Container (Cards):** Putih bersih (`#FFFFFF`) dengan sudut melengkung (`rounded-xl` / `12px` - `16px`) dan bayangan halus (`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)`)
- **Warna Teks:**
  - Judul Utama Hero: Putih (`#FFFFFF`)
  - Subjudul Hero: Putih lembut (`#E2E8F0`)
  - Judul Section/Card: Hitam keabu-abuan gelap (`#1E293B`)
  - Teks Sekunder / Placeholder: Abu-abu medium (`#64748B` dan `#94A3B8`)
- **Font:** Sans-serif modern (seperti *Inter*, *Plus Jakarta Sans*, atau *Segoe UI*).

---

## 2. Struktur & Komponen Halaman

### A. Hero Search Section (Bagian Atas)
- **Container Latar:** Blok penuh (*full-width*) berwarna biru navy tua (`#1E3A6E`) dengan sudut bawah kiri dan kanan melengkung besar (`border-bottom-left-radius: 32px; border-bottom-right-radius: 32px;`), serta padding vertikal yang luas.
- **Judul Hero (Tengah):**
  - Ikon: `<i class="fa-solid fa-book-open"></i>` (berwarna putih, sejajar di sebelah kiri judul)
  - Teks Judul: **"Katalog Perpustakaan"** (Tebal/Bold, ukuran besar `2rem` - `2.5rem`, warna putih)
  - Subjudul: *"Temukan referensi, buku, dan koleksi literatur dengan mudah dan cepat."* (Ukuran `0.95rem`, warna putih agak transparan, berada tepat di bawah judul)
- **Kotak Pencarian (Floating Search Card):**
  - Posisi: Berada di tengah di dalam area biru hero (di bawah subjudul), lebar sekitar `75% - 80%` container (`max-width: 960px`).
  - Gaya Card: Latar putih (`#FFFFFF`), sudut melengkung (`16px`), padding `24px`, dan *drop shadow* lembut.
  - **Baris 1 (Pencarian Utama - Grid/Flexbox sejajar):**
    1. **Dropdown Kategori:** Lebar ~20%, border abu-abu tipis (`#E2E8F0`), sudut melengkung (`8px`), teks default `"Judul"` dengan ikon panah bawah.
    2. **Input Kata Kunci:** Lebar ~65%, border abu-abu tipis (`#E2E8F0`), sudut melengkung (`8px`), placeholder `"Masukkan kata kunci pencarian..."`.
    3. **Tombol Cari:** Lebar ~15%, latar biru (`#2B5292`), teks putih, sudut melengkung (`8px`), berisi ikon `<i class="fa-solid fa-magnifying-glass"></i>` diikuti teks **"Cari"**.
  - **Baris 2 (Filter Tambahan - 4 Kolom Sejajar di bawah Baris 1):**
    - 4 kolom input teks dengan lebar sama, latar abu-abu sangat pucat (`#F8FAFC`), border tipis (`#E2E8F0`), sudut melengkung (`8px`), dengan placeholder masing-masing:
      1. `"Filter Pengarang..."`
      2. `"Filter Penerbit..."`
      3. `"Filter Subjek..."`
      4. `"Filter Tahun..."`

---

### B. Main Content Area (Bagian Bawah Hero)
- **Container:** Terpusat (`max-width: 1200px`), menggunakan tata letak **2 Kolom (Sidebar Kiri + Konten Kanan)** dengan jarak (*gap*) sekitar `24px` - `32px`, margin atas `40px`.

#### 1. Kolom Kiri (Sidebar - Lebar ~25% / 3 kolom grid)
- **Card Statistik Koleksi:**
  - Latar card: Putih (`#FFFFFF`), sudut melengkung (`12px`), *overflow hidden*, bayangan halus.
  - **Header Card:** Latar biru navy (`#1E3A6E`), padding `12px 16px`, teks putih tebal berisi ikon `<i class="fa-solid fa-chart-pie"></i>` diikuti teks **"Statistik Koleksi"**.
  - **Body Card:** Padding `20px`, latar abu-abu sangat terang (`#F8FAFC`) di dalam kotak statistik kecil:
    - Angka besar tebal: **"0"** (warna gelap `#1E293B`, ukuran `1.5rem`)
    - Label di bawah angka: **"Total Katalog"** (warna abu-abu `#64748B`, ukuran `0.8rem`)

#### 2. Kolom Kanan (Konten Utama - Lebar ~75% / 9 kolom grid)
- **Header Section:**
  - Sejajar di bagian atas kolom kanan (di luar card kosong), berisi ikon `<i class="fa-solid fa-bars"></i>` (warna biru navy) diikuti judul **"Koleksi Terbaru"** (tebal, warna gelap `#1E293B`, ukuran `1.25rem`).
- **Card Konten / Empty State:**
  - Latar card: Putih (`#FFFFFF`), sudut melengkung (`12px`), tinggi minimum sekitar `300px`, konten berada tepat di tengah secara vertikal dan horizontal (*flex center*).
  - **Isi Empty State:**
    1. Ikon besar di tengah: `<i class="fa-solid fa-magnifying-glass-minus"></i>` (ukuran `3.5rem`, warna abu-abu medium `#64748B`).
    2. Teks utama di bawah ikon: **"Mulai temukan koleksi"** (tebal, warna gelap `#1E293B`, ukuran `1.15rem`, margin atas `16px`).
    3. Tombol Aksi di bawah teks: Latar biru (`#2B5292`), teks putih, sudut melengkung (`8px`), padding `10px 20px`, margin atas `16px`, berisi ikon `<i class="fa-solid fa-rotate"></i>` diikuti teks **"Muat Ulang Katalog"**.

---

### C. Info Statistik Bawah (Meta Info)
- **Posisi:** Berada di bawah area 2 kolom utama, rata tengah (*text-center*), dengan jarak vertikal (`margin-top: 32px; margin-bottom: 48px;`).
- **Baris 1:**
  - Ikon: `<i class="fa-solid fa-list-ul"></i>` (warna biru lembut `#3B82F6`)
  - Teks: `Total 0 koleksi ditemukan` (angka **0** dicetak tebal, teks lainnya abu-abu `#64748B`, ukuran `0.85rem`).
- **Baris 2:**
  - Ikon: `<i class="fa-solid fa-bolt"></i>` (warna kuning/emas `#F59E0B`)
  - Teks: `Waktu muat: 0.2554 detik` (angka **0.2554** dicetak tebal, teks lainnya abu-abu `#64748B`, ukuran `0.85rem`, jarak atas `6px`).