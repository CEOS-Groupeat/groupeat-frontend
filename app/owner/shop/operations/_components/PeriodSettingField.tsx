'use client';

import { useState } from 'react';
import { formatDateWithDots } from '../_utils/formatDate';
import CalendarIcon from '@/public/icons/icon-owner-calendar.svg';

interface PeriodSettingFieldProps {
  startDate: string;
  endDate: string;
  onSave: (startDate: string, endDate: string) => void;
}

export default function PeriodSettingField({
  startDate,
  endDate,
  onSave,
}: PeriodSettingFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);

  const hasDate = startDate && endDate;

  const handleSave = () => {
    if (!tempStart || !tempEnd) return;
    onSave(tempStart, tempEnd);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="self-stretch flex flex-col font-['Pretendard'] gap-3">
        <span className="text-text-default text-body font-medium">
          기간 설정
        </span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-text-subtlest text-xs w-12">시작일</span>
            <input
              type="date"
              value={tempStart}
              onChange={(e) => setTempStart(e.target.value)}
              className="flex-1 h-11 px-3 rounded-lg outline outline-1 outline-border-strong text-text-default text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-subtlest text-xs w-12">종료일</span>
            <input
              type="date"
              value={tempEnd}
              onChange={(e) => setTempEnd(e.target.value)}
              className="flex-1 h-11 px-3 rounded-lg outline outline-1 outline-border-strong text-text-default text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={!tempStart || !tempEnd}
            className="h-11 rounded-lg bg-brand-default text-text-inverse text-sm font-semibold disabled:bg-background-subtlest disabled:text-text-subtlest"
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="self-stretch flex flex-col font-['Pretendard'] gap-3">
      <span className="text-text-default text-body font-medium">기간 설정</span>

      <div className="w-full flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
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
