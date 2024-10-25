// components/CartSidebar.js
'use client';

import { useContext } from 'react';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { X } from 'lucide-react';
import Image from 'next/image';
import { CartContext } from '../components/contexts/CartContext';

export function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cartData } = useContext(CartContext);

  if (!isCartOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Set text color to black for all content */}
      <div className="text-black h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">Carts</h2>
            <p className="text-sm text-gray-700">Shopping in 92646</p>
          </div>
          <Button variant="ghost" onClick={() => setIsCartOpen(false)}>
            <X className="h-6 w-6 text-black" />
          </Button>
        </div>
        {/* Cart Content */}
        <ScrollArea className="flex-grow">
          {cartData.length === 0 ? (
            <div className="p-4">
              <p className="text-center text-gray-700">Your cart is empty.</p>
            </div>
          ) : (
            cartData.map((cart, index) => (
              <div key={index} className="p-4 border-b">
                {/* Store Header */}
                <div className="flex items-center mb-4">
                  <Image
                    src={cart.storeImage}
                    alt={cart.storeName}
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                  <div>
                    <h3 className="font-bold">{cart.storeName}</h3>
                    <p className="text-sm">Personal Cart</p>
                    <p className="text-sm text-green-600">{cart.deliveryTime}</p>
                  </div>
                </div>
                {/* Product List */}
                <div className="flex flex-col gap-2 mb-4">
                  {cart.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div className="ml-2 flex-1">
                        <p className="text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">${item.price}</p>
                    </div>
                  ))}
                </div>
                {/* Continue Shopping / Checkout Button */}
                <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          onClick={() => {
            setIsCartOpen(false);
            router.push(`/store/${encodeURIComponent(cart.storeName.toLowerCase().replace(/\s+/g, '_'))}`);
          }}
        >
          Continue Shopping
        </Button>
              </div>
            ))
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
