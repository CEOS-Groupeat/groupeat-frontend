// types/store.ts

// 응답 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}

// 가게 상세
export interface StoreDetail {
  storeId: number;
  imageUrl: string;
  storeName: string;
  address: string;
  reviewRating: number;
  reviewCount: number;
  phoneNumber: string;
  description: string;
  closedDays: string;
  pickupOpenTime: string;
  pickupCloseTime: string;
  minOrderDays: number;
  discountConditionQuantity: number;
  discountRate: number;
  orderProcess: string;
}