'use client';

import DefaultButton from '@/components/ui/ButtonDefault';
import CalendarIcon from '@/public/icons/icon_calendar.svg';

interface SharedCartBarProps {
  pickupDateTime?: string;
  summaryText: string;
  totalQuantity: number;
  originalPrice: number;
  finalPrice: number;
  buttonText: string;
  onButtonClick: () => void;
}

export default function OrderSummaryBar({
  pickupDateTime,
  summaryText,
  totalQuantity,
  originalPrice,
  finalPrice,
  buttonText,
  onButtonClick,
}: SharedCartBarProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full z-sticky animate-in slide-in-from-bottom-full duration-300 font-['Pretendard']">
      {pickupDateTime && (
        <div className="flex items-center bg-background-subtlest gap-2 pl-4 pt-2 pb-6 -mb-4 rounded-t-3xl">
          <CalendarIcon className="text-icon-subtlest" />
          <span className="text-label2 text-text-subtlest font-medium">
            {pickupDateTime}
          </span>
        </div>
      )}

      {/* 2. 메인 컨텐츠 영역 */}
      <div className="relative z-10 bg-background-default rounded-t-3xl shadow-[0_-2px_18px_rgba(0,0,0,0.05)] px-4 pt-3 pb-6">
        {/* 공통 요약 영역 */}
        <div className="flex justify-between items-end pb-2.5">
          <div className="flex flex-col gap-0.5">
            <p className="text-label2 font-normal text-text-subtle">
              {summaryText}
            </p>
            <p className="text-body font-semibold text-brand-default">
              총 {totalQuantity}개
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <p className="text-label2 font-normal text-text-subtlest">
              {originalPrice.toLocaleString()}원
            </p>
            <p className="text-headline3 font-semibold text-text-default">
              {finalPrice.toLocaleString()}원
            </p>
          </div>
        </div>

        <DefaultButton onClick={onButtonClick}>{buttonText}</DefaultButton>
      </div>
    </div>
  );
}
