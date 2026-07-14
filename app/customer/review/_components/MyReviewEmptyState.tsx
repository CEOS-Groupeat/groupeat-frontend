import EmptyState from '@/public/illust/illust_NoResults.svg';

export default function MyReviewEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-[94px]">
      <EmptyState aria-hidden="true" />
      <div className="flex flex-col items-center">
        <p className="text-label1 font-semibold text-text-subtle font-['Pretendard']">
          작성한 리뷰가 없습니다
        </p>
      </div>
    </div>
  );
}
