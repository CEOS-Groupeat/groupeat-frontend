import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreCart } from '@/src/types/api';

interface CartState {
  storeCarts: StoreCart[];
  checkoutCart: StoreCart | null;
  discountRate: number;
  pickupDate: string | null;
  pickupTime: string | null;

  setStoreCarts: (carts: StoreCart[]) => void;
  setCheckoutCart: (cart: StoreCart | null) => void;
  setDiscountRate: (rate: number) => void;
  setPickupInfo: (date: string, time: string) => void;

  clearCheckoutCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      storeCarts: [],
      checkoutCart: null,
      discountRate: 0,
      pickupDate: '',
      pickupTime: '',

      setStoreCarts: (carts) => set({ storeCarts: carts }),
      setCheckoutCart: (cart) => set({ checkoutCart: cart }),
      setDiscountRate: (rate) => set({ discountRate: rate }),
      setPickupInfo: (date, time) => set({ pickupDate: date, pickupTime: time }),

      clearCheckoutCart: () => set({ checkoutCart: null }),
      clearCart: () => set({ storeCarts: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
