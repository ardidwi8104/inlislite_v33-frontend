import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export default function BarcodeImage({
  value,
  height = 52,
  width = 1.6,
  displayValue = true,
  format = 'CODE128',
  fontSize = 12,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      JsBarcode(canvas, String(value || 'INLISLITE'), {
        format,
        width,
        height,
        displayValue,
        fontSize,
        textMargin: 2,
        margin: 0,
        lineColor: '#14245a',
        background: '#FFFFFF',
      });
    } catch (error) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#495057';
        ctx.font = '12px sans-serif';
        ctx.fillText('Barcode tidak dapat ditampilkan', 4, 18);
      }
    }
  }, [value, height, width, displayValue, format, fontSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
      aria-label={`Barcode ${value || ''}`}
    ></canvas>
  );
}
