import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { loadAnggota, loadPerpanjangan, savePerpanjangan, useTable, Controls, TableFooter, Topbar } from './store.jsx';

export default function PerpanjanganAnggota() {
  const [data, setData] = useState(() => loadPerpanjangan());
  const [show, setShow] = useState(false);
  const anggota = loadAnggota();
  const [form, setForm] = useState({ anggotaId: '', keterangan: '', biaya: '', lunas: false });

  const { search, setSearch, entries, setEntries, page, setPage, totalPages, startIdx, paged, total } = useTable(data, (r, q) => {
    const s = q.trim().toLowerCase(); if (!s) return true;
    return [r.nama, r.noAnggota, r.keterangan].some((v) => String(v || '').toLowerCase().includes(s));
  });

  useEffect(() => { savePerpanjangan(data); }, [data]);

  const submit = (e) => {
    e.preventDefault();
    const agt = anggota.find((a) => String(a.id) === String(form.anggotaId));
    if (!agt) { alert('Pilih anggota.'); return; }
    setData((p) => [{ id: Date.now(), nama: agt.nama, noAnggota: agt.noAnggota, keterangan: form.keterangan || 'Perpanjangan masa berlaku', biaya: form.biaya || '0', lunas: !!form.lunas }, ...p]);
    setShow(false);
    setForm({ anggotaId: '', keterangan: '', biaya: '', lunas: false });
  };

  const remove = (id) => { if (window.confirm('Hapus data perpanjangan ini?')) setData((p) => p.filter((r) => r.id !== id)); };

  return (
    <div>
      <Topbar title="Anggota" sub="Perpanjangan semua Anggota" crumbs={[{ label: 'Keanggotaan', icon: 'fa-solid fa-house' }, { label: 'Perpanjangan Anggota', active: true }]} />
      <div className="berita-card-head">
        <h2><i className="fa-solid fa-id-card" aria-hidden="true"></i> TABEL PERPANJANGAN ANGGOTA</h2>
        <button type="button" className="berita-btn-add" onClick={() => setShow(true)}>
          <i className="fa-solid fa-plus" aria-hidden="true"></i> Tambah Perpanjangan Anggota
        </button>
      </div>
      <div className="bo-panel-body">
        <Controls entries={entries} setEntries={setEntries} search={search} setSearch={setSearch} />
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-secondary">
              <tr>
                <th scope="col" className="text-center" style={{ width: 50 }}>No</th>
                <th scope="col">Nama</th>
                <th scope="col">Nomor Anggota</th>
                <th scope="col">Keterangan</th>
                <th scope="col">Biaya</th>
                <th scope="col" className="text-center">Lunas</th>
                <th scope="col" className="text-center" style={{ width: 70 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={7} className="text-center text-muted py-4">No data available in table</td></tr>
              ) : paged.map((row, idx) => (
                <tr key={row.id}>
                  <td className="text-center">{startIdx + idx + 1}</td>
                  <td className="fw-semibold">{row.nama}</td>
                  <td><span className="badge bg-light text-dark border">{row.noAnggota}</span></td>
                  <td>{row.keterangan}</td>
                  <td>{row.biaya ? `Rp ${Number(row.biaya).toLocaleString('id-ID')}` : '-'}</td>
                  <td className="text-center">
                    <span className={`badge ${row.lunas ? 'bg-success' : 'bg-secondary'}`}>{row.lunas ? 'Lunas' : 'Belum'}</span>
                  </td>
                  <td className="text-center">
                    <button type="button" className="berita-action berita-action--delete" title="Hapus" onClick={() => remove(row.id)}><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter startIdx={startIdx} entries={entries} total={total} page={page} setPage={setPage} totalPages={totalPages} />
      </div>

      <Modal show={show} onClose={() => setShow(false)} title="Tambah Perpanjangan Anggota" icon="fa-id-card" size="md"
        footer={<><button type="button" className="btn btn-light border fw-semibold" onClick={() => setShow(false)}>Batal</button><button type="submit" form="ext-form" className="btn btn-primary fw-semibold"><i className="fa-solid fa-save me-1"></i>Simpan</button></>}>
        <form id="ext-form" onSubmit={submit} className="row g-3">
          <div className="col-12">
            <label className="form-label fw-semibold small">Anggota *</label>
            <select className="form-select" value={form.anggotaId} onChange={(e) => setForm({ ...form, anggotaId: e.target.value })} required>
              <option value="">Pilih anggota...</option>
              {anggota.map((a) => <option key={a.id} value={a.id}>{a.nama} — {a.noAnggota}</option>)}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label fw-semibold small">Keterangan</label>
            <input className="form-control" value={form.keterangan} onChange={(e) => setForm({ ...form, keterangan: e.target.value })} placeholder="Perpanjangan masa berlaku" />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold small">Biaya</label>
            <input type="number" className="form-control" value={form.biaya} onChange={(e) => setForm({ ...form, biaya: e.target.value })} placeholder="0" />
          </div>
          <div className="col-md-6 d-flex align-items-end">
            <div className="form-check mb-2">
              <input id="lunas" type="checkbox" className="form-check-input" checked={form.lunas} onChange={(e) => setForm({ ...form, lunas: e.target.checked })} />
              <label htmlFor="lunas" className="form-check-label small fw-semibold">Lunas</label>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
