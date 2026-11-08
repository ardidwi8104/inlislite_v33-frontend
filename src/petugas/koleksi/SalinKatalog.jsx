import React, { useState } from 'react';
import Modal from '../../components/Modal';

export default function SalinKatalog() {
  const [format, setFormat] = useState('mrc');
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]