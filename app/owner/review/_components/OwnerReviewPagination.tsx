'use client';

interface OwnerReviewPaginationProps {
  currentPage: number;
  totalPages: number;
  visitedPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function OwnerReviewPagination({
  currentPage,
  totalPages,
  visitedPages,
  onPageChange,
  onNext,
  onPrevious,
}: OwnerReviewPaginationProps) {
  return (
    <div className="flex items-center gap-1 justify-center font-['Pretendard'] my-6">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 0}
        className="size-[30px] px-2.5 py-[5px] rounded-md flex flex-col justify-center items-center disabled:opacity-30"
      >
        <span className="text-center text-label-alternative text-sm font-semibold leading-5 tracking-tight">
          ‹
        </span>
      </button>

      {Array.from({ length: totalPages }, (_, i) => i).map((page) => {
        const isActive = page === currentPage;
        const isClickable = page <= visitedPages;

      return (
          <button
            key={page}
            type="button"
            onClick={() => isClickable && onPageChange(page)}
            disabled={!isClickable}
            className={`size-[30px] rounded-md flex flex-col justify-center items-center ${
              isActive ? 'bg-brand-background' : ''
            } ${!isClickable ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <span
              className={`text-center text-xs leading-4 tracking-tight ${
                isActive
                  ? 'text-brand-default font-semibold'
                  : 'text-label-alternative font-medium'
              }`}
            >
              {page + 1}
            </span>
          </button>
        );
      })}

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage >= visitedPages && currentPage >= totalPages - 1}
        className="size-[30px] px-2.5 py-[5px] rounded-md flex flex-col justify-center items-center disabled:opacity-30"
      >
        <span className="text-center text-label-alternative text-sm font-semibold leading-5 tracking-tight">
          ›
        </span>
      </button>
    </div>
  );
}
