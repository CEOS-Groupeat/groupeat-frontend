import { create } from 'zustand';

interface Agreement {
  termsId: number;
  agreed: boolean;
}

interface SignupState {
  signupToken: string | null;
  phoneNumber: string;
  agreements: Agreement[];
  
  setSignupToken: (token: string) => void;
  setPhoneNumber: (phone: string) => void;
  setAgreements: (agreements: Agreement[]) => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  signupToken: null,
  phoneNumber: '',
  agreements: [],
  
  setSignupToken: (token) => set({ signupToken: token }),
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  setAgreements: (agreements) => set({ agreements }),
}));