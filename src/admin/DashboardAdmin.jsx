import React, { useState, useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin';
import BackofficeHeader from '../backoffice/BackofficeHeader';
import BeritaPage from '../shared/BeritaPage';
import BannerPage from '../shared/BannerPage';
import DashboardOverview from '../shared/DashboardOverview';
import ProfilSaya from '../shared/ProfilSaya';
import BackofficeFooter from '../shared/BackofficeFooter';
import PetugasTable from './otorisasi/PetugasTable';
import { getLibraryStats } from '../lib/libraryStore';
import { menuToPath, pathToMenu } from '../lib/routes';

const PAGE_META = {
  dashboard: {
    eyebrow: 'Ringkasan sistem',
    title: 'Dashboard',
    description: 'Pantau data perpustakaan dan modul yang tersedia dari satu tempat.',
  },
  user: {
    eyebrow: 'Akses pengguna',
    title: 'Akun Petugas',
    description: 'Daftar akun petugas yang memiliki akses ke ruang kerja perpustakaan.',
  },
  berita: { eyebrow: 'Konten', title: 'Berita', description: 'Kelola berita yang tampil di portal publik.' },
  banner: { eyebrow: 'Konten', title: 'Banner', description: 'Banner yang tampil di beranda portal publik.' },
  profil: { eyebrow: 'Akun', title: 'Profil Saya', description: 'Informasi akun pengelola.' },
};

export default function DashboardAdmin({ onLogout, onBackToSite }) {
  const [activeMenu, setActiveMenu] = useState(() => {
    const m = pathToMenu(window.location.pathname, 'admin');
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
    const target = menuToPath(activeMenu);
    if (window.location.pathname !== target) {
      window.history.replaceState({}, '', target);
    }
  }, [activeMenu]);

  useEffect(() => {
    const onPop = () => {
      const m = pathToMenu(window.location.pathname, 'admin');
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
    if (activeMenu === 'berita') return <BeritaPage role="admin" />;
    if (activeMenu === 'banner') return <BannerPage />;
    if (activeMenu === 'profil') return <ProfilSaya role="admin" />;
    if (activeMenu === 'user') return <PetugasTable />;

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

      <SidebarAdmin
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={onLogout}
        onProfile={() => setActiveMenu('profil')}
      />

      <div className="bo-main">
        <BackofficeHeader role="ADMIN" onLogout={onLogout} onMenu={() => setSidebarOpen(true)} onProfile={() => setActiveMenu('profil')} />

        <main className="bo-content">
          {renderContent()}
        </main>

        <BackofficeFooter />
      </div>
    </div>
  );
}