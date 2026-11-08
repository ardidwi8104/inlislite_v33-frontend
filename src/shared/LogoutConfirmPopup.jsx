import React from 'react';
import Modal from '../components/Modal';

export default function LogoutConfirmPopup({ show, onClose, onConfirm }) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Konfirmasi Keluar"
      icon="fa-right-from-bracket"
      accent="#842029"
      size="sm"
      footer={
        <>
          <button type="button" className="btn btn-light border fw-semibold" onClick={onClose}>Batal</button>
          <button
            type="button"
            className="btn text-white fw-semibold"
            style={{ backgroundColor: '#842029' }}
            onClick={() => { onClose && onClose(); onConfirm && onConfirm(); }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket me-1" aria-hidden="true"></i> Ya, Keluar
          </button>
        </>
      }
    >
      <div className="d-flex align-items-start gap-3">
        <span className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: 42, height: 42, backgroundColor: '#fdecea', color: '#842029' }}>
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        </span>
        <p className="mb-0" style={{ color: '#374151' }}>Anda yakin ingin keluar dari akun? Sesi Anda akan diakhiri.</p>
      </div>
    </Modal>
  );
}
