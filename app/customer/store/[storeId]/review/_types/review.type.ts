import { ApiResponse } from '@/app/customer/search/_types/store.type';

export interface OwnerReply {
  storeName: string;
  replyContent: string;
  repliedAt: string;
}

export interface Review {
  reviewId: number;
  authorNickname: string;
  rating: number;
  eventType: string;
  headcount: number;
  perPersonBudget: number;
  content: string;
  createdAt: string;
  imageUrls: string[];
  orderedMenuNames: string[];
  ownerReply?: OwnerReply;
}

export interface ReviewListData {
  reviewList: Review[];
  hasNext: boolean;
  nextCursor: number | null;
}

export type ReviewListResponse = ApiResponse<ReviewListData>;

// TODO: 리뷰 요약 API 연동 후 활성화 (백엔드 구현 대기중)
// export interface RatingDistribution {
//   score: number;
//   count: number;
// }
