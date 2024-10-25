'use client';

import { CartProvider } from '../app/components/contexts/CartContext';

export function Providers({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
