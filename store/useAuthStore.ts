// store/useAuthStore.ts
import { create } from 'zustand';

interface User {
  memberId: number;
  memberType: 'CUSTOMER' | 'BUSINESS';
  memberStatus: 'ACTIVE' | 'BUSINESS_PENDING' | 'WITHDRAWN';
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  setUser: (user) => set({ user, isAuth: !!user }),
  logout: () => set({ user: null, isAuth: false }),
}));