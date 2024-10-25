// src/app/store/[name]/page.js
"use client";

import { notFound } from 'next/navigation';
import StorePageContent from '../../components/StorePageContent';
import storesData from '../../../../public/data/retailers.json';

export default function Page({ params }) {
  const { name } = params;
  const storeName = decodeURIComponent(name).toLowerCase();
  const storeData = storesData[storeName];

  if (!storeData) {
    notFound();
  }

  return <StorePageContent storeData={storeData} />;
}