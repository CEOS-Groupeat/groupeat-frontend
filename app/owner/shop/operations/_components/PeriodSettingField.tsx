'use client';

import { formatDateWithDots } from '../_utils/formatDate';
import CalendarIcon from '@/public/icons/icon-owner-calendar.svg';

interface PeriodSettingFieldProps {
  startDate: string;
  endDate: string;
  onEditClick: () => void;
}

export default function PeriodSettingField({
  startDate,
  endDate,
  onEditClick,
}: PeriodSettingFieldProps) {
  const hasDate = startDate && endDate;

  return (
    <div className="self-stretch flex flex-col font-['Pretendard'] gap-3">
      <span className="text-text-default text-body font-medium">기간 설정</span>

      <div className="w-full flex flex-col gap-2">
        <button
          type="button"
          onClick={onEditClick}
          className="w-full pl-3.5 pr-4 py-3 bg-background-subtle rounded-xl flex justify-between items-center"
        >
          {hasDate ? (
            <span className="text-text-subtle text-label1 font-normal">
              {formatDateWithDots(startDate)} - {formatDateWithDots(endDate)}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <CalendarIcon />
              <span className="text-text-subtlest text-label1 font-normal line-clamp-1">
                날짜를 등록해주세요
              </span>
            </div>
          )}
          <span className="text-brand-default text-caption1 font-medium">
            {hasDate ? '수정하기' : '등록하기'}
          </span>
        </button>
      </div>
    </div>
  );
}
