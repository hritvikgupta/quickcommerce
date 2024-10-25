"use client"; // This marks the component as a Client Component

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react"; // Import the shopping cart icon
import Promotions from "./Promotions"; // Import the Promotions component
import { useEffect, useState } from "react";
import { CartSidebar } from './CartSidebar'; // Import the CartSidebar

export default function StoreCards() {
  const [retailersData, setRetailersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [isCartOpen, setIsCartOpen] = useState(false); // State to handle cart sidebar visibility

  useEffect(() => {
    // Fetch the data from retailers.json
    fetch("/data/retailers.json")
      .then((response) => response.json())
      .then((data) => {
        setRetailersData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching retailers data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Simple loading state
  }

  if (!retailersData) {
    return <div>No data available.</div>; // If no data is found
  }

  // Toggle cart sidebar visibility
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Handle adding items to the cart
  const handleAddToCart = (store, product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id && item.storeName === store.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.storeName === store.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, storeName: store.name, quantity: 1 }];
    });
    setIsCartOpen(true); // Open the cart after adding
  };

  // Define promotions (static data for demo purposes)
  const promotions = [
    {
      title: "Shop Exclusive Offers!",
      description: "Get an additional 10% off on selected stores.",
      buttonText: "Shop Now",
      imageSrc: "/images/maxresdefault.jpg"
    },
    {
      title: "Limited Time Offer!",
      description: "Save big with discounts on groceries this weekend.",
      buttonText: "See Deals",
      imageSrc: "/images/download (4).jpeg"
    },
    {
      title: "New Year Specials!",
      description: "Up to 50% off on home essentials.",
      buttonText: "Grab Now",
      imageSrc: "/images/download (5).jpeg"
    },
  ];

  // Render store icons for each category
  const renderStoreIcons = (storeList) => (
    <div className="flex flex-wrap justify-start gap-4"> {/* Reduced gap between icons */}
      {storeList.map((store) => (
        <Link 
          href={`/store/${encodeURIComponent(store.name.toLowerCase())}`} 
          key={store.name}
          className="hover:opacity-80 transition-opacity"
        >
          <div className="flex flex-col items-center w-28 mb-3 relative"> {/* Reduced bottom margin */}
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center mb-2 relative"> {/* Use rounded-md for slight roundness */}
              {/* Store logo */}
              <Image 
                src={store.logo} 
                alt={`${store.name} logo`} 
                width={64} 
                height={64} 
                className="object-cover rounded-md" // Ensure the image fills the square shape with rounded corners
              />

              {/* Cart Icon with Quantity */}
              <div className="absolute top-0 right-0 bg-black text-white rounded-md flex items-center justify-center w-10 h-6">
                <ShoppingCart className="h-3 w-3" />
                {store.cartItems > 0 && (
                  <span className="ml-1 text-xs">{store.cartItems}</span> /* Display the number of items in cart */
                )}
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-800 text-center">{store.name}</p>
            <p className="text-xs text-gray-600 text-center">{store.time || store.offer}</p>
          </div>
        </Link>
      ))}
    </div>
  );

  // Cart data to display in the sidebar
  const cartData = [{
    storeName: "Your Cart",
    items: cartItems
  }];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4 bg-white"> {/* Added bg-white to ensure white background */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Your Stores</h2> {/* Reduced bottom margin */}
        {/* Updated to filter based on category array */}
        {renderStoreIcons(Object.values(retailersData))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Grocery Stores</h2> {/* Reduced bottom margin */}
        {/* Updated to filter based on category array */}
        {renderStoreIcons(Object.values(retailersData).filter(store => store.categories?.includes("Grocery and Supermarkets")))}
      </section>

      {/* Carousel promotional banner below Your Stores */}
      <div className="w-full"> {/* Make the carousel take the full width */}
        <Promotions promotions={promotions} />
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Other Stores</h2> {/* Reduced bottom margin */}
        {/* Updated to exclude "Fashion and Lifestyle" and "Grocery and Supermarkets" categories */}
        {renderStoreIcons(Object.values(retailersData).filter(store => !store.categories?.includes("Fashion and Lifestyle") && !store.categories?.includes("Grocery and Supermarkets")))}
      </section>

      {/* Another promotional banner if needed below Grocery Stores */}
      <div className="w-full">
        <Promotions promotions={promotions} />
      </div>

      {/* Cart Sidebar for showing cart items */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        carts={cartData}
      />
    </div>
  );
}
