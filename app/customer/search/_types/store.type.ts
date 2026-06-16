// 모든 API 응답의 공통 래퍼
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}

// API 응답에서 storeList 배열의 각 요소 타입
export interface Store {
  storeId: number;
  imageUrl: string;
  name: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  phoneNumber: string;
  rating: number;
  pickupTimeRange: string;
}

// 검색 API 응답의 data 부분
export interface SearchStoresResponse {
  storeList: Store[];
  totalElements: number;
}

// 검색 API 요청할 때 보내는 파라미터
export interface StoreSearchParams {
  keyword?: string;
  region?: string;
  pickupDate?: string; // "2026-05-12"
  pickupTimes?: string[]; // ["12:00:00", "13:00:00"]
  quantity?: number;
  budget?: number; // 10000
  category?: string;
  sortType?: string; // "NONE"
}
