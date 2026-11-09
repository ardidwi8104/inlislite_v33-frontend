# Prompt & Kode Halaman Kontak Dinas Perpustakaan dan Arsip Kab. PPU

Berikut adalah spesifikasi prompt dan draf kode HTML/Tailwind untuk halaman **Hubungi Kami** Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara (Dispusip PPU).

---

## 📌 Deskripsi Layout & Struktur
1. **Header**: Judul Halaman & Sub-judul instansi.
2. **Baris Atas (2 Kolom Grid)**:
   - **Kiri**: Informasi "Hubungi Kami" (Alamat lengkap, Facebook resmi, Layanan Pengaduan SP4N-LAPOR!).
   - **Kanan**: Peta lokasi interaktif (Embed Google Maps).
3. **Baris Bawah (Full Width / Centered)**:
   - **Formulir "Kirim Pesan"**: Input nama, email, subjek, serta pesan.

---

## 💻 Code Template (HTML + Tailwind CSS)

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hubungi Kami - Dinas Perpustakaan dan Arsip Kab. Penajam Paser Utara</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-gray-50 text-gray-800 font-sans">

  <!-- Container Utama -->
  <main class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    
    <!-- Header Halaman -->
    <div class="text-center mb-12">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
        Hubungi Kami
      </h1>
      <p class="mt-3 text-lg text-gray-600">
        Dinas Perpustakaan dan Arsip Kabupaten Penajam Paser Utara
      </p>
    </div>

    <!-- Section Upper: Informasi Kontak (Kiri) & Google Maps (Kanan) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      
      <!-- Kolom Kiri: Informasi Kontak -->
      <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Informasi Kontak</h2>
          
          <div class="space-y-6">
            <!-- Alamat -->
            <div class="flex items-start space-x-4">
              <div class="bg-blue-100 p-3 rounded-lg text-blue-900 mt-1">
                <i data-lucide="map-pin" class="w-6 h-6"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Alamat Kantor</h3>
                <p class="text-gray-600 leading-relaxed mt-1">
                  Jl. KORPRI KM. 9, Komplek Islamic Center, Kelurahan Nipah-Nipah, Kecamatan Penajam, Kabupaten Penajam Paser Utara, Kalimantan Timur
                </p>
              </div>
            </div>

            <!-- Facebook -->
            <div class="flex items-start space-x-4">
              <div class="bg-blue-100 p-3 rounded-lg text-blue-900 mt-1">
                <i data-lucide="facebook" class="w-6 h-6"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Facebook Resmi</h3>
                <a href="https://www.facebook.com/perpustakaankab/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline mt-1 inline-block">
                  Dinas Perpustakaan Kabupaten PPU
                </a>
              </div>
            </div>

            <!-- SP4N-LAPOR! -->
            <div class="flex items-start space-x-4">
              <div class="bg-red-100 p-3 rounded-lg text-red-600 mt-1">
                <i data-lucide="megaphone" class="w-6 h-6"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Layanan Pengaduan Official</h3>
                <p class="text-gray-600 text-sm mb-1">Kirim laporan atau aspirasi Anda melalui SP4N-LAPOR!:</p>
                <a href="https://www.lapor.go.id/instansi/dinas-perpustakaan-dan-arsip-kabupaten-penajam-paser-utara/done" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-red-600 hover:underline font-medium">
                  Portal SP4N-LAPOR! Dispusip PPU
                  <i data-lucide="external-link" class="w-4 h-4 ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Jam Layanan (Opsional) -->
        <div class="mt-8 pt-6 border-t border-gray-100">
          <p class="text-sm text-gray-500 flex items-center">
            <i data-lucide="clock" class="w-4 h-4 mr-2 text-gray-400"></i>
            Jam Pelayanan: Senin - Jumat (08.00 - 16.00 WITA)
          </p>
        </div>
      </div>

      <!-- Kolom Kanan: Google Maps -->
      <div class="bg-white p-2 rounded-2xl shadow-md border border-gray-100 overflow-hidden h-full min-h-[400px]">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7737641647927!2d116.7377538!3d-1.3111019000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df13edc85cffef9%3A0x6dee952e5d5b841b!2sDinas%20Perpustakaan%20Dan%20Arsip!5e0!3m2!1sen!2sid!4v1794163772188!5m2!1sen!2sid" 
          class="w-full h-full min-h-[400px] rounded-xl border-0" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="strict-origin-when-cross-origin">
        </iframe>
      </div>

    </div>

    <!-- Section Lower: Form Kirim Pesan -->
    <div class="bg-white p-6 sm:p-10 rounded-2xl shadow-md border border-gray-100">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-900 mb-2 text-center">Kirim Pesan</h2>
        <p class="text-gray-600 text-center mb-8">Punya pertanyaan atau saran? Silakan isi formulir di bawah ini.</p>

        <form action="#" method="POST" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Nama -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input type="text" id="name" name="name" required class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Masukkan nama Anda">
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
              <input type="email" id="email" name="email" required class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="nama@email.com">
            </div>
          </div>

          <!-- Subjek -->
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subjek / Perihal</label>
            <input type="text" id="subject" name="subject" required class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Topik pesan Anda">
          </div>

          <!-- Pesan -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
            <textarea id="message" name="message" rows="5" required class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Tuliskan pesan Anda di sini..."></textarea>
          </div>

          <!-- Tombol Kirim -->
          <div class="text-center">
            <button type="submit" class="px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition duration-200 inline-flex items-center justify-center">
              <i data-lucide="send" class="w-4 h-4 mr-2"></i>
              Kirim Pesan
            </button>
          </div>
        </form>
      </div>
    </div>

  </main>

  <!-- Inisialisasi Lucide Icons -->
  <script>
    lucide.createIcons();
  </script>
</body>
</html>
```