# Prompt UI: Halaman Login Backoffice INLISLite

Buat halaman **Login Backoffice INLISLite** yang berdiri sendiri (full-screen, tanpa header navigasi situs dan tanpa footer 3 kolom) persis seperti referensi visual `screencapture-localhost-login-2026-10-31-11_33_57.png`.

Halaman hanya terdiri dari: latar gradien biru-ungu, dua lingkaran dekoratif, satu kartu login di tengah, dan satu baris teks copyright di dasar halaman.

---

## 1. Latar Halaman

- **Ukuran referensi:** 1920 × 956 px.
- **Gradien latar:** `linear-gradient(135deg, #667EEA 0%, #764BA2 100%)` — biru-violet di kiri atas menuju ungu di kanan bawah.
- **Dua lingkaran dekoratif transparan** di belakang kartu:
  1. Kiri atas: diameter `280px`, warna `rgba(255,255,255,0.08)`, posisi `top: 15%; left: 8%`.
  2. Kanan bawah: diameter `220px`, warna `rgba(255,255,255,0.08)`, posisi `bottom: 15%; right: 10%`.
- Tidak ada ilustrasi, gambar, atau pola lain di latar.

---

## 2. Kartu Login

- Satu kartu berwarna **putih keunguan sangat muda** `#F8F7FC`.
- **Lebar:** `400px`; **padding dalam:** `40px` (kiri, kanan, atas, bawah); **lebar area konten:** `320px`.
- **Sudut:** sangat membulat, radius ± `24px`. Tidak ada garis tepi.
- **Bayangan:** lembut dan menyebar, contoh `0 18px 45px rgba(35, 20, 80, 0.18)`.
- **Posisi:** di tengah horizontal halaman. Pada referensi 1920 × 956, tepi atas kartu berada di `y = 121px` dan tepi bawah di `y = 789px` (tinggi ± `668px`).
- Di bawah kartu masih tersisa ruang kosong, lalu teks copyright di dasar halaman.

---

## 3. Isi Kartu (urut dari atas ke bawah)

### 3.1 Logo
- Logo **INLISLite lengkap** (wordmark "INLISLite" + emblem bulat + tagline kecil "Integrated Library System"), menggunakan aset `Logo-Inlislite.png`.
- Rata tengah kartu.
- Lebar tampilan ± `74px`, tinggi menyesuaikan proporsi asli (± `37px`); bagian konten yang terlihat ± `70 × 30px`.
- Warna logo gelap/grayscale dengan aksen teal kecil pada emblem.

### 3.2 Judul Utama
- Teks: **"Login INLISLite"**
- Ukuran ± `26px` (1.6rem), **bold (700)**, warna `#2D3748`, rata tengah.
- Posisi vertikal teks (tinggi huruf) pada referensi: `y = 252px – 277px`.

### 3.3 Sub-judul
- Teks: **"Login INLISLite"** — teksnya memang sama dengan judul utama, sesuai referensi.
- Ukuran ± `15px`, weight medium (500), warna `#718096`, rata tengah.
- Berada tepat di bawah judul, dengan jarak visual ± `13px`.
- Posisi teks pada referensi: `y = 290px – 304px`.

### 3.4 Badge "Secure Access"
- Berbentuk **pill** (sudut penuh), rata tengah.
- Latar `#DEE5F3`, teks dan ikon `#0343A7`, tanpa garis tepi.
- Ukuran ± `123 × 30px`, padding horizontal ± `14px`.
- Isi: ikon **perisai separuh** (`fa-shield-halved`, ± 10px) di kiri + teks **"Secure Access"** (± 11px, bold/semibold).
- Posisi pada referensi: `y = 325px – 354px`.

### 3.5 Label & Input Username
- Label: **"Username"**, rata kiri, ukuran ± `13px`, semibold (600), warna `#4A5568`.
- Jarak label ke kotak input ± `10–14px`.
- Kotak input:
  - Lebar `320px` (sama dengan lebar area konten), tinggi ± `34px`.
  - Latar **putih** `#FFFFFF`, garis tepi `1px` warna `#E2E8F0`, sudut radius ± `8px`.
  - Ikon **user** (`fa-user`, warna `#0343A7`, ± 15px) di sisi kiri, berjarak ± `20px` dari tepi kiri.
  - Teks di dalam input: **"admin"**, ukuran ± `14px`, warna `#4A5568`, rata vertikal tengah.
  - Padding teks kiri ± `46px` agar tidak menumpuk ikon.
- Posisi pada referensi: label `y = 385px – 395px`; kotak input `x = 799px – 1120px`, `y = 409px – 442px`.

### 3.6 Label & Input Password
- Label: **"Password"**, rata kiri, ukuran ± `13px`, semibold (600), warna `#4A5568`.
- Kotak input:
  - Ukuran dan radius sama dengan input username (`320 × 34px`, radius `8px`).
  - Latar putih; pada referensi tampak **biru sangat muda** `#E8F0FE` karena terisi otomatis oleh browser (autofill Chrome). Bila tidak memakai autofill, gunakan putih `#FFFFFF`.
  - Garis tepi `1px` `#E2E8F0`.
  - Ikon **gembok** (`fa-lock`, warna `#0343A7`, ± 15px) di sisi kiri.
  - Nilai password **tersamarkan**: 8 titik/bullet (sesuai sandi "admin123"), warna gelap `#2D3748`.
  - Ikon **mata** (`fa-eye`, warna abu-abu `#94A3B8`, ± 14px) di sisi kanan, berjarak ± `20px` dari tepi kanan. Ikon ini menjadi tombol tampilkan/sembunyikan password.
- Posisi pada referensi: label `y = 467px – 477px`; kotak input `x = 799px – 1120px`, `y = 491px – 524px`.

### 3.7 Captcha "I am human"
- Gunakan widget captcha bergaya **hCaptcha checkbox** (kotak centang “I am human”), rata tengah kartu.
- Kotak widget:
  - Ukuran ± `245 × 61px`.
  - Latar `#FAFAFA`, garis tepi `1px` `#E2E2E3`, sudut radius ± `4px`.
  - **Checkbox kosong (belum dicentang)** di sisi kiri: kotak ± `23 × 24px`, garis tepi abu-abu gelap `#767676`, latar putih, sudut ± `2px`.
  - Teks **"I am human"** di tengah, ukuran ± `11px`, warna `#4A5568`.
  - Logo **hCaptcha** di sisi kanan: ikon berwarna teal/biru (± `17px`) di atas teks kecil "hCaptcha" (± `8px`), warna dominan `#4B9CD1` dan `#2A9D8F`.
- Posisi pada referensi: `x = 838px – 1082px`, `y = 550px – 610px`.

### 3.8 Tombol "Masuk ke Sistem"
- Tombol selebar area konten (`320px`), tinggi ± `50px`, radius ± `8px`.
- **Tampilan pada referensi = state nonaktif** (captcha belum dicentang):
  - Latar `#CBD5E0` (abu-abu kebiruan muda).
  - Teks dan ikon berwarna **putih** `#FFFFFF`.
  - Isi: ikon **masuk/panah ke dalam** (`fa-right-to-bracket`) + teks **"Masuk ke Sistem"** (± 16px, bold 700), tersusun horizontal di tengah.
  - Tidak ada garis tepi.
- Posisi pada referensi: `x = 799px – 1120px`, `y = 649px – 698px`.

### 3.9 Baris Ikon Fitur
- Tiga item sejajar, masing-masing ikon di atas label, rata tengah.
- Label kecil ± `12px`, warna `#6B7280`, weight medium.
- Item (dari kiri ke kanan):
  1. Ikon **perisai** (`fa-shield`) warna hijau `#3AC47D` + label **"Aman"**.
  2. Ikon **jam** (`fa-clock`) warna biru `#3F6AD8` + label **"24/7"**.
  3. Ikon **ponsel** (`fa-mobile-screen`) warna cyan `#74CAFE` + label **"Responsive"**.
- Ukuran ikon ± `12–14px`; jarak ikon ke label ± `6px`.
- Posisi pada referensi: ikon `y = 722px – 733px`, label `y = 739px – 749px`; pusat ketiga item berada di `x ≈ 843px`, `959px`, dan `1075px` (tersebar merata di bawah tombol).

---

## 4. Teks Copyright (dasar halaman)

- Teks: **"2026 Copyright © Perpustakaan Nasional RI"**
- Rata tengah, satu baris, ukuran ± `13px`, weight normal (400).
- Warna putih dengan transparansi ± 80% (`rgba(255,255,255,0.8)`) di atas gradien.
- Berada di bagian paling bawah halaman; pada referensi teks berada di `y = 941px – 953px` (tepi bawah halaman 956px).

---

## 5. Ukuran & Posisi Referensi (1920 × 956 px)

| Elemen | Posisi X | Posisi Y | Ukuran |
|---|---|---|---|
| Kartu login | 760 – 1160 | 121 – 789 | 400 × 668 px |
| Area konten kartu | 800 – 1120 | 161 – 749 | 320 px lebar |
| Logo | 925 – 994 | 180 – 209 | 70 × 30 px (konten) |
| Judul "Login INLISLite" | 873 – 1048 | 252 – 277 | ± 26px bold |
| Sub-judul "Login INLISLite" | 909 – 1010 | 290 – 304 | ± 15px |
| Badge "Secure Access" | 898 – 1020 | 325 – 354 | 123 × 30 px |
| Label "Username" | 799 – 860 | 385 – 395 | ± 13px |
| Input username | 799 – 1120 | 409 – 442 | 322 × 34 px |
| Label "Password" | 799 – 856 | 467 – 477 | ± 13px |
| Input password | 799 – 1120 | 491 – 524 | 322 × 34 px |
| Widget hCaptcha | 838 – 1082 | 550 – 610 | 245 × 61 px |
| Checkbox hCaptcha | 852 – 874 | 569 – 593 | ± 23 × 24 px |
| Tombol "Masuk ke Sistem" | 799 – 1120 | 649 – 698 | 322 × 50 px |
| Ikon fitur | 838 – 1079 | 722 – 733 | 11 – 13 px |
| Label fitur | 831 – 1099 | 739 – 749 | ± 12px |
| Teks copyright | 829 – 1090 | 941 – 953 | ± 13px |

**Jarak visual antar elemen (referensi):**
- Logo → judul: ± `43px`
- Judul → sub-judul: ± `13px`
- Sub-judul → badge: ± `21px`
- Badge → label Username: ± `31px`
- Label → kotak input: ± `10–14px`
- Input Username → label Password: ± `25px`
- Input Password → captcha: ± `26px`
- Captcha → tombol: ± `39px`
- Tombol → ikon fitur: ± `24px`
- Label fitur → tepi bawah kartu: ± `40px` (padding bawah kartu)

---

## 6. Aturan Tampilan & State

- **Font:** Plus Jakarta Sans (sans-serif modern), weight 400/500/600/700. Jika font tidak tersedia, gunakan Inter/Poppins dengan proporsi serupa.
- **State awal halaman:**
  - Input username sudah terisi **"admin"**.
  - Input password sudah terisi **"admin123"** dan tampil sebagai 8 titik.
  - Checkbox hCaptcha **belum dicentang**.
  - Tombol "Masuk ke Sistem" tampil abu-abu `#CBD5E0` dengan teks putih (nonaktif).
- **Interaksi:**
  - Ikon mata di kanan dapat menampilkan/menyembunyikan password.
  - Checkbox captcha dapat dicentang; setelah centang berhasil, tombol dapat berubah ke state aktif (bebas menggunakan warna primer yang selaras, mis. biru/ungu), namun tampilan default harus mengikuti referensi di atas.
  - Transisi hover/focus dibuat halus, tidak mengubah tata letak.
- **JANGAN tampilkan:**
  - Header navigasi situs publik atau footer 3 kolom.
  - Tombol akun demo / daftar akun contoh.
  - Captcha angka (kode hitung) atau field input jawaban captcha.
  - Tombol "Kembali ke Website".
  - Teks tambahan lain di dalam kartu selain yang tercantum di atas.
- **Responsif:** kartu tetap di tengah; pada layar kecil gunakan `width: calc(100% - 40px)` dengan `max-width: 400px`, padding kartu boleh mengecil (mis. `24px`), tetapi urutan elemen dan teks **TIDAK BOLEH BERUBAH**.
