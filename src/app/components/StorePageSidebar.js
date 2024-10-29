import { Home, Heart, List, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Utility function to normalize store names for comparison
const normalizeStoreName = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all special characters and spaces
    .trim();
};

// Utility function to find store data in JSON
const findStoreData = (data, storeName) => {
  const normalizedSearchName = normalizeStoreName(storeName);
  
  // First try direct key match
  if (data[storeName]) {
    return data[storeName];
  }

  // Then try normalized key match
  const storeKey = Object.keys(data).find(key => {
    const normalizedKey = normalizeStoreName(key);
    const normalizedStoreName = data[key].name ? normalizeStoreName(data[key].name) : normalizedKey;
    return normalizedKey === normalizedSearchName || normalizedStoreName === normalizedSearchName;
  });

  return storeKey ? data[storeKey] : null;
};

export default function StorePageSidebar({ storeName, onAisleClick, onShopClick, activeTab, setActiveTab }) {
  const [aisles, setAisles] = useState([]);
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  const referringPage = searchParams.get("ref") || "home";

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch retailers data
        const retailersResponse = await fetch('/data/retailers.json');
        const retailersData = await retailersResponse.json();
        
        // Find store data using normalized comparison
        const matchedStoreData = findStoreData(retailersData, storeName);
        
        if (matchedStoreData) {
          setStoreData(matchedStoreData);
          
          // Fetch aisles data after finding store
          const aislesResponse = await fetch('/data/aisles.json');
          const aislesData = await aislesResponse.json();
          
          // Try to find aisles using both original and normalized store names
          let storeAisles = findStoreData(aislesData, storeName);
          
          if (!storeAisles && matchedStoreData.name) {
            // Try using the store's display name if key didn't work
            storeAisles = findStoreData(aislesData, matchedStoreData.name);
          }
          
          if (storeAisles) {
            setAisles(Array.isArray(storeAisles) ? storeAisles : []);
          } else {
            console.warn(`No aisles found for store: ${storeName}`);
            setAisles([]);
          }
        } else {
          setError(`Store data not found for: ${storeName}`);
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
        setError("Failed to load store data");
      } finally {
        setLoading(false);
      }
    };

    if (storeName) {
      fetchStoreData();
    }
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
      {/* Store Logo and Name */}
      <div className="p-4 sticky top-0 z-10 bg-white">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mb-2"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : storeData ? (
          <div className="flex flex-col items-center">
            <img
              src={storeData.logo || '/default-logo.png'}
              alt={`${storeData.name} logo`}
              className="w-16 h-16 mb-2 object-cover rounded-full"
            />
            <h2 className="text-lg font-semibold text-gray-900">{storeData.name}</h2>
          </div>
        ) : (
          <div className="text-center text-gray-500">Store not found</div>
        )}
      </div>

      {/* Scrollable Action Buttons and Aisles */}
      <div className="overflow-y-auto flex-grow p-4">
        <div className="space-y-4">
          {/* Back button */}
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
            <span>
              {referringPage === "home" 
                ? "Back to Home" 
                : `Back to ${referringPage.charAt(0).toUpperCase() + referringPage.slice(1)}`}
            </span>
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