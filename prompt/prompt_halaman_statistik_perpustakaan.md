# Prompt Spesifikasi UI/UX: Halaman Statistik Perpustakaan (Main Content Only)

Buatkan komponen UI untuk **halaman Statistik Perpustakaan** (hanya bagian *main content* / isi halaman, **tanpa Header dan Footer**) menggunakan **React JSX + Tailwind CSS** (atau HTML + Tailwind). Ikuti spesifikasi visual berikut **sedetail mungkin**.

---

## 1. Layout & Background

- **Background halaman:** `#F8FAFC` (Slate 50).
- **Container utama:** `max-w-[1280px] mx-auto px-6 md:px-8 py-8`.
- **Alur vertikal:** Breadcrumb → Judul & Subjudul → Grid 3 Card Statistik.
- **Font:** gunakan font proyek (umumnya sans-serif modern seperti Inter/Plus Jakarta Sans). Jika tidak ditentukan, pakai default sans.

---

## 2. Breadcrumb & Header Halaman

### A. Breadcrumb Navigasi

- **Posisi:** kiri (*left-aligned*).
- **Margin bawah:** `mb-3` (±12px) sebelum judul.
- **Struktur:** ikon home + tautan Beranda + separator + teks halaman aktif.
- **Elemen & gaya:**
  - **Ikon home:** Font Awesome `fa-solid fa-house`, warna `#2563EB` (Blue 600), ukuran `14px`. Atribut aksesibilitas: `aria-hidden="true"`.
  - **Teks `Beranda`:** warna `#2563EB`, `text-[14px]`, `font-medium` (500), dapat diklik (`<a href="/">` atau `<button>`), `hover:underline`, `hover:text-[#1D4ED8]`.
  - **Separator `/`:** warna `#94A3B8` (Slate 400), `text-[14px]`, margin horizontal `mx-2`, `aria-hidden="true"`.
  - **Teks aktif `Statistik`:** warna `#64748B` (Slate 500), `text-[14px]`, `font-normal` (400), bukan tautan (halaman saat ini).
- **Semantic:** bungkus dengan `<nav aria-label="Breadcrumb">` dan `<ol class="flex items-center">`.

### B. Judul & Subjudul

- **Judul utama (`<h1>`):**
  - Teks: **`Statistik Perpustakaan`**
  - Warna: `#1E3A8A` (Blue 900 / Navy)
  - Ukuran: `text-[28px] md:text-[32px]` (≈ `text-3xl`)
  - Weight: `font-bold` (700)
  - Line height: `leading-tight`
  - Posisi: kiri
- **Subjudul (`<p>`):**
  - Teks: **`Ringkasan statistik perpustakaan. Pilih salah satu untuk melihat detail.`**
  - Warna: `#64748B` (Slate 500)
  - Ukuran: `text-[15px] md:text-base`
  - Weight: `font-normal` (400)
  - Margin atas: `mt-2`
  - Margin bawah: `mb-8` (±32px sebelum grid)

---

## 3. Grid Card Statistik

### A. Layout Grid

- **Desktop (≥1024px):** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` (3 kolom, jarak 24px).
- **Tablet:** 2 kolom.
- **Mobile:** 1 kolom (card full width container).
- Seluruh card memiliki tinggi visual konsisten; deskripsi boleh 1–2 baris.

### B. Struktur Card (Template)

Setiap card menggunakan struktur yang sama:

- **Container card:**
  - Background: `#FFFFFF`
  - Border radius: `rounded-xl` (12px)
  - Border: `border border-[#E2E8F0]` (Slate 200, 1px)
  - Shadow: `shadow-sm`
  - Padding: `px-6 py-8` (kiri-kanan 24px, atas-bawah 32px)
  - Alignment: `flex flex-col items-center text-center`
  - Hover (opsional tapi disarankan): `transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`
- **Ikon atas:**
  - Ukuran: `text-[40px]` (≈36–40px), `leading-none`
  - Margin bawah: `mb-4`
  - `aria-hidden="true"`
- **Judul card (`<h2>` atau `<h3>`):**
  - Warna: `#1E3A8A`
  - Ukuran: `text-[18px] md:text-[20px]`
  - Weight: `font-bold` (700)
  - Margin bawah: `mb-2`
- **Deskripsi (`<p>`):**
  - Warna: `#64748B`
  - Ukuran: `text-sm` (14px)
  - Margin bawah: `mb-6`
  - Line height nyaman: `leading-relaxed`
- **Tombol aksi (`<a>` atau `<button>`):**
  - Label: `Lihat Detail` + ikon panah kanan `fa-solid fa-arrow-right` (`ml-2`, `aria-hidden="true"`)
  - Background: `#1E3A8A`
  - Teks/ikon: `#FFFFFF`
  - Bentuk: `rounded-full` (pill)
  - Padding: `px-6 py-2.5`
  - Font: `text-sm` (14px), `font-semibold` (600)
  - Layout internal: `inline-flex items-center justify-center`
  - State: `hover:bg-[#172554]` (lebih gelap), `focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2`, `transition-colors`
  - Jika menggunakan `<a>`, beri `href` sesuai route tujuan (placeholder boleh `#` bila route belum ditentukan).

---

## 4. Detail Tiap Card

| Card | Ikon (Font Awesome) | Warna Ikon | Judul | Deskripsi | Tujuan (contoh route) |
|---|---|---|---|---|---|
| 1 | `fa-solid fa-users` | `#1D4ED8` (Blue 700) | `Statistik Pengunjung` | `Rekap jumlah pengunjung perpustakaan per bulan.` | `/statistik/pengunjung` |
| 2 | `fa-solid fa-arrow-right-arrow-left` (alternatif: `fa-solid fa-book-open-reader`) | `#16A34A` (Green 600) | `Statistik Peminjaman` | `Rekap peminjaman dan pengembalian buku.` | `/statistik/peminjaman` |
| 3 | `fa-solid fa-id-card` (alternatif: `fa-solid fa-address-card`) | `#F59E0B` (Amber 500) | `Statistik Anggota` | `Rekap keanggotaan dan anggota aktif.` | `/statistik/anggota` |

> Catatan: pilih **satu** ikon per card (ikon utama pada tabel). Alternatif hanya jika ikon utama tidak tersedia di versi Font Awesome proyek.

---

## 5. Ringkasan Palette

| Token | Hex | Penggunaan |
|---|---|---|
| Primary / Navy | `#1E3A8A` | Judul halaman, judul card, background tombol |
| Primary Hover | `#172554` | Hover tombol (Blue 950) |
| Link / Accent | `#2563EB` | Tautan breadcrumb & ikon home |
| Link Hover | `#1D4ED8` | Hover tautan breadcrumb |
| Secondary Text | `#64748B` | Subjudul, deskripsi, breadcrumb aktif |
| Muted | `#94A3B8` | Separator breadcrumb |
| Icon Pengunjung | `#1D4ED8` | Ikon card 1 |
| Icon Peminjaman | `#16A34A` | Ikon card 2 |
| Icon Anggota | `#F59E0B` | Ikon card 3 |
| Card BG | `#FFFFFF` | Latar card |
| Page BG | `#F8FAFC` | Latar halaman |
| Border | `#E2E8F0` | Border card |

---

## 6. Aksesibilitas & Kualitas Implementasi

- Gunakan hierarki heading yang benar (`h1` untuk judul halaman; `h2`/`h3` konsisten untuk judul card).
- Ikon dekoratif diberi `aria-hidden="true"`.
- Tombol/tautan memiliki area klik cukup dan state `focus-visible` yang jelas.
- Pastikan kontras teks utama terhadap background memenuhi keterbacaan (navy di atas putih, slate 500 untuk teks sekunder).
- Komponen harus responsif tanpa overflow horizontal pada viewport mobile (≥320px).
- Jangan menyertakan Header/Footer; hanya *main content*.

---

## 7. Output yang Diharapkan

- Satu komponen halaman (mis. `Statistik.jsx`) berisi *main content* sesuai spesifikasi.
- Data 3 card boleh diekstrak ke array objek (`title`, `description`, `icon`, `iconColor`, `href`) lalu di-*map* agar mudah dirawat.
- Kode rapi, tanpa komentar berlebihan, dan siap diintegrasikan ke routing proyek.
