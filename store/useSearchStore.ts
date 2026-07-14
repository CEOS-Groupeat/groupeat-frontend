import { create } from 'zustand';
import type {
  StoreListData,
  StoreSearchParams,
} from '@/app/customer/search/_types/store.type';

interface SearchStore {
  results: StoreListData | null;
  appliedFilters: StoreSearchParams;
  setResults: (data: StoreListData, filters?: StoreSearchParams) => void;
  clearResults: () => void;
  clearResultsOnly: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  results: null,
  appliedFilters: {},
  setResults: (data, filters = {}) =>
    set({ results: data, appliedFilters: filters }),
  clearResults: () => set({ results: null, appliedFilters: {} }),
  clearResultsOnly: () => set({ results: null }),
}));
