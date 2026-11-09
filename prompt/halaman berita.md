Buatkan komponen UI halaman "Daftar Berita Terbaru" menggunakan React (Tailwind CSS) / HTML CSS murni yang modern, bersih, dan responsif. Abaikan bagian Header/Navbar utama dan Footer (fokus hanya pada konten utama halaman berita).

### 1. Layout Utama & Kontainer:
- **Width**: `w-full` dengan pembungkus `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8` (full width responsif dengan padding yang pas).
- **Background Utama**: Putih netral / abu-abu sangat muda (`bg-gray-50` atau `bg-white`).

### 2. Breadcrumb & Judul Utama:
- **Breadcrumb Navigasi**:
  - Berada di paling atas sebelah kiri.
  - Teks: `Beranda / Berita`
  - Gunakan ikon rumah (Font Awesome `fa-solid fa-house`) atau ikon panah pemisah (`fa-solid fa-chevron-right`) sederhana.
  - Warna font: `text-gray-500` (kategori aktif: `text-blue-900` atau `text-gray-800`).
- **Judul Halaman**:
  - Teks: `Berita Terbaru`
  - Font size: `text-2xl sm:text-3xl font-bold text-blue-950` dengan margin bottom `mb-4`.

### 3. Bar Filter & Pencarian (Search Bar):
- Diletakkan tepat di bawah judul utama (`mb-6`).
- **Input Search**:
  - Input teks dengan placeholder: `Cari berita...`
  - Border tipis rounded `rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none`.
  - Lebar input: `w-full sm:w-80 md:w-96` (mengisi penuh di HP, berukuran proporsional di desktop).

### 4. Grid Berita (Card Layout):
- **Responsive Grid**:
  - Mobile (1 kolom): `grid grid-cols-1`
  - Tablet (2 kolom): `sm:grid-cols-2`
  - Desktop (4 kolom): `lg:grid-cols-4 gap-6`
- **Spesifikasi Card Berita (`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between`)**:
  - **Thumbnail Gambar**:
    - Aspect ratio `aspect-video` atau `h-48 w-full object-cover rounded-t-xl`.
    - Gambar memenuhi bagian atas card.
  - **Body Content Card**:
    - **Tanggal**: Font kecil `text-xs text-gray-500 flex items-center gap-1.5 mb-2`. Pakai ikon kalender Font Awesome (`fa-regular fa-calendar`). Contoh: `25 Mei 2026`.
    - **Judul Berita**: Font `text-base font-semibold text-gray-900 line-clamp-2 hover:text-blue-700 cursor-pointer mb-2`.
    - **Snippet / Deskripsi**: Font `text-xs text-gray-600 line-clamp-2 mb-4`.
  - **Footer Card (`border-t border-gray-100 pt-3 flex justify-between items-center text-xs mt-auto`)**:
    - **Penulis**: Sisi kiri, teks `admin` dengan ikon user Font Awesome (`fa-regular fa-user text-gray-400 mr-1`).
    - **Link Selengkapnya**: Sisi kanan, teks `Selengkapnya` dengan ikon panah (`fa-solid fa-arrow-right text-blue-600 font-semibold group-hover:translate-x-1 transition-transform`).

### 5. Komponen Pagination:
- Diletakkan di bagian bawah tengah grid berita (`flex justify-center items-center gap-2 mt-10`).
- **Tombol Previous**: Teks `Prev` (disabled di halaman 1, warna font `text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg text-sm cursor-not-allowed`).
- **Halaman Aktif**: Tombol angka `1` (`bg-blue-900 text-white px-3.5 py-1.5 rounded-lg text-sm font-semibold shadow-sm`).
- **Tombol Next**: Teks `Next` (`text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-medium`).

### 6. Catatan Teknis:
- Gunakan Font Awesome (`@fortawesome/fontawesome-free`) untuk semua ikon.
- Tampilan harus *pixel-perfect* mengikuti hierarki layout, jarak antar elemen (spacing), serta skema warna institusional (dominan biru gelap `#003366` / `text-blue-900` untuk *brand accent*).