// src/app/store/[name]/page.js
"use client";

import { notFound } from 'next/navigation';
import StorePageContent from '../../components/StorePageContent';
import storesData from '../../../../public/data/retailers.json';

// Utility function to normalize store names for comparison
const normalizeStoreName = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all special characters and spaces
    .trim();
};

// Utility function to find store data regardless of case/format
const findStoreData = (storesData, searchName) => {
  const normalizedSearchName = normalizeStoreName(searchName);
  
  // Find the matching store and its key
  const storeEntry = Object.entries(storesData).find(([key, value]) => {
    const normalizedKey = normalizeStoreName(key);
    const normalizedStoreName = normalizeStoreName(value.name);
    return normalizedKey === normalizedSearchName || normalizedStoreName === normalizedSearchName;
  });

  return storeEntry ? { data: storeEntry[1], key: storeEntry[0] } : null;
};

export default function Page({ params }) {
  const { name } = params;
  const decodedName = decodeURIComponent(name);
  const storeInfo = findStoreData(storesData, decodedName);

  if (!storeInfo) {
    notFound();
  }

  return <StorePageContent storeData={storeInfo.data} storeKey={storeInfo.key} />;
}