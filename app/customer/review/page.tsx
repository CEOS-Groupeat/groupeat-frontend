'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BackIcon from '@/public/icons/icon_arrow_Left.svg';
import MyReviewCard from './_components/MyReviewCard';
import ReviewDeleteConfirmModal from './_components/ReviewDeleteConfirmModal';
import MyReviewEmptyState from './_components/MyReviewEmptyState';
import ToastError from '@/components/ui/ToastError';
import { useMyReviews } from './_hooks/useMyReviews';
import { useDeleteMyReview } from './_hooks/useDeleteMyReview';

export default function MyReviewPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useMyReviews();
  const { mutateAsync: deleteReview } = useDeleteMyReview();

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const errorToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reviews = data?.reviewList ?? [];
  const totalCount = reviews.length;

  const showError = (message: string) => {
    if (errorToastTimerRef.current) {
      clearTimeout(errorToastTimerRef.current);
    }
    setErrorMessage(message);
    setShowErrorToast(true);
    errorToastTimerRef.current = setTimeout(() => {
      setShowErrorToast(false);
      errorToastTimerRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (errorToastTimerRef.current) {
        clearTimeout(errorToastTimerRef.current);
      }
    };
  }, []);

  const handleDeleteConfirm = async () => {
    if (deleteTargetId === null) return;
    try {
      await deleteReview(deleteTargetId);
      setDeleteTargetId(null);
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      showError('리뷰 삭제에 실패했어요. 다시 시도해주세요.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col">
      <div className="flex w-full mt-10 py-4 px-4 relative">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로가기"
        >
          <BackIcon className="size-5 text-icon-default" />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-text-default text-headline3 font-semibold font-['Pretendard']">
          내 리뷰
        </span>
      </div>

      <div className="px-4 py-1.5 flex items-center">
        <span className="text-text-default text-label2 font-medium font-['Pretendard']">
          리뷰({totalCount})
        </span>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">로딩 중...</span>
        </div>
      ) : isError ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-text-subtle">
            리뷰 목록을 불러오지 못했어요.
          </span>
        </div>
      ) : reviews.length === 0 ? (
        <MyReviewEmptyState />
      ) : (
        reviews.map((review) => (
          <MyReviewCard
            key={review.reviewId}
            review={review}
            onDeleteClick={() => setDeleteTargetId(review.reviewId ?? null)}
          />
        ))
      )}

      {deleteTargetId !== null && (
        <ReviewDeleteConfirmModal
          onClose={() => setDeleteTargetId(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {showErrorToast && <ToastError text={errorMessage} />}
    </div>
  );
}
