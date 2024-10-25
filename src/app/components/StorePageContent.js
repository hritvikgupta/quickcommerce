// components/StorePageContent.js
'use client';

import StorePageSidebar from './StorePageSidebar';
import Header from './Header';
import { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { CartContext } from '../components/contexts/CartContext';
import { CartSidebar } from './CartSidebar';

export default function StorePageContent({ storeData }) {
  const [selectedAisle, setSelectedAisle] = useState(null);
  const [showShop, setShowShop] = useState(true);
  const [activeTab, setActiveTab] = useState('shop');
  const [sections, setSections] = useState([]);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data/featured-product.json');
        const data = await response.json();
        const storeProducts = data[storeData.name.toLowerCase().replace(/\s+/g, '_')];

        if (storeProducts && storeProducts.sections) {
          const sortedSections = storeProducts.sections.sort((a, b) => a.rank - b.rank);
          setSections(sortedSections);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [storeData.name]);

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
      {/* Sidebar */}
      <StorePageSidebar
        storeName={storeData.name}
        onAisleClick={handleAisleClick}
        onShopClick={handleShopClick}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-y-auto bg-white">
        <Header />

        {/* Store Banner */}
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

        {/* Products */}
        <div className="max-w-7xl mx-auto p-2 space-y-4">
          {sections.map((section, index) => (
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
          ))}
        </div>
      </main>

      {/* Include CartSidebar */}
      <CartSidebar />
    </div>
  );
}