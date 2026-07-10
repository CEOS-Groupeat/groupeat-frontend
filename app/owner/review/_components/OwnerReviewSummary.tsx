'use client';

import type { RatingDistribution } from '@/app/customer/store/[storeId]/review/_types/review.type';
import StarIcon from '@/public/icons/icon_star.svg';
import StarHalfIcon from '@/public/icons/icon_star_half.svg';

interface OwnerReviewSummaryProps {
  storeName: string;
  averageRating: number;
  distribution: RatingDistribution[];
}

export default function OwnerReviewSummary({
  storeName,
  averageRating,
  distribution,
}: OwnerReviewSummaryProps) {
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);
  const fullStars = Math.floor(averageRating);
  const hasDecimal = averageRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasDecimal ? 1 : 0);

  return (
    <div className="px-6 py-5 m-4 bg-background-default rounded-2xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col justify-center items-start gap-2.5 overflow-hidden font-['Pretendard']">
      <div className="self-stretch flex justify-between items-center">
        {/* 왼쪽: 가게명 + 평점 + 별 */}
        <div className="w-20 flex flex-col justify-center items-center gap-1">
          <span className="text-center text-text-default text-body font-medium">
            {storeName}
          </span>
          <div className="self-stretch flex flex-col justify-start items-center">
            <div className="self-stretch text-center">
              <span className="text-text-default text-xl font-bold leading-8">
                {averageRating}
              </span>
              <span className="text-text-placeholder text-base font-semibold leading-6">
                /5
              </span>
            </div>
          </div>
          <div className="flex justify-start items-center">
            {[...Array(fullStars)].map((_, i) => (
              <StarIcon key={`full-${i}`} className="size-4 text-icon-star" />
            ))}
            {hasDecimal && <StarHalfIcon className="size-4 text-icon-star" />}
            {[...Array(emptyStars)].map((_, i) => (
              <StarIcon key={`empty-${i}`} className="size-4 text-icon-disable" />
            ))}
          </div>
        </div>

        {/* 오른쪽: 별점 분포 (고객용과 동일한 방식) */}
        <div className="w-44 flex flex-col gap-0.5">
          {[5, 4, 3, 2, 1].map((score) => {
            const item = distribution.find((d) => d.score === score);
            const count = item?.count ?? 0;
            const barWidth = (count / maxCount) * 100;

            return (
              <div key={score} className="h-4 relative flex items-center">
                <span className="w-5 text-right text-caption2 font-medium text-text-default">
                  {score}점
                </span>
                <div className="relative w-28 h-1 mx-2.5 bg-border-default rounded-full">
                  <div
                    className="absolute left-0 top-0 h-1 bg-brand-default rounded-full"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <span className="text-caption2 font-normal text-text-subtlest">
                  {count}개
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}