# Prompt Pengembangan UI: Formulir Pendaftaran Anggota Perpustakaan

Tolong buatkan halaman web formulir pendaftaran berbasis **HTML/Tailwind CSS** (atau React) yang responsif dan dirancang **Full-Width** (memenuhi seluruh lebar area konten utama). Desain harus persis mengikuti spesifikasi tata letak, posisi teks, ikon, warna, dan komponen di bawah ini.

---

## 1. Spesifikasi Umum & Tema Warna
*   **Warna Utama (Primary Blue):** `#2563EB` / `#3B82F6` (Biru Terang/Royal Blue)
*   **Warna Latar Belakang Utama:** `#F8FAFC` (Sangat Muda / Off-White)
*   **Warna Latar Belakang Kartu / Isian:** `#FFFFFF` (Putih) & `#F1F5F9` (Abu-Abu Sangat Muda untuk Sub-Card)
*   **Warna Teks Utama:** `#1E293B` (GELAP / Dark Slate)
*   **Warna Teks Sekunder/Label:** `#64748B` (Muted Slate / Grey)
*   **Warna Tanda Wajib (*):** `#EF4444` (Merah)
*   **Ikon:** Gunakan ikon bergaya *rounded filled* / *line art* berwarna biru utama (`#2563EB`).

---

## 2. Header Utama (Bagian Atas)
*   **Posisi:** Rata tengah (*Center aligned*), dibungkus dalam kontainer putih bersudut tumpul (*rounded corners*) dengan bayangan tipis (*light shadow*).
*   **Ikon Header:** Ikon Tambah Anggota / User Plus (warna Biru, posisi di sebelah kiri judul).
*   **Judul Utama:** 
    *   Teks: `Pendaftaran Anggota`
    *   Ukuran/Gaya: Font Tebal (Bold), Ukuran Besar (24px - 28px), Warna Biru (`#2563EB`).
*   **Sub-judul:**
    *   Teks: `Daftarkan diri Anda sebagai anggota perpustakaan`
    *   Ukuran/Gaya: Font Regular, Ukuran Kecil (14px), Warna Abu-Abu (`#64748B`), tepat di bawah Judul Utama.

---

## 3. Indikator Tahapan / Progress Bar Stepper
*   **Posisi:** Di bawah Header Utama, membentang horizontal (*Full-width container*).
*   **Item Step 1 - Verifikasi (Aktif):**
    *   Ikon: User dengan Centang (`#2563EB`).
    *   Label Teks: `Verifikasi` (Warna Biru, Bold).
    *   Indikator Garis: Garis tebal berwarna biru di atas label.
*   **Item Step 2 - Data Diri (Inaktif):**
    *   Ikon: Dokumen Edit (`#94A3B8`).
    *   Label Teks: `Data Diri` (Warna Abu-Abu).
*   **Item Step 3 - Selesai (Inaktif):**
    *   Ikon: Centang Lingkaran (`#94A3B8`).
    *   Label Teks: `Selesai` (Warna Abu-Abu).

---

## 4. Area Formulir Utama (Full-Width Card)
Setiap seksi di dalam formulir dipisahkan oleh **Ikon Lingkaran Biru + Judul Seksi** bergaris bawah tipis.

### Seksi 1: Verifikasi Identitas
*   **Header Seksi:** Ikon Perisai/Shield Biru (`#2563EB`) + Teks `Verifikasi Identitas` (Bold, Warna Biru).
*   **Grid Layout:** 2 Kolom (Kiri & Kanan).
    *   **Baris 1 (Kiri):** Label `No. Identitas *`
        *   Input Field: Placeholder `Masukkan Nomor Identitas`, dilengkapi Ikon Kartu/KTP di sisi kiri dalam input.
        *   Helper Text (bawah input): `Akan digunakan sebagai Nomor Anggota` (Teks abu-abu kecil).
    *   **Baris 1 (Kanan):** Label `Jenis Identitas *`
        *   Input Field: Placeholder `Jenis Identitas`.
    *   **Baris 2 (Kiri):** Label `Email *`
        *   Input Field: Placeholder `Masukkan Email Aktif`, dilengkapi Ikon Amplop/Email di sisi kiri dalam input.
        *   Helper Text: `Email aktif untuk menerima notifikasi pendaftaran`.
    *   **Baris 2 (Kanan):** Tombol `Verifikasi Data`
        *   Posisi: Sejajar di samping kanan field Email.
        *   Desain: Outlined Button (Border Biru, Background Transparan/Putih, Teks Biru, Ikon Kaca Pembesar di kiri teks `Verifikasi Data`).

---

### Seksi 2: Data Pribadi
*   **Header Seksi:** Ikon User Biru + Teks `Data Pribadi` (Bold, Warna Biru).
*   **Baris 1 (Grid 2 Kolom):**
    *   **Kiri:** Label `Nama Lengkap *` -> Input dengan Ikon User + Placeholder `Masukkan Nama Lengkap`.
    *   **Kanan:** Label `No. HP *` -> Input dengan Ikon Telepon + Placeholder `Masukkan No. HP`.
*   **Baris 2 (Grid 3 Kolom - Equal Width):**
    *   **Kolom 1:** Label `Tempat Lahir *` -> Input Placeholder `Tempat Lahir`.
    *   **Kolom 2:** Label `Tanggal Lahir *` -> Input Date Picker dengan Ikon Kalender pada sisi kanan + Placeholder `dd --- tttt`.
    *   **Kolom 3:** Label `Jenis Kelamin *` -> Select Dropdown + Placeholder `Pilih Jenis Kelamin` + Ikon Panah Bawah.

---

### Seksi 3: Alamat sesuai Identitas
*   **Header Seksi:** Ikon Pin Lokasi Biru + Teks `Alamat sesuai Identitas` (Bold, Warna Biru).
*   **Container Seksi:** Menggunakan latar belakang abu-abu terang (`#F8FAFC` / `#F1F5F9`) dengan sudut tumpul.
*   **Field Alamat Lengkap:** Label `Alamat Lengkap *` -> Textarea besar dengan placeholder `Masukkan alamat lengkap sesuai identitas`.
*   **Baris Wilayah (Grid 4 Kolom - Equal Width):**
    *   **Kolom 1:** Label `Provinsi *` -> Dropdown `Select`.
    *   **Kolom 2:** Label `Kota *` -> Dropdown `Pilih Kota`.
    *   **Kolom 3:** Label `Kecamatan *` -> Dropdown `Pilih Kecamatan`.
    *   **Kolom 4:** Label `Kelurahan *` -> Dropdown `Pilih Kelurahan`.

---

### Seksi 4: Alamat Saat Ini
*   **Header Seksi:** Ikon Rumah Biru + Teks `Alamat Saat Ini` (Bold, Warna Biru).
*   **Option Box (Atas):** Box abu-abu terang berisi Checkbox `Alamat saat ini sama dengan alamat identitas`. Jika dicentang, form di bawahnya terisi otomatis/disabled.
*   **Container Seksi:**
    *   Field `Alamat Lengkap *` (Textarea, Placeholder `Masukkan alamat saat ini`).
    *   Grid 4 Kolom (Provinsi, Kota, Kecamatan, Kelurahan) persis seperti Seksi 3.

---

### Seksi 5: Pernyataan
*   **Header Seksi:** Ikon Dokumen Biru + Teks `Pernyataan` (Bold, Warna Biru).
*   **Option Box:** Box abu-abu terang dengan Checkbox + Ikon Centang Lingkaran: `Saya menyatakan bahwa data yang diisi adalah benar dan dapat dipertanggungjawabkan`.

---

### Seksi 6: Keamanan CAPTCHA (Tambahan Khusus Sebelum Tombol Daftar)
*   **Posisi:** Berada persis di bawah Seksi Pernyataan dan di atas Tombol Daftar Utama, membentang penuh (*Full-width* atau Centered Card).
*   **Komponen Gambar CAPTCHA:**
    *   Tampilan Box Gambar CAPTCHA berlatar abu-abu muda (`#E5E7EB`) dengan garis-garis silang distorsi.
    *   Teks Angka Random (Contoh: `4 8 2 6 1`) berukuran besar, tebal, dan sedikit miring.
    *   Teks Keterangan di bawah gambar: `Ilustrasi saja, bukan CAPTCHA aktif.` (Kecil, Muted Grey).
*   **Input Field CAPTCHA:**
    *   Label Teks di atas input: `Masukkan angka pada gambar` (Font Bold/Medium, Warna Gelap).
    *   Input Field: Sudut sangat bulat / Pill Shape (`rounded-full`), Border Gelap/Tipis, Placeholder: `Ketik angka CAPTCHA`.

---

### Seksi 7: Tombol Aksi Utama (Submit Button)
*   **Posisi:** Paling bawah, berada di tengah (*Center aligned*).
*   **Desain Tombol:**
    *   Teks: `Daftar Sebagai Anggota`
    *   Ikon: Ikon User Plus di sebelah kiri teks.
    *   Warna: Solid Blue (`#2563EB`) dengan efek *hover* yang sedikit lebih gelap.
    *   Ukuran: Medium/Large (Padding horizontal lebar, `px-8 py-3`).
    *   Bentuk: Rounded Corners (`rounded-lg`).
```

EOF

---

### Ringkasan Penyesuaian
1. **Format Markdown:** File disajikan secara terstruktur menggunakan heading, bullet points, dan kustomisasi warna hex.
2. **Posisi & Elemen CAPTCHA:** Ditambahkan secara khusus di **Seksi 6**, tepat di atas tombol submit utama (`Daftar Sebagai Anggota`).
3. **Penyelarasan Layout:** Menggunakan petunjuk `Full-Width` pada kontainer utama dan pembagian grid (2 kolom, 3 kolom, 4 kolom) sesuai dengan gambar referensi pendaftaran.
