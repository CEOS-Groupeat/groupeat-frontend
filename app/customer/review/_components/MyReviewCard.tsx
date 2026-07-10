'use client';

import ReviewCard from '@/app/customer/store/[storeId]/review/_components/ReviewCard';
import type { MyReview } from '../_types/myReview.type';

interface MyReviewCardProps {
  review: MyReview;
  onDeleteClick: () => void;
}

export default function MyReviewCard({
  review,
  onDeleteClick,
}: MyReviewCardProps) {
  return (
    <ReviewCard
      review={review}
      onDeleteClick={onDeleteClick}
      // TODO: storeId/storeName 필드 추가되면 storeName, onStoreClick 연결
    />
  );
}
