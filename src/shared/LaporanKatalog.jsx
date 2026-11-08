import LaporanPage from './LaporanPage';
const config = {
  title: 'Laporan Katalog',
  subtitle: 'Export Data Katalog dengan Multiple Filter',
  path: '/laporan/katalog',
  previewRows: 100,
  columns: ['No. Kontrol','BIB ID','Judul','Pengarang','Edisi','Penerbit','Tempat Terbit','Tahun Terbit','Subjek','Deskripsi Fisik','ISBN','No. Panggil','Bahasa','Klas DDC','Abstrak','Status OPAC','Status BNI','Status KIN','Status RDA','Dibuat Oleh','Tanggal Dibuat','Diperbarui Oleh','Tanggal Diperbarui'],
  filters: [
    { type:'dateRange', label:'Filter Berdasarkan Tanggal Dibuat', labelShort:'Tgl Dibuat', keys:[{key:'dibuat_mulai'},{key:'dibuat_akhir'}] },
    { type:'monthYear', label:'Filter Berdasarkan Bulan & Tahun Dibuat', keys:[{key:'dibuat_bulan'},{key:'dibuat_tahun'}] },
    { type:'year', label:'Filter Berdasarkan Tahun Dibuat Saja', keys:[{key:'dibuat_tahun_saja'}] },
    { type:'text', label:'Filter Berdasarkan Pengarang', keys:[{key:'pengarang', label:'Pengarang'}] },
    { type:'text', label:'Filter Berdasarkan Subjek', keys:[{key:'subjek', label:'Subjek'}] },
    { type:'text', label:'Filter Berdasarkan Penerbit', keys:[{key:'penerbit', label:'Penerbit'}] },
    { type:'text', label:'Filter Berdasarkan Tempat Terbit', keys:[{key:'tempat_terbit', label:'Tempat Terbit'}] },
    { type:'select', label:'Filter Berdasarkan Dibuat Oleh', keys:[{key:'dibuat_oleh', label:'Dibuat Oleh', placeholder:'-- Semua User --'}] },
    { type:'select', label:'Filter Berdasarkan Diperbarui Oleh', keys:[{key:'diperbarui_oleh', label:'Diperbarui Oleh', placeholder:'-- Semua User --'}] },
    { type:'select', label:'Filter Berdasarkan Klas DDC', keys:[{key:'klas_ddc', label:'Klas DDC', placeholder:'-- Semua Klas DDC --'}] },
  ],
};
export default function LaporanKatalog() { return <LaporanPage config={config} />; }
