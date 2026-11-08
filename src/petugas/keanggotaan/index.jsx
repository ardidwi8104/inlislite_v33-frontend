import React from 'react';
import EntriAnggota from './EntriAnggota';
import DaftarAnggota from './DaftarAnggota';
import PerpanjanganAnggota from './PerpanjanganAnggota';
import ImportAnggota from './ImportAnggota';
import KeranjangAnggota from './KeranjangAnggota';

const VIEW_COMPONENTS = {
  'entri-anggota': EntriAnggota,
  'daftar-anggota': DaftarAnggota,
  'perpanjangan-anggota': PerpanjanganAnggota,
  'import-anggota': ImportAnggota,
  'keranjang-anggota': KeranjangAnggota,
};

export default function KeanggotaanPage({ view = 'daftar-anggota', onNavigate }) {
  const Comp = VIEW_COMPONENTS[view] || DaftarAnggota;
  return <Comp onNavigate={onNavigate} />;
}
