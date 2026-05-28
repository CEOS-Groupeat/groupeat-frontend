export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}

export interface Store {
  storeId: number;
  imageUrl: string;
  name: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  phoneNumber: string;
  rating: number;
  pickupTimeRange: string | null;
}

// 실제 API 응답 구조로 수정
export interface SearchStoresResponse {
  storeList: Store[]; 
  page: number;
  size: number;
  totalElements: number;
}

// 실제 쿼리 파라미터명으로 수정
export interface StoreSearchParams {
  keyword?: string;
  location?: string;
  pickupDate?: string; // "2026-05-12"
  pickupTime?: string; // "12:00"
  quantity?: number;
  budget?: number; // minPrice/maxPrice → budget
  category?: string;
  sort?: string; // "RECOMMEND" | "NONE"
}
