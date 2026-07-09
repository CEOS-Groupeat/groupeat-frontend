'use client';
{
  /* 고객 리뷰 페이지입니다. */
}
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useStoreReviews } from './_hooks/useStoreReviews';
import { useReviewSummary } from './_hooks/useReviewSummary';
import ReviewHeader from './_components/ReviewHeader';
import ReviewSummary from './_components/ReviewSummary';
import SectionDivider from '@/components/ui/SectionDivider';
import ReviewSortDropdown from './_components/ReviewSortDropdown';
import ReviewCard from './_components/ReviewCard';
import { SORT_OPTIONS } from './_constants/sortOptions';

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

export default function CustomerStoreReviewPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [sort, setSort] = useState<SortValue>('LATEST');

  const { data: summary } = useReviewSummary(storeId);
  const { data, isLoading, isError } = useStoreReviews({
    storeId,
    sortType: sort,
  });

  const reviews = data?.reviewList ?? [];

  const distribution = summary
    ? [
        { score: 5, count: summary.rating5Count ?? 0 },
        { score: 4, count: summary.rating4Count ?? 0 },
        { score: 3, count: summary.rating3Count ?? 0 },
        { score: 2, count: summary.rating2Count ?? 0 },
        { score: 1, count: summary.rating1Count ?? 0 },
      ]
    : [];

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col mb-10">
      <ReviewHeader storeName={summary?.storeName ?? ''} />
      <ReviewSummary
        averageRating={summary?.averageRating ?? 0}
        distribution={distribution}
      />
      <SectionDivider className="mb-2.5 h-2.25" />
      <ReviewSortDropdown
        value={sort}
        onChange={setSort}
        totalCount={summary?.totalReviewCount ?? reviews.length}
      />
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">로딩 중...</span>
        </div>
      ) : isError ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">
            리뷰를 불러오지 못했어요.
          </span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-10">
          <span className="text-sm text-text-subtle">
            아직 작성된 리뷰가 없어요.
          </span>
        </div>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
        ))
      )}
    </div>
  );
}
