# Daftar Seluruh Halaman Sistem (INLISLite v3.3 Frontend)

Dokumen ini merangkum halaman/layar yang telah dibuat pada sistem **frontend INLISLite v3.3 (Dispusip Kab. PPU)** berdasarkan struktur kode saat ini (`src/`, routing di `App.jsx` dan `src/lib/routes.js`).

> **Catatan**
> - **Halaman publik** menggunakan hash routing (`#...`) pada portal.
> - **Backoffice** menggunakan path routing (`/login-backoffice`, `/login-backoffice/shared/*`, `/petugas/*`, `/admin/*`) dengan sesi di `localStorage` (`inlislite.backoffice-session`).
> - Beberapa menu menampilkan sub-item **"Segera"**: item tersebut ada di navigasi tetapi belum memiliki halaman/view terimplementasi.

---

## 1. Layout & Komponen Global

| Komponen | Berkas | Keterangan |
|---|---|---|
| Header situs | `src/Header.jsx` | Bagian atas portal publik |
| Navigasi utama | `src/Navbar.jsx` | Menu portal publik & kontrol navigasi |
| Footer situs | `src/Footer.jsx` | Footer portal publik |
| Shell portal | `src/App.jsx` | Skip-link, layout publik, pemilihan halaman, guard backoffice |
| Entry point | `src/main.jsx` | Bootstrap aplikasi React |
| Header backoffice | `src/backoffice/BackofficeHeader.jsx` | Header area admin/petugas |
| Footer backoffice | `src/shared/BackofficeFooter.jsx` | Footer area admin/petugas |
| Sidebar admin | `src/admin/SidebarAdmin.jsx` | Navigasi admin |
| Sidebar petugas | `src/petugas/SidebarPetugas.jsx` | Navigasi petugas |
| Popup logout | `src/shared/LogoutConfirmPopup.jsx` | Konfirmasi keluar |
| Modal umum | `src/components/Modal.jsx` | Dialog/modal reusable |
| CAPTCHA | `src/Captcha.jsx` | Field/logic captcha (buku tamu, keanggotaan, dll.) |
| QR Code | `src/components/QRCodeImage.jsx` | Render QR |
| Barcode | `src/components/BarcodeImage.jsx` | Render barcode |
| Bukti kunjungan (modal) | `src/components/VisitProofModal.jsx` | Pratinjau/cetak bukti kunjungan |
| Utilitas avatar backoffice | `src/backoffice/useBackofficeAvatar.js` | Avatar profil backoffice |
| Store & utilitas | `src/lib/libraryStore.js`, `src/lib/routes.js`, `src/lib/pdfDocs.js` | Data lokal, mapping route/menu, PDF (kartu anggota, bukti, dll.) |
| Data berita publik | `src/data/beritaData.js` | Sumber data berita portal |

---

## 2. Portal Publik (Front Office)

Akses utama: `/#home` (default). Semua halaman di bawah dirender dalam shell publik (`Header` + `Navbar` + konten + `Footer`).

| No | Halaman | Route / Hash | Berkas | Keterangan |
|---:|---|---|---|---|
| 1 | Beranda | `#home` | `src/Home.jsx` | Halaman utama portal |
| 2 | Profil | `#profil` | `src/Profil.jsx` | Profil perpustakaan/instansi |
| 3 | Layanan (indeks) | `#layanan` | `src/Layanan.jsx` | Daftar/landing layanan |
| 4 | Layanan Peminjaman & Pengembalian | `#peminjaman-pengembalian` | `src/PeminjamanPengembalian.jsx` | Informasi layanan sirkulasi |
| 5 | Layanan Referensi | `#layanan-referensi` | `src/LayananReferensi.jsx` | Informasi layanan referensi |
| 6 | Layanan Penelusuran Informasi | `#layanan-penelusuran` | `src/LayananPenelusuran.jsx` | Informasi penelusuran informasi |
| 7 | Layanan Anak & Pemuda | `#layanan-anak-pemuda` | `src/LayananAnakPemuda.jsx` | Informasi layanan anak & pemuda |
| 8 | Layanan Digital | `#layanan-digital` | `src/LayananDigital.jsx` | Informasi layanan digital |
| 9 | OPAC (Katalog Online) | `#opac` | `src/Opac.jsx` | Penelusuran katalog/koleksi |
| 10 | Berita (daftar) | `#berita` | `src/Berita.jsx` | Daftar berita publik |
| 11 | Detail Berita | `#berita/<slug>` | `src/DetailBerita.jsx` | Halaman detail per berita (slug dinamis) |
| 12 | Kontak / Hubungi Kami | `#kontak` | `src/Kontak.jsx` | Informasi kontak, peta lokasi, formulir pesan |
| 13 | Keanggotaan Mandiri | `#keanggotaan-mandiri` (alias: `keanggotaanmandiri`) | `src/KeanggotaanMandiri.jsx` | Pendaftaran anggota online |
| 14 | Buku Tamu | `#buku-tamu` (alias: `bukutamu`) | `src/BukuTamu.jsx` | Buku kunjungan (Anggota, Non Anggota, Rombongan) |
| 15 | Galeri | `#galeri` | `src/Galeri.jsx` | Galeri foto/kegiatan |
| 16 | Statistik (ringkasan/hub) | `#statistik` | `src/Statistik.jsx` | Halaman ringkasan/statistik utama |
| 17 | Statistik Pengunjung | `#statistik-pengunjung` | `src/StatistikPengunjung.jsx` | Statistik kunjungan |
| 18 | Statistik Peminjaman | `#statistik-peminjaman` | `src/StatistikPeminjaman.jsx` | Statistik peminjaman & pengembalian |
| 19 | Statistik Anggota | `#statistik-anggota` | `src/StatistikAnggota.jsx` | Statistik keanggotaan |
| 20 | Jam Operasional | `#jam-operasional` | `src/JamOperasional.jsx` | Informasi jam layanan |

**Total halaman publik (view/rute): 20** (termasuk halaman detail berita dinamis).

---

## 3. Backoffice — Autentikasi

| Halaman | Route | Berkas | Keterangan |
|---|---|---|---|
| Login Backoffice | `/login-backoffice` | `src/backoffice/Login.jsx` | Login admin/petugas, set sesi & role, redirect ke dashboard shared |

---

## 4. Backoffice — Dashboard & Halaman Bersama (Shared)

Halaman/view ini dipakai lintas role (admin/petugas) atau sebagai komponen bersama.

| Halaman / View | Route / Akses | Berkas | Dipakai oleh |
|---|---|---|---|
| Dashboard (ringkasan) | `/login-backoffice/shared/dashboard` (menu `dashboard`) | `src/shared/DashboardOverview.jsx` | Admin, Petugas (judul/subtitle dari meta role) |
| Berita (manajemen) | `/login-backoffice/shared/berita` | `src/shared/BeritaPage.jsx`, `src/shared/TambahEditBerita.jsx` | Admin, Petugas |
| Banner (manajemen) | `/login-backoffice/shared/banner` | `src/shared/BannerPage.jsx`, `src/shared/TambahEditBanner.jsx` | Admin, Petugas |
| Profil Saya | `/login-backoffice/shared/profil` (menu `profil`) | `src/shared/ProfilSaya.jsx` | Admin, Petugas |

---

## 5. Halaman Admin

Shell: `src/admin/DashboardAdmin.jsx`, navigasi: `src/admin/SidebarAdmin.jsx` (role **ADMIN**).

| No | Menu / Halaman | Menu key / Route | Berkas utama | Keterangan |
|---:|---|---|---|---|
| 1 | Dashboard | `dashboard` → `/login-backoffice/shared/dashboard` | `src/shared/DashboardOverview.jsx` | Ringkasan sistem |
| 2 | Berita | `berita` → `/login-backoffice/shared/berita` | `src/shared/BeritaPage.jsx` | Kelola berita portal (role admin) |
| 3 | Banner | `banner` → `/login-backoffice/shared/banner` | `src/shared/BannerPage.jsx` | Kelola banner beranda |
| 4 | Akun Petugas | `user` → `/admin/otorisasi/akun-petugas` | `src/admin/otorisasi/PetugasTable.jsx`, `src/admin/otorisasi/TambahPetugasModal.jsx` | Daftar/tambah/hapus akun petugas |
| 5 | Profil Saya | `profil` → `/login-backoffice/shared/profil` | `src/shared/ProfilSaya.jsx` | Profil akun admin (akses via navigasi/profil) |
| 6 | Setelan → Preferensi Sistem | submenu (tanpa mapping halaman) | — | **Segera** (belum tersedia) |
| 7 | Setelan → Backup & Restore | submenu (tanpa mapping halaman) | — | **Segera** (belum tersedia) |

**Halaman/view admin terimplementasi: 5** (Dashboard, Berita, Banner, Akun Petugas, Profil Saya).

---

## 6. Halaman Petugas

Shell: `src/petugas/DashboardPetugas.jsx`, navigasi: `src/petugas/SidebarPetugas.jsx` (role **PETUGAS**). Mapping path/menu: `src/lib/routes.js`.

### 6.1 Ringkasan & Konten

| No | Menu / Halaman | Menu key / Route | Berkas utama | Keterangan |
|---:|---|---|---|---|
| 1 | Dashboard | `dashboard` → `/login-backoffice/shared/dashboard` | `src/shared/DashboardOverview.jsx` | Ringkasan layanan/data harian |
| 2 | Berita | `berita` → `/login-backoffice/shared/berita` | `src/shared/BeritaPage.jsx` | Kelola berita portal (role petugas) |
| 3 | Banner | `banner` → `/login-backoffice/shared/banner` | `src/shared/BannerPage.jsx` | Kelola banner beranda |
| 4 | Profil Saya | `profil` → `/login-backoffice/shared/profil` | `src/shared/ProfilSaya.jsx` | Profil akun petugas |

### 6.2 Modul Koleksi (`src/petugas/koleksi/*`)

| No | Halaman | Menu key / Route | Berkas |
|---:|---|---|---|
| 5 | Daftar Katalog | `katalog` → `/petugas/koleksi/daftar-katalog` | `src/petugas/koleksi/index.jsx`, `DaftarKatalog.jsx` |
| 6 | Karantina Katalog | `karantina-katalog` → `/petugas/koleksi/karantina-katalog` | `KarantinaKatalog.jsx` |
| 7 | Salin Katalog (Impor MARC) | `salin-katalog` → `/petugas/koleksi/salin-katalog` | `SalinKatalog.jsx` |
| 8 | Daftar Eksemplar | `eksemplar` → `/petugas/koleksi/daftar-eksemplar` | `DaftarEksemplar.jsx` |
| 9 | Import Excel (Eksemplar) | `import-excel` → `/petugas/koleksi/import-excel` | `ImportExcel.jsx` |
| 10 | Karantina Eksemplar | `karantina-eksemplar` → `/petugas/koleksi/karantina-eksemplar` | `KarantinaEksemplar.jsx` |

Pendukung modul: `koleksi/data.js`, `koleksi/helpers.jsx`.

### 6.3 Modul Keanggotaan

| No | Halaman | Menu key / Route | Berkas | Keterangan |
|---:|---|---|---|---|
| 11 | Validasi & Kartu Anggota | `validasi-anggota` → `/petugas/keanggotaan/validasi-anggota` | `src/backoffice/KeanggotaanValidation.jsx` | Verifikasi pendaftaran, penerbitan & cetak kartu PDF |
| 12 | Anggota Aktif | `anggota-aktif` → `/petugas/keanggotaan/anggota-aktif` | `src/backoffice/KeanggotaanValidation.jsx` | Tampilan/filter anggota aktif (komponen sama, `initialStatus='active'`) |
| 13 | Entri/Tambah Anggota | `entri-anggota` → `/petugas/keanggotaan/entri-anggota` | `src/petugas/keanggotaan/EntriAnggota.jsx` | Entri anggota baru |
| 14 | Daftar Anggota | `daftar-anggota` → `/petugas/keanggotaan/daftar-anggota` | `src/petugas/keanggotaan/DaftarAnggota.jsx` | Daftar semua anggota |
| 15 | Perpanjangan Anggota | `perpanjangan-anggota` → `/petugas/keanggotaan/perpanjangan-anggota` | `src/petugas/keanggotaan/PerpanjanganAnggota.jsx` | Perpanjangan masa anggota |
| 16 | Import Anggota | `import-anggota` → `/petugas/keanggotaan/import-anggota` | `src/petugas/keanggotaan/ImportAnggota.jsx` | Import data anggota |
| 17 | Keranjang Anggota | `keranjang-anggota` → `/petugas/keanggotaan/keranjang-anggota` | `src/petugas/keanggotaan/KeranjangAnggota.jsx` | Keranjang/seleksi anggota |

Pendukung: `src/petugas/keanggotaan/index.jsx` (router view), `store.jsx`.

### 6.4 Modul Sirkulasi (`src/petugas/sirkulasi/*`)

| No | Halaman | Menu key / Route | Berkas |
|---:|---|---|---|
| 18 | Entri Peminjaman | `entri-peminjaman` → `/petugas/sirkulasi/entri-peminjaman` | `EntriPeminjaman.jsx` |
| 19 | Entri Perpanjangan | `entri-perpanjangan` → `/petugas/sirkulasi/entri-perpanjangan` | `EntriPerpanjangan.jsx` |
| 20 | Entri Pengembalian | `entri-pengembalian` → `/petugas/sirkulasi/entri-pengembalian` | `EntriPengembalian.jsx` |
| 21 | Peminjaman (daftar) | `peminjaman` → `/petugas/sirkulasi/peminjaman` | `Peminjaman.jsx` |
| 22 | Perpanjangan (daftar) | `perpanjangan` → `/petugas/sirkulasi/perpanjangan` | `Perpanjangan.jsx` |
| 23 | Pengembalian (daftar) | `pengembalian` → `/petugas/sirkulasi/pengembalian` | `Pengembalian.jsx` |
| 24 | Pelanggaran | `pelanggaran` → `/petugas/sirkulasi/pelanggaran` | `Pelanggaran.jsx` |

Router: `src/petugas/sirkulasi/index.jsx`.

### 6.5 Layanan Harian & Lainnya

| No | Halaman | Menu key / Route | Berkas | Keterangan |
|---:|---|---|---|---|
| 25 | Buku Tamu — Validasi | `bukutamu` / `bukutamu-validasi` → `/petugas/buku-tamu/validasi` | `src/petugas/bukutamu/index.jsx`, `BukuTamuAnggotaContent.jsx` | Validasi/entry kunjungan anggota |
| 26 | Buku Tamu — Daftar | `bukutamu-daftar` → `/petugas/buku-tamu/daftar` | `src/petugas/bukutamu/BukuTamuDaftar.jsx` | Daftar data buku tamu |
| 27 | Baca di Tempat | `bacatempat` → `/petugas/baca-di-tempat` | `src/petugas/bacaditempat/index.jsx` | Pencatatan baca di tempat |
| 28 | Stockopname | `stockopname` (menu) | — | **Menu ada, halaman/view belum terimplementasi** |

### 6.6 Modul Laporan (`src/shared/Laporan*.jsx`)

| No | Halaman | Menu key / Route | Berkas |
|---:|---|---|---|
| 29 | Laporan Katalog | `laporan-katalog` → `/petugas/laporan/katalog` | `src/shared/LaporanKatalog.jsx`, `LaporanPage.jsx` |
| 30 | Laporan Eksemplar | `laporan-eksemplar` → `/petugas/laporan/eksemplar` | `src/shared/LaporanEksemplar.jsx` |
| 31 | Laporan Anggota | `laporan-anggota` → `/petugas/laporan/anggota` | `src/shared/LaporanAnggota.jsx` |
| 32 | Laporan Sirkulasi (Peminjaman Buku) | `laporan-sirkulasi` → `/petugas/laporan/peminjaman-buku` | `src/shared/LaporanSirkulasi.jsx` |
| 33 | Laporan Buku Tamu | `laporan-buku-tamu` → `/petugas/laporan/buku-tamu` | `src/shared/LaporanBukuTamu.jsx` |
| 34 | Laporan Baca di Tempat | `laporan-baca-ditempat` → `/petugas/laporan/baca-ditempat` | `src/shared/LaporanBacaDitempat.jsx` |

### 6.7 Menu Pengaturan (Belum Tersedia / "Segera")

Menu berikut tampil di sidebar petugas namun subhalamannya belum memiliki implementasi/view:

| Grup Menu | Submenu (Segera) |
|---|---|
| Pengaturan Umum | Identitas Perpustakaan, Jam Operasional, Preferensi |
| Pengaturan Katalog | Format Katalog, Bidang Data, Template |
| Pengaturan Eksemplar | Lokasi, Status Eksemplar, Barcode |
| Pengaturan Keanggotaan | Jenis Anggota, Masa Berlaku, Kartu Anggota |
| Pengaturan Sirkulasi | Aturan Pinjam, Denda, Hari Libur |
| Pengaturan Buku Tamu | Formulir, Tujuan Kunjungan, Tampilan |
| Setelan | Preferensi Sistem, Backup & Restore |

**Halaman/view petugas terimplementasi (fungsional): ~34** (Dashboard, Berita, Banner, Profil, 6 Koleksi, 7 Keanggotaan, 7 Sirkulasi, 2 Buku Tamu, 1 Baca di Tempat, 6 Laporan) — *Stockopname & seluruh submenu pengaturan/setelan belum terimplementasi*.

---

## 7. Ringkasan Jumlah Halaman

| Area | Jumlah (perkiraan) | Rincian |
|---|---:|---|
| Portal publik | 20 | Beranda, Profil, 6 halaman Layanan/OPAC terkait, Berita+Detail, Kontak, Keanggotaan Mandiri, Buku Tamu, Galeri, 4 Statistik, Jam Operasional |
| Autentikasi backoffice | 1 | Login backoffice |
| Shared backoffice (view) | 4 | Dashboard, Manajemen Berita, Manajemen Banner, Profil Saya |
| Admin (terimplementasi) | 5 | Dashboard, Berita, Banner, Akun Petugas, Profil Saya |
| Petugas (terimplementasi) | 34 | Dashboard+Profil+Berita+Banner, Koleksi(6), Keanggotaan(7), Sirkulasi(7), Buku Tamu(2), Baca di Tempat(1), Laporan(6) |
| **Total halaman/view terimplementasi (unik secara fungsional)** | **~55** | Menghitung view/rute yang memiliki implementasi (beberapa komponen shared dipakai ulang lintas role) |
| Menu/halaman belum tersedia | 22+ item | Stockopname (petugas) + submenu "Segera" di Admin (2) & Petugas (20) |

---

## 8. Berkas Rujukan Utama

- Routing & pemilihan halaman publik/backoffice: `src/App.jsx`
- Pemetaan menu ↔ path backoffice: `src/lib/routes.js`
- Shell & menu admin: `src/admin/DashboardAdmin.jsx`, `src/admin/SidebarAdmin.jsx`
- Shell & menu petugas: `src/petugas/DashboardPetugas.jsx`, `src/petugas/SidebarPetugas.jsx`
- Modul keanggotaan petugas: `src/petugas/keanggotaan/*`, `src/backoffice/KeanggotaanValidation.jsx`
- Modul koleksi: `src/petugas/koleksi/*`
- Modul sirkulasi: `src/petugas/sirkulasi/*`
- Laporan: `src/shared/LaporanPage.jsx` dan `src/shared/Laporan*.jsx`
