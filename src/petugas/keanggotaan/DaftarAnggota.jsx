import React, { useEffect, useState } from 'react';
import { loadAnggota, saveAnggota, loadCart, saveCart, fmtDate, useTable, Controls, TableFooter, Topbar } from './store.jsx';

export default function DaftarAnggota({ onNavigate }) {
  const [data, setData] = useState(() => loadAnggota());
  const [selected, setSelected] = useState([]);
  const { search, setSearch, entries, setEntries, page, setPage, totalPages, startIdx, paged, total } = useTable(data, (r, q) => {
    const s = q.trim().toLowerCase(); if (!s) return true;
    return [r.nama, r.noAnggota, r.statusAnggota].some((v) => String(v || '').toLowerCase().includes(s));
  });

  useEffect(() => { saveAnggota(data); }, [data]);

  const toggle = (id) => setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const toggleAll = (e) => setSelected(e.target.checked ? paged.map((r) => r.id) : []);
  const hasSel = selected.length > 0;

  const moveToCart = () => {
    if (!hasSel) return;
    const cart = loadCart();
    const ids = new Set(cart.map((c) => c.id));
    const add = data.filter((r) => selected.includes(r.id) && !ids.has(r.id));
    saveCart([...cart, ...add]);
    setData((prev) => prev.filter((r) => !selected.includes(r.id)));
    setSelected([]);
    alert(`${add.length} anggota dipindahkan ke Keranjang.`);
  };

  const activateOnline = () => {
    if (!hasSel) return;
    setData((prev) => prev.map((r) => selected.includes(r.id) ? { ...r, statusAnggota: 'Aktif' } : r));
    setSelected([]);
  };

  const printKartu = () => {
    if (!hasSel) { alert('Pilih anggota untuk dicetak kartunya.'); return; }
    alert(`Siap mencetak ${selected.length} kartu anggota.`);
  };

  return (
    <div>
      <Topbar title="Anggota" sub="Daftar semua Anggota" crumbs={[{ label: 'Keanggotaan', icon: 'fa-solid fa-house' }, { label: 'Daftar Anggota', active: true }]} />
      <div className="berita-card-head">
        <h2><i className="fa-solid fa-list-ul" aria-hidden="true"></i> DAFTAR ANGGOTA</h2>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button type="button" className="btn btn-warning btn-sm fw-semibold d-inline-flex align-items-center gap-1" onClick={moveToCart} disabled={!hasSel}>
            <i className="fa-solid fa-cart-shopping"></i> Pindahkan ke Keranjang
          </button>
          <button type="button" className="btn btn-primary btn-sm fw-semibold d-inline-flex align-items-center gap-1" onClick={printKartu} disabled={!hasSel}>
            <i className="fa-solid fa-print"></i> Print Kartu
          </button>
          <button type="button" className="btn btn-success btn-sm fw-semibold d-inline-flex align-items-center gap-1" onClick={activateOnline} disabled={!hasSel}>
            <i className="fa-solid fa-user-check"></i> Aktifkan Online
          </button>
          <button type="button" className="berita-btn-add" onClick={() => onNavigate && onNavigate('entri-anggota')}>
            <i className="fa-solid fa-plus" aria-hidden="true"></i> Tambah Anggota
          </button>
        </div>
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
                <th scope="col" className="text-center" style={{ width: 50 }}>No</th>
                <th scope="col">Nama Anggota</th>
                <th scope="col">No. Anggota</th>
                <th scope="col">Tgl. Register</th>
                <th scope="col">Tgl. Berakhir</th>
                <th scope="col" className="text-center">Status Anggota</th>
                <th scope="col" className="text-center" style={{ width: 90 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={8} className="text-center text-muted py-4">No data available in table</td></tr>
              ) : paged.map((row, idx) => (
                <tr key={row.id}>
                  <td className="text-center"><input type="checkbox" className="form-check-input" checked={selected.includes(row.id)} onChange={() => toggle(row.id)} aria-label={`Pilih ${row.nama}`} /></td>
                  <td className="text-center">{startIdx + idx + 1}</td>
                  <td className="fw-semibold">{row.nama}</td>
                  <td><span className="badge bg-light text-dark border">{row.noAnggota}</span></td>
                  <td>{fmtDate(row.tglRegister)}</td>
                  <td>{fmtDate(row.tglBerakhir)}</td>
                  <td className="text-center">
                    <span className={`badge ${row.statusAnggota === 'Aktif' ? 'bg-success' : 'bg-secondary'}`}>{row.statusAnggota}</span>
                  </td>
                  <td className="text-center">
                    <button type="button" className="berita-action berita-action--edit me-1" title="Edit" onClick={() => onNavigate && onNavigate('entri-anggota')}><i className="fa-solid fa-pen"></i></button>
                    <button type="button" className="berita-action berita-action--delete" title="Pindahkan ke keranjang" onClick={() => { setSelected([row.id]); setTimeout(() => { const cart = loadCart(); if (!cart.find(c=>c.id===row.id)) saveCart([...cart, row]); setData((p)=>p.filter(r=>r.id!==row.id)); setSelected([]); }, 0); }}><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter startIdx={startIdx} entries={entries} total={total} page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
