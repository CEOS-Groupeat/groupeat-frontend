// store/useBusinessSignupStore.ts
import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { BusinessPayload } from '@/types/signup';

interface BusinessSignupState {
  payload: BusinessPayload;

  updatePayload: (data: Partial<BusinessPayload>) => void;
  resetPayload: () => void;
}

const initialPayload: BusinessPayload = {
  memberId: null,
  agreements: [],
  businessType: null,
  representativeName: '',
  businessName: '',
  openedDate: '',
  businessRegistrationNumber: '',
  businessRegistrationCertificateUrl: '',
  businessValidationToken: '',
  email: '',
  age: null,
  gender: null,
};

export const useBusinessSignupStore = create<BusinessSignupState>()(
  persist(
    (set) => ({
      payload: initialPayload,
      updatePayload: (data) =>
        set((state) => ({ payload: { ...state.payload, ...data } })),
      resetPayload: () => set({ payload: initialPayload }),
    }),
    {
      name: 'business-signup-storage',
    }
  )
);
