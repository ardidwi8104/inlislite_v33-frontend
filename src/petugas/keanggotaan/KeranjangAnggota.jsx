import React, { useEffect, useState } from 'react';
import { loadCart, saveCart, loadAnggota, saveAnggota, fmtDate, useTable, Controls, TableFooter, Topbar } from './store.jsx';

export default function KeranjangAnggota() {
  const [data, setData] = useState(() => loadCart());
  const [selected, setSelected] = useState([]);
  const { search, setSearch, entries, setEntries, page, setPage, totalPages, startIdx, paged, total } = useTable(data, (r, q) => {
    const s = q.trim().toLowerCase(); if (!s) return true;
    return [r.nama, r.noAnggota].some((v) => String(v || '').toLowerCase().includes(s));
  });

  useEffect(() => { saveCart(data); }, [data]);

  const toggle = (id) => setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const toggleAll = (e) => setSelected(e.target.checked ? paged.map((r) => r.id) : []);

  const restore = () => {
    if (selected.length === 0) { alert('Pilih anggota yang akan dipulihkan.'); return; }
    const anggota = loadAnggota();
    const ids = new Set(anggota.map((a) => a.id));
    const restored = data.filter((r) => selected.includes(r.id));
    saveAnggota([...anggota, ...restored.filter((r) => !ids.has(r.id))]);
    setData((prev) => prev.filter((r) => !selected.includes(r.id)));
    setSelected([]);
    alert(`${restored.length} anggota dipulihkan dari keranjang.`);
  };

  return (
    <div>
      <Topbar title="Keranjang Anggota" sub="Daftar semua Keranjang Anggota" crumbs={[{ label: 'Keanggotaan', icon: 'fa-solid fa-house' }, { label: 'Keranjang Anggota', active: true }]} />
      <div className="berita-card-head">
        <h2><i className="fa-solid fa-shopping-cart" aria-hidden="true"></i> TABEL KERANJANG ANGGOTA</h2>
      </div>
      <div className="bo-panel-body">
        <Controls entries={entries} setEntries={setEntries} search={search} setSearch={setSearch} />
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-secondary">
              <tr>
                <th scope="col" className="text-center" style={{ width: 40 }}>
                  <input type="checkbox" className="form-check-input" onChange={toggleAll} checked={paged.length > 0 && paged.every((r) => selected.includes(r.id))} aria-label="Pilih semua" />
                </th>
                <th scope="col">Nama Anggota</th>
                <th scope="col">No. Anggota</th>
                <th scope="col">Tgl. Register</th>
                <th scope="col">Tgl. Berakhir</th>
                <th scope="col" className="text-center" style={{ width: 80 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-muted py-4">No data available in table</td></tr>
              ) : paged.map((row) => (
                <tr key={row.id}>
                  <td className="text-center"><input type="checkbox" className="form-check-input" checked={selected.includes(row.id)} onChange={() => toggle(row.id)} aria-label={`Pilih ${row.nama}`} /></td>
                  <td className="fw-semibold">{row.nama}</td>
                  <td><span className="badge bg-light text-dark border">{row.noAnggota}</span></td>
                  <td>{fmtDate(row.tglRegister)}</td>
                  <td>{fmtDate(row.tglBerakhir)}</td>
                  <td className="text-center">
                    <button type="button" className="berita-action berita-action--edit" title="Pulihkan" onClick={() => { setSelected([row.id]); setTimeout(restore, 0); }}><i className="fa-solid fa-undo"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex align-items-center gap-2 mt-2">
          <button type="button" className="btn btn-warning btn-sm fw-semibold d-inline-flex align-items-center gap-1" onClick={restore} disabled={selected.length === 0}>
            <i className="fa-solid fa-undo"></i> Pulihkan dari Keranjang
          </button>
        </div>
        <TableFooter startIdx={startIdx} entries={entries} total={total} page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
