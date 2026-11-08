import LaporanPage from './LaporanPage';

const config = {
  title: 'Laporan Eksemplar',
  subtitle: 'Export Data Eksemplar dengan Multiple Filter',
  path: '/laporan/eksemplar',
  previewRows: 100,
  showLimitWarning: true,
  columns: ['No. Barcode','Tanggal Pengadaan','No. Induk','Judul','Pengarang','Edisi','Penerbit','Tempat Terbit','Tahun Terbit','Subjek','ISBN','No. Panggil','Bahasa','No. Dewey','No. RFID','Jenis Sumber','Bentuk Fisik','Kategori','Akses','Lokasi Ruang','Nama Sumber','Ketersediaan','Status OPAC','Status DRM','Mata Uang','Harga','Satuan Harga','Lokasi Perpustakaan','Dibuat Oleh','Tanggal Dibuat','Diperbarui Oleh','Tanggal Diperbarui'],
  filters: [
    { type:'dateRange', label:'Filter Berdasarkan Tanggal Dibuat', keys:[{key:'dibuat_mulai'},{key:'dibuat_akhir'}] },
    { type:'monthYear', label:'Filter Berdasarkan Bulan & Tahun Dibuat', keys:[{key:'dibuat_bulan'},{key:'dibuat_tahun'}] },
    { type:'year', label:'Filter Berdasarkan Tahun Dibuat Saja', keys:[{key:'dibuat_tahun_saja'}] },
    { type:'dateRange', label:'Filter Berdasarkan Tanggal Pengadaan', keys:[{key:'pengadaan_mulai'},{key:'pengadaan_akhir'}] },
    { type:'doubleSelect', label:'Filter Berdasarkan Lokasi', keys:[{key:'lokasi_perpus',label:'Lokasi Perpustakaan',placeholder:'-- Semua Perpustakaan --'},{key:'lokasi_ruang',label:'Lokasi Ruang',placeholder:'-- Semua Ruang --'}] },
    { type:'text', label:'Filter Berdasarkan Pengarang', keys:[{key:'pengarang', label:'Pengarang'}] },
    { type:'text', label:'Filter Berdasarkan Tempat Terbit', keys:[{key:'tempat_terbit', label:'Tempat Terbit'}] },
    { type:'text', label:'Filter Berdasarkan Subjek', keys:[{key:'subjek', label:'Subjek'}] },
    { type:'text', label:'Filter Berdasarkan Penerbit', keys:[{key:'penerbit', label:'Penerbit'}] },
    { type:'select', label:'Filter Berdasarkan Dibuat Oleh', keys:[{key:'dibuat_oleh', label:'Dibuat Oleh', placeholder:'-- Semua User --'}] },
    { type:'select', label:'Filter Berdasarkan Diperbarui Oleh', keys:[{key:'diperbarui_oleh', label:'Diperbarui Oleh', placeholder:'-- Semua User --'}] },
  ],
};
export default function LaporanEksemplar() { return <LaporanPage config={config} />; }
