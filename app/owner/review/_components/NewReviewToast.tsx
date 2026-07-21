'use client';

import { useState } from 'react';
import Notice from '@/public/icons/icon_notice.svg';

interface NewReviewToastProps {
  count: number;
}

export default function NewReviewToast({ count }: NewReviewToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || count === 0) return null;

  return (
    <div className="app-container bottom-24 px-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex justify-between px-4 py-3 rounded-full bg-background-transparent outline outline-1 outline-offset-[-1px] outline-border-subtle shadow-[0px_2px_16px_0px_rgba(0,0,0,0.05)] backdrop-blur-sm font-['Pretendard']">
        <div className="flex justify-center items-center gap-1.5">
          <Notice className="size-4 text-icon-disable" />
          <span className="text-label2 text-text-default font-medium">
            새로운 리뷰 {count}건
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="text-caption1 text-text-subtlest font-normal"
          aria-label="닫기"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
