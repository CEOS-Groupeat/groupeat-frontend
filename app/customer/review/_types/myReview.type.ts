import type { GetResponse, DeleteResponse } from '@/src/types/api';

export type MyReviewListResponse = GetResponse<'/api/reviews/my'>;
export type MyReviewListData = NonNullable<MyReviewListResponse['data']>;
export type MyReview = NonNullable<MyReviewListData['reviewList']>[number];

export type DeleteMyReviewResponse = DeleteResponse<'/api/reviews/{reviewId}'>;
