import React from 'react';

const MONTHS = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const YEARS = Array.from({length: 8}, (_,i)=> String(2026 - i));

function Field({ label, children }) {
  return <div><label className="form-label fw-semibold text-secondary mb-1" style={{fontSize:'.84rem'}}>{label}</label>{children}</div>;
}
function Inp(props){ return <input className="form-control form-control-sm" style={{fontSize:'.88rem'}} {...props} />; }
function Sel({ value, onChange, placeholder, options=[] }) {
  return <select className="form-select form-select-sm" style={{fontSize:'.88rem'}} value={value} onChange={onChange}><option value="">{placeholder||'-- Semua --'}</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select>;
}

function renderFilter(fl, f, setF, i) {
  const s = (k,v)=>setF(p=>({...p,[k]:v}));
  if (fl.type === 'dateRange') return (
    <React.Fragment key={i}>
      <Field label={`${fl.labelShort||fl.label} (Mulai)`}><Inp type="date" value={f[fl.keys[0].key]||''} onChange={e=>s(fl.keys[0].key,e.target.value)} /></Field>
      <Field label={`${fl.labelShort||fl.label} (Akhir)`}><Inp type="date" value={f[fl.keys[1].key]||''} onChange={e=>s(fl.keys[1].key,e.target.value)} /></Field>
    </React.Fragment>
  );
  if (fl.type === 'monthYear') return (
    <React.Fragment key={i}>
      <Field label="Bulan"><Sel value={f[fl.keys[0].key]||''} onChange={e=>s(fl.keys[0].key,e.target.value)} placeholder="-- Semua Bulan --" options={MONTHS} /></Field>
      <Field label="Tahun"><Sel value={f[fl.keys[1].key]||''} onChange={e=>s(fl.keys[1].key,e.target.value)} placeholder="-- Semua Tahun --" options={YEARS} /></Field>
    </React.Fragment>
  );
  if (fl.type === 'year') return <Field key={i} label="Tahun"><Sel value={f[fl.keys[0].key]||''} onChange={e=>s(fl.keys[0].key,e.target.value)} placeholder="-- Semua Tahun --" options={YEARS} /></Field>;
  if (fl.type === 'text') return <Field key={i} label={fl.keys[0].label}><Inp type="text" value={f[fl.keys[0].key]||''} onChange={e=>s(fl.keys[0].key,e.target.value)} placeholder={fl.keys[0].placeholder||fl.keys[0].label} /></Field>;
  if (fl.type === 'select') return <Field key={i} label={fl.keys[0].label}><Sel value={f[fl.keys[0].key]||''} onChange={e=>s(fl.keys[0].key,e.target.value)} placeholder={fl.keys[0].placeholder} options={fl.options||[]} /></Field>;
  if (fl.type === 'doubleSelect') return (
    <React.Fragment key={i}>
      <Field label={fl.keys[0].label}><Sel value={f[fl.keys[0].key]||''} onChange={e=>s(fl.keys[0].key,e.target.value)} placeholder={fl.keys[0].placeholder} options={fl.optionsA||[]} /></Field>
      <Field label={fl.keys[1].label}><Sel value={f[fl.keys[1].key]||''} onChange={e=>s(fl.keys[1].key,e.target.value)} placeholder={fl.keys[1].placeholder} options={fl.optionsB||[]} /></Field>
    </React.Fragment>
  );
  return null;
}

export default function LaporanPage({ config }) {
  const { title, subtitle, path, columns, filters, previewRows = 20, showLimitWarning = false, showPreviewButton = false } = config;
  const [selected, setSelected] = React.useState({});
  const [showCols, setShowCols] = React.useState(false);
  const [f, setF] = React.useState(() => Object.fromEntries(filters.flatMap(x => (x.keys||[]).map(k => [k.key, k.default ?? '']))));

  const allSelected = columns.length > 0 && columns.every(c => selected[c]);
  const picked = columns.filter(c => selected[c]);
  const clear = () => { setSelected({}); setF(Object.fromEntries(filters.flatMap(x => (x.keys||[]).map(k => [k.key, k.default ?? ''])))); };
  const doExport = (fmt) => { if (!picked.length) return alert('Pilih minimal satu kolom untuk diekspor.'); alert(`Export ${fmt} disiapkan (${picked.length} kolom). Fitur ekspor data nyata belum terhubung ke basis data.`); };

  return (
    <div style={{fontFamily:'var(--font-sans)'}}>
      <div className="bo-page-head" style={{marginBottom:12}}>
        <div>
          <p className="bo-eyebrow" style={{marginBottom:2}}>Laporan</p>
          <h1 style={{fontSize:'1.55rem',marginBottom:2}}>{title}</h1>
          <p style={{fontSize:'.92rem',marginBottom:0}}>{subtitle}{path ? <span className="text-muted"> · {path}</span> : null}</p>
        </div>
      </div>

      <div className="border rounded-3 mb-2 bg-white overflow-hidden">
        <div className="d-flex align-items-center justify-content-between gap-2 px-3 py-2 border-bottom bg-light flex-wrap">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span className="fw-semibold" style={{color:'#1b3878',fontSize:'.95rem'}}>Pilih Kolom yang akan diekspor</span>
            <label className="d-inline-flex align-items-center gap-1 mb-0" style={{cursor:'pointer',fontSize:'.88rem'}}>
              <input type="checkbox" className="form-check-input mt-0" checked={allSelected} onChange={()=>setSelected(allSelected?{}:Object.fromEntries(columns.map(c=>[c,true])))} />
              Pilih Semua
            </label>
            <span className="badge bg-secondary-subtle text-secondary border" style={{fontSize:'.78rem'}}>{picked.length}/{columns.length}</span>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary py-1 px-2" style={{fontSize:'.82rem'}} onClick={()=>setShowCols(v=>!v)}>{showCols?'Sembunyikan Kolom':'Tampilkan Kolom'}</button>
        </div>
        {showCols ? (
          <div className="p-2" style={{maxHeight:170,overflowY:'auto'}}>
            <div className="row g-1 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6">
              {columns.map(c => (
                <div key={c} className="col">
                  <label className="d-flex align-items-start gap-1 mb-0" style={{fontSize:'.84rem',cursor:'pointer',lineHeight:1.3}}>
                    <input type="checkbox" className="form-check-input mt-0 flex-shrink-0" checked={!!selected[c]} onChange={()=>setSelected(p=>({...p,[c]:!p[c]}))} />
                    <span>{c}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="border rounded-3 p-2 mb-2 bg-white">
        <div className="row g-2 row-cols-1 row-cols-md-2 row-cols-lg-4">
          {filters.map((fl,i)=><div key={i} className="col">{renderFilter(fl,f,setF,i)}</div>)}
        </div>
      </div>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 border rounded-3 px-3 py-2 mb-2 bg-light">
        <div style={{fontSize:'.84rem'}} className="text-muted">{showLimitWarning ? <span className="text-warning-emphasis"><i className="fa-solid fa-triangle-exclamation me-1"></i>Maks. export 50.000 records. Gunakan filter bila perlu.</span> : <span><i className="fa-solid fa-circle-info me-1"></i>Preview terupdate saat kolom/filter berubah.</span>}</div>
        <div className="d-flex flex-wrap gap-2">
          {showPreviewButton ? <button type="button" className="btn btn-sm btn-primary fw-semibold" style={{fontSize:'.84rem'}} onClick={()=>{ if(!picked.length) alert('Pilih minimal satu kolom untuk melihat preview data'); }}><i className="fa-solid fa-eye me-1"></i>Preview Data ({previewRows} Baris Pertama)</button> : null}
          <button type="button" className="btn btn-sm text-white fw-semibold" style={{background:'#16a34a',fontSize:'.84rem'}} onClick={()=>doExport('Excel')}><i className="fa-solid fa-file-excel me-1"></i>{showPreviewButton?'Export ke Excel (Semua Data)':'Export Excel'}</button>
          <button type="button" className="btn btn-sm text-white fw-semibold" style={{background:'#dc2626',fontSize:'.84rem'}} onClick={()=>doExport('PDF')}><i className="fa-solid fa-file-pdf me-1"></i>{showPreviewButton?'Export ke PDF (Semua Data)':'Export PDF'}</button>
          <button type="button" className="btn btn-sm btn-secondary fw-semibold" style={{fontSize:'.84rem'}} onClick={clear}><i className="fa-solid fa-rotate-left me-1"></i>Clear All Filters</button>
        </div>
      </div>

      <div className="border rounded-3 bg-white overflow-hidden">
        <div className="px-3 py-2 border-bottom bg-light fw-semibold" style={{color:'#1b3878',fontSize:'.95rem'}}>Preview Data ({previewRows} Baris Pertama)</div>
        <div className="px-3 py-1 border-bottom alert alert-info mb-0 rounded-0" style={{fontSize:'.84rem'}}>Preview akan otomatis terupdate setiap kali Anda mengubah pilihan kolom atau filter.</div>
        {!picked.length ? (
          <div className="text-center text-muted py-3" style={{fontSize:'.9rem'}}>Pilih minimal satu kolom untuk melihat preview data</div>
        ) : (
          <div className="table-responsive" style={{maxHeight:260,overflow:'auto'}}>
            <table className="table table-sm table-bordered table-striped align-middle mb-0" style={{fontSize:'.84rem',whiteSpace:'nowrap'}}>
              <thead className="table-light" style={{position:'sticky',top:0}}><tr><th style={{width:44}}>No</th>{picked.map(c=><th key={c}>{c}</th>)}</tr></thead>
              <tbody><tr><td colSpan={picked.length+1} className="text-center text-muted py-3">Data preview belum terhubung ke basis data. Kolom terpilih: {picked.length}.</td></tr></tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
