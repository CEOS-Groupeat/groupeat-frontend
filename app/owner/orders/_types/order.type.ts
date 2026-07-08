// 모든 API 응답의 공통 래퍼
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'ACCEPTED'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';

// 주문 승인/거절/픽업완료 공통 응답
export interface OrderProcessResponse {
  orderId: number;
  orderStatus: OrderStatus;
  processedDate: string;
  processedTime: string;
}
