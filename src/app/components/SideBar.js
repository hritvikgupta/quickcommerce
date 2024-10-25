"use client"; // This tells Next.js that this is a client-side component

import { Home, Tag, ShoppingBag, Coffee, Wine, Shirt, Package, ShoppingCart, Heart, Gift } from "lucide-react";
import Link from "next/link"; // Import Link for navigation
import { usePathname, useSearchParams } from "next/navigation"; // Import useSearchParams to get the query params
import Image from "next/image";

export default function SideBar() {
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get the current query parameters

  const currentCategory = searchParams.get('title'); // Extract the "title" query param

  // Function to determine if a tab is active based on the current pathname or category
  const isActiveTab = (category) => pathname === '/main' && category === 'home' || currentCategory?.toLowerCase() === category.toLowerCase();

  // Dark green color for the active tab
  const getButtonStyles = (isActive) => `
    w-full py-2 px-4 rounded-md flex items-center justify-start gap-2
    ${isActive ? 'bg-green-800 text-white' : 'text-black hover:bg-gray-100'} 
    transition-colors duration-200
  `;

  return (
    <aside className="w-64 bg-white text-black shadow-md hidden md:flex flex-col h-screen overflow-y-auto z-20 bg-stone-50">
      <div className="flex-shrink-0 flex flex-col items-start py-5 pl-4 bg-orange-50	 shadow-sm	">
        {/* Changed title to dark green color */}
        {/* <h1 className="text-3xl font-bold text-green-800">InstaMarkt</h1> */}
        <Image
    src="/images/logo.png" // Update with your logo's path
    alt="InstaMarkt Logo"
    width={230} // Adjust width as needed
    height={150} // Adjust height as needed
    className="object-contain" // Ensures the image scales correctly
  />
      </div>

      <div className="flex-grow overflow-y-auto space-y-1 px-4 mt-5">
        {/* Main navigation items */}
        <Link href="/main" onClick={() => isActiveTab('home')}>
          <div className={getButtonStyles(isActiveTab('home'))}>
            <Home className="h-5 w-5" />
            <span>Home</span>
          </div>
        </Link>

        <Link href="/category?title=Offers" onClick={() => isActiveTab('offers')}>
          <div className={getButtonStyles(isActiveTab('offers'))}>
            <Tag className="h-5 w-5" />
            <span>Offers</span>
          </div>
        </Link>

        <Link href="/category?title=Grocery" onClick={() => isActiveTab('grocery')}>
          <div className={getButtonStyles(isActiveTab('grocery'))}>
            <ShoppingBag className="h-5 w-5" />
            <span>Grocery</span>
          </div>
        </Link>

        <Link href="/category?title=Convenience" onClick={() => isActiveTab('convenience')}>
          <div className={getButtonStyles(isActiveTab('convenience'))}>
            <Coffee className="h-5 w-5" />
            <span>Convenience</span>
          </div>
        </Link>

        <Link href="/category?title=Alcohol" onClick={() => isActiveTab('alcohol')}>
          <div className={getButtonStyles(isActiveTab('alcohol'))}>
            <Wine className="h-5 w-5" />
            <span>Alcohol</span>
          </div>
        </Link>

        <Link href="/category?title=Retail" onClick={() => isActiveTab('retail')}>
          <div className={getButtonStyles(isActiveTab('retail'))}>
            <Shirt className="h-5 w-5" />
            <span>Retail</span>
          </div>
        </Link>

        <Link href="/category?title=In-store Prices" onClick={() => isActiveTab('in-store-prices')}>
          <div className={getButtonStyles(isActiveTab('in-store-prices'))}>
            <Package className="h-5 w-5" />
            <span>In-store prices</span>
          </div>
        </Link>

        <Link href="/category?title=Local" onClick={() => isActiveTab('local')}>
          <div className={getButtonStyles(isActiveTab('local'))}>
            <ShoppingBag className="h-5 w-5" />
            <span>Local</span>
          </div>
        </Link>

        <Link href="/category?title=Wholesale" onClick={() => isActiveTab('wholesale')}>
          <div className={getButtonStyles(isActiveTab('wholesale'))}>
            <Package className="h-5 w-5" />
            <span>Wholesale</span>
          </div>
        </Link>

        <Link href="/category?title=Pharmacy" onClick={() => isActiveTab('pharmacy')}>
          <div className={getButtonStyles(isActiveTab('pharmacy'))}>
            <Heart className="h-5 w-5" />
            <span>Pharmacy</span>
          </div>
        </Link>

        <Link href="/category?title=Pets" onClick={() => isActiveTab('pets')}>
          <div className={getButtonStyles(isActiveTab('pets'))}>
            <ShoppingCart className="h-5 w-5" />
            <span>Pets</span>
          </div>
        </Link>

        <Link href="/category?title=Beauty" onClick={() => isActiveTab('beauty')}>
          <div className={getButtonStyles(isActiveTab('beauty'))}>
            <Heart className="h-5 w-5" />
            <span>Beauty</span>
          </div>
        </Link>

        <Link href="/category?title=Gifts" onClick={() => isActiveTab('gifts')}>
          <div className={getButtonStyles(isActiveTab('gifts'))}>
            <Gift className="h-5 w-5" />
            <span>Gifts</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
