'use client';

import { useState } from 'react';
import OwnerReviewHeader from './_components/OwnerReviewHeader';
import OwnerReviewSummary from './_components/OwnerReviewSummary';
import OwnerReviewSortDropDown from './_components/OwnerReviewSortDropDown';
import OwnerReviewCard from './_components/OwnerReviewCard';
import OwnerReviewPagination from './_components/OwnerReviewPagination';
import { SORT_OPTIONS } from '@/app/customer/store/[storeId]/review/_constants/sortOptions';
import { useOwnerReviewSummary } from './_hooks/useOwnerReviewSummary';
import { useOwnerReviews } from './_hooks/useOwnerReviews';
import { useCreateReply } from './_hooks/useCreateReply';
import NewReviewToast from './_components/NewReviewToast';
import OwnerNavbar from '@/components/owner/OwnerNavbar';

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

interface CursorState {
  lastReviewId?: number;
  lastRating?: number;
}

export default function OwnerReviewPage() {
  const { data: summary } = useOwnerReviewSummary();
  const { mutateAsync: createReply } = useCreateReply();

  const [sort, setSort] = useState<SortValue>('LATEST');
  const [cursorStack, setCursorStack] = useState<CursorState[]>([{}]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxVisitedPage, setMaxVisitedPage] = useState(0);

  const currentCursor = cursorStack[currentPage];

  const { data, isLoading, isError } = useOwnerReviews({
    sortType: sort,
    lastReviewId: currentCursor.lastReviewId,
    lastRating: currentCursor.lastRating,
    size: 10,
  });

  const reviews = data?.reviewList ?? [];
  const totalPages = Math.ceil((summary?.totalReviewCount ?? 0) / 10);

  const handleSortChange = (newSort: SortValue) => {
    setSort(newSort);
    setCursorStack([{}]);
    setCurrentPage(0);
    setMaxVisitedPage(0);
  };

  const handleNext = () => {
    const lastReview = reviews[reviews.length - 1];
    if (data?.hasNext && lastReview) {
      const nextCursor: CursorState = {
        lastReviewId: lastReview.reviewId,
        lastRating: sort !== 'LATEST' ? lastReview.rating : undefined,
      };
      const nextPage = currentPage + 1;
      setCursorStack((prev) => [...prev.slice(0, currentPage + 1), nextCursor]);
      setCurrentPage(nextPage);
      setMaxVisitedPage((prev) => Math.max(prev, nextPage));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handlePageChange = (page: number) => {
    if (page <= maxVisitedPage) {
      setCurrentPage(page);
    }
  };

  const distribution = summary
    ? [
        { score: 5, count: summary.rating5Count ?? 0 },
        { score: 4, count: summary.rating4Count ?? 0 },
        { score: 3, count: summary.rating3Count ?? 0 },
        { score: 2, count: summary.rating2Count ?? 0 },
        { score: 1, count: summary.rating1Count ?? 0 },
      ]
    : [];

  const unrepliedCount = reviews.filter((r) => !r.ownerReplyContent).length;

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col pb-[74px]">
      <OwnerReviewHeader />

      <OwnerReviewSummary
        storeName={summary?.storeName ?? ''}
        averageRating={summary?.averageRating ?? 0}
        distribution={distribution}
      />

      <OwnerReviewSortDropDown
        totalCount={summary?.totalReviewCount ?? 0}
        value={sort}
        onChange={handleSortChange}
      />

      <div className="px-4 gap-5 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <span className="text-sm text-text-subtle">로딩 중...</span>
          </div>
        ) : isError ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <span className="text-sm text-text-subtle">
              리뷰 목록을 불러오지 못했어요.
            </span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <span className="text-sm text-text-subtle">
              아직 작성된 리뷰가 없어요.
            </span>
          </div>
        ) : (
          reviews.map((review, index) => (
            <div key={review.reviewId}>
              <OwnerReviewCard
                review={review}
                storeName={summary?.storeName ?? ''}
                onSubmitReply={async (content) => {
                  await createReply({
                    reviewId: review.reviewId!,
                    payload: { replyContent: content },
                  });
                }}
              />
              {index < reviews.length - 1 && (
                <div className="h-px bg-border-divider mt-6" />
              )}
            </div>
          ))
        )}
      </div>

      {!isLoading && !isError && reviews.length > 0 && (
        <OwnerReviewPagination
          currentPage={currentPage}
          totalPages={totalPages}
          visitedPages={maxVisitedPage}
          onPageChange={handlePageChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      <NewReviewToast count={unrepliedCount} />
      <OwnerNavbar />
    </div>
  );
}
