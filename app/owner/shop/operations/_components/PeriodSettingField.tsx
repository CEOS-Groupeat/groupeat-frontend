'use client';

import { formatDateWithDots } from '../_utils/formatDate';
import PencilIcon from '@/public/icons/icon_pencil.svg';

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
  return (
    <div className="self-stretch px-4 py-3 bg-background-transparent rounded-xl flex flex-col justify-start items-start font-['Pretendard']">
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="self-stretch flex justify-between items-center">
          <span className="text-center text-text-default text-label1 font-semibold">
            기간 설정
          </span>
          <button
            type="button"
            onClick={onEditClick}
            className="flex justify-start items-center gap-1"
          >
            <PencilIcon className="size-4 text-brand-default" />
            <span className="text-center text-brand-default text-caption1 font-medium">
              수정하기
            </span>
          </button>
        </div>
        <span className="text-text-subtle text-label1 font-normal line-clamp-1">
          {formatDateWithDots(startDate)} - {formatDateWithDots(endDate)}
        </span>
      </div>
    </div>
  );
}
