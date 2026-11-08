import LaporanPage from './LaporanPage';
const config = {
  title: 'Laporan Peminjaman Buku',
  subtitle: 'Export Data Peminjaman dengan Multiple Filter',
  path: '/laporan/sirkulasi',
  previewRows: 100,
  showPreviewButton: true,
  columns: ['Nama Anggota','Nomor Anggota','Nomor Barcode','Judul Buku','Tanggal Peminjaman','Tanggal Jatuh Tempo','Tanggal Pengembalian','Petugas Peminjaman','Petugas Pengembalian','Jenis Kelamin','Status Peminjaman'],
  filters: [
    { type:'dateRange', label:'Filter Berdasarkan Tanggal Peminjaman', keys:[{key:'pinjam_mulai'},{key:'pinjam_akhir'}] },
    { type:'select', label:'Filter Berdasarkan Status Peminjaman', keys:[{key:'status', label:'Status Peminjaman', placeholder:'-- Semua Status --'}] },
    { type:'text', label:'Filter Berdasarkan Nama Anggota', keys:[{key:'nama', label:'Nama Anggota', placeholder:'Masukkan nama anggota...'}] },
    { type:'text', label:'Filter Berdasarkan Judul Buku', keys:[{key:'judul', label:'Judul Buku', placeholder:'Masukkan judul buku...'}] },
  ],
};
export default function LaporanSirkulasi() { return <LaporanPage config={config} />; }
