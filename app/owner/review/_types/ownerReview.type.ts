import type { GetResponse, PostRequest, PostResponse } from '@/src/types/api';

export type OwnerReviewListResponse = GetResponse<'/api/owner/reviews'>;
export type OwnerReviewListData = NonNullable<OwnerReviewListResponse['data']>;
export type OwnerReview = NonNullable<
  OwnerReviewListData['reviewList']
>[number];

export type OwnerReviewSummaryResponse =
  GetResponse<'/api/owner/reviews/summary'>;
export type OwnerReviewSummaryData = NonNullable<
  OwnerReviewSummaryResponse['data']
>;

export type CreateReplyRequest =
  PostRequest<'/api/owner/reviews/{reviewId}/reply'>;
export type CreateReplyResponse =
  PostResponse<'/api/owner/reviews/{reviewId}/reply'>;
