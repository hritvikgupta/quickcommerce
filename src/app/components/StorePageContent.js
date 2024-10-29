// components/StorePageContent.js
'use client';

import StorePageSidebar from './StorePageSidebar';
import Header from './Header';
import { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { CartContext } from '../components/contexts/CartContext';
import { CartSidebar } from './CartSidebar';

// Utility function to normalize store names for comparison
const normalizeStoreName = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all special characters and spaces
    .trim();
};

// Utility function to find matching store key in featured products
const findMatchingStoreKey = (featuredProductsData, storeData) => {
  const normalizedStoreName = normalizeStoreName(storeData.name);
  const normalizedStoreKey = normalizeStoreName(storeData.key); // Original key from retailers.json

  return Object.keys(featuredProductsData).find(key => {
    const normalizedKey = normalizeStoreName(key);
    return normalizedKey === normalizedStoreName || normalizedKey === normalizedStoreKey;
  });
};

export default function StorePageContent({ storeData, storeKey }) {
  const [selectedAisle, setSelectedAisle] = useState(null);
  const [showShop, setShowShop] = useState(true);
  const [activeTab, setActiveTab] = useState('shop');
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data/featured-product.json');
        const featuredProductsData = await response.json();
        
        // First try with the original store key
        let storeProducts = featuredProductsData[storeKey];
        
        // If not found, try to find a matching key using normalized comparison
        if (!storeProducts) {
          const matchingKey = findMatchingStoreKey(featuredProductsData, {
            name: storeData.name,
            key: storeKey
          });
          
          if (matchingKey) {
            storeProducts = featuredProductsData[matchingKey];
            console.log(`Found matching store data under key: ${matchingKey}`);
          }
        }

        if (storeProducts && storeProducts.sections) {
          const sortedSections = storeProducts.sections.sort((a, b) => a.rank - b.rank);
          setSections(sortedSections);
        } else {
          console.warn(`No products found for store: ${storeData.name} (key: ${storeKey})`);
          setError('Store products are currently unavailable.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load store products.');
      }
    }
    fetchData();
  }, [storeData.name, storeKey]);

  const handleAddToCart = (product) => {
    addToCart(storeData.name, storeData.logo, product);
  };

  const handleAisleClick = (aisle) => {
    setSelectedAisle(aisle);
    setShowShop(false);
  };

  const handleShopClick = () => {
    setSelectedAisle(null);
    setShowShop(true);
  };

  return (
    <div className="flex bg-white min-h-screen">
      <StorePageSidebar
        storeName={storeData.name}
        onAisleClick={handleAisleClick}
        onShopClick={handleShopClick}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="ml-64 flex-1 overflow-y-auto bg-white">
        <Header />

        <div className="bg-blue-600 text-white p-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-3">
                <img src={storeData.logo} alt={`${storeData.name} logo`} className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{storeData.name}</h2>
                <p>{storeData.description}</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 font-semibold px-3 py-1 rounded-md">
              {storeData.banner?.text || 'Shop Now'}
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-2 space-y-4">
          {error ? (
            <div className="text-center py-8 text-gray-600">{error}</div>
          ) : sections.length > 0 ? (
            sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-black mb-2">{section.title}</h3>
                <div className="flex space-x-4 overflow-x-auto">
                  {section.products.map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      className="w-40 h-60"
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-600">
              Loading store products...
            </div>
          )}
        </div>
      </main>

      <CartSidebar />
    </div>
  );
}