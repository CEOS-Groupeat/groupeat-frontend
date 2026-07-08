export type EventType = '강연' | '세미나' | '워크숍' | '소모임' | '기타';

export interface CreateReviewRequest {
  orderId: number;
  rating: number; // 1~5
  eventType: EventType;
  headcount: number;
  perPersonBudget: number;
  content: string; // 0~1000자
  imageUrls: string[];
}

export interface CreateReviewResponse {
  reviewId: number;
  createdAtDate: string; // "2026-07-03"
  createdAtTime: string; // "14:00:00"
}
