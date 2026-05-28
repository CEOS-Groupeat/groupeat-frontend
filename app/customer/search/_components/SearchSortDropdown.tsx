'use client';

import { useState } from 'react';
import DownArrow from '@/public/icons/icon_arrow_down.svg';

const SORT_OPTIONS = [
  { value: 'DISCOUNT', label: '할인율 높은 순' },
  { value: 'PRICE_LOW', label: '가격 낮은 순' },
  { value: 'PRICE_HIGH', label: '가격 높은 순' },
  { value: 'ORDER', label: '주문 많은 순' },
  { value: 'RATING', label: '별점 높은 순' },
];

interface SearchSortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchSortDropdown({
  value,
  onChange,
}: SearchSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected =
    SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  return (
    <div className="relative">
      {/* 트리거 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-8 px-1.5 inline-flex items-center gap-1"
      >
        <span className="text-xs text-text-default leading-4">
          {selected.label}
        </span>
        <DownArrow className="size-4" />
      </button>

      {/* 드롭다운 */}
      {isOpen && (
        <>
          {/* 외부 클릭 닫기 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 rounded-lg shadow-[0px_0px_15px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-border-subtle bg-background-default overflow-hidden min-w-[96px]">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full h-12 px-3 flex items-center text-xs leading-4 hover:bg-background-subtle transition-colors ${
                  option.value === value
                    ? 'text-brand-default font-semibold'
                    : 'text-text-strong font-normal'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
