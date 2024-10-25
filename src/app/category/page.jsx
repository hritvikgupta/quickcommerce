"use client";
import { Suspense } from "react";
    import { Card, CardContent } from "../components/ui/card"; // Import Card and CardContent
    import Image from "next/image";
    import { useSearchParams } from "next/navigation"; // For dynamic routing
    import { useEffect, useState } from "react";
    import Link from "next/link"; // Import Link for navigation
    import SideBar from "../components/SideBar"; // Use the existing SideBar component
    import Header from "../components/Header"; // Import the Header component
    function LoadingState() {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        );
      }
    // Reusable Store Card component
    const StoreCard = ({ store }) => (
    <Link href={`/store/${encodeURIComponent(store.name.toLowerCase())}`} key={store.name}>
        <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
            {store.logo && (
                <Image src={store.logo} alt={`${store.name} logo`} width={64} height={64} />
            )}
            </div>
            <div className="flex-grow text-black"> {/* Text is black */}
            <h3 className="font-bold text-lg">{store.name}</h3>
            <p className="text-sm text-green-600">{store.description}</p>
            <div className="mt-2 space-x-2">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                {store.banner.text}
                </span>
            </div>
            </div>
        </CardContent>
        </Card>
    </Link>
    );

 // Separate content component that uses hooks
function CategoryContent() {
    const searchParams = useSearchParams();
    const [pageTitle, setPageTitle] = useState("Category");
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      async function fetchStores() {
        try {
          const title = searchParams.get("title");
          if (!title) {
            setIsLoading(false);
            return;
          }
  
          setPageTitle(title);
          const response = await fetch("/data/retailers.json");
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          const filteredStores = Object.values(data).filter(
            (store) => store.categories && 
            store.categories.some(category => 
              category.toLowerCase().includes(title.toLowerCase())
            )
          );
  
          setStores(filteredStores);
        } catch (err) {
          setError(err.message);
          console.error("Failed to fetch retailers data:", err);
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchStores();
    }, [searchParams]);
  
    if (error) {
      return (
        <div className="flex h-screen bg-gray-100">
          <SideBar />
          <main className="flex-1 overflow-y-auto">
            <Header />
            <div className="max-w-7xl mx-auto p-4">
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-600">Error loading stores: {error}</p>
              </div>
            </div>
          </main>
        </div>
      );
    }
  
    return (
      <div className="flex h-screen bg-gray-100">
        <SideBar />
        <main className="flex-1 overflow-y-auto">
          <Header />
          <div className="max-w-7xl mx-auto p-4 space-y-8">
            <h1 className="text-4xl font-bold text-black">{pageTitle}</h1>
            <div className="grid md:grid-cols-2 gap-4">
              {!isLoading && stores.length === 0 && (
                <p className="text-gray-600">No stores available for this category.</p>
              )}
              {stores.map((store, index) => (
                <StoreCard key={`${store.name}-${index}`} store={store} />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Main page component with Suspense
  export default function CategoryPage() {
    return (
      <Suspense fallback={<LoadingState />}>
        <CategoryContent />
      </Suspense>
    );
  }