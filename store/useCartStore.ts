import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreCart } from '@/src/types/api';

interface CartState {
  storeCarts: StoreCart[];
  setStoreCarts: (carts: StoreCart[]) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      storeCarts: [],
      setStoreCarts: (carts) => set({ storeCarts: carts }),
      clearCart: () => set({ storeCarts: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
