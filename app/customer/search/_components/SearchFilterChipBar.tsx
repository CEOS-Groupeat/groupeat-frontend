'use client';

import { formatChipLabel } from '../_utils/formatChipLabel';
import type { StoreSearchParams } from '@/app/customer/search/_types/store.type';
import DownArrow from '@/public/icons/icon_arrow_down.svg';
import { FILTER_CHIPS_ITEMS } from '../_constants/filterItems';

interface SearchFilterChipBarProps {
  filters: StoreSearchParams;
  onChipClick: (key: keyof StoreSearchParams) => void; // 칩 클릭 → 바텀시트 열기
}

export default function SearchFilterChipBar({
  filters,
  onChipClick,
}: SearchFilterChipBarProps) {
  return (
    //  가로 스크롤 + 오른쪽 페이드 그라데이션
    <div className="relative">
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide px-4">
        {FILTER_CHIPS_ITEMS.map((chip) => {
          const isActive = filters[chip.key] !== undefined;
          const label = isActive
            ? formatChipLabel(chip.key, filters[chip.key])
            : chip.label;

          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => onChipClick(chip.key)}
              className={`flex-shrink-0 pl-2.5 pr-3.5 py-2 rounded-full flex items-center gap-1 transition-colors ${
                isActive
                  ? 'bg-brand-background text-brand-default'
                  : 'bg-background-default outline outline-1 outline-offset-[-1px] outline-border-default text-text-default'
              }`}
            >
              <DownArrow className="size-4 shrink-0" />
              <span
                className={`text-label2 whitespace-nowrap ${isActive ? 'font-semibold' : 'font-normal'}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
      {/* 오른쪽 페이드 */}
      <div className="absolute size-11 right-0 top-0 bottom-0 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />
    </div>
  );
}
