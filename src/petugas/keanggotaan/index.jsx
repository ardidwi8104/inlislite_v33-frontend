import React from 'react';
import EntriAnggota from './EntriAnggota';
import DaftarAnggota from './DaftarAnggota';
import PerpanjanganAnggota from './PerpanjanganAnggota';
import ImportAnggota from './ImportAnggota';
import KeranjangAnggota from './KeranjangAnggota';

const VIEW_META = {
  'entri-anggota': { icon: 'fa-solid fa-user-plus', title: 'Entri Anggota', sub: 'Tambah Anggota' },
  'daftar-anggota': { icon: 'fa-solid fa-users', title: 'Anggota', sub: 'Daftar semua Anggota' },
  'perpanjangan-anggota': { icon: 'fa-solid fa-id-card', title: 'Anggota', sub: 'Perpanjangan semua Anggota' },
  'import-anggota': { icon: 'fa-solid fa-file-import', title: 'Import Anggota', sub: 'Please complete the data in the following form' },
  'keranjang-anggota': { icon: 'fa-solid fa-shopping-cart', title: 'Keranjang Anggota', sub: 'Daftar semua Keranjang Anggota' },
};

const VIEW_COMPONENTS = {
  'entri-anggota': EntriAnggota,
  'daftar-anggota': DaftarAnggota,
  'perpanjangan-anggota': PerpanjanganAnggota,
  'import-anggota': ImportAnggota,
  'keranjang-anggota': KeranjangAnggota,
};

export default function KeanggotaanPage({ view = 'daftar-anggota' }) {
  const meta = VIEW_META[view] || VIEW_META['daftar-anggota'];
  const Comp = VIEW_COMPONENTS[view] || DaftarAnggota;
  return <Comp />;
}
