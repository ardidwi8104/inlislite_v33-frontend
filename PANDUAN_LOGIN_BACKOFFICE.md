# Panduan Login Backoffice INLISLite

Dokumen ini menjelaskan cara masuk ke halaman backoffice aplikasi demo INLISLite, akun demo yang tersedia, serta hal-hal yang perlu diperhatikan setelah login.

> **Catatan:** Aplikasi ini belum terhubung ke backend. Login masih memakai akun demo di sisi klien, dan sesi disimpan di `localStorage` browser. Jangan gunakan akun/password demo ini untuk lingkungan produksi.

---

## 1. Alamat Halaman Login

### Saat menjalankan aplikasi secara lokal

```text
http://localhost:5173/login-backoffice
```

Jika server Vite memakai port lain, ganti `5173` sesuai port yang muncul di terminal.

### Alternatif lewat hash URL

```text
http://localhost:5173/#login-backoffice
```

### Di lingkungan produksi

```text
https://domain-anda/login-backoffice
```

> Halaman dashboard hanya bisa dibuka jika sesi login tersimpan. Jika belum login, aplikasi otomatis mengarahkan kembali ke halaman login.

---

## 2. Akun Demo

| Peran | Username | Password | Akses awal setelah login |
|---|---|---|---|
| Admin | `admin@inlislite.id` | `admin123` | Menu Otorisasi, Berita, Banner, Pengaturan Umum, Setelan |
| Petugas | `petugas@inlislite.id` | `petugas123` | Dashboard, Buku Tamu, Keanggotaan, Koleksi, Sirkulasi, Stockopname, Baca di Tempat |

Peran (role) **dikenali otomatis** dari akun yang dipakai. Tidak perlu memilih role secara manual saat login.

---

## 3. Langkah Login

1. Buka alamat login di browser:
   ```text
   http://localhost:5173/login-backoffice
   ```
2. Isi kolom **Username** dengan salah satu akun demo, misalnya:
   ```text
   petugas@inlislite.id
   ```
3. Isi kolom **Password** sesuai akun:
   ```text
   petugas123
   ```
4. Masukkan **CAPTCHA**:
   - CAPTCHA berupa 5 angka pada gambar.
   - Ketik angka tersebut pada kolom input CAPTCHA.
   - Klik gambar CAPTCHA atau tombol **Muat ulang** jika kode kurang jelas.
5. Klik tombol **Masuk ke Sistem**.
6. Jika berhasil, Anda akan diarahkan ke dashboard backoffice sesuai role akun.

### Cara cepat mengisi akun demo

Pada halaman login terdapat tombol akun demo:

- **Admin: admin@inlislite.id / admin123**
- **Petugas: petugas@inlislite.id / petugas123**

Klik salah satu tombol tersebut untuk mengisi username dan password secara otomatis. CAPTCHA tetap harus diisi manual.

---

## 4. Setelah Berhasil Login

### Untuk akun Petugas

Menu yang tersedia antara lain:

- Dashboard
- Berita
- Banner
- Koleksi
- Keanggotaan
  - Validasi & Kartu Anggota
  - Anggota Aktif
  - Tambah Anggota
- Sirkulasi
- Stockopname
- Buku Tamu
- Baca di Tempat

Menu penting untuk alur demo:

| Menu | Fungsi |
|---|---|
| **Buku Tamu** | Input/scan kode booking, verifikasi kunjungan, dan melihat bukti kunjungan |
| **Keanggotaan → Validasi & Kartu Anggota** | Input/scan kode pendaftaran, verifikasi anggota, dan cetak kartu anggota PDF |
| **Dashboard** | Melihat statistik kunjungan dan antrean verifikasi |

### Untuk akun Admin

Menu yang tersedia berfokus pada pengaturan sistem:

- Berita
- Banner
- Otorisasi (Group, User, Permission)
- Pengaturan Umum
- Setelan

### Tombol ganti role demo

Di bagian kanan atas dashboard terdapat tombol **Petugas / Admin**. Tombol ini hanya untuk berpindah tampilan role pada demo, bukan login ulang.

### Logout

Klik tombol **Keluar** di kanan atas atau link **Logout** di sidebar. Sesi akan dihapus dan aplikasi kembali ke halaman login.

---

## 5. Troubleshooting

### Login gagal: “Username atau password salah”

Periksa:

- Username harus sama persis, termasuk `@inlislite.id`.
- Password bersifat case-sensitive: `admin123` dan `petugas123` menggunakan huruf kecil.
- Tidak ada spasi tambahan di awal/akhir username atau password.

### Login gagal karena CAPTCHA

- CAPTCHA harus diisi dengan 5 angka yang tampil pada gambar.
- Jika salah, kode akan diganti otomatis. Masukkan kode yang baru.
- Klik **Muat ulang** atau gambar CAPTCHA untuk mendapatkan kode baru.

### Dashboard langsung kembali ke halaman login

Penyebab umum: sesi login tidak tersimpan karena `localStorage` diblokir browser.

Solusi:

- Pastikan browser tidak berada dalam mode private/incognito yang memblokir `localStorage`.
- Izinkan penyimpanan situs untuk alamat aplikasi.
- Coba login ulang.

### Ingin menghapus sesi login secara manual

Buka Developer Tools browser → **Application** → **Local Storage**, lalu hapus key:

```text
inlislite.backoffice-session
```

Atau jalankan di Console browser:

```js
localStorage.removeItem('inlislite.backoffice-session');
location.reload();
```

### Ingin mereset data demo buku tamu dan anggota

Hapus key berikut dari `localStorage`:

```text
inlislite.visits.v1
inlislite.members.v1
```

Atau jalankan di Console browser:

```js
localStorage.removeItem('inlislite.visits.v1');
localStorage.removeItem('inlislite.members.v1');
location.reload();
```

Data anggota demo akan dibuat ulang otomatis saat aplikasi dimuat kembali.

---

## 6. Lokasi Kode Terkait

| File | Keterangan |
|---|---|
| `src/backoffice/Login.jsx` | Daftar akun demo, form login, dan validasi CAPTCHA |
| `src/backoffice/Dashboard.jsx` | Tampilan backoffice, sidebar, dan routing menu internal |
| `src/App.jsx` | Deteksi halaman login/dashboard dan penyimpanan sesi |
| `src/Captcha.jsx` | Komponen CAPTCHA yang dipakai halaman login |
| `src/lib/libraryStore.js` | Data demo buku tamu, anggota, dan statistik dashboard |

---

## 7. Catatan Keamanan

- Akun di atas adalah **akun demo** dan ditulis langsung di kode `src/backoffice/Login.jsx`.
- Jangan memakai password demo untuk aplikasi nyata.
- Untuk produksi, ganti autentikasi menjadi validasi di backend/server, gunakan hash password, session/token yang aman, serta pembatasan akses berdasarkan role.
- CAPTCHA demo bersifat validasi sisi klien; untuk produksi sebaiknya verifikasi CAPTCHA juga dilakukan di server.
