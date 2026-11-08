import React from 'react';
import EntriPeminjaman from './EntriPeminjaman';
import EntriPerpanjangan from './EntriPerpanjangan';
import EntriPengembalian from './EntriPengembalian';
import Peminjaman from './Peminjaman';
import Perpanjangan from './Perpanjangan';
import Pengembalian from './Pengembalian';
import Pelanggaran from './Pelanggaran';

const VIEW_COMPONENTS = {
  'entri-peminjaman': EntriPeminjaman,
  'entri-perpanjangan': EntriPerpanjangan,
  'entri-pengembalian': EntriPengembalian,
  'peminjaman': Peminjaman,
  'perpanjangan': Perpanjangan,
  'pengembalian': Pengembalian,
  'pelanggaran': Pelanggaran,
};

export default function SirkulasiPage({ view = 'peminjaman' }) {
  const Comp = VIEW_COMPONENTS[view] || Peminjaman;
  return <Comp />;
}
