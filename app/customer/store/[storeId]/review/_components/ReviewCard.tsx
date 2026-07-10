'use client';

import type { Review } from '@/src/types/api';
import Image from 'next/image';
import { formatReviewDate } from '../_utils/formatReviewDate';
import StarIcon from '@/public/icons/icon_star.svg';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const eventInfo = [
    { label: '행사 유형', value: review.eventType },
    { label: '행사 인원', value: `${review.headcount}명` },
    {
      label: '1인당 예산',
      value: `${review.perPersonBudget?.toLocaleString() ?? 0}원`,
    },
  ];

  return (
    <div className="mx-4 py-5 border-b border-border-default flex flex-col gap-3 font-['Pretendard']">
      {/* 유저 정보 + 날짜 */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <div className="size-[26px] rounded-full bg-background-subtle" />
            <span className="text-body font-semibold text-text-default">
              {review.authorNickname}
            </span>
          </div>
          <span className="text-caption2 font-normal text-text-subtlest">
            {formatReviewDate(review.createdAt ?? '')}
          </span>
        </div>

        {/* 별점 + 행사 정보 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`size-4 ${i < (review.rating ?? 0) ? 'text-icon-star' : 'text-icon-disable'}`}
                />
              ))}
            </div>
            <span className="text-caption1 font-semibold text-text-default">
              {review.rating}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-caption1">
            {eventInfo.map((info, i) => (
              <div key={info.label} className="flex items-center gap-1.5">
                <div className="flex gap-1">
                  <span className="font-normal text-text-subtlest">
                    {info.label}
                  </span>
                  <span className="font-semibold text-text-subtle">
                    {info.value}
                  </span>
                </div>
                {i < eventInfo.length - 1 && (
                  <span className="font-normal text-text-subtlest">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-label1 text-text-default font-normal">
        {review.content}
      </p>

      {review.imageUrls && review.imageUrls.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          {review.imageUrls.map((src, i) => (
            <div
              key={i}
              className="relative size-[125px] rounded-lg overflow-hidden shrink-0"
            >
              <Image
                src={src}
                alt={`리뷰 이미지 ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {review.orderedMenuNames?.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 rounded-full outline outline-1 outline-border-default text-caption1 text-text-default font-normal"
          >
            {tag}
          </span>
        ))}
      </div>

      {review.ownerReply && (
        <div className="px-4 py-3 bg-border-divider rounded-r-2xl rounded-bl-2xl flex flex-col gap-0.5">
          <div className="flex justify-between items-center">
            <span className="text-label1 text-text-default font-semibold">
              {review.ownerReply.storeName}
            </span>
            <span className="text-caption2 text-text-subtlest font-normal">
              {formatReviewDate(review.ownerReply.repliedAt ?? '')}
            </span>
          </div>
          <p className="text-label2 text-text-strong font-normal whitespace-pre-line">
            {review.ownerReply.replyContent}
          </p>
        </div>
      )}
    </div>
  );
}
