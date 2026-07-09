'use client';

import type { RatingDistribution } from '../_types/review.type';
import StarIcon from '@/public/icons/icon_star.svg';
import StarHalfIcon from '@/public/icons/icon_star_half.svg';

interface ReviewSummaryProps {
  averageRating: number;
  distribution: RatingDistribution[];
}

export default function ReviewSummary({
  averageRating,
  distribution,
}: ReviewSummaryProps) {
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);
  const fullStars = Math.floor(averageRating);
  const hasDecimal = averageRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasDecimal ? 1 : 0);

  return (
    <div className="px-2.5 py-5 flex justify-center items-center gap-8 font-['Pretendard']">
      <div className="w-20 flex flex-col gap-2">
        <div className="text-center">
          <span className="text-2xl font-bold text-text-default">
            {averageRating}
          </span>
          <span className="text-lg font-semibold text-text-placeholder">
            /5
          </span>
        </div>
        <div className="flex justify-start">
          {[...Array(fullStars)].map((_, i) => (
            <StarIcon key={`full-${i}`} className="size-4 text-icon-star" />
          ))}
          {hasDecimal && <StarHalfIcon className="size-4 text-icon-star" />}
          {[...Array(emptyStars)].map((_, i) => (
            <StarIcon key={`empty-${i}`} className="size-4 text-icon-disable" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        {[5, 4, 3, 2, 1].map((score) => {
          const item = distribution.find((d) => d.score === score);
          const count = item?.count ?? 0;
          const barWidth = (count / maxCount) * 100;

          return (
            <div key={score} className="h-4 relative flex items-center">
              <span className="w-[19px] text-caption2 font-medium text-text-default">
                {score}점
              </span>
              <div className="relative w-30 h-1 mx-2.5 bg-border-default rounded-full">
                <div
                  className="absolute left-0 top-0 h-1 bg-brand-default rounded-full"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <span className="text-caption2 font-medium text-text-subtlest">
                {count}개
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
