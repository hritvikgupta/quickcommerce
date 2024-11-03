'use client'
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { CartContext } from '../components/contexts/CartContext';

export function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cartData } = useContext(CartContext);
  const router = useRouter();

  if (!isCartOpen) {
    return null;
  }

  const calculateTotal = (cart) => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/CartCheckoutPage');
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 text-black ease-in-out z-50`}
    >
      <div className="text-black h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl  text-black font-bold">Carts</h2>
            <p className="text-sm   text-black text-gray-700">Shopping in 92646</p>
          </div>
          <Button variant="ghost" onClick={() => setIsCartOpen(false)}>
            <X className="h-6 w-6 text-black" />
          </Button>
        </div>

        {/* Cart Content */}
        <ScrollArea className="flex-grow">
          {cartData.length === 0 ? (
            <div className="p-4 flex  text-black flex-col items-center justify-center h-full">
              <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-center  text-black text-gray-700">Your cart is empty.</p>
            </div>
          ) : (
            <div className="divide-y">
              {cartData.map((cart, index) => (
                <div key={index} className="p-4">
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
                      <h3 className=" text-black font-bold">{cart.storeName}</h3>
                      <p className=" text-black text-sm">Personal Cart</p>
                      <p className=" text-black text-sm text-green-600">{cart.deliveryTime}</p>
                    </div>
                  </div>

                  {/* Product List */}
                  <div className=" text-black flex flex-col gap-2 mb-4">
                    {cart.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div className=" text-black ml-2 flex-1">
                          <p className=" text-black text-sm">{item.name}</p>
                          <p className=" text-black text-xs text-gray-600">
                            Size: {item.size} • Qty: {item.quantity}
                          </p>
                        </div>
                        <p className=" text-black text-sm font-semibold">${item.price}</p>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal and Buttons */}
                  <div className="space-y-3">
                    <div className="flex  text-black justify-between text-sm font-semibold">
                      <span className=' text-black'>Subtotal</span>
                      <span className=' text-black'>${calculateTotal(cart).toFixed(2)}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setIsCartOpen(false);
                          router.push(`/store/${encodeURIComponent(cart.storeName.toLowerCase().replace(/\s+/g, '_'))}`);
                        }}
                      >
                        Continue Shopping
                      </Button>
                      
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleCheckout}
                      >
                        Go to Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer with Total and Checkout Button */}
        {cartData.length > 0 && (
          <div className="border-t p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">Total ({cartData.reduce((acc, cart) => 
                  acc + cart.items.reduce((sum, item) => sum + item.quantity, 0), 0)} items)</p>
                <p className="text-lg font-bold">
                  ${cartData.reduce((acc, cart) => acc + calculateTotal(cart), 0).toFixed(2)}
                </p>
              </div>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-8"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}