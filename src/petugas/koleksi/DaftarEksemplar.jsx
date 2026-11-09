import React, { useState, useEffect } from 'react';
import { Controls, DataTableFooter } from './helpers';
import { EKSEMPLAR_SEED } from './data';
import Modal from '../../components/Modal';

const STORAGE_KEY = 'inlislite.koleksi.eksemplar.v1';

export default function DaftarEksemplar() {
  const [data, setData] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return EKSEMPLAR_SEED;
  });

  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [formValues, setFormValues] = useState({
    no_barcode: '',
    tgl_pengadaan: '',
    no_induk: '',
    data_bib: '',
    drm: 'Bebas',
    karantina: 'Tidak',
    opac: 'Tampil',
    status: 'Tersedia',
    lokasi: '',
  });
  const [eksemplarErrors, setEksemplarErrors] = useState({});

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [search, entries]);

  // Filter eksemplar yang tidak dikarantina
  const activeItems = data.filter((item) => !item.karantina_flag);

  const filtered = activeItems.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (item.no_barcode || '').toLowerCase().includes(q) ||
      (item.no_induk || '').toLowerCase().includes(q) ||
      (item.data_bib || '').toLowerCase().includes(q) ||
      (item.lokasi || '').toLowerCase().includes(q) ||
      (item.status || '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * entries;
  const paged = filtered.slice(startIdx, startIdx + entries);

  // Checkbox Selection
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
  const handleApplyBulkAction = () => {
    if (selectedIds.length === 0) {
      alert('Pilih setidaknya satu data eksemplar.');
      return;
    }
    if (!bulkAction) {
      alert('Pilih aksi yang ingin dijalankan.');
      return;
    }

    if (bulkAction === 'karantina') {
      if (window.confirm(`Pindahkan ${selectedIds.length} eksemplar ke Karantina?`)) {
        setData((prev) =>
          prev.map((item) =>
            selectedIds.includes(item.id)
              ? { ...item, karantina: 'Ya', karantina_flag: true, opac: 'Sembunyi' }
              : item
          )
        );
        setSelectedIds([]);
      }
    } else if (bulkAction === 'opac_tampil') {
      setData((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id) ? { ...item, opac: 'Tampil' } : item
        )
      );
      setSelectedIds([]);
    } else if (bulkAction === 'opac_sembunyi') {
      setData((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id) ? { ...item, opac: 'Sembunyi' } : item
        )
      );
      setSelectedIds([]);
    }
  };

  // Modal Handlers
  const openAddModal = () => {
    setEditingItem(null);
    const dateToday = new Date().toISOString().split('T')[0];
    setFormValues({
      no_barcode: `BC-${Date.now().toString().slice(-8)}`,
      tgl_pengadaan: dateToday,
      no_induk: `IND-${new Date().getFullYear()}-${String(data.length + 1).padStart(3, '0')}`,
      data_bib: '',
      drm: 'Bebas',
      karantina: 'Tidak',
      opac: 'Tampil',
      status: 'Tersedia',
      lokasi: 'Perpustakaan Utama - Rak 01',
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormValues({ ...item });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const next = {};
    if (!formValues.no_barcode?.trim()) next.no_barcode = 'Nomor Barcode wajib diisi.';
    if (!formValues.data_bib?.trim()) next.data_bib = 'Data Bibliografis wajib diisi.';
    if (!formValues.no_induk?.trim()) next.no_induk = 'Nomor Induk wajib diisi.';
    setEksemplarErrors(next);
    if (Object.keys(next).length > 0) return;

    if (editingItem) {
      setData((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...item, ...formValues } : item))
      );
    } else {
      const newItem = {
        ...formValues,
        id: Date.now(),
        karantina_flag: false,
      };
      setData((prev) => [newItem, ...prev]);
    }
    setModalOpen(false);
  };

  const handleSingleKarantina = (id) => {
    if (window.confirm('Pindahkan eksemplar ini ke Karantina?')) {
      setData((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, karantina: 'Ya', karantina_flag: true, opac: 'Sembunyi' }
            : item
        )
      );
    }
  };

  return (
    <>
      <div className="berita-card-head">
        <h2 id="eksemplar-table-title">
          <i className="fa-solid fa-list-ul" aria-hidden="true"></i> TABEL DAFTAR EKSEMPLAR
        </h2>
        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Bulk Action Selector */}
          <div className="input-group input-group-sm" style={{ width: 'auto' }}>
            <select
              className="form-select"
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              aria-label="Pilih Aksi Massal"
            >
              <option value="">-- Pilih Aksi --</option>
              <option value="karantina">Karantinakan Terpilih</option>
              <option value="opac_tampil">Tampilkan di OPAC</option>
              <option value="opac_sembunyi">Sembunyikan dari OPAC</option>
            </select>
            <button
              type="button"
              className="btn btn-primary fw-semibold"
              onClick={handleApplyBulkAction}
              disabled={selectedIds.length === 0}
            >
              <i className="fa-solid fa-check me-1"></i> Proses
            </button>
          </div>

          <button type="button" className="berita-btn-add ms-2" onClick={openAddModal}>
            <i className="fa-solid fa-plus" aria-hidden="true"></i> Tambah Eksemplar
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
                <th scope="col" style={{ width: '140px' }}>No. Barcode</th>
                <th scope="col" style={{ width: '110px' }}>Tgl Pengadaan</th>
                <th scope="col" style={{ width: '130px' }}>No. Induk</th>
                <th scope="col">Data Bibliografis</th>
                <th scope="col" className="text-center" style={{ width: '80px' }}>DRM</th>
                <th scope="col" className="text-center" style={{ width: '90px' }}>Karantina</th>
                <th scope="col" className="text-center" style={{ width: '85px' }}>OPAC</th>
                <th scope="col" style={{ width: '110px' }}>Status</th>
                <th scope="col" style={{ width: '160px' }}>Lokasi</th>
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
                      aria-label={`Pilih ${row.no_barcode}`}
                    />
                  </td>
                  <td className="text-center fw-semibold">{startIdx + idx + 1}</td>
                  <td>
                    <span className="badge bg-light text-primary border font-monospace">
                      {row.no_barcode}
                    </span>
                  </td>
                  <td className="small text-muted">{row.tgl_pengadaan}</td>
                  <td>
                    <span className="badge bg-light text-dark border font-monospace">{row.no_induk}</span>
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{row.data_bib}</div>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-info-subtle text-info border">{row.drm || 'Bebas'}</span>
                  </td>
                  <td className="text-center">
                    <span className={`badge ${row.karantina === 'Ya' ? 'bg-danger' : 'bg-success-subtle text-success border'}`}>
                      {row.karantina}
                    </span>
                  </td>
                  <td className="text-center">
                    {row.opac === 'Tampil' ? (
                      <span className="badge bg-success-subtle text-success border">
                        <i className="fa-solid fa-check me-1"></i>Tampil
                      </span>
                    ) : (
                      <span className="badge bg-secondary-subtle text-secondary border">
                        <i className="fa-solid fa-eye-slash me-1"></i>Sembunyi
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        row.status === 'Tersedia'
                          ? 'bg-success'
                          : row.status === 'Dipinjami'
                          ? 'bg-warning text-dark'
                          : 'bg-secondary'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="small text-muted">{row.lokasi}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button
                        type="button"
                        className="berita-action berita-action--preview"
                        title="Detail Eksemplar"
                        onClick={() => setDetailItem(row)}
                      >
                        <i className="fa-solid fa-eye" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        className="berita-action berita-action--edit"
                        title="Edit Eksemplar"
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
                    {search ? `Tidak ada data eksemplar yang cocok dengan "${search}".` : 'Belum ada data eksemplar.'}
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

      {/* Modal Tambah/Edit Eksemplar */}
      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Eksemplar' : 'Tambah Eksemplar Baru'}
        icon="fa-solid fa-barcode"
        accent="#2563eb"
        size="lg"
        maxWidth="95vw"
        footer={
          <>
            <button type="button" className="btn btn-light border fw-semibold" onClick={() => setModalOpen(false)}>
              Batal
            </button>
            <button type="button" className="btn btn-primary fw-semibold" onClick={handleSave}>
              <i className="fa-solid fa-save me-1"></i> Simpan Eksemplar
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold">Nomor Barcode <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control form-control-sm${eksemplarErrors.no_barcode ? ' is-invalid' : ''}`}
              value={formValues.no_barcode}
              onChange={(e) => setFormValues({ ...formValues, no_barcode: e.target.value })}
              required
            />
            {eksemplarErrors.no_barcode && <div className="invalid-feedback">{eksemplarErrors.no_barcode}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Nomor Induk <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control form-control-sm${eksemplarErrors.no_induk ? ' is-invalid' : ''}`}
              value={formValues.no_induk}
              onChange={(e) => setFormValues({ ...formValues, no_induk: e.target.value })}
              required
            />
            {eksemplarErrors.no_induk && <div className="invalid-feedback">{eksemplarErrors.no_induk}</div>}
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Data Bibliografis (Judul / Pengarang / Penerbit) <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control form-control-sm${eksemplarErrors.data_bib ? ' is-invalid' : ''}`}
              placeholder="Contoh: Laskar Pelangi / Andrea Hirata (Bentang Pustaka, 2018)"
              value={formValues.data_bib}
              onChange={(e) => setFormValues({ ...formValues, data_bib: e.target.value })}
              required
            />
            {eksemplarErrors.data_bib && <div className="invalid-feedback">{eksemplarErrors.data_bib}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Tanggal Pengadaan</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={formValues.tgl_pengadaan}
              onChange={(e) => setFormValues({ ...formValues, tgl_pengadaan: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Lokasi Penyimpanan / Rak</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Contoh: Perpustakaan Utama - Rak 05"
              value={formValues.lokasi}
              onChange={(e) => setFormValues({ ...formValues, lokasi: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold">Status Ketersediaan</label>
            <select
              className="form-select form-select-sm"
              value={formValues.status}
              onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
            >
              <option value="Tersedia">Tersedia</option>
              <option value="Dipinjami">Dipinjami</option>
              <option value="Dalam Perbaikan">Dalam Perbaikan</option>
              <option value="Hilang">Hilang</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold">Aksesibilitas OPAC</label>
            <select
              className="form-select form-select-sm"
              value={formValues.opac}
              onChange={(e) => setFormValues({ ...formValues, opac: e.target.value })}
            >
              <option value="Tampil">Tampil</option>
              <option value="Sembunyi">Sembunyi</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold">Digital Right Management (DRM)</label>
            <select
              className="form-select form-select-sm"
              value={formValues.drm}
              onChange={(e) => setFormValues({ ...formValues, drm: e.target.value })}
            >
              <option value="Bebas">Bebas</option>
              <option value="Terbatas">Terbatas</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Modal Detail Eksemplar */}
      <Modal
        show={!!detailItem}
        onClose={() => setDetailItem(null)}
        title="Detail Fisik Eksemplar"
        icon="fa-solid fa-barcode"
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
                  <td className="text-muted" style={{ width: '140px' }}>No. Barcode</td>
                  <td className="fw-bold font-monospace text-primary">{detailItem.no_barcode}</td>
                </tr>
                <tr>
                  <td className="text-muted">No. Induk</td>
                  <td className="fw-semibold font-monospace">{detailItem.no_induk}</td>
                </tr>
                <tr>
                  <td className="text-muted">Data Bibliografis</td>
                  <td className="fw-bold text-dark">{detailItem.data_bib}</td>
                </tr>
                <tr>
                  <td className="text-muted">Tanggal Pengadaan</td>
                  <td>{detailItem.tgl_pengadaan}</td>
                </tr>
                <tr>
                  <td className="text-muted">Lokasi Rak</td>
                  <td>{detailItem.lokasi}</td>
                </tr>
                <tr>
                  <td className="text-muted">Status Eksemplar</td>
                  <td><span className="badge bg-success">{detailItem.status}</span></td>
                </tr>
                <tr>
                  <td className="text-muted">Status OPAC</td>
                  <td>{detailItem.opac}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  );
}
