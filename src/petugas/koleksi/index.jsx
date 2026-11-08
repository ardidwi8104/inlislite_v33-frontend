import React from 'react';
import DaftarKatalog from './DaftarKatalog';
import KarantinaKatalog from './KarantinaKatalog';
import SalinKatalog from './SalinKatalog';
import DaftarEksemplar from './DaftarEksemplar';
import ImportExcel from './ImportExcel';
import KarantinaEksemplar from './KarantinaEksemplar';

const VIEW_META = {
  'katalog': { icon: 'fa-solid fa-book', title: 'Katalog', sub: 'Daftar semua Katalog' },
  'karantina-katalog': { icon: 'fa-solid fa-trash-can', title: 'Karantina Katalog', sub: 'Daftar semua Karantina Katalog' },
  'salin-katalog': { icon: 'fa-solid fa-cloud-arrow-up', title: 'Impor Katalog dari File MARC', sub: 'Salin katalog dari file MARC' },
  'eksemplar': { icon: 'fa-solid fa-barcode', title: 'Eksemplar', sub: 'Daftar semua Eksemplar' },
  'import-excel': { icon: 'fa-solid fa-file-excel', title: 'Import Eksemplar Excel', sub: 'Import data eksemplar dari file Excel' },
  'karantina-eksemplar': { icon: 'fa-solid fa-dumpster', title: 'Karantina Eksemplar', sub: 'Daftar semua Karantina Eksemplar' },
};

const VIEW_COMPONENTS = {
  'katalog': DaftarKatalog,
  'karantina-katalog': KarantinaKatalog,
  'salin-katalog': SalinKatalog,
  'eksemplar': DaftarEksemplar,
  'import-excel': ImportExcel,
  'karantina-eksemplar': KarantinaEksemplar,
};

export default function KoleksiPage({ view = 'katalog' }) {
  const meta = VIEW_META[view] || VIEW_META.katalog;
  const Comp = VIEW_COMPONENTS[view] || DaftarKatalog;
  return (
    <div>
      <div className="berita-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="berita-topbar-icon" aria-hidden="true">
            <i className={meta.icon}></i>
          </span>
          <div>
            <h1 className="berita-topbar-title">{meta.title}</h1>
            <p className="berita-topbar-sub">{meta.sub}</p>
          </div>
        </div>
        <nav className="berita-breadcrumb" aria-label="breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}>
            <i className="fa-solid fa-house" aria-hidden="true"></i> Beranda
          </a>
          <span aria-hidden="true">/</span>
          <span>Koleksi</span>
          <span aria-hidden="true">/</span>
          <span className="is-active" aria-current="page">{meta.title}</span>
        </nav>
      </div>

      <div aria-labelledby="koleksi-table-title">
        <Comp />
      </div>
    </div>
  );
}
