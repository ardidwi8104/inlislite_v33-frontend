import React, { useState, useEffect } from 'react';
import { Controls, DataTableFooter } from './helpers';
import { KATALOG_SEED } from './data';
import Modal from '../../components/Modal';

const STORAGE_KEY = 'inlislite.koleksi.katalog.v1';

export default function DaftarKatalog() {
  const [data, setData] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return KATALOG_SEED;
  });

  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('RDA'); // RDA or AACR or EDIT
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [formValues, setFormValues] = useState({
    bibid: '',
    judul: '',
    edisi: '',
    publisher: '',
    deskripsi_fisik: '',
    no_panggil: '',
    eksemplar_count: 1,
    pedoman: 'RDA',
    opac: true,
  });
  const [katalogErrors, setKatalogErrors] = useState({});

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [search, entries]);

  // Filter katalog yang belum dikarantina
  const activeItems = data.filter((item) => !item.karantina);

  const filtered = activeItems.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (item.judul || '').toLowerCase().includes(q) ||
      (item.bibid || '').toLowerCase().includes(q) ||
      (item.publisher || '').toLowerCase().includes(q) ||
      (item.no_panggil || '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * entries;
  const paged = filtered.slice(startIdx, startIdx + entries);

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paged.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkKarantina = () => {
    if (selectedIds.length === 0) {
      alert('Pilih setidaknya satu data katalog.');
      return;
    }
    if (window.confirm(`Pindahkan ${selectedIds.length} katalog terpilih ke Karantina?`)) {
      setData((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id) ? { ...item, karantina: true } : item
        )
      );
      setSelectedIds([]);
    }
  };

  const handleBulkToggleOpac = () => {
    if (selectedIds.length === 0) {
      alert('Pilih setidaknya satu data katalog.');
      return;
    }
    setData((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id) ? { ...item, opac: !item.opac } : item
      )
    );
    setSelectedIds([]);
  };

  // Modal Create / Edit
  const openAddModal = (pedoman = 'RDA') => {
    setModalMode(pedoman);
    setEditingItem(null);
    setFormValues({
      bibid: `BIB-${new Date().getFullYear()}-${String(data.length + 1).padStart(4, '0')}`,
      judul: '',
      edisi: '',
      publisher: '',
      deskripsi_fisik: '',
      no_panggil: '',
      eksemplar_count: 1,
      pedoman,
      opac: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalMode('EDIT');
    setFormValues({ ...item });
    setModalOpen(true);
  };

  const handleSaveKatalog = (e) => {
    e.preventDefault();
    const next = {};
    if (!formValues.judul?.trim()) next.judul = 'Judul katalog wajib diisi.';
    if (!formValues.bibid?.trim()) next.bibid = 'BIBID wajib diisi.';
    if (!formValues.publisher?.trim()) next.publisher = 'Penerbit wajib diisi.';
    setKatalogErrors(next);
    if (Object.keys(next).length > 0) return;

    if (editingItem) {
      setData((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...item, ...formValues } : item))
      );
    } else {
      const newItem = {
        ...formValues,
        id: Date.now(),
        karantina: false,
      };
      setData((prev) => [newItem, ...prev]);
    }
    setModalOpen(false);
  };

  const handleSingleKarantina = (id) => {
    if (window.confirm('Pindahkan katalog ini ke Karantina?')) {
      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, karantina: true } : item))
      );
    }
  };

  return (
    <>
      <div className="berita-card-head">
        <h2 id="katalog-table-title">
          <i className="fa-solid fa-list-ul" aria-hidden="true"></i> TABEL DAFTAR KATALOG
        </h2>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button
            type="button"
            className="btn btn-warning btn-sm text-dark fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
            onClick={handleBulkKarantina}
            disabled={selectedIds.length === 0}
          >
            <i className="fa-solid fa-box-archive"></i> Pindahkan ke Karantina
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
            onClick={handleBulkToggleOpac}
            disabled={selectedIds.length === 0}
          >
            <i className="fa-solid fa-globe"></i> Tampilkan di OPAC
          </button>
          <button
            type="button"
            className="berita-btn-add"
            onClick={() => openAddModal('RDA')}
            title="Tambah Katalog Pedoman RDA"
          >
            <i className="fa-solid fa-plus" aria-hidden="true"></i> Tambah Katalog RDA
          </button>
          <button
            type="button"
            className="btn btn-sm text-white fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
            style={{ backgroundColor: '#0d6efd', borderRadius: '8px', padding: '0.45rem 0.95rem' }}
            onClick={() => openAddModal('AACR')}
            title="Tambah Katalog Pedoman AACR"
          >
            <i className="fa-solid fa-plus" aria-hidden="true"></i> Tambah Katalog AACR
          </button>
        </div>
      </div>

      <div className="bo-panel-body">
        <Controls entries={entries} setEntries={setEntries} search={search} setSearch={setSearch} />

        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-secondary">
              <tr>
                <th scope="col" className="text-center" style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={paged.length > 0 && selectedIds.length === paged.length}
                    onChange={handleSelectAll}
                    aria-label="Pilih semua baris"
                  />
                </th>
                <th scope="col" className="text-center" style={{ width: '50px' }}>No.</th>
                <th scope="col" style={{ width: '130px' }}>BIBID</th>
                <th scope="col">Judul</th>
                <th scope="col" style={{ width: '130px' }}>Edisi</th>
                <th scope="col" style={{ width: '180px' }}>Publisher</th>
                <th scope="col" style={{ width: '150px' }}>Deskripsi Fisik</th>
                <th scope="col" style={{ width: '110px' }}>No. Panggil</th>
                <th scope="col" className="text-center" style={{ width: '80px' }}>Eks</th>
                <th scope="col" className="text-center" style={{ width: '80px' }}>OPAC</th>
                <th scope="col" className="text-center" style={{ width: '90px' }}>Pedoman</th>
                <th scope="col" className="text-center" style={{ width: '110px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row, idx) => (
                <tr key={row.id}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      aria-label={`Pilih ${row.judul}`}
                    />
                  </td>
                  <td className="text-center fw-semibold">{startIdx + idx + 1}</td>
                  <td>
                    <span className="badge bg-light text-dark border font-monospace">{row.bibid}</span>
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{row.judul}</div>
                  </td>
                  <td className="small text-muted">{row.edisi || '-'}</td>
                  <td className="small">{row.publisher || '-'}</td>
                  <td className="small text-muted">{row.deskripsi_fisik || '-'}</td>
                  <td>
                    <span className="badge bg-secondary-subtle text-secondary border font-monospace">
                      {row.no_panggil || '-'}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge rounded-pill bg-info-subtle text-info-emphasis border">
                      {row.eksemplar_count || 0}
                    </span>
                  </td>
                  <td className="text-center">
                    {row.opac ? (
                      <span className="badge bg-success-subtle text-success border">
                        <i className="fa-solid fa-check me-1"></i>Tampil
                      </span>
                    ) : (
                      <span className="badge bg-secondary-subtle text-secondary border">
                        <i className="fa-solid fa-eye-slash me-1"></i>Sembunyi
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <span className={`badge ${row.pedoman === 'RDA' ? 'bg-primary' : 'bg-dark'}`}>
                      {row.pedoman || 'RDA'}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button
                        type="button"
                        className="berita-action berita-action--preview"
                        title="Detail Katalog"
                        onClick={() => setDetailItem(row)}
                      >
                        <i className="fa-solid fa-eye" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        className="berita-action berita-action--edit"
                        title="Edit Katalog"
                        onClick={() => openEditModal(row)}
                      >
                        <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        className="berita-action"
                        style={{ backgroundColor: '#ffc107', color: '#000' }}
                        title="Pindahkan ke Karantina"
                        onClick={() => handleSingleKarantina(row.id)}
                      >
                        <i className="fa-solid fa-box-archive" aria-hidden="true"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={12} className="text-center text-muted py-4">
                    {search ? `Tidak ada katalog yang cocok dengan "${search}".` : 'Belum ada data katalog.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <DataTableFooter
          startIdx={startIdx}
          entries={entries}
          total={filtered.length}
          page={safePage}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>

      {/* Modal Tambah/Edit Katalog */}
      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Katalog' : `Tambah Katalog Baru (${modalMode})`}
        icon="fa-solid fa-book"
        accent="#2563eb"
        size="lg"
        maxWidth="95vw"
        footer={
          <>
            <button type="button" className="btn btn-light border fw-semibold" onClick={() => setModalOpen(false)}>
              Batal
            </button>
            <button type="button" className="btn btn-primary fw-semibold" onClick={handleSaveKatalog}>
              <i className="fa-solid fa-save me-1"></i> Simpan Katalog
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveKatalog} className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold">BIBID <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control form-control-sm${katalogErrors.bibid ? ' is-invalid' : ''}`}
              value={formValues.bibid}
              onChange={(e) => setFormValues({ ...formValues, bibid: e.target.value })}
              required
            />
            {katalogErrors.bibid && <div className="invalid-feedback">{katalogErrors.bibid}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Pedoman Katalog</label>
            <select
              className="form-select form-select-sm"
              value={formValues.pedoman}
              onChange={(e) => setFormValues({ ...formValues, pedoman: e.target.value })}
            >
              <option value="RDA">RDA (Resource Description and Access)</option>
              <option value="AACR">AACR (Anglo-American Cataloguing Rules)</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Judul Utama <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control form-control-sm${katalogErrors.judul ? ' is-invalid' : ''}`}
              placeholder="Masukkan judul buku/koleksi"
              value={formValues.judul}
              onChange={(e) => setFormValues({ ...formValues, judul: e.target.value })}
              required
            />
            {katalogErrors.judul && <div className="invalid-feedback">{katalogErrors.judul}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Edisi / Cetakan</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Contoh: Edisi Revisi Cetakan Ke-1"
              value={formValues.edisi}
              onChange={(e) => setFormValues({ ...formValues, edisi: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Penerbit & Tempat Terbit <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control form-control-sm${katalogErrors.penerbit ? ' is-invalid' : ''}`}
              placeholder="Contoh: Bentang Pustaka (Yogyakarta)"
              value={formValues.publisher}
              onChange={(e) => setFormValues({ ...formValues, publisher: e.target.value })}
            />
            {katalogErrors.penerbit && <div className="invalid-feedback">{katalogErrors.penerbit}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Deskripsi Fisik</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Contoh: xii, 529 hlm. ; 20 cm"
              value={formValues.deskripsi_fisik}
              onChange={(e) => setFormValues({ ...formValues, deskripsi_fisik: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Nomor Panggil (Call Number)</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Contoh: 823 DAN l"
              value={formValues.no_panggil}
              onChange={(e) => setFormValues({ ...formValues, no_panggil: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Jumlah Eksemplar Awal</label>
            <input
              type="number"
              min="0"
              className="form-control form-control-sm"
              value={formValues.eksemplar_count}
              onChange={(e) => setFormValues({ ...formValues, eksemplar_count: Number(e.target.value) })}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center mt-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="opacSwitch"
                checked={formValues.opac}
                onChange={(e) => setFormValues({ ...formValues, opac: e.target.checked })}
              />
              <label className="form-check-label small fw-bold" htmlFor="opacSwitch">
                Tampilkan di OPAC Publik
              </label>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal Detail Katalog */}
      <Modal
        show={!!detailItem}
        onClose={() => setDetailItem(null)}
        title="Detail Katalog Koleksi"
        icon="fa-solid fa-circle-info"
        accent="#2563eb"
        size="md"
        footer={
          <button type="button" className="btn btn-light border fw-semibold" onClick={() => setDetailItem(null)}>
            Tutup
          </button>
        }
      >
        {detailItem && (
          <div className="table-responsive">
            <table className="table table-sm table-borderless mb-0">
              <tbody>
                <tr>
                  <td className="text-muted" style={{ width: '140px' }}>BIBID</td>
                  <td className="fw-bold font-monospace">{detailItem.bibid}</td>
                </tr>
                <tr>
                  <td className="text-muted">Judul</td>
                  <td className="fw-semibold text-primary">{detailItem.judul}</td>
                </tr>
                <tr>
                  <td className="text-muted">Edisi</td>
                  <td>{detailItem.edisi || '-'}</td>
                </tr>
                <tr>
                  <td className="text-muted">Penerbit</td>
                  <td>{detailItem.publisher || '-'}</td>
                </tr>
                <tr>
                  <td className="text-muted">Deskripsi Fisik</td>
                  <td>{detailItem.deskripsi_fisik || '-'}</td>
                </tr>
                <tr>
                  <td className="text-muted">No. Panggil</td>
                  <td><span className="badge bg-secondary-subtle text-secondary border">{detailItem.no_panggil || '-'}</span></td>
                </tr>
                <tr>
                  <td className="text-muted">Total Eksemplar</td>
                  <td><span className="badge bg-info-subtle text-info-emphasis border">{detailItem.eksemplar_count || 0} Copy</span></td>
                </tr>
                <tr>
                  <td className="text-muted">Pedoman Katalog</td>
                  <td><span className="badge bg-primary">{detailItem.pedoman || 'RDA'}</span></td>
                </tr>
                <tr>
                  <td className="text-muted">Status OPAC</td>
                  <td>
                    {detailItem.opac ? (
                      <span className="badge bg-success-subtle text-success border">Tampil di OPAC</span>
                    ) : (
                      <span className="badge bg-secondary-subtle text-secondary border">Sembunyi</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  );
}
