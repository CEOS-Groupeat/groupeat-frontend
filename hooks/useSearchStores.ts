import { useState } from 'react';
import { fetchClient } from '@/lib/fetchClient';
import type {
  ApiResponse,
  SearchStoresResponse,
  StoreSearchParams,
} from '@/app/customer/search/_types/store.type';

export function useSearchStores() {
  const [data, setData] = useState<SearchStoresResponse | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (params: StoreSearchParams = {}) => {
    setLoading(true);
    setError(null);

    // ✅ categories 배열은 ?categories=한식&categories=도시락 형태로 직렬화
    const queryParams = new URLSearchParams();

    (Object.entries(params) as [keyof StoreSearchParams, unknown][]).forEach(
      ([key, value]) => {
        if (value === undefined || value === null || value === '') return;

        if (key === 'categories' && Array.isArray(value)) {
          value.forEach((v) => queryParams.append('categories', v));
        } else {
          queryParams.append(key, String(value));
        }
      }
    );

    const query = queryParams.toString();

    try {
      const res = await fetchClient<ApiResponse<SearchStoresResponse>>(
        `/api/search/stores${query ? `?${query}` : ''}`
      );

      if (!res.isSuccess) throw new Error(res.message);

      setData(res.data);
      return res.data;
    } catch (e) {
      const message = e instanceof Error ? e.message : '검색에 실패했어요';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  return { data, isLoading, error, search, reset };
}
