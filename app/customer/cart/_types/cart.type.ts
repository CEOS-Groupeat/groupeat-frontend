// 모든 API 응답의 공통 래퍼
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}

// 선택 항목 계산 요청
export interface CalculateCartRequest {
  cartItemIds: number[];
}

// 계산된 개별 아이템 정보
export interface CalculatedCartItem {
  cartItemId: number;
  quantity: number;
  unitPrice: number;
  itemOriginalPrice: number;
  itemDiscountAmount: number;
  itemFinalPrice: number;
}

// 선택 항목 계산 응답
export interface CalculatedCartResponse {
  storeId: number;
  totalQuantity: number;
  totalOriginalPrice: number;
  totalDiscountAmount: number;
  finalPaymentAmount: number;
  calculatedItems: CalculatedCartItem[];
}

// 장바구니 목록 조회
// API 응답에서 cartItems 배열의 각 요소 타입
export interface CartItem {
  cartItemId: number;
  menuSummary: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  discountRate: number;
  finalPrice: number;
}

// 가계별 장바구니 정보
export interface StoreCart {
  storeId: number;
  storeName: string;
  cartItems: CartItem[];
  storeTotalPrice: number;
}

// 장바구니 목록 조회 API 응답
export interface CartListResponse {
  storeCarts: StoreCart[];
}
