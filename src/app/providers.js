'use client';

import { CartProvider } from '../app/components/contexts/CartContext';
import { AuthProvider } from './AuthContext';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}