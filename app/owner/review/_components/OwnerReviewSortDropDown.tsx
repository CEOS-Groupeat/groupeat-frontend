'use client';

import { useState } from 'react';
import DownArrow from '@/public/icons/icon_arrow_down.svg';
import { SORT_OPTIONS } from '@/app/customer/store/[storeId]/review/_constants/sortOptions';

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

interface OwnerReviewSortDropDownProps {
  totalCount: number;
  value: SortValue;
  onChange: (value: SortValue) => void;
}

export default function OwnerReviewSortDropDown({
  totalCount,
  value,
  onChange,
}: OwnerReviewSortDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = SORT_OPTIONS.find((s) => s.value === value) ?? SORT_OPTIONS[0];

  return (
    <div className="pl-4 pr-1.5 pt-0.5 pb-1 flex justify-between items-center font-['Pretendard']">
      <div className="flex items-center gap-0.5">
        <span className="text-text-default text-xs font-normal">총</span>
        <span className="text-text-default text-xs font-normal">
          {totalCount}개
        </span>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-8 px-1.5 flex items-center gap-1"
        >
          <span className="text-text-default text-xs font-normal leading-4">
            {selected.label}
          </span>
          <DownArrow className="size-4" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-base"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-full z-dropdown rounded-lg shadow-[0px_0px_15px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-border-subtle bg-background-default overflow-hidden min-w-[104px]">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full h-12 px-3 py-3.5 flex items-center transition ${
                    option.value === value
                      ? 'text-caption1 text-brand-default font-semibold'
                      : 'text-text-strong text-xs font-normal leading-4 tracking-tight'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}