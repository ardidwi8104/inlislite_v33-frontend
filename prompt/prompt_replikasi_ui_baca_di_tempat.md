# 📌 System & UI Blueprint Prompt: Replikasi Dashboard "Baca di Tempat" (INLISLite Style)

## 🎯 Tujuan Utama
Buat halaman Web Application dashboard **"Baca di Tempat - Anggota"** yang presisi dan identik secara visual dengan tangkapan layar antarmuka INLISLite. Halaman harus responsif, modern, rapi, dan memiliki batas tinggi (*viewport compact*) agar tidak terlalu banyak scroll ke bawah.

---

## 🎨 Design System & Color Palette
* **Primary Header Background:** Deep Blue `#3B5998` / `#2F4B85`
* **Sidebar Background:** Clean Pure White `#FFFFFF`
* **Content Background:** Soft Light Gray `#F4F6F9`
* **Active State Accent:** Royal Blue `#4A6FDC` / `#3A57E8`
* **Status Badge Colors:**
  * `BELUM DIKEMBALIKAN`: Soft Orange/Yellow Background (`#FDE68A` or `#F59E0B`), Dark Amber text `#92400E`.
  * `SUDAH DIKEMBALIKAN`: Mint Green Background (`#A7F3D0` or `#10B981`), Dark Emerald text `#065F46`.
* **Action Buttons:**
  * `Tambah`: Bright Primary Blue (`#0069D9` or `#1D4ED8`)
  * `Hapus (Trash)`: Crimson Red (`#DC3545` or `#EF4444`)
* **Typography:** Inter / Roboto / System Sans-Serif (Clean, Crisp, Professional).

---

## 🧱 Key Layout & Component Architecture

### 1. Left Sidebar Navigation (Fixed Width ~240px)
* **Header Sidebar:** Logo **INLISLite** di sebelah kiri + Hamburger Menu Toggle di sebelah kanan.
* **Navigation Links (Menggunakan Font Awesome Icons):**
  * `<i class="fa-solid fa-desktop"></i>` Dashboard
  * `<i class="fa-solid fa-newspaper"></i>` Berita
  * `<i class="fa-solid fa-bullhorn"></i>` Banner
  * `<i class="fa-solid fa-book"></i>` Koleksi *(With Dropdown Arrow)*
  * `<i class="fa-solid fa-users"></i>` Keanggotaan *(With Dropdown Arrow)*
  * `<i class="fa-solid fa-arrows-rotate"></i>` Sirkulasi *(With Dropdown Arrow)*
  * `<i class="fa-solid fa-boxes-stacked"></i>` Stockopname
  * `<i class="fa-solid fa-user-pen"></i>` Buku Tamu
  * `<i class="fa-solid fa-book-open-reader"></i>` **Baca di Tempat** *(Active State: Blue Pill Highlight with White Icon/Text)*
  * `<i class="fa-solid fa-chart-pie"></i>` Laporan *(With Dropdown Arrow)*
  * `<i class="fa-solid fa-folder-gear"></i>` Pengaturan Umum *(With Dropdown Arrow)*
  * `<i class="fa-solid fa-sliders"></i>` Pengaturan Katalog *(With Dropdown Arrow)*

---

### 2. Header Bar (Top Section Overlay)
* **Title:** "Perpustakaan Mitra" (Bold, White Text, Left-aligned).
* **Right Utility Bar:**
  * Real-time Clock Indicator: `<i class="fa-regular fa-clock"></i> 8 November 2026 | 22:21:43 WIB` (White Text).
  * Profile Button: `<i class="fa-solid fa-user"></i> Profile` (Pill button with translucent border/background).

---

### 3. Page Header Sub-Section (Blue Hero Banner)
* **Icon Box:** Square icon container with pencil icon `<i class="fa-solid fa-pen-to-square"></i>` (Red outline/Pink tint icon inside white card).
* **Title:** "Baca Ditempat - Anggota" (Heading 2, White).
* **Sub-title:** "Daftar semua Baca Ditempat Anggota" (Small, light gray-blue text).
* **Breadcrumb Navigation (Top Right of Content):**
  * `<i class="fa-solid fa-house"></i> Home` / `Baca Ditempat`

---

### 4. Tab Segment & Main Data Card
* **Tab Switcher:**
  * `[ Anggota (Active - Solid Blue) ]` `[ Non Anggota (Inactive - Translucent/Outline) ]`

* **Data Card Layout (White Box Shadow Container):**
  * **Card Header:** 
    * Left: `<i class="fa-solid fa-list-check"></i> TABEL BACA DITEMPAT` (Bold uppercase).
    * Right: `[ + Tambah ]` Button (Blue Pill Button with `<i class="fa-solid fa-plus"></i>`).
  
  * **Table Controls Bar:**
    * Left: Page length selector (Dropdown `10` entries).
    * Right: Search Box with Icon `<i class="fa-solid fa-magnifying-glass"></i>`.

  * **Data Table Specs:**
    | No | Tgl. Kunjungan <i class="fa-solid fa-sort"></i> | Nama Anggota | Nomor Anggota <i class="fa-solid fa-sort"></i> | Nomor Barcode Koleksi <i class="fa-solid fa-sort"></i> | Lokasi Perpustakaan | Lokasi Ruang | Status Pengembalian <i class="fa-solid fa-sort"></i> | Aksi |
    |---|---|---|---|---|---|---|---|---|
    | 1 | 2026-05-25 14:44:45 | | `<i class="fa-solid fa-id-card text-cyan"></i>` | `<i class="fa-solid fa-qrcode text-cyan"></i>` | Perpustakaan Pusat | Lobby Utama | `<span class="badge badge-warning">BELUM DIKEMBALIKAN</span>` | `<button class="btn-danger"><i class="fa-solid fa-trash"></i></button>` |
    | 2 | 2026-05-24 11:38:53 | | `<i class="fa-solid fa-id-card text-cyan"></i>` | `<i class="fa-solid fa-qrcode text-cyan"></i>` | Perpustakaan Pusat | Lobby Utama | `<span class="badge badge-success">SUDAH DIKEMBALIKAN</span>` | `<button class="btn-danger"><i class="fa-solid fa-trash"></i></button>` |

  * **Card Footer:**
    * Left: "Showing 1 to 2 of 2 entries"
    * Right: Pagination `<<` `<` `[1]` `>` `>>`

---

### 5. Sticky Minimal Footer
* Center-aligned text: `© 2026 Licency By Perpustakaan Nasional RI. All rights reserved.`
* Fixed at the bottom or constrained so page height fits standard screens without excessive vertical scrolling (`max-vh-100` layout structure).

---

## 💻 Tech Stack & Requirements
1. **HTML5 & Modern CSS3** (Flexbox/Grid layout, `vh`-constrained container to eliminate unnecessary page overflow).
2. **Font Awesome 6 (Free Solid & Regular CDN)**.
3. **Tailwind CSS / Bootstrap 5** for fast grid alignment and responsive design.
4. **Responsive Breakdown:**
   * Desktop (> 1024px): Full layout matching image 1:1.
   * Mobile/Tablet (< 1024px): Collapsible sidebar drawer, table scrollable horizontally (`table-responsive`).