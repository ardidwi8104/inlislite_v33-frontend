import React, { useState, useEffect } from 'react';
import SidebarPetugas from './SidebarPetugas';
import BackofficeHeader from '../backoffice/BackofficeHeader';
import KeanggotaanValidation from '../backoffice/KeanggotaanValidation';
import BeritaPage from '../shared/BeritaPage';
import BannerPage from '../shared/BannerPage';
import PetugasBukuTamu from './bukutamu';
import BukuTamuDaftar from './bukutamu/BukuTamuDaftar';
import PetugasBacaDitempat from './bacaditempat';
import { getLibraryStats } from '../lib/libraryStore';
import { menuToPath, pathToMenu } from '../lib/routes';
import KeanggotaanPage from './keanggotaan';
import DashboardOverview from '../shared/DashboardOverview';
import ProfilSaya from '../shared/ProfilSaya';
import BackofficeFooter from '../shared/BackofficeFooter';
import SirkulasiPage from './sirkulasi';
import KoleksiPage from './koleksi';
import LaporanKatalog from '../shared/LaporanKatalog';
import LaporanEksemplar from '../shared/LaporanEksemplar';
import LaporanAnggota from '../shared/LaporanAnggota';
import LaporanSirkulasi from '../shared/LaporanSirkulasi';
import LaporanBukuTamu from '../shared/LaporanBukuTamu';
import LaporanBacaDitempat from '../shared/LaporanBacaDitempat';

const PAGE_META = {
  dashboard: {
    eyebrow: 'Ringkasan layanan',
    title: 'Dashboard',
    description: 'Data kunjungan, keanggotaan, dan antrean layanan hari ini.',
  },
  berita: { eyebrow: 'Konten', title: 'Berita', description: 'Kelola berita yang tampil di portal publik.' },
  banner: { eyebrow: 'Konten', title: 'Banner', description: 'Banner yang tampil di beranda portal publik.' },
  bukutamu: { eyebrow: 'Layanan harian', title: 'Buku Tamu', description: 'Daftar kunjungan anggota perpustakaan.' },
  'bukutamu-validasi': { eyebrow: 'Layanan harian', title: 'Validasi Buku Tamu', description: 'Validasi buku tamu.' },
  'bukutamu-daftar': { eyebrow: 'Layanan harian', title: 'Buku Tamu', description: 'Daftar buku tamu.' },
  bacatempat: { eyebrow: 'Layanan harian', title: 'Baca di Tempat', description: 'Daftar koleksi yang dibaca di ruang baca.' },
  'validasi-anggota': {
    eyebrow: 'Keanggotaan',
    title: 'Validasi & kartu anggota',
    description: 'Periksa pendaftaran baru dan terbitkan kartu anggota.',
  },
  'anggota-aktif': {
    eyebrow: 'Keanggotaan',
    title: 'Anggota aktif',
    description: 'Daftar anggota yang sudah diverifikasi.',
  },
  'entri-anggota': { eyebrow: 'Keanggotaan', title: 'Tambah Anggota', description: 'Entri anggota baru.' },
  'daftar-anggota': { eyebrow: 'Keanggotaan', title: 'Anggota', description: 'Daftar semua anggota.' },
  'perpanjangan-anggota': { eyebrow: 'Keanggotaan', title: 'Anggota', description: 'Perpanjangan semua anggota.' },
  'import-anggota': { eyebrow: 'Keanggotaan', title: 'Import Anggota', description: 'Import data anggota dari Excel.' },
  'keranjang-anggota': { eyebrow: 'Keanggotaan', title: 'Keranjang Anggota', description: 'Daftar semua keranjang anggota.' },
  profil: { eyebrow: 'Akun', title: 'Profil Saya', description: 'Informasi akun pengelola.' },
  'entri-peminjaman': { eyebrow: 'Sirkulasi', title: 'Entri Peminjaman', description: 'Entri peminjaman baru.' },
  'entri-perpanjangan': { eyebrow: 'Sirkulasi', title: 'Entri Perpanjangan', description: 'Entri perpanjangan.' },
  'entri-pengembalian': { eyebrow: 'Sirkulasi', title: 'Entri Pengembalian', description: 'Entri pengembalian.' },
  'peminjaman': { eyebrow: 'Sirkulasi', title: 'Peminjaman', description: 'Daftar peminjaman.' },
  'perpanjangan': { eyebrow: 'Sirkulasi', title: 'Perpanjangan', description: 'Daftar perpanjangan.' },
  'pengembalian': { eyebrow: 'Sirkulasi', title: 'Pengembalian', description: 'Daftar pengembalian.' },
  'pelanggaran': { eyebrow: 'Sirkulasi', title: 'Pelanggaran', description: 'Daftar pelanggaran.' },
  katalog: { eyebrow: 'Koleksi', title: 'Katalog', description: 'Daftar semua katalog perpustakaan.' },
  'karantina-katalog': { eyebrow: 'Koleksi', title: 'Karantina Katalog', description: 'Daftar katalog dalam karantina.' },
  'salin-katalog': { eyebrow: 'Koleksi', title: 'Salin Katalog', description: 'Impor katalog dari file MARC.' },
  eksemplar: { eyebrow: 'Koleksi', title: 'Eksemplar', description: 'Daftar semua eksemplar perpustakaan.' },
  'import-excel': { eyebrow: 'Koleksi', title: 'Import Excel', description: 'Import eksemplar dari file Excel.' },
  'karantina-eksemplar': { eyebrow: 'Koleksi', title: 'Karantina Eksemplar', description: 'Daftar eksemplar dalam karantina.' },
};

export default function DashboardPetugas({ onLogout, onBackToSite }) {
  const [activeMenu, setActiveMenu] = useState(() => {
    let role = 'petugas';
    try {
      const raw = window.localStorage.getItem('inlislite.backoffice-session');
      const s = raw ? JSON.parse(raw) : null;
      if (s && s.role) role = s.role;
    } catch (e) {}
    const m = pathToMenu(window.location.pathname, role);
    return m || 'dashboard';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(() => getLibraryStats());

  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const datePart = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      const timePart = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setTimeStr(`${datePart} Â· ${timePart} WIB`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setStats(getLibraryStats());
  }, [activeMenu]);

  useEffect(() => {
    const target = menuToPath(activeMenu);
    if (window.location.pathname !== target) {
      window.history.replaceState({}, '', target);
    }
  }, [activeMenu]);

  useEffect(() => {
    const syncStats = () => setStats(getLibraryStats());
    window.addEventListener('focus', syncStats);
    window.addEventListener('storage', syncStats);
    return () => {
      window.removeEventListener('focus', syncStats);
      window.removeEventListener('storage', syncStats);
    };
  }, []);

  useEffect(() => {
    const onPop = () => {
      let role = 'petugas';
      try {
        const raw = window.localStorage.getItem('inlislite.backoffice-session');
        const s = raw ? JSON.parse(raw) : null;
        if (s && s.role) role = s.role;
      } catch (e) {}
      const m = pathToMenu(window.location.pathname, role);
      if (m) setActiveMenu(m);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const meta = PAGE_META[activeMenu] || PAGE_META.dashboard;

  const renderContent = () => {
    if (activeMenu === 'berita') return <BeritaPage role="petugas" />;
    if (activeMenu === 'banner') return <BannerPage />;
    if (activeMenu === 'profil') return <ProfilSaya role="petugas" />;
    if (activeMenu === 'bukutamu' || activeMenu === 'bukutamu-validasi') return <PetugasBukuTamu />;
    if (activeMenu === 'bukutamu-daftar') return <BukuTamuDaftar />;
    if (activeMenu === 'bacatempat') return <PetugasBacaDitempat />;
    if (activeMenu === 'validasi-anggota') return <KeanggotaanValidation role="petugas" />;
    if (activeMenu === 'anggota-aktif') {
      return <KeanggotaanValidation key="anggota-aktif" role="petugas" initialStatus="active" />;
    }
    if (['entri-anggota','daftar-anggota','perpanjangan-anggota','import-anggota','keranjang-anggota'].includes(activeMenu)) return <KeanggotaanPage view={activeMenu} />;
    if (['entri-peminjaman','entri-perpanjangan','entri-pengembalian','peminjaman','perpanjangan','pengembalian','pelanggaran'].includes(activeMenu)) return <SirkulasiPage view={activeMenu} />;
    if (['katalog','karantina-katalog','salin-katalog','eksemplar','import-excel','karantina-eksemplar'].includes(activeMenu)) return <KoleksiPage view={activeMenu} />;
    if (activeMenu === 'laporan-katalog') return <LaporanKatalog />;
    if (activeMenu === 'laporan-eksemplar') return <LaporanEksemplar />;
    if (activeMenu === 'laporan-anggota') return <LaporanAnggota />;
    if (activeMenu === 'laporan-sirkulasi') return <LaporanSirkulasi />;
    if (activeMenu === 'laporan-buku-tamu') return <LaporanBukuTamu />;
    if (activeMenu === 'laporan-baca-ditempat') return <LaporanBacaDitempat />;
    return <DashboardOverview stats={stats} />;
  };

  return (
    <div className="backoffice">
      {sidebarOpen ? (
        <button
          type="button"
          className="bo-backdrop"
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <SidebarPetugas
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        stats={stats}
        onLogout={onLogout}
        onProfile={() => setActiveMenu('profil')}
      />

      <div className="bo-main">
        <BackofficeHeader role="PETUGAS" onLogout={onLogout} onMenu={() => setSidebarOpen(true)} onProfile={() => setActiveMenu('profil')} />

        <main className="bo-content">
          {renderContent()}
        </main>

        <BackofficeFooter />
      </div>
    </div>
  );
}
