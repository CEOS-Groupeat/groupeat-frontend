import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreCart } from '@/src/types/api';

interface CartState {
  storeCarts: StoreCart[];
  checkoutCart: StoreCart | null;
  discountRate: number;

  setStoreCarts: (carts: StoreCart[]) => void;
  setCheckoutCart: (cart: StoreCart | null) => void;
  setDiscountRate: (rate: number) => void;

  clearCheckoutCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      storeCarts: [],
      checkoutCart: null,
      discountRate: 0,

      setStoreCarts: (carts) => set({ storeCarts: carts }),
      setCheckoutCart: (cart) => set({ checkoutCart: cart }),
      setDiscountRate: (rate) => set({ discountRate: rate }),

      clearCheckoutCart: () => set({ checkoutCart: null }),
      clearCart: () => set({ storeCarts: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
