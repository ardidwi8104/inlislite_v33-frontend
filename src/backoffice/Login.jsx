import React, { useEffect, useState } from 'react';
import CaptchaField, { useCaptcha } from '../Captcha';
import { listPetugasAccounts } from '../lib/libraryStore';

const ACCOUNTS = {
  admin: { password: 'admin123', role: 'admin', label: 'Admin' },
  'admin@inlislite.id': { password: 'admin123', role: 'admin', label: 'Admin' },
};

export default function Login({ onLogin, onBackToSite }) {
  const slides = [
    { src: '/foto/FB_IMG_1649089559306.jpg', title: 'INLISLite 3.3', text: 'Sistem Informasi Perpustakaan Terintegrasi untuk Perpustakaan Mitra.' },
    { src: '/foto/IMG-20250425-WA0019.jpg', title: 'Layanan Digital', text: 'Akses katalog, keanggotaan, dan sirkulasi dalam satu portal.' },
    { src: '/foto/WhatsApp-Image-2022-04-18-at-04.59.57-780x470.jpeg', title: 'Perpustakaan Mitra', text: 'Mitra Perpustakaan Nasional RI untuk layanan berkualitas.' },
  ];
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const captcha = useCaptcha();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!captcha.validate()) {
      return;
    }

    const key = username.trim().toLowerCase();
    let account = ACCOUNTS[key];

    // Cek juga akun petugas yang ditambahkan oleh admin (tersimpan di localStorage)
    if (!account) {
      const petugasAccounts = listPetugasAccounts();
      const found = petugasAccounts.find(
        (a) => String(a.username).toLowerCase() === key
      );
      if (found && password === found.password) {
        account = { password: found.password, role: 'petugas', label: 'Petugas' };
      }
    }

    const passwordMatches = Boolean(account) && password === account.password;

    if (!account || !passwordMatches) {
      alert('Username atau password salah.');
      captcha.refresh();
      return;
    }

    if (onLogin) onLogin(account.role, username.trim());
  };

  return (
    <div className="login-page">
      <div className="login-decor" aria-hidden="true">
        <span className="login-decor-circle login-decor-circle-1" />
        <span className="login-decor-circle login-decor-circle-2" />
      </div>

      <div className="login-split">
        <div className="login-split-left" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
          {slides.map((sl, i) => (
            <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === slide ? 1 : 0, transition: 'opacity .8s ease', backgroundImage: `url(${sl.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,30,70,.35) 0%, rgba(13,30,70,.75) 100%)' }} />
          <div className="login-left-content" style={{ position: 'relative', zIndex: 2, padding: '48px 44px'}}>
            <img src="/logo/Logo-Inlislite.png" alt="INLISLite" className="login-left-logo" style={{ filter: 'brightness(0) invert(1)' }} />
            <h1 className="login-left-title">{slides[slide].title}</h1>
            <p className="login-left-desc">{slides[slide].text}</p>
            <div className="d-flex gap-2 mt-3">
              {slides.map((_, i) => (
                <span key={i} onClick={() => setSlide(i)} style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: i === slide ? '#fff' : 'rgba(255,255,255,.4)', cursor: 'pointer' }} />
              ))}
            </div>
          </div>
        </div>

        <div className="login-split-right" style={{ background: "#1e40af" }}>
          <div className="login-card">
            <div className="login-logo">
              <img src="/logo/Logo-Inlislite.png" alt="INLISLite" />
            </div>

            <h2 className="login-title">Login INLISLite</h2>
            <p className="login-sub">Masuk ke dashboard backoffice</p>

            <div className="login-badge">
              <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
              <span>Secure Access</span>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="login-field">
                <label htmlFor="login-username">Username</label>
                <div className="login-input-wrap">
                  <i className="fa-solid fa-user" aria-hidden="true"></i>
                  <input
                    id="login-username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="login-password">Password</label>
                <div className="login-input-wrap">
                  <i className="fa-solid fa-lock" aria-hidden="true"></i>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <CaptchaField
                  id="login-captcha"
                  code={captcha.code}
                  value={captcha.input}
                  onChange={captcha.updateInput}
                  onRefresh={captcha.refresh}
                  error={captcha.error}
                  stacked
                  label="Masukkan 5 angka pada gambar"
                />
              </div>

              <button type="submit" className="login-submit">
                <i className="fa-solid fa-right-to-bracket" aria-hidden="true"></i>
                Masuk ke Sistem
              </button>
            </form>

            <div className="login-features">
              <div className="login-feature">
                <i className="fa-solid fa-shield" style={{ color: '#3AC47D' }} aria-hidden="true"></i>
                <span>Aman</span>
              </div>
              <div className="login-feature">
                <i className="fa-solid fa-clock" style={{ color: '#3F6AD8' }} aria-hidden="true"></i>
                <span>24/7</span>
              </div>
              <div className="login-feature">
                <i className="fa-solid fa-mobile-screen" style={{ color: '#74CAFE' }} aria-hidden="true"></i>
                <span>Responsive</span>
              </div>
            </div>
          </div>

          <p className="login-copyright" style={{ color: '#ffffff' }}>2026 Copyright &copy; Perpustakaan Nasional RI</p>
        </div>
      </div>
    </div>
  );
}


