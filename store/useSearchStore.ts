import { create } from 'zustand';
import type {
  SearchStoresResponse,
  StoreSearchParams,
} from '@/app/customer/search/_types/store.type';

interface SearchStore {
  results: SearchStoresResponse | null;
  appliedFilters: StoreSearchParams;
  setResults: (data: SearchStoresResponse, filters?: StoreSearchParams) => void;
  clearResults: () => void;
  clearResultsOnly: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  results: null,
  appliedFilters: {},
  setResults: (data, filters = {}) =>
    set({ results: data, appliedFilters: filters }), //  필터도 함께 저장
  clearResults: () => set({ results: null, appliedFilters: {} }),
  clearResultsOnly: () => set({ results: null }),
}));
