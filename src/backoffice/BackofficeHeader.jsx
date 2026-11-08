import React, { useEffect, useState } from 'react';
import { useBackofficeAvatar } from './useBackofficeAvatar';

export default function BackofficeHeader({ role = 'ADMIN', onLogout, onMenu, onProfile }) {
  const [avatar] = useBackofficeAvatar(role);
  const [now, setNow] = useState(new Date());
  const [name, setName] = useState(() => {
    try {
      const raw = window.localStorage.getItem('inlislite.backoffice-session');
      const data = raw ? JSON.parse(raw) : null;
      return (data && data.username) || role.toLowerCase();
    } catch (e) {
      return role.toLowerCase();
    }
  });

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Makassar' });
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Makassar' });

  return (
    <header className="bo-topbar">
      <div className="bo-topbar-left">
        <button
          type="button"
          className="bo-menu-button"
          onClick={onMenu}
          aria-label="Buka menu navigasi"
        >
          <i className="fa-solid fa-bars" aria-hidden="true"></i>
          <span>Menu</span>
        </button>
        <div className="bo-topbar-title">
          <span style={{ fontSize: '1.15rem', fontWeight: 700 }}>Ruang kerja {role.toLowerCase()}</span>
        </div>
      </div>

      <div className="bo-topbar-right d-flex align-items-center gap-2 flex-wrap">
        <span className="bo-clock d-inline-flex align-items-center gap-2">
          <i className="fa-regular fa-calendar" aria-hidden="true"></i> {dateStr}
        </span>
        <span className="bo-clock d-inline-flex align-items-center gap-2">
          <i className="fa-regular fa-clock" aria-hidden="true"></i> {timeStr} WITA
        </span>
        <button
          type="button"
          className="bo-topbar-link d-inline-flex align-items-center gap-2"
          onClick={onProfile}
          title="Buka profil"
          style={{
            padding: '0.3rem 0.75rem',
            borderRadius: '999px',
            border: '1px solid var(--line-strong)',
            backgroundColor: 'var(--surface)',
            color: 'var(--ink)',
            cursor: 'pointer'
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt=""
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <span
              className="d-inline-flex align-items-center justify-content-center"
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: 'rgba(27,56,120,0.1)',
                color: 'var(--ink)',
                fontSize: '0.75rem'
              }}
            >
              <i className="fa-solid fa-user" aria-hidden="true"></i>
            </span>
          )}
          <span>{name}</span>
        </button>
      </div>
    </header>
  );
}
