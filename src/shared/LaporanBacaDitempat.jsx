import LaporanPage from './LaporanPage';
const config = {
  title: 'Laporan Baca Ditempat',
  subtitle: 'Daftar Semua Baca Ditempat',
  path: '/laporan/baca-ditempat',
  previewRows: 20,
  showLimitWarning: true,
  columns: ['Nomor Pengunjung','Lokasi Perpustakaan','Lokasi Ruang','Tanggal Kunjungan','Nama','No. Induk','No. Anggota'],
  filters: [
    { type:'dateRange', label:'Filter Berdasarkan Tanggal Kunjungan', keys:[{key:'kunj_mulai'},{key:'kunj_akhir'}] },
    { type:'monthYear', label:'Filter Berdasarkan Bulan & Tahun Kunjungan', keys:[{key:'kunj_bulan'},{key:'kunj_tahun'}] },
    { type:'year', label:'Filter Berdasarkan Tahun Kunjungan Saja', keys:[{key:'kunj_tahun_saja'}] },
    { type:'select', label:'Filter Berdasarkan Jenis Anggota', keys:[{key:'jenis', label:'Jenis Anggota', placeholder:'-- Semua Jenis Anggota --'}] },
    { type:'select', label:'Filter Berdasarkan Lokasi Perpustakaan', keys:[{key:'lokasi_perpus', label:'Lokasi Perpustakaan', placeholder:'-- Semua Lokasi Perpustakaan --'}] },
    { type:'select', label:'Filter Berdasarkan Lokasi Ruang', keys:[{key:'lokasi_ruang', label:'Lokasi Ruang', placeholder:'-- Semua Lokasi Ruang --'}] },
    { type:'text', label:'Filter Berdasarkan Nomor Induk', keys:[{key:'no_induk', label:'Nomor Induk', placeholder:'Masukkan no induk...'}] },
    { type:'text', label:'Filter Berdasarkan Penerbit', keys:[{key:'penerbit', label:'Penerbit', placeholder:'Masukkan nama penerbit...'}] },
  ],
};
export default function LaporanBacaDitempat() { return <LaporanPage config={config} />; }
