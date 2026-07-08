'use client';
{
  /* 고객 리뷰 페이지입니다. */
}
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useStoreReviews } from './_hooks/useStoreReviews';
import { useStoreDetail } from './_hooks/useStoreDetail';
import ReviewHeader from './_components/ReviewHeader';
import SectionDivider from '@/components/ui/SectionDivider';
import ReviewSortDropdown from './_components/ReviewSortDropdown';
import ReviewCard from './_components/ReviewCard';
//import ReviewSummary from './_components/ReviewSummary';

export default function CustomerStoreReviewPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [sort, setSort] = useState('LATEST');

  const { data: storeDetail } = useStoreDetail(storeId);
  const { data, isLoading, isError } = useStoreReviews({ storeId });

  const reviews = data?.reviewList ?? [];
  // const sortedReviews = [...mockReviews].sort((a, b) => {
  //   if (sort === 'RATING_HIGH') return b.rating - a.rating;
  //   if (sort === 'RATING_LOW') return a.rating - b.rating;
  //   return 0;
  // });

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col mb-10">
      <ReviewHeader storeName={storeDetail?.storeName ?? ''} />
      {/* TODO: 리뷰 요약 API 연동 후 활성화 */}
      {/* <ReviewSummary
        averageRating={mockReviewSummary.averageRating}
        distribution={mockReviewSummary.distribution}
      /> */}
      <SectionDivider className="mb-2.5 h-2.25" />
      <ReviewSortDropdown
        value={sort}
        onChange={(v) => {
          setSort(v);
        }}
        totalCount={storeDetail?.reviewCount ?? reviews.length}
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
      ) : (
        data?.reviewList.map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
        ))
      )}
    </div>
  );
}
