import { Home, Heart, List, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams

export default function StorePageSidebar({ storeName, onAisleClick, onShopClick, activeTab, setActiveTab }) {
  const [aisles, setAisles] = useState([]);
  const [storeData, setStoreData] = useState(null);
  const searchParams = useSearchParams(); // Use to get URL params

  // Get the referring category from URL params (e.g., ?ref=offers)
  const referringPage = searchParams.get("ref") || "home";

  useEffect(() => {
    fetch('/data/aisles.json')
      .then(response => response.json())
      .then(data => {
        if (data[storeName.toLowerCase()]) {
          setAisles(data[storeName.toLowerCase()]);
        }
      })
      .catch(error => console.error("Error loading aisles:", error));
  }, [storeName]);

  useEffect(() => {
    fetch('/data/retailers.json')
      .then(response => response.json())
      .then(data => {
        const storeInfo = data[storeName.toLowerCase()];
        if (storeInfo) {
          setStoreData(storeInfo);
        }
      })
      .catch(error => console.error("Error loading store data:", error));
  }, [storeName]);

  const handleTabClick = (tabName) => setActiveTab(tabName);

  const getButtonStyles = (isActive) => `
    w-full px-4 py-2 rounded-md text-left
    flex items-center gap-2
    ${isActive ? 'bg-green-800 text-white hover:bg-green-700' : 'text-gray-700 hover:bg-gray-100'}
    transition-colors duration-200
  `;

  return (
    <aside className="fixed w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Static Logo and Name */}
      <div className="p-4 sticky top-0 z-10 bg-white">
        {storeData ? (
          <div className="flex flex-col items-center">
            <img
              src={storeData.logo || '/default-logo.png'}
              alt={`${storeData.name} logo`}
              className="w-16 h-16 mb-2 object-cover rounded-full"
            />
            <h2 className="text-lg font-semibold text-gray-900">{storeData.name}</h2>
          </div>
        ) : (
          <p>Loading store data...</p>
        )}
      </div>

      {/* Scrollable Action Buttons and Aisles */}
      <div className="overflow-y-auto flex-grow p-4">
        <div className="space-y-4">
          {/* Back button, changes based on the referring page */}
          <a
            href={referringPage === "home" ? "/" : `/category?title=${referringPage}`}
            className={getButtonStyles(activeTab === referringPage)}
            onClick={(e) => { 
              e.preventDefault(); 
              handleTabClick(referringPage); 
              window.location.href = referringPage === "home" ? '/' : `/category?title=${referringPage}`; 
            }}
          >
            <Home className="h-5 w-5" />
            <span>{referringPage === "home" ? "Back to Home" : `Back to ${referringPage.charAt(0).toUpperCase() + referringPage.slice(1)}`}</span>
          </a>

          <button
            className={getButtonStyles(activeTab === "shop")}
            onClick={() => {
              onShopClick();
              handleTabClick("shop");
            }}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Shop</span>
          </button>

          <button className={getButtonStyles(false)}>
            <Heart className="h-5 w-5 text-black" />
            <span>Buy it again</span>
          </button>

          <button className={getButtonStyles(false)}>
            <List className="h-5 w-5 text-black" />
            <span>Lists</span>
          </button>
        </div>

        {/* Browse Aisles */}
        {aisles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse aisles</h3>
            <ul className="space-y-2">
              {aisles.map((aisle, index) => (
                <li key={index}>
                  <button
                    className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200
                      ${activeTab === aisle.name 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => {
                      onAisleClick(aisle);
                      handleTabClick(aisle.name);
                    }}
                  >
                    {aisle.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
