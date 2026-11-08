import LaporanPage from './LaporanPage';
const config = {
  title: 'Laporan Buku Tamu',
  subtitle: 'Daftar Semua Kunjungan',
  path: '/laporan/buku-tamu',
  previewRows: 20,
  columns: ['Nomor Kunjungan','Lokasi Perpustakaan','Lokasi Ruang','Tanggal Kunjungan','Kriteria Pengunjung','Nama','Jenis Kelamin','Pekerjaan','Pendidikan','Tujuan Kunjungan','Informasi Dicari'],
  filters: [
    { type:'select', label:'Filter Berdasarkan', keys:[{key:'berdasarkan', label:'Kategori', placeholder:'Tanggal', default:'Tanggal'}], options:['Tanggal'] },
    { type:'dateRange', label:'Filter Berdasarkan Tanggal', keys:[{key:'tgl_mulai'},{key:'tgl_akhir'}] },
    { type:'select', label:'Filter Berdasarkan Jenis Kelamin', keys:[{key:'jk', label:'Jenis Kelamin', placeholder:'-- Semua Jenis Kelamin --'}], options:['Laki-laki','Perempuan'] },
    { type:'select', label:'Filter Berdasarkan Kriteria Pengunjung', keys:[{key:'kriteria', label:'Kriteria Pengunjung', placeholder:'-- Semua Kriteria Pengunjung --'}] },
    { type:'select', label:'Filter Berdasarkan Lokasi Perpustakaan', keys:[{key:'lokasi_perpus', label:'Lokasi Perpustakaan', placeholder:'-- Semua Lokasi Perpustakaan --'}] },
    { type:'select', label:'Filter Berdasarkan Ruang Perpustakaan', keys:[{key:'lokasi_ruang', label:'Lokasi Ruang', placeholder:'-- Semua Ruang Perpustakaan --'}] },
    { type:'select', label:'Filter Berdasarkan Tujuan Kunjungan', keys:[{key:'tujuan', label:'Tujuan Kunjungan', placeholder:'-- Semua Tujuan Kunjungan --'}] },
    { type:'select', label:'Tampilkan Kop Laporan', keys:[{key:'kop', label:'Kop Laporan', placeholder:'-- Pilih Kop Laporan --'}] },
  ],
};
export default function LaporanBukuTamu() { return <LaporanPage config={config} />; }
