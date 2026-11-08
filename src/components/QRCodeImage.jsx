import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function QRCodeImage({ value, size = 190, alt = 'QR Code', className = '' }) {
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setError(false);

    if (!value) {
      setDataUrl('');
      return () => {
        active = false;
      };
    }

    QRCode.toDataURL(String(value), {
      width: size,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#14245a', light: '#FFFFFF' },
    })
      .then((url) => {
        if (active) setDataUrl(url);
      })
      .catch(() => {
        if (active) {
          setError(true);
          setDataUrl('');
        }
      });

    return () => {
      active = false;
    };
  }, [value, size]);

  if (!value || error) {
    return (
      <div
        className={`d-flex align-items-center justify-content-center bg-light border rounded ${className}`}
        style={{ width: size, height: size, maxWidth: '100%', color: '#6c757d' }}
      >
        <i className="fa-solid fa-qrcode fa-2x"></i>
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div
        className={`d-flex align-items-center justify-content-center bg-light border rounded ${className}`}
        style={{ width: size, height: size, maxWidth: '100%', color: '#6c757d' }}
      >
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Memuat QR Code...</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={dataUrl}
      alt={alt}
      width={size}
      height={size}
      className={`rounded border bg-white p-1 ${className}`}
      style={{ width: size, height: size, maxWidth: '100%', objectFit: 'contain' }}
    />
  );
}
