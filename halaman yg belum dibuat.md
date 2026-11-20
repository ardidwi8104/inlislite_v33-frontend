# Halaman yang Belum Dibuat (INLISLite v3.3 Frontend)

Dokumen ini merangkum halaman/view/menu backoffice yang **belum memiliki implementasi** pada frontend saat ini (status "Segera"/belum tersedia), berdasarkan `prompt/daftar_seluruh_halaman_sistem.md`, `src/lib/routes.js`, `src/admin/SidebarAdmin.jsx`, dan `src/petugas/SidebarPetugas.jsx`.

> **Catatan**
> - Daftar di bawah adalah menu/submenu yang tampil di navigasi tetapi belum memiliki route/halaman/view fungsional.
> - Halaman publik (portal `#...`) yang terdaftar pada sistem saat ini telah terimplementasi; ketidaklengkapan utama berada pada modul **Pengaturan/Setelan** dan **Stockopname** di backoffice.
> - Total: **22 item** menu/halaman belum tersedia (1 menu utama + 21 submenu).

---

## Ringkasan

| Area | Menu/Grup | Item belum dibuat | Keterangan |
|---|---|---:|---|
| Admin | Setelan | 2 | Submenu "Segera" di sidebar admin |
| Petugas | Stockopname | 1 | Menu ada di sidebar, belum ada route/view/komponen |
| Petugas | Pengaturan Umum | 3 | Submenu "Segera" |
| Petugas | Pengaturan Katalog | 3 | Submenu "Segera" |
| Petugas | Pengaturan Eksemplar | 3 | Submenu "Segera" |
| Petugas | Pengaturan Keanggotaan | 3 | Submenu "Segera" |
| Petugas | Pengaturan Sirkulasi | 3 | Submenu "Segera" |
| Petugas | Pengaturan Buku Tamu | 3 | Submenu "Segera" |
| Petugas | Setelan | 2 | Submenu "Segera" |
| **Total** | | **22** | |

---

## 1. Admin â€” Belum Tersedia

Sumber: `src/admin/SidebarAdmin.jsx`, `src/admin/DashboardAdmin.jsx`

| No | Grup Menu | Halaman/Submenu | Key/Route | Status | Keterangan |
|---:|---|---|---|---|---|
| 1 | Setelan | Preferensi Sistem | â€” (tanpa mapping halaman/route) | Segera | Belum ada view/komponen; submenu ditandai "Belum tersedia" |
| 2 | Setelan | Backup & Restore | â€” (tanpa mapping halaman/route) | Segera | Belum ada view/komponen; submenu ditandai "Belum tersedia" |

---

## 2. Petugas â€” Belum Tersedia

Sumber: `src/petugas/SidebarPetugas.jsx`, `src/petugas/DashboardPetugas.jsx`, `src/lib/routes.js`

### 2.1 Menu Utama (tanpa halaman)

| No | Menu | Key | Route | Status | Keterangan |
|---:|---|---|---|---|---|
| 1 | Stockopname | `stockopname` | â€” (tidak ada di `ROLE_PATH_TO_MENU`/`MENU_TO_PATH`) | Belum terimplementasi | Item menu tampil di sidebar, namun belum ada halaman/view dan belum dipetakan ke path |

### 2.2 Pengaturan Umum

| No | Submenu | Status | Keterangan |
|---:|---|---|---|
| 2 | Identitas Perpustakaan | Segera | Belum ada implementasi halaman pengaturan |
| 3 | Jam Operasional | Segera | Belum ada halaman pengaturan backoffice (halaman publik `#jam-operasional` / `src/JamOperasional.jsx` sudah ada) |
| 4 | Preferensi | Segera | Belum ada implementasi halaman pengaturan |

### 2.3 Pengaturan Katalog

| No | Submenu | Status | Keterangan |
|---:|---|---|---|
| 5 | Format Katalog | Segera | Belum ada implementasi halaman pengaturan |
| 6 | Bidang Data | Segera | Belum ada implementasi halaman pengaturan |
| 7 | Template | Segera | Belum ada implementasi halaman pengaturan |

### 2.4 Pengaturan Eksemplar

| No | Submenu | Status | Keterangan |
|---:|---|---|---|
| 8 | Lokasi | Segera | Belum ada implementasi halaman pengaturan |
| 9 | Status Eksemplar | Segera | Belum ada implementasi halaman pengaturan |
| 10 | Barcode | Segera | Belum ada implementasi halaman pengaturan |

### 2.5 Pengaturan Keanggotaan

| No | Submenu | Status | Keterangan |
|---:|---|---|---|
| 11 | Jenis Anggota | Segera | Belum ada implementasi halaman pengaturan |
| 12 | Masa Berlaku | Segera | Belum ada implementasi halaman pengaturan |
| 13 | Kartu Anggota | Segera | Belum ada implementasi halaman pengaturan (pencetakan kartu anggota sudah tersedia di validasi keanggotaan) |

### 2.6 Pengaturan Sirkulasi

| No | Submenu | Status | Keterangan |
|---:|---|---|---|
| 14 | Aturan Pinjam | Segera | Belum ada implementasi halaman pengaturan |
| 15 | Denda | Segera | Belum ada implementasi halaman pengaturan |
| 16 | Hari Libur | Segera | Belum ada implementasi halaman pengaturan |

### 2.7 Pengaturan Buku Tamu

| No | Submenu | Status | Keterangan |
|---:|---|---|---|
| 17 | Formulir | Segera | Belum ada implementasi halaman pengaturan |
| 18 | Tujuan Kunjungan | Segera | Belum ada implementasi halaman pengaturan |
| 19 | Tampilan | Segera | Belum ada implementasi halaman pengaturan |

### 2.8 Setelan

| No | Submenu | Status | Keterangan |
|---:|---|---|---|
| 20 | Preferensi Sistem | Segera | Belum ada view/komponen; submenu ditandai "Belum tersedia" |
| 21 | Backup & Restore | Segera | Belum ada view/komponen; submenu ditandai "Belum tersedia" |

---

## 3. Daftar Ringkas (Checklist)

- [ ] **Admin â€” Setelan:** Preferensi Sistem
- [ ] **Admin â€” Setelan:** Backup & Restore
- [ ] **Petugas:** Stockopname (menu utama)
- [ ] **Petugas â€” Pengaturan Umum:** Identitas Perpustakaan
- [ ] **Petugas â€” Pengaturan Umum:** Jam Operasional (pengaturan backoffice)
- [ ] **Petugas â€” Pengaturan Umum:** Preferensi
- [ ] **Petugas â€” Pengaturan Katalog:** Format Katalog
- [ ] **Petugas â€” Pengaturan Katalog:** Bidang Data
- [ ] **Petugas â€” Pengaturan Katalog:** Template
- [ ] **Petugas â€” Pengaturan Eksemplar:** Lokasi
- [ ] **Petugas â€” Pengaturan Eksemplar:** Status Eksemplar
- [ ] **Petugas â€” Pengaturan Eksemplar:** Barcode
- [ ] **Petugas â€” Pengaturan Keanggotaan:** Jenis Anggota
- [ ] **Petugas â€” Pengaturan Keanggotaan:** Masa Berlaku
- [ ] **Petugas â€” Pengaturan Keanggotaan:** Kartu Anggota
- [ ] **Petugas â€” Pengaturan Sirkulasi:** Aturan Pinjam
- [ ] **Petugas â€” Pengaturan Sirkulasi:** Denda
- [ ] **Petugas â€” Pengaturan Sirkulasi:** Hari Libur
- [ ] **Petugas â€” Pengaturan Buku Tamu:** Formulir
- [ ] **Petugas â€” Pengaturan Buku Tamu:** Tujuan Kunjungan
- [ ] **Petugas â€” Pengaturan Buku Tamu:** Tampilan
- [ ] **Petugas â€” Setelan:** Preferensi Sistem
- [ ] **Petugas â€” Setelan:** Backup & Restore

---

## 4. Referensi Berkas

- `src/admin/SidebarAdmin.jsx` â€” menu admin & penanda "Segera"
- `src/petugas/SidebarPetugas.jsx` â€” menu petugas, Stockopname, grup Pengaturan/Setelan & penanda "Segera"
- `src/lib/routes.js` â€” pemetaan menu â†” route (item "Segera"/Stockopname belum dipetakan)
- `src/admin/DashboardAdmin.jsx`, `src/petugas/DashboardPetugas.jsx` â€” shell/render view backoffice
- `prompt/daftar_seluruh_halaman_sistem.md` â€” inventaris seluruh halaman sistem (sumber ringkasan)

