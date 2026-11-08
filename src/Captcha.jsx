import React, { useEffect, useRef, useState } from 'react';

// Kode CAPTCHA: 5 angka acak
export const generateCaptcha = () => {
  let code = '';
  for (let i = 0; i < 5; i += 1) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};

// Hook pengelola state CAPTCHA (kode, input, error, validasi)
export function useCaptcha() {
  const [code, setCode] = useState(() => generateCaptcha());
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const updateInput = (raw) => {
    setInput(String(raw).replace(/\D/g, '').slice(0, 5));
    setError(false);
  };

  const refresh = () => {
    setCode(generateCaptcha());
    setInput('');
    setError(false);
  };

  const validate = () => {
    const isValid = input.trim() === code;
    if (isValid) {
      setError(false);
      return true;
    }
    // Salah: tampilkan error, ganti kode, dan kosongkan input
    setCode(generateCaptcha());
    setInput('');
    setError(true);
    return false;
  };

  return { code, input, error, updateInput, refresh, validate };
}

// Gambar CAPTCHA (canvas)
export function CaptchaCanvas({ code, onRefresh }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !code) return;

    const width = 280;
    const height = 104;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Background
    const background = ctx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, '#EEF2F7');
    background.addColorStop(0.5, '#dee2e6');
    background.addColorStop(1, '#D8E0EA');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    // Noise dots
    for (let i = 0; i < 70; i += 1) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(15, 23, 42, ${0.1 + Math.random() * 0.28})`;
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.6 + 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Distortion lines behind the characters
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${30 + Math.random() * 60}, ${60 + Math.random() * 70}, ${120 + Math.random() * 70}, ${
        0.22 + Math.random() * 0.22
      })`;
      ctx.lineWidth = 0.8 + Math.random() * 1.3;
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height
      );
      ctx.stroke();
    }

    // Characters
    const colors = ['#14245a', '#1b3878', '#14245a', '#495057'];
    const step = width / (code.length + 1);
    code.split('').forEach((char, index) => {
      ctx.save();
      const x = step * (index + 1) + (Math.random() * 10 - 5);
      const y = height / 2 + 10 + (Math.random() * 10 - 5);
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.5);
      ctx.font = `italic 700 ${30 + Math.round(Math.random() * 7)}px Consolas, "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = colors[index % colors.length];
      ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });

    // Foreground distortion line
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.35)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.65);
    ctx.bezierCurveTo(width * 0.3, height * 0.2, width * 0.65, height * 0.95, width, height * 0.4);
    ctx.stroke();
  }, [code]);

  return (
    <canvas
      ref={canvasRef}
      onClick={onRefresh}
      role="img"
      aria-label="Gambar CAPTCHA berisi lima angka. Klik untuk memuat ulang kode."
      title="Klik untuk memuat ulang CAPTCHA"
      style={{ display: 'block', width: '100%', height: 'auto', cursor: 'pointer' }}
    ></canvas>
  );
}

// Blok CAPTCHA siap pakai: gambar + input + pesan error
export default function CaptchaField({
  id = 'captcha',
  code,
  value,
  onChange,
  onRefresh,
  error = false,
  accent = '#1b3878',
  label = 'Masukkan angka pada gambar',
  labelClassName = 'form-label fw-semibold small mb-1',
  inputClassName = 'form-control px-4',
  errorMessage = 'Kode CAPTCHA tidak sesuai. Silakan masukkan kembali kode pada gambar.',
  stacked = false,
}) {
  return (
    <div
      className="p-3 p-md-4 rounded-3"
      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
    >
      <div className={`row ${stacked ? 'g-3' : 'g-4 align-items-center'}`}>
        <div className={stacked ? 'col-12' : 'col-md-5 col-lg-4'}>
          <div
            className="rounded-3 overflow-hidden shadow-sm"
            style={{ border: '1px solid #CBD5E1', maxWidth: '300px', backgroundColor: '#E5E7EB' }}
          >
            <CaptchaCanvas code={code} onRefresh={onRefresh} />
          </div>
          <div
            className="d-flex align-items-center justify-content-between gap-2 mt-2"
            style={{ maxWidth: '300px' }}
          >
            <span style={{ color: '#495057', fontSize: '0.72rem' }}>Klik gambar untuk ganti kode.</span>
            <button
              type="button"
              className="btn btn-sm btn-link p-0 text-decoration-none d-inline-flex align-items-center gap-1"
              style={{ color: accent, fontSize: '0.75rem' }}
              onClick={onRefresh}
              title="Muat ulang CAPTCHA"
            >
              <i className="fa-solid fa-rotate-right" aria-hidden="true"></i>
              Muat ulang
            </button>
          </div>
        </div>
        <div className={stacked ? 'col-12' : 'col-md-7 col-lg-8'}>
          <label htmlFor={id} className={labelClassName} style={{ color: '#495057' }}>
            <span className="fw-bold" style={{ color: '#1b3878' }}>
              {label}
            </span>
            <span className="ms-1" style={{ color: '#EF4444' }}>
              *
            </span>
          </label>
          <input
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={5}
            className={`${inputClassName} ${error ? 'is-invalid' : ''}`}
            placeholder="Ketik angka CAPTCHA"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ maxWidth: '380px' }}
            required
          />
          {error && <div className="invalid-feedback d-block">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}
