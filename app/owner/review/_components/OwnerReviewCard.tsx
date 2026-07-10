'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { OwnerReview } from '../_types/ownerReview.type';
import { formatReviewDate } from '@/app/customer/store/[storeId]/review/_utils/formatReviewDate';
import StarIcon from '@/public/icons/icon_star.svg';

interface OwnerReviewCardProps {
  review: OwnerReview;
  storeName: string;
  onSubmitReply: (content: string) => Promise<void>;
}

export default function OwnerReviewCard({
  review,
  storeName,
  onSubmitReply,
}: OwnerReviewCardProps) {
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasReply = Boolean(review.ownerReplyContent);
  const isReplyValid = replyContent.trim().length > 0;

  const eventInfo = [
    { label: '행사 유형', value: review.eventType },
    { label: '행사 인원', value: `${review.headcount}명` },
    {
      label: '1인당 예산',
      value: `${review.perPersonBudget?.toLocaleString() ?? 0}원`,
    },
  ];

  const handleSubmit = async () => {
    if (!isReplyValid) return;
    setIsSubmitting(true);
    try {
      await onSubmitReply(replyContent);
      setReplyContent('');
    } catch (error) {
      console.error('답글 작성 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full border-b border-border-default flex flex-col gap-3 font-['Pretendard']">
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <span className="text-body font-semibold text-text-default">
              {review.authorNickname}
            </span>
            <span className="text-caption2 font-normal text-text-subtlest">
              {formatReviewDate(review.createdAt ?? '')}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`size-4 ${i < (review.rating ?? 0) ? 'text-icon-star' : 'text-icon-disable'}`}
                />
              ))}
              <span className="ml-1 text-caption1 font-semibold text-text-default">
                {review.rating}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {eventInfo.map((info, i) => (
                <div key={info.label} className="flex items-center gap-1.5">
                  <div className="flex gap-1">
                    <span className="text-caption1 font-normal text-text-subtlest">
                      {info.label}
                    </span>
                    <span className="text-caption1 font-semibold text-text-subtle">
                      {info.value}
                    </span>
                  </div>
                  {i < eventInfo.length - 1 && (
                    <span className="text-caption1 font-normal text-text-subtlest">
                      |
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-label1 font-normal text-text-default">
          {review.content}
        </p>
      </div>

      {review.imageUrls && review.imageUrls.length > 0 && (
        <div className="flex items-center gap-3">
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
            className="px-2.5 py-1 rounded-full outline outline-1 outline-border-default text-caption1 font-normal text-text-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {hasReply ? (
        <div className="px-4 py-3 bg-border-divider rounded-tr-2xl rounded-bl-2xl rounded-br-2xl flex flex-col gap-0.5">
          <div className="flex justify-between items-center">
            <span className="text-label1 font-semibold text-text-default">
              {storeName}
            </span>
            <span className="text-caption2 font-normal text-text-subtlest">
              {formatReviewDate(review.repliedAt ?? '')}
            </span>
          </div>
          <p className="text-label2 font-normal text-text-strong whitespace-pre-line">
            {review.ownerReplyContent}
          </p>
        </div>
      ) : (
        <div className="pl-4 pr-3 py-3 bg-border-divider rounded-tl-lg rounded-tr-2xl rounded-bl-2xl rounded-br-2xl outline outline-1 outline-offset-[-1px] outline-border-subtle flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <span className="text-caption2 font-semibold text-text-subtlest">
              리뷰 작성
            </span>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              maxLength={500}
              rows={2}
              className="w-full bg-transparent text-label1 font-normal text-text-default placeholder:text-text-placeholder outline-none resize-none"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isReplyValid || isSubmitting}
            className={`self-end h-9 p-3 rounded-lg flex items-center justify-center ${
              isReplyValid ? 'bg-brand-default' : 'bg-background-subtlest'
            }`}
          >
            <span
              className={`text-label2 font-semibold ${
                isReplyValid ? 'text-text-inverse' : 'text-text-subtlest'
              }`}
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
