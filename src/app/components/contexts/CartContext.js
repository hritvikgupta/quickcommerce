// contexts/CartContext.js
'use client';

import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartData, setCartData] = useState([]); // Cart data for multiple stores
  const [isCartOpen, setIsCartOpen] = useState(false); // Cart sidebar visibility

  // Load cart data from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCartData = localStorage.getItem('cartData');
      if (storedCartData) {
        setCartData(JSON.parse(storedCartData));
      }
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartData', JSON.stringify(cartData));
    }
  }, [cartData]);

  // Function to toggle the cart sidebar
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Function to add items to the cart per store
  // ... existing code ...

const addToCart = (storeName, storeImage, product) => {
    setCartData((prevCartData) => {
      // Copy prevCartData to avoid mutation
      const cartDataCopy = prevCartData.map((cart) => ({
        ...cart,
        items: cart.items.map((item) => ({ ...item })),
      }));
  
      // Find the cart index for the store
      const cartIndex = cartDataCopy.findIndex((cart) => cart.storeName === storeName);
  
      if (cartIndex !== -1) {
        // Cart exists, check for the product
        const productIndex = cartDataCopy[cartIndex].items.findIndex((item) => item.id === product.id);
  
        if (productIndex !== -1) {
          // Product exists, increment quantity
          cartDataCopy[cartIndex].items[productIndex].quantity += 1;
        } else {
          // Product doesn't exist, add with quantity 1
          cartDataCopy[cartIndex].items.push({ ...product, quantity: 1 });
        }
      } else {
        // Cart doesn't exist, create new cart for the store
        const newCart = {
          storeName,
          storeImage,
          deliveryTime: 'Delivery by 3:00pm',
          items: [{ ...product, quantity: 1 }],
        };
        cartDataCopy.push(newCart);
      }
  
      return cartDataCopy;
    });
  
    setIsCartOpen(true); // Open the cart sidebar after adding an item
  };
  

  return (
    <CartContext.Provider
      value={{ cartData, setCartData, isCartOpen, setIsCartOpen, toggleCart, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
