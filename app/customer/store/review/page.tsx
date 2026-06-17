'use client';
{
  /* 고객 리뷰 페이지입니다. */
}
import { useState } from 'react';
import { mockReviews } from './_mocks/reviews.mock';
import { mockReviewSummary } from './_mocks/reviews.mock';
import ReviewHeader from './_components/ReviewHeader';
import ReviewSummary from './_components/ReviewSummary';
import SectionDivider from '@/components/ui/SectionDivider';
import ReviewSortDropdown from './_components/ReviewSortDropdown';
import ReviewCard from './_components/ReviewCard';

export default function CustomerStoreReviewPage() {
  const [sort, setSort] = useState('LATEST');
  const sortedReviews = [...mockReviews].sort((a, b) => {
    if (sort === 'RATING_HIGH') return b.rating - a.rating;
    if (sort === 'RATING_LOW') return a.rating - b.rating;
    return 0;
  });
  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col mb-10">
      <ReviewHeader storeName={'데이브런치'} />
      <ReviewSummary
        averageRating={mockReviewSummary.averageRating}
        distribution={mockReviewSummary.distribution}
      />
      <SectionDivider className="mb-2.5" />
      <ReviewSortDropdown
        value={sort}
        onChange={(v) => {
          setSort(v);
        }}
        totalCount={mockReviews.length}
      />
      {sortedReviews.map((review) => (
        <ReviewCard key={review.reviewId} review={review} />
      ))}
    </div>
  );
}
