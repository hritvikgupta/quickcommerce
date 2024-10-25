    "use client"; // Mark this component as a Client Component
    import { Card, CardContent } from "../components/ui/card"; // Import Card and CardContent
    import Image from "next/image";
    import { useSearchParams } from "next/navigation"; // For dynamic routing
    import { useEffect, useState } from "react";
    import Link from "next/link"; // Import Link for navigation
    import SideBar from "../components/SideBar"; // Use the existing SideBar component
    import Header from "../components/Header"; // Import the Header component

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

    export default function CategoryPage() {
    const searchParams = useSearchParams(); // Using next/navigation for search params
    const [pageTitle, setPageTitle] = useState("Category");
    const [stores, setStores] = useState([]);

    // Fetch the store data from the public/data/retailers.json
    useEffect(() => {
        const title = searchParams.get("title");
        if (title) {
        setPageTitle(title);

        // Fetch the retailers.json data
        fetch("/data/retailers.json")
            .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
            })
            .then((data) => {
            console.log("Retailers data:", data);  // Add logging to debug the data loading
            
            // Filter stores by category, ensuring it checks for category as a list
            const filteredStores = Object.values(data).filter(
                (store) => store.categories && store.categories.some(category => category.toLowerCase().includes(title.toLowerCase()))
            );

            console.log("Filtered stores:", filteredStores);  // Log filtered stores

            if (filteredStores.length === 0) {
                console.warn(`No stores found for category: ${title}`);
            }

            setStores(filteredStores);
            })
            .catch((error) => {
            console.error("Failed to fetch retailers data:", error);
            });
        }
    }, [searchParams]);

    return (
        <div className="flex h-screen bg-gray-100">
        {/* Use the SideBar component */}
        <SideBar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
            {/* Header */}
            <Header />

            {/* Content */}
            <div className="max-w-7xl mx-auto p-4 space-y-8">
            {/* Page title */}
            <h1 className="text-4xl font-bold text-black">{pageTitle}</h1>
            <div className="grid md:grid-cols-2 gap-4">
                {stores.length > 0 ? (
                stores.map((store, index) => (
                    <StoreCard key={index} store={store} />
                ))
                ) : (
                <p>No stores available for this category.</p>
                )}
            </div>
            </div>
        </main>
        </div>
    );
    }
