'use client';

import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  return (
    <ReviewCard
      review={review}
      storeName={review.storeName}
      onStoreClick={() => router.push(`/customer/store/${review.storeId}`)}
      onDeleteClick={onDeleteClick}
    />
  );
}
