import React from 'react';

export default function Profil() {
  return (
    <section className="py-4 py-lg-5" style={{ minHeight: '80vh' }}>
      <div className="container-fluid px-2 px-sm-3 px-md-4 px-lg-5">
        <div className="mb-4 mb-lg-5" style={{ maxWidth: '70ch' }}>
          <p
            className="text-uppercase fw-bold mb-2"
            style={{ color: '#0e7490', fontSize: '0.66rem', letterSpacing: '0.14em' }}
          >
            Profil
          </p>
          <h1
            className="mb-2"
            style={{ color: '#1b3878', fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', lineHeight: 1.06 }}
          >
            Profil instansi
          </h1>
          <p className="text-muted mb-0">
            Sejarah, visi misi, dan tata kelola Dinas Perpustakaan Kabupaten Penajam Paser Utara.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-6 col-md-12">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-header bg-white border-0 fw-bold" style={{ color: '#1b3878', fontSize: '1.2rem' }}>
                Sejarah Dinas Perpustakaan
              </div>
              <div className="card-body">
                <p className="text-muted">
                  Dinas Perpustakaan Kabupaten Penajam Paser Utara berdiri sebagai wujud komitmen pemerintah daerah dalam menyediakan layanan informasi dan literasi bagi masyarakat. Sejak didirikan, dinas ini terus berkembang untuk menjadi pilar penting dalam pengembangan kualitas sumber daya manusia melalui akses buku dan informasi yang berkualitas.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-header bg-white border-0 fw-bold" style={{ color: '#1b3878', fontSize: '1.2rem' }}>
                Visi &amp; Misi
              </div>
              <div className="card-body">
                <h6 className="fw-bold mb-2" style={{ color: '#1b3878' }}>Visi</h6>
                <p className="text-muted mb-3 small">Terwujudnya masyarakat yang cerdas, berkarakter, dan berwawasan melalui akses literasi yang merata dan berkelanjutan.</p>
                <h6 className="fw-bold mb-2" style={{ color: '#1b3878' }}>Misi</h6>
                <ul className="list-unstyled small text-muted">
                  <li className="mb-2">Meningkatkan minat baca dan literasi masyarakat.</li>
                  <li className="mb-2">Menyediakan koleksi buku yang beragam dan aktual.</li>
                  <li className="mb-2">Meningkatkan akses informasi melalui layanan perpustakaan digital.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-header bg-white border-0 fw-bold" style={{ color: '#1b3878', fontSize: '1.2rem' }}>
                Tugas Pokok dan Fungsi
              </div>
              <div className="card-body">
                <ul className="list-unstyled small text-muted">
                  <li className="mb-2">Penyelenggaraan layanan perpustakaan umum.</li>
                  <li className="mb-2">Pengembangan koleksi dan sumber belajar.</li>
                  <li className="mb-2">Pengelolaan kegiatan literasi dan pembinaan perpustakaan.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-header bg-white border-0 fw-bold" style={{ color: '#1b3878', fontSize: '1.2rem' }}>
                Struktur Organisasi
              </div>
              <div className="card-body">
                <p className="text-muted small">Struktur organisasi Dinas Perpustakaan terdiri dari Kepala Dinas, Sekretaris, dan beberapa bidang/bidang pengelolaan yang menjalankan fungsi-fungsi pelayanan perpustakaan.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-header bg-white border-0 fw-bold" style={{ color: '#1b3878', fontSize: '1.2rem' }}>
                Kepala Dinas &amp; Pegawai
              </div>
              <div className="card-body">
                <p className="text-muted small">Data kepala dinas dan pegawai Dinas Perpustakaan Kabupaten Penajam Paser Utara tersedia untuk informasi publik sesuai ketentuan yang berlaku.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-6 col-md-12">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-header bg-white border-0 fw-bold" style={{ color: '#1b3878', fontSize: '1.2rem' }}>
                Sarana dan Prasarana
              </div>
              <div className="card-body">
                <ul className="list-unstyled small text-muted">
                  <li className="mb-2">Ruang baca yang nyaman dengan pendingin ruangan.</li>
                  <li className="mb-2">Koleksi buku fisik dan digital.</li>
                  <li className="mb-2">Fasilitas Wi-Fi dan komputer untuk pencarian katalog.</li>
                  <li className="mb-2">Ruang diskusi dan kegiatan literasi.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
