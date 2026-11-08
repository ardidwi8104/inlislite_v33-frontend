import LaporanPage from './LaporanPage';

const config = {
  title: 'Laporan Anggota',
  subtitle: 'Export Data Anggota dengan Multiple Filter',
  path: '/laporan/anggota',
  previewRows: 20,
  showLimitWarning: true,
  columns: ['Nomor Anggota','Nama Lengkap','Tempat Lahir','Tanggal Lahir','Alamat','Telepon','Email','Provinsi','Kota','Kecamatan','Kelurahan','RT','RW','Nama Institusi','Nomor Identitas','Tanggal Registrasi','Tanggal Berakhir','Dibuat Oleh','Diperbarui Oleh','Jenis Kelamin','Jenis Anggota'],
  filters: [
    { type:'dateRange', label:'Filter Berdasarkan Tanggal Registrasi', keys:[{key:'reg_mulai'},{key:'reg_akhir'}] },
    { type:'monthYear', label:'Filter Berdasarkan Bulan & Tahun Registrasi', keys:[{key:'reg_bulan'},{key:'reg_tahun'}] },
    { type:'year', label:'Filter Berdasarkan Tahun Registrasi Saja', keys:[{key:'reg_tahun_saja'}] },
    { type:'dateRange', label:'Filter Berdasarkan Tanggal Lahir', keys:[{key:'lahir_mulai'},{key:'lahir_akhir'}] },
    { type:'select', label:'Filter Berdasarkan Jenis Kelamin', keys:[{key:'jk', label:'Jenis Kelamin', placeholder:'-- Semua Jenis Kelamin --'}], options:['Laki-laki','Perempuan'] },
    { type:'select', label:'Filter Berdasarkan Jenis Anggota', keys:[{key:'jenis', label:'Jenis Anggota', placeholder:'-- Semua Jenis Anggota --'}] },
    { type:'text', label:'Filter Berdasarkan Nama Lengkap', keys:[{key:'nama', label:'Nama Lengkap'}] },
    { type:'text', label:'Filter Berdasarkan Tempat Lahir', keys:[{key:'tempat_lahir', label:'Tempat Lahir'}] },
    { type:'text', label:'Filter Berdasarkan Alamat', keys:[{key:'alamat', label:'Alamat'}] },
    { type:'text', label:'Filter Berdasarkan Provinsi', keys:[{key:'provinsi', label:'Provinsi'}] },
    { type:'text', label:'Filter Berdasarkan Kota', keys:[{key:'kota', label:'Kota'}] },
    { type:'text', label:'Filter Berdasarkan Institusi', keys:[{key:'institusi', label:'Nama Institusi'}] },
    { type:'text', label:'Filter Berdasarkan Email', keys:[{key:'email', label:'Email'}] },
    { type:'select', label:'Filter Berdasarkan Dibuat Oleh', keys:[{key:'dibuat_oleh', label:'Dibuat Oleh', placeholder:'-- Semua User --'}] },
    { type:'select', label:'Filter Berdasarkan Diperbarui Oleh', keys:[{key:'diperbarui_oleh', label:'Diperbarui Oleh', placeholder:'-- Semua User --'}] },
  ],
};
export default function LaporanAnggota() { return <LaporanPage config={config} />; }
