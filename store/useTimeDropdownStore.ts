import { create } from 'zustand';

interface TimeDropdownState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useTimeDropdownStore = create<TimeDropdownState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));