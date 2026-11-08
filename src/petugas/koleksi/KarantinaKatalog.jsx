import React, { useState, useEffect } from 'react';
import { Controls, DataTableFooter } from './helpers';
import { KATALOG_SEED } from './data';
import Modal from '../../components/Modal';

const STORAGE_KEY = 'inlislite.koleksi.katalog.v1';

export default function KarantinaKatalog() {
  const [data, setData] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e)