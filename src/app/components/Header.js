// components/Header.js
'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import { CartContext } from '../components/contexts/CartContext';
import { Button } from "./ui/button";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import Image from 'next/image';

export default function Header() {
  const { toggleCart, cartData } = useContext(CartContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Calculate total number of items in cart
  const totalCartItems = cartData.reduce((total, cart) => {
    const cartTotal = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    return total + cartTotal;
  }, 0);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Example address data; in a real application, this would come from user data/context
  const [address, setAddress] = useState('123 Main Street, City, Country');

  // Function to handle address update (placeholder for actual implementation)
  const handleAddressUpdate = () => {
    // Implement address update logic here
    // For example, open a modal to edit the address
    alert('Address update functionality to be implemented.');
  };

  return (
    <header className="bg-orange-50 shadow-sm py-5 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Left side (logo or navigation) */}
        <div className="flex items-center space-x-4">
          {/* Logo or additional navigation items can be added here */}
          {/* Example: <a href="/" className="text-xl font-bold text-gray-800">MyStore</a> */}
        </div>

        {/* Middle (search bar) */}
        <div className="flex-grow mx-4 max-w-s">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:border-green-800"
            />
          </div>
        </div>

        {/* Right side (address dropdown and cart icon) */}
        <div className="flex items-center space-x-4 relative">
          {/* Address Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <span>{address}</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <button
                  onClick={handleAddressUpdate}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Update Address
                </button>
                {/* Add more dropdown items here if needed */}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Button
            className="bg-green-800 text-white flex items-center justify-center px-4 py-2 rounded-full focus:outline-none hover:bg-green-700 active:bg-green-800"
            onClick={toggleCart}
            aria-label="Open Cart"
          >
            <ShoppingCart className="mr-2 h-5 w-5 text-white" />
            {totalCartItems > 0 && <span className="ml-1">{totalCartItems}</span>}
          </Button>
        </div>
      </div>
    </header>
  );
}
