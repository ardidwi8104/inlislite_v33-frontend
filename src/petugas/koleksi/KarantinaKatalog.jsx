import React, { useState, useEffect } from 'react';
import { Controls, DataTableFooter } from './helpers';
import { KATALOG_SEED } from './data';
import Modal from '../../components/Modal';

const STORAGE_KEY = 'inlislite.koleksi.katalog.v1';

export default function KarantinaKatalog() {
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
  const [detailItem, setDetailItem] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [search, entries]);

  // Filter katalog yang berada di status karantina
  const karantinaItems = data.filter((item) => !!item.karantina);

  const filtered = karantinaItems.filter((item) => {
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
  const handleBulkPulihkan = () => {
    if (selectedIds.length === 0) {
      alert('Pilih setidaknya satu data katalog.');
      return;
    }
    if (window.confirm(`Pulihkan ${selectedIds.length} katalog dari karantina?`)) {
      setData((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id) ? { ...item, karantina: false } : item
        )
      );
      setSelectedIds([]);
    }
  };

  const handleBulkHapusPermanen = () => {
    if (selectedIds.length === 0) {
      alert('Pilih setidaknya satu data katalog.');
      return;
    }
    if (
      window.confirm(
        `PERINGATAN: ${selectedIds.length} katalog akan dihapus secara PERMANEN dan tidak dapat dikembalikan. Lanjutkan?`
      )
    ) {
      setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  const handleSinglePulihkan = (id) => {
    if (window.confirm('Pulihkan katalog ini dari karantina?')) {
      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, karantina: false } : item))
      );
    }
  };

  const handleSingleHapusPermanen = (id) => {
    if (window.confirm('PERINGATAN: Hapus permanen katalog ini dari database?')) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <div className="berita-card-head">
        <h2 id="karantina-katalog-table-title">
          <i className="fa-solid fa-list-ul" aria-hidden="true"></i> TABEL KARANTINA KATALOG
        </h2>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button
            type="button"
            className="btn btn-warning btn-sm text-dark fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
            onClick={handleBulkPulihkan}
            disabled={selectedIds.length === 0}
          >
            <i className="fa-solid fa-rotate-left"></i> Pulihkan dari Karantina
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
            onClick={handleBulkHapusPermanen}
            disabled={selectedIds.length === 0}
          >
            <i className="fa-solid fa-trash-can"></i> Hapus Permanen
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
                    <span className="badge bg-light text-danger border border-danger-subtle font-monospace">
                      {row.bibid}
                    </span>
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{row.judul}</div>
                    <span className="badge bg-warning text-dark mt-1" style={{ fontSize: '0.7rem' }}>
                      <i className="fa-solid fa-triangle-exclamation me-1"></i>Dalam Karantina
                    </span>
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
                    <span className="badge rounded-pill bg-secondary-subtle text-secondary border">
                      {row.eksemplar_count || 0}
                    </span>
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
                        title="Detail Data"
                        onClick={() => setDetailItem(row)}
                      >
                        <i className="fa-solid fa-eye" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        className="berita-action"
                        style={{ backgroundColor: '#198754' }}
                        title="Pulihkan dari Karantina"
                        onClick={() => handleSinglePulihkan(row.id)}
                      >
                        <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        className="berita-action berita-action--delete"
                        title="Hapus Permanen"
                        onClick={() => handleSingleHapusPermanen(row.id)}
                      >
                        <i className="fa-solid fa-trash-can" aria-hidden="true"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={11} className="text-center text-muted py-4">
                    {search ? `Tidak ada data karantina yang cocok dengan "${search}".` : 'Tidak ada katalog dalam karantina.'}
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

      {/* Modal Detail Karantina */}
      <Modal
        show={!!detailItem}
        onClose={() => setDetailItem(null)}
        title="Detail Katalog Karantina"
        icon="fa-solid fa-trash-can"
        accent="#dc3545"
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
                  <td className="fw-bold font-monospace text-danger">{detailItem.bibid}</td>
                </tr>
                <tr>
                  <td className="text-muted">Judul</td>
                  <td className="fw-semibold text-dark">{detailItem.judul}</td>
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
                  <td className="text-muted">No. Panggil</td>
                  <td><span className="badge bg-secondary-subtle text-secondary border">{detailItem.no_panggil || '-'}</span></td>
                </tr>
                <tr>
                  <td className="text-muted">Status</td>
                  <td><span className="badge bg-danger">Terkarantina</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  );
}
