import React, { useState } from 'react';
import LogoutConfirmPopup from '../shared/LogoutConfirmPopup';
import Modal from '../components/Modal';
import { useBackofficeAvatar } from '../backoffice/useBackofficeAvatar';

const MENU = [
  { key: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-display' },
  { key: 'berita', label: 'Berita', icon: 'fa-regular fa-newspaper' },
  { key: 'banner', label: 'Banner', icon: 'fa-regular fa-image' },
  { key: 'user', label: 'Akun Petugas', icon: 'fa-solid fa-user-tie' },
  { key: 'setelan', label: 'Setelan', icon: 'fa-solid fa-wrench', dropdown: true, children: ['Preferensi Sistem', 'Backup & Restore'] },
];

const CHILD_TO_MENU = {};

const CHILD_ICONS = {
  'Preferensi Sistem': 'fa-solid fa-sliders',
  'Backup & Restore': 'fa-solid fa-database',
};

export default function SidebarAdmin({ activeMenu, setActiveMenu, sidebarOpen, setSidebarOpen, onLogout, onProfile }) {
  const [avatar] = useBackofficeAvatar('admin');
  const [open, setOpen] = useState({ otorisasi: true });
  const [showLogout, setShowLogout] = useState(false);

  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }));
  const select = (key) => { setActiveMenu(key); setSidebarOpen(false); };

  return (
    <aside id="sidebar-admin" className={`bo-sidebar${sidebarOpen ? ' is-open' : ''}`} aria-label="Navigasi admin">
      <div className="bo-sidebar-brand">
        <img src="/logo/logo-inlislite-icon.png" alt="" />
        <div>
          <strong>INLISLite</strong>
          <span>Ruang kerja admin</span>
        </div>
        <button type="button" className="bo-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Tutup menu">
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div className="bo-sidebar-body">
        <nav aria-label="Menu admin">
          <div className="bo-nav">
            {MENU.map((item) => {
              const hasChildren = item.dropdown && item.children?.length;
              const isOpen = !!open[item.key];
              const isActive = activeMenu === item.key;
              if (!hasChildren) {
                return (
                  <button key={item.key} type="button" onClick={() => select(item.key)} className={`bo-nav-item${isActive ? ' is-active' : ''}`} aria-current={isActive ? 'page' : undefined}>
                    <i className={item.icon} aria-hidden="true"></i>
                    <span>{item.label}</span>
                  </button>
                );
              }
              return (
                <div key={item.key}>
                  <button type="button" onClick={() => toggle(item.key)} className={`bo-nav-item bo-nav-item--parent${isActive ? ' is-active' : ''}`} aria-expanded={isOpen}>
                    <i className={item.icon} aria-hidden="true"></i>
                    <span>{item.label}</span>
                    <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} bo-nav-chevron`} aria-hidden="true"></i>
                  </button>
                  {isOpen && (
                    <div className="bo-nav-children">
                      {item.children.map((child) => {
                        const childKey = CHILD_TO_MENU[child] || null;
                        const childActive = childKey && activeMenu === childKey;
                        return (
                          <button key={child} type="button" onClick={() => childKey ? select(childKey) : null} className={`bo-nav-child${childActive ? ' is-active' : ''}`} title={!childKey ? 'Belum tersedia' : undefined}>
                            <i className={CHILD_ICONS[child] || 'fa-solid fa-circle'} aria-hidden="true" style={{ width: '16px', textAlign: 'center', fontSize: '0.85rem' }}></i>
                            <span>{child}</span>
                            {!childKey ? <span className="bo-nav-soon">Segera</span> : null}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="bo-sidebar-user">
        <div className="bo-sidebar-profile">
          <span className="bo-sidebar-avatar" aria-hidden="true">
            {avatar ? (
              <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <i className="fa-solid fa-circle-user"></i>
            )}
          </span>
          <span className="bo-sidebar-profile-text">
            <strong>admin</strong>
            <span>Administrator</span>
          </span>
        </div>
        <button type="button" className="bo-sidebar-logout" onClick={() => setShowLogout(true)} title="Keluar dari akun">
          <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>
          <span className="visually-hidden">Keluar</span>
        </button>
      </div>

      <LogoutConfirmPopup
        show={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => onLogout && onLogout()}
      />
    </aside>
  );
}
