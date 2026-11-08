Buat tampilan halaman Buku Tamu, KECUALI header atas dan footer bawah, persis seperti referensi berikut:

=== BAGIAN ATAS: JUDUL & JUMLAH KUNJUNGAN ===
- Kotak putih dengan bayangan lembut:
  - Judul utama: "Ruang Baca Umum" — tebal, ukuran besar, warna biru tua
  - Sub-judul: "Perpustakaan Pusat" — warna abu-abu
  - Jalur navigasi (Breadcrumb): ikon rumah 🏠 "Beranda / Buku Tamu / [Nama Tab Aktif]" — latar hijau muda, teks kecil
  - Bilah biru tua penuh di bawahnya: teks putih "Total Kunjungan Hari ini 0" — tebal

=== BAGIAN TOMBOL TAB ===
- 3 tombol bertab sejajar:
  1. "Anggota" — ikon orang 👤 | aktif = latar biru tua, teks putih; tidak aktif = latar putih, teks abu-abu
  2. "Bukan Anggota" — ikon orang+tambah ➕👤 | gaya sama
  3. "Rombongan" — ikon kelompok orang 👥 | gaya sama

---

## TAB 1: ANGGOTA (aktif pertama)
- Kotak putih besar:
  - Judul: "Cari Anggota Perpustakaan" — tebal, biru tua, rata tengah
  - Sub-judul: "Masukkan nomor anggota untuk melanjutkan ke buku tamu" — abu-abu, rata tengah
  - Baris pencarian rata tengah:
    - Input: placeholder "Masukkan nomor anggota..."
    - Tombol: biru tua, ikon kaca pembesar 🔍 + teks "Cari Anggota"
  - Kotak peringatan kuning di bawah:
    - Ikon peringatan ⚠️ | teks: "Perhatian! Silakan masukkan nomor anggota terlebih dahulu untuk melanjutkan pengisian buku tamu."
    - Tombol tutup (×) di pojok kanan kotak

---

## TAB 2: BUKAN ANGGOTA
- Kotak putih besar:
  - Judul: "Buku Tamu Non Anggota" — tebal, biru tua, rata tengah
  - Sub-judul: "Silakan isi data diri Anda untuk tercatat sebagai pengunjung perpustakaan" — abu-abu, rata tengah
  - Formulir dengan tanda * = wajib diisi:
    1. Nama Pengunjung * → Input: "Masukkan nama lengkap Anda"
    2. Baris 3 kolom:
       - Pekerjaan * → Dropdown: "-- Pilih Pekerjaan --"
       - Pendidikan Terakhir * → Dropdown: "-- Pilih Pendidikan --"
       - Jenis Kelamin * → Dropdown: "-- Pilih Jenis Kelamin --"
    3. Alamat Sesuai Identitas → Textarea: "Masukkan alamat lengkap sesuai identitas"
    4. Tujuan Kunjungan → Dropdown: "----- Pilih -----"
  - Tombol utama rata tengah: biru tua, ikon buku 📖 + teks "Simpan Buku Tamu"
  - Teks kecil di bawah tombol: "Dengan mengisi formulir ini, data kunjungan Anda akan tercatat dalam buku tamu perpustakaan." — abu-abu

---

## TAB 3: ROMBONGAN
- Kotak putih besar:
  - Judul: "Buku Tamu Rombongan" — tebal, biru tua, rata tengah
  - Sub-judul: "Silakan isi data rombongan dan detail anggota untuk tercatat sebagai pengunjung perpustakaan" — abu-abu, rata tengah

  --- BAGIAN 1: Data Penanggung Jawab (latar hijau muda pudar, garis tepi biru) ---
  - Ikon orang 👤 | Judul tebal
  - 2 kolom:
    - Nama Penanggung Jawab * → Input
    - Nomor Telepon * → Input | Contoh: 08123456789

  --- BAGIAN 2: Data Instansi/Organisasi ---
  - Ikon gedung 🏢 | Judul tebal
  - 2 kolom:
    - Nama Instansi/Organisasi * → Input
    - Email Instansi → Input | Contoh: contoh@instansi.com
  - Alamat Instansi → Textarea: "Masukkan alamat lengkap instansi"

  --- BAGIAN 3: Jumlah Anggota Rombongan ---
  - Ikon kelompok 👥 | Judul tebal
  - Total Anggota * → Input
  - Laki-laki → Input | Perempuan → Input

  --- BAGIAN 4: Komposisi Berdasarkan Profesi ---
  - Ikon tas kerja 💼 | Judul tebal
  - Baris 1: PNS, Guru, Pegawai Swasta, Peneliti, Dosen → masing-masing kolom input angka
  - Baris 2: Pensiunan, TN/Polri, Wiraswasta, Pelajar, Mahasiswa → masing-masing kolom input angka
  - Baris 3: Lainnya → kolom input angka

  --- BAGIAN 5: Komposisi Berdasarkan Pendidikan ---
  - Ikon topi kelulusan 🎓 | Judul tebal
  - Baris 1: TK, SD, SMP, SMA, D1 → masing-masing input angka
  - Baris 2: D2, D3, S1, S2, S3 → masing-masing input angka

  --- BAGIAN 6: Informasi Tambahan ---
  - Ikon info ℹ️ | Judul tebal
  - 2 kolom:
    - Telepon Instansi → Input | Contoh: 021-1234567
    - Tujuan Kunjungan → Dropdown: "----- Pilih -----"
  - Keterangan Tambahan (opsional) → Textarea: "Masukkan keterangan atau catatan tambahan (opsional)"

  - Tombol utama rata tengah: biru tua, ikon buku 📖 + teks "Simpan Buku Tamu Rombongan"
  - Teks kecil di bawah: "Dengan mengisi formulir ini, data kunjungan rombongan akan tercatat dalam buku tamu perpustakaan." — abu-abu

=== ATURAN TAMBAHAN ===
- Latar halaman: hijau sangat muda
- Warna utama: biru tua (#0f3460 / #1e3a8a) untuk judul, tombol, garis penanda
- Latar setiap bagian grup formulir: hijau sangat pudar
- Input & dropdown: garis tepi abu-abu, sudut sedikit melengkung
- Transisi aktif/tidak aktif pada tab berjalan halus
- Tampilan responsif, urutan dari atas ke bawah TIDAK DIUBAH
- JANGAN sertakan menu atas dan bagian bawah footer