import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import Profil from './Profil';
import Layanan from './Layanan';
import BeritaPage from './Berita';
import Kontak from './Kontak';
import Opac from './Opac';
import KeanggotaanMandiri from './KeanggotaanMandiri';
import BukuTamu from './BukuTamu';
import Galeri from './Galeri';
import Statistik from './Statistik';
import StatistikPengunjung from './StatistikPengunjung';
import StatistikPeminjaman from './StatistikPeminjaman';
import StatistikAnggota from './StatistikAnggota';
import PeminjamanPengembalian from './PeminjamanPengembalian';
import LayananReferensi from './LayananReferensi';
import LayananPenelusuran from './LayananPenelusuran';
import LayananAnakPemuda from './LayananAnakPemuda';
import LayananDigital from './LayananDigital';
import JamOperasional from './JamOperasional';
import DetailBerita from './DetailBerita';
import Login from './backoffice/Login';
import DashboardAdmin from './admin/DashboardAdmin';
import DashboardPetugas from './petugas/DashboardPetugas';
import { isBackofficePath, pathToMenu } from './lib/routes';

const pages = {
  home: (setPage) => <Home onPageChange={setPage} />,
  profil: () => <Profil />,
  layanan: (setPage) => <Layanan onPageChange={setPage} />,
  opac: (setPage) => <Opac onPageChange={setPage} />,
  berita: (setPage) => <BeritaPage onPageChange={setPage} />,
  kontak: (setPage) => <Kontak onPageChange={setPage} />,
  keanggotaanmandiri: () => <KeanggotaanMandiri />,
  'keanggotaan-mandiri': () => <KeanggotaanMandiri />,
  bukutamu: () => <BukuTamu />,
  'buku-tamu': () => <BukuTamu />,
  galeri: (setPage) => <Galeri onPageChange={setPage} />,
  statistik: (setPage) => <Statistik onPageChange={setPage} />,
  'statistik-pengunjung': (setPage) => <StatistikPengunjung onPageChange={setPage} />,
  'statistik-peminjaman': (setPage) => <StatistikPeminjaman onPageChange={setPage} />,
  'statistik-anggota': (setPage) => <StatistikAnggota onPageChange={setPage} />,
  'peminjaman-pengembalian': (setPage) => <PeminjamanPengembalian onPageChange={setPage} />,
  'layanan-referensi': (setPage) => <LayananReferensi onPageChange={setPage} />,
  'layanan-penelusuran': (setPage) => <LayananPenelusuran onPageChange={setPage} />,
  'layanan-anak-pemuda': (setPage) => <LayananAnakPemuda onPageChange={setPage} />,
  'layanan-digital': (setPage) => <LayananDigital onPageChange={setPage} />,
  'jam-operasional': (setPage) => <JamOperasional onPageChange={setPage} />,
};

const SESSION_KEY = 'inlislite.backoffice-session';

function readSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && (data.role === 'admin' || data.role === 'petugas')) {
      return data;
    }
  } catch (error) {
    // sesi rusak/tidak bisa dibaca: anggap belum login
  }
  return null;
}

function writeSession(role, username) {
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify({ role, username: username || role, loginAt: Date.now() }));
  } catch (error) {
    // localStorage diblokir: login tetap jalan, hanya sesi tidak tersimpan
  }
}

function clearSession() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    // abaikan
  }
}

function checkIsBackoffice() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return isBackofficePath(path) || hash.includes('login-backoffice') || hash.includes('dashboard');
}

// Dashboard hanya boleh dibuka jika ada sesi tersimpan;
// kalau tidak ada, kembalikan ke halaman login.
function resolveBackofficePage() {
  const session = readSession();
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  // /login-backoffice/shared/* atau path backoffice dengan #dashboard → dashboard jika ada sesi
  if (hash.includes('dashboard') || path.includes('/shared/')) {
    return session ? 'backoffice' : 'login';
  }
  // /login-backoffice (tanpa sub-path) → selalu halaman login
  if (path === '/login-backoffice' || path === '/login-backoffice/') {
    return 'login';
  }
  // path backoffice lainnya (petugas/..., admin/...) → dashboard jika ada sesi
  if (path.startsWith('/petugas') || path.startsWith('/admin')) {
    return session ? 'backoffice' : 'login';
  }
  if (hash.includes('login-backoffice')) {
    return session ? 'backoffice' : 'login';
  }
  return 'login';
}

function getPageFromHash() {
  if (checkIsBackoffice()) {
    return resolveBackofficePage();
  }
  const rawHash = window.location.hash.replace('#', '').toLowerCase();
  if (!rawHash) return 'home';

  // Deteksi rute detail berita misal #berita/judul-berita atau #berita-judul-berita
  if (rawHash.startsWith('berita/')) {
    return rawHash; // contoh: 'berita/sosialisasi-inlislite-3-3'
  }

  const hash = rawHash;
  if (hash === 'keanggotaan-mandiri') return 'keanggotaanmandiri';
  if (hash === 'buku-tamu') return 'bukutamu';
  if (hash === 'statistik-pengunjung') return 'statistik-pengunjung';
  if (hash === 'statistik-peminjaman') return 'statistik-peminjaman';
  if (hash === 'statistik-anggota') return 'statistik-anggota';
  if (hash === 'peminjaman-pengembalian') return 'peminjaman-pengembalian';
  if (hash === 'layanan-referensi') return 'layanan-referensi';
  if (hash === 'layanan-penelusuran') return 'layanan-penelusuran';
  if (hash === 'layanan-anak-pemuda') return 'layanan-anak-pemuda';
  if (hash === 'layanan-digital') return 'layanan-digital';
  if (hash === 'jam-operasional') return 'jam-operasional';
  if (hash === 'galeri') return 'galeri';
  if (pages[hash]) return hash;
  return 'home';
}

export default function App() {
  const [page, setPage] = useState(() => getPageFromHash());
  const [userRole, setUserRole] = useState(() => {
    const session = readSession();
    return session ? session.role : 'petugas'; // 'petugas' or 'admin'
  });
  const topbarRef = useRef(null);

  // Simpan tinggi header + navbar (yang sticky) sebagai CSS variable
  // supaya tinggi maksimum menu mobile bisa dihitung pas di bawahnya.
  useEffect(() => {
    const el = topbarRef.current;
    if (!el) return undefined;

    const syncTopbarHeight = () => {
      document.documentElement.style.setProperty('--site-topbar-h', `${Math.round(el.offsetHeight)}px`);
    };

    syncTopbarHeight();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncTopbarHeight) : null;
    if (observer) observer.observe(el);
    window.addEventListener('resize', syncTopbarHeight);
    window.addEventListener('orientationchange', syncTopbarHeight);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', syncTopbarHeight);
      window.removeEventListener('orientationchange', syncTopbarHeight);
    };
  }, [page]);

  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsBackoffice()) {
        setPage(resolveBackofficePage());
      } else {
        const hashPage = getPageFromHash();
        setPage(hashPage);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const changePage = (newPage) => {
    setPage(newPage);
    if (newPage === 'login' || newPage === 'backoffice' || newPage === 'admin' || newPage === 'petugas') {
      return;
    }
    if (newPage === 'keanggotaanmandiri') {
      window.history.pushState({}, '', '#keanggotaan-mandiri');
      return;
    }
    if (newPage === 'bukutamu') {
      window.history.pushState({}, '', '#buku-tamu');
      return;
    }
    if (newPage === 'home') {
      window.history.pushState({}, '', '#home');
      return;
    }
    window.history.pushState({}, '', `#${newPage}`);
  };

  const handleBackToSite = () => {
    if (checkIsBackoffice()) {
      window.history.pushState({}, '', '/');
    }
    changePage('home');
  };

  const handleLogout = () => {
    clearSession();
    window.history.pushState({}, '', '/login-backoffice');
    setPage('login');
  };

  // Backoffice Views (Login & Dashboard)
  if (page === 'login') {
    return (
      <Login 
        onLogin={(role) => {
          setUserRole(role);
          writeSession(role);
          const target = role === 'admin' ? 'admin' : 'petugas';
          setPage(target);
          window.history.replaceState({}, '', '/login-backoffice/shared/dashboard');
        }}
        onBackToSite={handleBackToSite}
      />
    );
  }

  if (page === 'admin' || (page === 'backoffice' && userRole === 'admin')) {
    return (
      <DashboardAdmin
        onLogout={handleLogout}
        onBackToSite={handleBackToSite}
      />
    );
  }
  if (page === 'petugas' || (page === 'backoffice' && userRole !== 'admin')) {
    return (
      <DashboardPetugas
        onLogout={handleLogout}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // Front Office Portal View
  let currentPage;
  if (page.startsWith('berita/')) {
    const slug = page.replace('berita/', '');
    currentPage = <DetailBerita slug={slug} onPageChange={changePage} />;
  } else if (pages[page]) {
    currentPage = pages[page](changePage);
  } else {
    currentPage = pages.home(changePage);
  }

  return (
    <div className="site-public d-flex flex-column min-vh-100">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById('main-content');
          if (main) {
            main.focus();
            main.scrollIntoView();
          }
        }}
      >
        Langsung ke konten
      </a>
      <div className="site-topbar" ref={topbarRef}>
        <Header />
        <Navbar onPageChange={changePage} currentPage={page} />
      </div>
      <main id="main-content" className="flex-fill w-100 overflow-x-hidden" tabIndex={-1}>
        {currentPage}
      </main>
      <Footer />
    </div>
  );
}
