'use client';

import { useEffect, useRef } from 'react';
import { FocusTrap } from 'focus-trap-react';
import IconCheckSuccess from '@/public/icons/icon_reviewSuccess.svg';

interface ReviewSuccessModalProps {
  onComplete: () => void;
}

export default function ReviewSuccessModal({
  onComplete,
}: ReviewSuccessModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 bg-border-divider z-modal flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <FocusTrap>
        <div
          ref={modalRef}
          tabIndex={-1}
          className="w-[327px] bg-background-default rounded-2xl shadow-[0px_24px_38px_-10px_rgba(23,23,23,0.12),0px_10px_15px_-5px_rgba(23,23,23,0.10)] flex flex-col justify-center items-center overflow-hidden"
        >
          <div className="self-stretch px-5 pt-5 pb-6 flex flex-col items-center gap-2">
            <div className="size-11 flex items-center justify-center">
              <IconCheckSuccess />
            </div>
            <div className="self-stretch flex flex-col justify-center items-center gap-1 font-['Pretendard']">
              <div className="text-text-default text-headline3 font-semibold">
                리뷰 등록이 완료되었습니다.
              </div>
              <div className="text-center text-text-subtle text-label2 font-normal">
                주문 현황 페이지로 이동합니다.
              </div>
            </div>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
