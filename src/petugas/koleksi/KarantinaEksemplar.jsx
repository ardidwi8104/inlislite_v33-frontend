import React, { useState, useEffect } from 'react';
import { Controls, DataTableFooter } from './helpers';
import { EKSEMPLAR_SEED } from './data';
import Modal from '../../components/Modal';

const STORAGE_KEY = 'inlislite.koleksi.eksemplar.v1';

export default function KarantinaEksemplar() {
  const [data, setData] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return EKSEMPLAR_SEED;
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

  // Eksemplar dalam karantina
  const karantinaItems = data.filter((item) => !!item.karantina_flag);

  const filtered = karantinaItems.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (item.no_barcode || '').toLowerCase().includes(q) ||
      (item.no_induk || '').toLowerCase().includes(q) ||
      (item.data_bib || '').toLowerCase().includes(q) ||
      (item.lokasi || '').toLowerCase().includes(q)
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
      alert('Pilih setidaknya satu data eksemplar.');
      return;
    }
    if (window.confirm(`Pulihkan ${selectedIds.length} eksemplar ke status normal?`)) {
      setData((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id)
            ? { ...item, karantina: 'Tidak', karantina_flag: false, opac: 'Tampil', status: 'Tersedia' }
            : item
        )
      );
      setSelectedIds([]);
    }
  };

  const handleBulkHapusPermanen = () => {
    if (selectedIds.length === 0) {
      alert('Pilih setidaknya satu data eksemplar.');
      return;
    }
    if (
      window.confirm(
        `PERINGATAN: ${selectedIds.length} eksemplar fisik akan dihapus PERMANEN dari inventaris. Lanjutkan?`
      )
    ) {
      setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  const handleSinglePulihkan = (id) => {
    if (window.confirm('Pulihkan eksemplar ini ke status aktif normal?')) {
      setData((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, karantina: 'Tidak', karantina_flag: false, opac: 'Tampil', status: 'Tersedia' }
            : item
        )
      );
    }
  };

  const handleSingleHapusPermanen = (id) => {
    if (window.confirm('PERINGATAN: Hapus permanen fisik eksemplar ini dari sistem?')) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <div className="berita-card-head">
        <h2 id="karantina-eksemplar-table-title">
          <i className="fa-solid fa-list-ul" aria-hidden="true"></i> TABEL KARANTINA EKSEMPLAR
        </h2>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button
            type="button"
            className="btn btn-success btn-sm fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
            onClick={handleBulkPulihkan}
            disabled={selectedIds.length === 0}
          >
            <i className="fa-solid fa-rotate-left"></i> Pulihkan ke Eksemplar
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
                <th scope="col" style={{ width: '140px' }}>No. Barcode</th>
                <th scope="col" style={{ width: '120px' }}>Tgl Pengadaan</th>
                <th scope="col" style={{ width: '130px' }}>No. Induk</th>
                <th scope="col">Data Bibliografis</th>
                <th scope="col" className="text-center" style={{ width: '90px' }}>OPAC</th>
                <th scope="col" className="text-center" style={{ width: '100px' }}>Karantina</th>
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
                    <span className="badge bg-light text-danger border border-danger-subtle font-monospace">
                      {row.no_barcode}
                    </span>
                  </td>
                  <td className="small text-muted">{row.tgl_pengadaan}</td>
                  <td>
                    <span className="badge bg-light text-dark border font-monospace">{row.no_induk}</span>
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{row.data_bib}</div>
                    <span className="badge bg-danger-subtle text-danger border mt-1" style={{ fontSize: '0.7rem' }}>
                      <i className="fa-solid fa-triangle-exclamation me-1"></i>Eksemplar Rusak / Karantina
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-secondary-subtle text-secondary border">Sembunyi</span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-danger">Ya (Karantina)</span>
                  </td>
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
                        className="berita-action"
                        style={{ backgroundColor: '#198754' }}
                        title="Pulihkan ke Eksemplar Aktif"
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
                  <td colSpan={9} className="text-center text-muted py-4">
                    {search ? `Tidak ada eksemplar karantina yang cocok dengan "${search}".` : 'Tidak ada eksemplar dalam karantina.'}
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

      {/* Modal Detail Eksemplar Karantina */}
      <Modal
        show={!!detailItem}
        onClose={() => setDetailItem(null)}
        title="Detail Eksemplar Karantina"
        icon="fa-solid fa-dumpster"
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
                  <td className="text-muted" style={{ width: '140px' }}>No. Barcode</td>
                  <td className="fw-bold font-monospace text-danger">{detailItem.no_barcode}</td>
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
                  <td className="text-muted">Status Eksemplar</td>
                  <td><span className="badge bg-danger">Dalam Perbaikan / Rusak</span></td>
                </tr>
                <tr>
                  <td className="text-muted">Ruang / Lokasi</td>
                  <td>{detailItem.lokasi}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  );
}
