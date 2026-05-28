'use client';

import type { StoreSearchParams } from '@/app/customer/search/_types/store.type';
import DownArrow from '@/public/icons/icon_arrow_down.svg';

// 필터 칩 항목 정의
const FILTER_CHIPS: { key: keyof StoreSearchParams; label: string }[] = [
  { key: 'location', label: '위치' },
  { key: 'pickupDate', label: '픽업 날짜' },
  { key: 'category', label: '카테고리' },
  { key: 'quantity', label: '수량' },
  { key: 'budget', label: '1인당 예산' },
];

interface SearchFilterChipBarProps {
  filters: StoreSearchParams;
  onChipClick: (key: keyof StoreSearchParams) => void; // 칩 클릭 → 바텀시트 열기
}

// 칩 표시 텍스트
function getChipLabel(
  key: keyof StoreSearchParams,
  filters: StoreSearchParams
): string {
  const value = filters[key];
  if (!value) return '';
  if (key === 'quantity') return `${value}개`;
  if (key === 'budget') return `${(value as number).toLocaleString()}원`;
  if (key === 'category') return value as string;
  if (key === 'pickupDate') {
    const d = new Date(value as string);
    return `${d.getMonth() + 1}월 ${d.getDate()}일`;
  }
  return String(value);
}

export default function SearchFilterChipBar({
  filters,
  onChipClick,
}: SearchFilterChipBarProps) {
  return (
    //  가로 스크롤 + 오른쪽 페이드 그라데이션
    <div className="relative">
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide px-4">
        {FILTER_CHIPS.map((chip) => {
          const isActive = filters[chip.key] !== undefined;
          const label = isActive ? getChipLabel(chip.key, filters) : chip.label;

          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => onChipClick(chip.key)}
              className={`flex-shrink-0 pl-2.5 pr-3.5 py-2 rounded-full flex items-center gap-1 transition-colors ${
                isActive
                  ? 'bg-brand-background text-brand-default' // ✅ 활성: 브랜드 배경
                  : 'bg-background-default outline outline-1 outline-offset-[-1px] outline-border-default text-text-default' // ✅ 기본
              }`}
            >
              <DownArrow className="size-4 shrink-0" />
              <span
                className={`text-xs leading-4 whitespace-nowrap ${isActive ? 'font-semibold' : 'font-normal'}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
      {/* 오른쪽 페이드 */}
      <div className="absolute right-0 top-0 bottom-0 w-11 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />
    </div>
  );
}
