import React, { useEffect } from 'react';

export default function Modal({
  show,
  onClose,
  title,
  subtitle,
  icon = 'fa-circle-info',
  accent = '#1b3878',
  children,
  footer,
  size = 'lg',
  bodyClassName = '',
  closeLabel = 'Tutup',
  scrollable = false,
  maxWidth,
}) {
  useEffect(() => {
    if (!show) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={onClose}
        style={{ zIndex: 1055 }}
      >
        <div
          className={`modal-dialog modal-dialog-centered ${scrollable ? 'modal-dialog-scrollable' : ''} ${size}`}
          onClick={(event) => event.stopPropagation()}
          style={maxWidth ? { maxWidth, width: 'auto' } : undefined}
        >
          <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '1rem', overflow: 'visible' }}>
            <div
              className="modal-header border-0 text-white py-3 px-4"
              style={{ background: `linear-gradient(135deg, ${accent} 0%, #14245a 100%)` }}
            >
              <div className="d-flex align-items-center gap-3">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{ width: '42px', height: '42px', backgroundColor: 'rgba(255,255,255,0.16)' }}
                >
                  <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
                </span>
                <div>
                  <h5 className="modal-title fw-bold mb-0">{title}</h5>
                  {subtitle && <div className="small opacity-75 mt-1">{subtitle}</div>}
                </div>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label={closeLabel}
                onClick={onClose}
              ></button>
            </div>
            <div className={`modal-body p-4 ${bodyClassName}`}>{children}</div>
            {footer && <div className="modal-footer border-0 px-4 pb-4 pt-0">{footer}</div>}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}></div>
    </>
  );
}

