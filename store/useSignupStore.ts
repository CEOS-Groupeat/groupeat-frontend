// store/useSignupStore.ts
import { create } from 'zustand';

interface Agreement {
  termsId: number;
  agreed: boolean;
  required: boolean; // 필수 동의 여부 판별용
}

interface SignupState {
  step: number;
  nextStep: () => void;
  prevStep: () => void;

  signupToken: string | null;
  memberType: 'CUSTOMER' | 'BUSINESS' | null;
  agreements: Agreement[];
  phoneNumber: string;

  // 💡 memberId 상태와 액션 추가
  memberId: number | null;
  setMemberId: (id: number) => void;

  setSignupToken: (token: string) => void;
  setMemberType: (type: 'CUSTOMER' | 'BUSINESS') => void;
  setAgreements: (agreements: Agreement[]) => void;
  setPhoneNumber: (phone: string) => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  step: 1,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),

  signupToken: null,
  memberType: null,
  agreements: [],
  phoneNumber: '',
  memberId: null,
  
  setMemberId: (id) => set({ memberId: id }),
  setSignupToken: (token) => set({ signupToken: token }),
  setMemberType: (type) => set({ memberType: type }),
  setAgreements: (agreements) => set({ agreements }),
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
}));
