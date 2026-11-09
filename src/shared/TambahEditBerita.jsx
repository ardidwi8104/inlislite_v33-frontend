import React, { useState, useRef, useEffect } from 'react';
import Modal from '../components/Modal';

let blockIdCounter = 100;
const createNewBlock = (type = 'text', content = '', caption = '') => ({
  id: ++blockIdCounter,
  type,
  content,
  caption,
  isCollapsed: false,
});

function formatIndonesianDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
}

function TextBlockEditor({ blockId, initialContent, onInput }) {
  const editorRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(() => !String(initialContent || '').trim());
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent || '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockId]);
  const handleInput = () => {
    const el = editorRef.current;
    if (!el) return;
    setIsEmpty(!el.textContent.trim());
    onInput(el.innerHTML);
  };
  return (
    <div
      ref={editorRef}
      className="form-control rounded-3 p-3 shadow-none text-dark berita-editor"
      style={{ minHeight: '180px', maxHeight: '400px', overflowY: 'auto', border: '1px solid #CBD5E1', fontSize: '0.92rem', lineHeight: '1.6' }}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      data-placeholder="Mulai ketik isi berita di sini..."
      data-empty={isEmpty ? 'true' : 'false'}
      aria-label="Isi konten berita teks"
      onInput={handleInput}
    ></div>
  );
}

export default function TambahEditBerita({ show, editing, publisher, onClose, onSave }) {
  const todayIso = new Date().toISOString().slice(0, 10);
  const [formTanggal, setFormTanggal] = useState(todayIso);
  const [formJudul, setFormJudul] = useState('');
  const [formLokasi, setFormLokasi] = useState('Penajam');
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [blocks, setBlocks] = useState([createNewBlock('text', '')]);
  const [formGaleri, setFormGaleri] = useState([]);
  const fileInputRef = useRef(null);
  const galeriFileRef = useRef(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!show) return;
    if (editing) {
      setFormTanggal(editing.tanggal || todayIso);
      setFormJudul(editing.judul || '');
      setFormLokasi(editing.lokasi || 'Penajam');
      setThumbnailPreview(editing.thumbnail || null);
      setFormGaleri(editing.galeri ? [...editing.galeri] : []);
      if (editing.blocks && editing.blocks.length > 0) {
        setBlocks(editing.blocks.map((b) => ({ ...b, id: ++blockIdCounter })));
      } else {
        setBlocks([createNewBlock('text', editing.ket || '')]);
      }
    } else {
      setFormTanggal(todayIso);
      setFormJudul('');
      setFormLokasi('Penajam');
      setThumbnailPreview(null);
      setFormGaleri([]);
      setBlocks([createNewBlock('text', '')]);
    }
  }, [show, editing]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setThumbnailPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGaleriChange = (e) => {
    const files = [...(e.target.files || [])];
    if (!files.length) return;
    const room = Math.max(0, 10 - formGaleri.length);
    if (room === 0) { alert('Galeri maksimal 10 foto.'); e.target.value = ''; return; }
    if (files.length > room) alert(`Hanya ${room} foto lagi yang bisa ditambahkan (maksimal 10).`);
    files.slice(0, room).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setFormGaleri((prev) => [...prev, reader.result].slice(0, 10));
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };
  const removeGaleri = (index) => setFormGaleri((prev) => prev.filter((_, i) => i !== index));

  const addTextBlock = () => setBlocks((prev) => [...prev, createNewBlock('text', '')]);
  const addImageBlock = () => setBlocks((prev) => [...prev, createNewBlock('image', '')]);
  const removeBlock = (id) => {
    if (blocks.length <= 1) { alert('Minimal harus ada satu blok konten.'); return; }
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };
  const moveBlock = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    setBlocks((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };
  const updateBlockContent = (id, newContent) => setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, content: newContent } : b)));
  const updateBlockImage = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, content: reader.result } : b)));
    reader.readAsDataURL(file);
  };
  const toggleBlockCollapse = (id) => setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, isCollapsed: !b.isCollapsed } : b)));
  const executeCommand = (cmd, val = null) => { document.execCommand(cmd, false, val); };

  const handleSave = (e) => {
    e.preventDefault();
    const next = {};
    if (!thumbnailPreview) next.thumbnail = 'Thumbnail wajib diupload.';
    if (!formTanggal) next.tanggal = 'Tanggal wajib diisi.';
    if (!formJudul.trim()) next.judul = 'Judul wajib diisi.';
    if (!formLokasi) next.lokasi = 'Lokasi wajib dipilih.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    const firstTextBlock = blocks.find((b) => b.type === 'text' && b.content);
    let rawText = '';
    if (firstTextBlock) {
      const tmp = document.createElement('div');
      tmp.innerHTML = firstTextBlock.content;
      rawText = tmp.textContent || tmp.innerText || '';
    }
    const ketText = rawText ? rawText.slice(0, 120) + (rawText.length > 120 ? '...' : '') : 'Tidak ada ringkasan';

    const itemData = {
      id: editing ? editing.id : Date.now(),
      judul: formJudul,
      tanggal: formTanggal,
      lokasi: formLokasi,
      thumbnail: thumbnailPreview || (editing ? editing.thumbnail : '/berita/20260525_1779692444_56ff96b0e43c16323dd6.jpg'),
      blocks: blocks,
      galeri: formGaleri,
      ket: ketText,
      publisher: editing ? (editing.publisher || publisher) : publisher,
      createdAt: editing ? (editing.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: editing ? new Date().toISOString() : undefined,
      urutan: editing ? editing.urutan : 0,
      status: 'ACTIVE',
    };
    // remove undefined updatedAt for new items
    if (!editing) delete itemData.updatedAt;
    onSave(itemData, editing);
  };

  return (
    <Modal show={show} onClose={onClose} title={editing ? 'Edit Berita' : 'Tambah Berita'} icon="fa-regular fa-newspaper" accent="#1b3878" size="xl" scrollable maxWidth="95vw">
      <div className="py-2" style={{ maxWidth: '100%', margin: 0 }}>
        <form onSubmit={handleSave}>
          {/* Thumbnail */}
          <div className="mb-4">
            <label className="form-label fw-bold small text-dark mb-2">Thumbnail Berita <span className="text-danger">*</span></label>
            <div className="border rounded-4 p-4 text-center position-relative d-flex flex-column align-items-center justify-content-center" style={{ border: '2px dashed #CBD5E1', backgroundColor: '#FAFCFE', minHeight: '210px', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => fileInputRef.current?.click()}>
              <input ref={fileInputRef} type="file" accept="image/png, image/jpeg, image/jpg" className="d-none" onChange={handleThumbnailChange} />
              {thumbnailPreview ? (
                <div className="position-relative w-100 text-center">
                  <img src={thumbnailPreview} alt="Thumbnail Preview" className="rounded-3 shadow-sm" style={{ maxHeight: '180px', maxWidth: '100%', objectFit: 'cover' }} />
                  <div className="mt-2">
                    <button type="button" className="btn btn-sm btn-outline-danger px-3 py-1" onClick={(e) => { e.stopPropagation(); setThumbnailPreview(null); }}>
                      <i className="fa-solid fa-trash me-1"></i> Hapus Gambar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-2 text-secondary">
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 16l-4-4-4 4" /><path d="M12 12v9" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /><polyline points="16 16 12 12 8 16" />
                    </svg>
                  </div>
                  <div className="fw-semibold text-dark mb-1" style={{ fontSize: '0.95rem' }}>Klik untuk upload thumbnail</div>
                  <div className="text-muted small mb-3" style={{ fontSize: '0.8rem' }}>PNG, JPG hingga 10MB</div>
                  <button type="button" className="btn px-4 py-2 text-white fw-bold rounded-3 shadow-sm" style={{ backgroundColor: '#1b3878', fontSize: '0.85rem' }}>Pilih File</button>
                </>
              )}
            </div>
                <div className="text-muted mt-2" style={{ fontSize: '0.875rem' }}>Thumbnail akan ditampilkan sebagai gambar pertama di berita</div>
              {errors.thumbnail && <div className="invalid-feedback" style={{ display: 'block', textAlign: 'left', marginTop: '4px' }}>{errors.thumbnail}</div>}
          </div>

          {/* Tanggal */}
          <div className="mb-4">
            <label className="form-label fw-bold small text-dark mb-2">Tanggal Berita <span className="text-danger">*</span></label>
            <input
              type="date"
              className={`form-control rounded-3 py-2 px-3 fw-medium text-dark ${errors.tanggal ? 'is-invalid' : ''} shadow-none`}
              style={{ border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
              value={formTanggal}
              onChange={(e) => setFormTanggal(e.target.value)}
              required
            />
                <div className="text-muted mt-1" style={{ fontSize: '0.875rem' }}>Format: {formatIndonesianDate(formTanggal)}</div>
            {errors.tanggal && <div className="invalid-feedback" style={{ display: 'block', textAlign: 'left', marginTop: '4px' }}>{errors.tanggal}</div>}
          </div>

          {/* Judul */}
          <div className="mb-4">
            <label className="form-label fw-bold small text-dark mb-2">Judul Berita <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control rounded-3 py-2 px-3 text-dark ${errors.judul ? 'is-invalid' : ''} shadow-none`}
              style={{ border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
              placeholder="Masukkan judul berita"
              value={formJudul}
              onChange={(e) => setFormJudul(e.target.value)}
              required
            />
            {errors.judul && <div className="invalid-feedback" style={{ display: 'block', textAlign: 'left', marginTop: '4px' }}>{errors.judul}</div>}
          </div>

          {/* Lokasi */}
          <div className="mb-4">
            <label className="form-label fw-bold small text-dark mb-2">Lokasi/Kecamatan <span className="text-danger">*</span></label>
            <div className="d-flex align-items-center position-relative" style={{ width: '100%' }}>
              <div className="text-secondary pe-2 flex-shrink-0" style={{ pointerEvents: 'none', display: 'flex', alignItems: 'center', minWidth: '20px' }}>
                <i className="fa-solid fa-location-dot" style={{ color: '#6c757d', fontSize: '1rem' }}></i>
              </div>
              <select
                className={`form-select rounded-3 py-2 text-dark shadow-none flex-fill ps-4 ${errors.lokasi ? 'is-invalid' : ''}`}
                style={{ border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                value={formLokasi}
                onChange={(e) => setFormLokasi(e.target.value)}
                required
              >
                <option value="Penajam">Penajam</option>
                <option value="Waru">Waru</option>
                <option value="Babulu">Babulu</option>
                <option value="Sepaku">Sepaku</option>
                <option value="Mitra Perpustakaan">Mitra Perpustakaan</option>
              </select>
            </div>
            {errors.lokasi && <div className="invalid-feedback" style={{ display: 'block', textAlign: 'left', marginTop: '4px' }}>{errors.lokasi}</div>}
          </div>

          {/* Konten */}
          <div className="mb-4">
            <div className="d-flex flex-column flex-sm-row sm-align-items-center justify-content-between gap-2 mb-2">
              <div>
                <label className="form-label fw-bold small text-dark mb-0">Konten Berita <span className="text-danger">*</span></label>
                <div className="text-muted" style={{ fontSize: '0.875rem' }}>Susun konten dengan teks dan gambar. Ringkasan otomatis diambil dari teks pertama.</div>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <button type="button" onClick={addTextBlock} className="btn btn-sm px-3 py-1.5 rounded-3 fw-bold text-white d-flex align-items-center gap-1 shadow-sm" style={{ backgroundColor: '#1b3878', fontSize: '0.9rem' }}>
                  <span className="fw-bold fs-6">T</span> Teks
                </button>
                <button type="button" onClick={addImageBlock} className="btn btn-sm px-3 py-1.5 rounded-3 fw-bold text-white d-flex align-items-center gap-1 shadow-sm" style={{ backgroundColor: '#0e7490', border: 'none', fontSize: '0.9rem' }}>
                  <i className="fa-regular fa-image"></i> Gambar
                </button>
              </div>
            </div>
            <div className="d-flex flex-column gap-3 mt-3">
              {blocks.map((block, index) => {
                const textIndex = blocks.slice(0, index + 1).filter((b) => b.type === 'text').length;
                const imageIndex = blocks.slice(0, index + 1).filter((b) => b.type === 'image').length;
                return (
                  <div key={block.id} className="border rounded-4 bg-white shadow-sm overflow-hidden" style={{ borderColor: '#dee2e6' }}>
                    <div className="d-flex align-items-center justify-content-between px-3 py-2 bg-light border-bottom" style={{ fontSize: '0.85rem' }}>
                      <div className="d-flex align-items-center gap-2 fw-bold text-secondary">
                        {block.type === 'text' ? (<><i className="fa-regular fa-file-lines text-primary"></i><span>Blok Teks #{textIndex}</span></>) : (<><i className="fa-regular fa-image text-warning"></i><span>Blok Gambar #{imageIndex}</span></>)}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <button type="button" className="btn btn-sm text-secondary p-1 border-0" onClick={() => moveBlock(index, -1)} disabled={index === 0} title="Pindah ke atas"><i className="fa-solid fa-chevron-up" style={{ fontSize: '0.75rem' }}></i></button>
                        <button type="button" className="btn btn-sm text-secondary p-1 border-0" onClick={() => moveBlock(index, 1)} disabled={index === blocks.length - 1} title="Pindah ke bawah"><i className="fa-solid fa-chevron-down" style={{ fontSize: '0.75rem' }}></i></button>
                        <button type="button" className="btn btn-sm text-danger p-1 border-0 ms-1" onClick={() => removeBlock(block.id)} title="Hapus blok"><i className="fa-regular fa-trash-can" style={{ fontSize: '0.85rem' }}></i></button>
                      </div>
                    </div>
                    {!block.isCollapsed && (
                      <div className="p-3">
                        {block.type === 'text' ? (
                          <div>
                            <div className="d-flex flex-wrap align-items-center gap-1 p-2 rounded-3 mb-2 bg-white border" style={{ borderColor: '#dee2e6' }}>
                              <button type="button" className="btn btn-sm btn-light border-0 fw-bold px-2 py-1 text-secondary" title="Bold" onClick={() => executeCommand('bold')}>B</button>
                              <button type="button" className="btn btn-sm btn-light border-0 fst-italic px-2 py-1 text-secondary" title="Italic" onClick={() => executeCommand('italic')}>I</button>
                              <button type="button" className="btn btn-sm btn-light border-0 text-decoration-underline px-2 py-1 text-secondary" title="Underline" onClick={() => executeCommand('underline')}>U</button>
                              <div className="vr mx-1 my-auto" style={{ height: '18px' }}></div>
                              <button type="button" className="btn btn-sm btn-light border-0 small px-2 py-1 text-secondary fw-semibold" title="Heading 2" onClick={() => executeCommand('formatBlock', '<h2>')}>H2</button>
                              <button type="button" className="btn btn-sm btn-light border-0 small px-2 py-1 text-secondary fw-semibold" title="Heading 3" onClick={() => executeCommand('formatBlock', '<h3>')}>H3</button>
                              <button type="button" className="btn btn-sm btn-light border-0 small px-2 py-1 text-secondary fw-semibold" title="Paragraph" onClick={() => executeCommand('formatBlock', '<p>')}>P</button>
                              <div className="vr mx-1 my-auto" style={{ height: '18px' }}></div>
                              <button type="button" className="btn btn-sm btn-light border-0 px-2 py-1 text-secondary" title="Bullet List" onClick={() => executeCommand('insertUnorderedList')}><i className="fa-solid fa-list-ul"></i></button>
                              <button type="button" className="btn btn-sm btn-light border-0 px-2 py-1 text-secondary" title="Numbered List" onClick={() => executeCommand('insertOrderedList')}><i className="fa-solid fa-list-ol"></i></button>
                              <div className="vr mx-1 my-auto" style={{ height: '18px' }}></div>
                              <button type="button" className="btn btn-sm btn-light border-0 small px-2 py-1 text-secondary" title="Lowercase" onClick={() => { const sel = window.getSelection(); if (sel && sel.toString()) document.execCommand('insertText', false, sel.toString().toLowerCase()); }}>abc</button>
                              <button type="button" className="btn btn-sm btn-light border-0 small px-2 py-1 text-secondary fw-bold" title="Uppercase" onClick={() => { const sel = window.getSelection(); if (sel && sel.toString()) document.execCommand('insertText', false, sel.toString().toUpperCase()); }}>ABC</button>
                              <div className="vr mx-1 my-auto" style={{ height: '18px' }}></div>
                              <button type="button" className="btn btn-sm btn-light border-0 px-2 py-1 text-secondary" title="Align Left" onClick={() => executeCommand('justifyLeft')}><i className="fa-solid fa-align-left"></i></button>
                              <button type="button" className="btn btn-sm btn-light border-0 px-2 py-1 text-secondary" title="Align Center" onClick={() => executeCommand('justifyCenter')}><i className="fa-solid fa-align-center"></i></button>
                              <button type="button" className="btn btn-sm btn-light border-0 px-2 py-1 text-secondary" title="Align Right" onClick={() => executeCommand('justifyRight')}><i className="fa-solid fa-align-right"></i></button>
                              <button type="button" className="btn btn-sm btn-light border-0 px-2 py-1 text-secondary" title="Justify" onClick={() => executeCommand('justifyFull')}><i className="fa-solid fa-align-justify"></i></button>
                              <div className="vr mx-1 my-auto" style={{ height: '18px' }}></div>
                              <button type="button" className="btn btn-sm btn-light border-0 px-2 py-1 text-secondary" title="Insert Link" onClick={() => { const url = prompt('Masukkan URL tautan:'); if (url) executeCommand('createLink', url); }}><i className="fa-solid fa-link"></i></button>
                              <button type="button" className="btn btn-sm btn-light border-0 px-2 py-1 text-secondary" title="Text Color" onClick={() => { const color = prompt('Masukkan kode warna (contoh #1b3878 atau red):', '#1b3878'); if (color) executeCommand('foreColor', color); }}><i className="fa-solid fa-palette"></i></button>
                              <button type="button" className="btn btn-sm btn-light border-0 px-2 py-1 text-secondary" title="Clear Format" onClick={() => executeCommand('removeFormat')}><i className="fa-solid fa-eraser"></i></button>
                            </div>
                            <TextBlockEditor blockId={block.id} initialContent={block.content} onInput={(html) => updateBlockContent(block.id, html)} />
                            <div className="text-muted small mt-2" style={{ fontSize: '0.875rem' }}>Pilih teks dan gunakan toolbar untuk format langsung - hasilnya sama seperti di website publik</div>
                          </div>
                        ) : (
                          <div>
                            {block.content ? (
                              <div className="text-center position-relative">
                                <img src={block.content} alt="Konten Berita" className="rounded-3 shadow-sm mb-2" style={{ maxHeight: '280px', maxWidth: '100%', objectFit: 'contain' }} />
                                <div className="d-flex justify-content-center gap-2">
                                  <label className="btn btn-sm btn-outline-primary px-3"><i className="fa-solid fa-arrow-rotate-right me-1"></i> Ganti Gambar<input type="file" accept="image/*" hidden onChange={(e) => updateBlockImage(block.id, e.target.files?.[0])} /></label>
                                  <button type="button" className="btn btn-sm btn-outline-danger px-3" onClick={() => updateBlockContent(block.id, '')}><i className="fa-solid fa-trash me-1"></i> Hapus</button>
                                </div>
                              </div>
                            ) : (
                              <div className="border rounded-3 p-4 text-center bg-light" style={{ borderStyle: 'dashed', borderColor: '#CBD5E1' }}>
                                <i className="fa-regular fa-image text-muted mb-2" style={{ fontSize: '2.4rem' }}></i>
                                <div className="fw-semibold text-secondary small mb-2">Upload Gambar untuk Sisipan Konten</div>
                                <label className="btn btn-sm btn-outline-primary rounded-3 px-3 py-1.5 fw-semibold"><i className="fa-solid fa-upload me-1"></i> Pilih Gambar<input type="file" accept="image/*" hidden onChange={(e) => updateBlockImage(block.id, e.target.files?.[0])} /></label>
                              </div>
                            )}
                            <div className="mt-3">
                              <label className="form-label small fw-semibold text-secondary mb-1">Keterangan / Caption Gambar (Opsional)</label>
                              <input type="text" className="form-control form-control-sm rounded-2 shadow-none" placeholder="Contoh: Suasana pembukaan acara di aula..." value={block.caption || ''} onChange={(e) => setBlocks((prev) => prev.map((b) => (b.id === block.id ? { ...b, caption: e.target.value } : b)))} />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. GALERI BERITA (maksimal 10 foto) */}
          <div className="mb-4">
            <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
              <label className="form-label fw-bold small text-dark mb-0">
                Galeri <span className="text-muted fw-normal">(foto tampil di halaman Galeri publik)</span>
              </label>
              <span className="small text-muted">{formGaleri.length}/10 foto</span>
            </div>
            <input ref={galeriFileRef} type="file" accept="image/*" multiple className="d-none" onChange={handleGaleriChange} />
            {formGaleri.length === 0 ? (
              <div className="border rounded-3 p-4 text-center bg-light" style={{ borderStyle: 'dashed', borderColor: '#CBD5E1', cursor: 'pointer' }} onClick={() => galeriFileRef.current?.click()}>
                <i className="fa-regular fa-images text-muted mb-2" style={{ fontSize: '2rem' }}></i>
                <div className="fw-semibold text-secondary small mb-1">Klik untuk tambah foto galeri</div>
                <div className="text-muted small">JPG, PNG, GIF â€” maksimal 10 foto.</div>
              </div>
            ) : (
              <div className="row g-2">
                {formGaleri.map((src, i) => (
                  <div key={i} className="col-4 col-sm-3 position-relative">
                    <img src={src} alt={`Foto galeri ${i + 1}`} className="w-100 rounded-3 border" style={{ height: '96px', objectFit: 'cover' }} />
                    <button type="button" className="btn btn-sm btn-danger rounded-circle position-absolute top-0 end-0 p-0 d-inline-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', transform: 'translate(6px, -6px)' }} onClick={() => removeGaleri(i)} aria-label={`Hapus foto galeri ${i + 1}`}>
                      <i className="fa-solid fa-xmark" style={{ fontSize: '0.875rem' }}></i>
                    </button>
                  </div>
                ))}
                {formGaleri.length < 10 && (
                  <div className="col-4 col-sm-3">
                    <button type="button" className="w-100 border rounded-3 d-flex flex-column align-items-center justify-content-center gap-1 text-secondary bg-light" style={{ height: '96px', borderStyle: 'dashed', borderColor: '#CBD5E1' }} onClick={() => galeriFileRef.current?.click()}>
                      <i className="fa-solid fa-plus"></i>
                      <span className="small fw-semibold">Tambah foto</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tombol aksi */}
          <div className="d-flex gap-3 pt-3 border-top mt-4">
            <button type="button" className="btn flex-fill py-2.5 fw-bold rounded-3 text-secondary" style={{ backgroundColor: '#dee2e6', border: 'none', fontSize: '0.95rem' }} onClick={onClose}>Batal</button>
            <button type="submit" className="btn flex-fill py-2.5 fw-bold text-white rounded-3 shadow-sm" style={{ backgroundColor: '#1b3878', border: 'none', fontSize: '0.95rem' }}>Simpan Berita</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

