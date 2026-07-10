'use client';
{
  /* 리뷰 페이지입니다. */
}
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

export default function OwnerReviewPage() {
  const { data: summary } = useOwnerReviewSummary();
  const { mutateAsync: createReply } = useCreateReply();
  const [sort, setSort] = useState<SortValue>('LATEST');

  const [cursorStack, setCursorStack] = useState<(number | undefined)[]>([
    undefined,
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxVisitedPage, setMaxVisitedPage] = useState(0);

  const { data, isLoading, isError } = useOwnerReviews({
    lastReviewId: cursorStack[currentPage],
  });

  const reviews = data?.reviewList ?? [];

  const totalPages = Math.ceil((summary?.totalReviewCount ?? 0) / 10);

  const handleNext = () => {
    if (data?.hasNext && data?.nextCursor !== undefined) {
      const nextPage = currentPage + 1;
      setCursorStack((prev) => [
        ...prev.slice(0, currentPage + 1),
        data.nextCursor,
      ]);
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
      {/* TODO: 백엔드에 sortType 파라미터 추가 요청함. API 반영되면 useOwnerReviews에 sortType 연결 필요 */}
      <OwnerReviewSortDropDown
        totalCount={reviews.length}
        value={sort}
        onChange={setSort}
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
          reviews.map((review) => (
            // TODO: OwnerReviewCard 컴포넌트로 교체 예정
            <OwnerReviewCard
              key={review.reviewId}
              review={review}
              storeName={summary?.storeName ?? ''}
              onSubmitReply={async (content) => {
                await createReply({
                  reviewId: review.reviewId!,
                  payload: { replyContent: content },
                });
              }}
            />
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
