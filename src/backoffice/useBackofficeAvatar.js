import React, { useState, useEffect } from 'react';

export function getAvatarStorageKey(role = 'admin') {
  return `inlislite.avatar.${role.toLowerCase()}`;
}

export function useBackofficeAvatar(role = 'admin') {
  const [avatar, setAvatar] = useState(() => {
    try {
      return window.localStorage.getItem(getAvatarStorageKey(role)) || null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const handleAvatarUpdate = (e) => {
      if (!e.detail || !e.detail.role || e.detail.role.toLowerCase() === role.toLowerCase()) {
        try {
          const updated = window.localStorage.getItem(getAvatarStorageKey(role)) || null;
          setAvatar(updated);
        } catch (err) {}
      }
    };

    window.addEventListener('inlislite:avatar-updated', handleAvatarUpdate);
    window.addEventListener('storage', handleAvatarUpdate);
    return () => {
      window.removeEventListener('inlislite:avatar-updated', handleAvatarUpdate);
      window.removeEventListener('storage', handleAvatarUpdate);
    };
  }, [role]);

  const updateAvatar = (newAvatarUrl) => {
    try {
      if (newAvatarUrl) {
        window.localStorage.setItem(getAvatarStorageKey(role), newAvatarUrl);
      } else {
        window.localStorage.removeItem(getAvatarStorageKey(role));
      }
      setAvatar(newAvatarUrl);
      window.dispatchEvent(new CustomEvent('inlislite:avatar-updated', { detail: { role, avatar: newAvatarUrl } }));
    } catch (e) {
      console.error('Failed to save avatar', e);
    }
  };

  return [avatar, updateAvatar];
}

