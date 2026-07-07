'use client';

import { useState } from 'react';
import SearchIcon from '@/public/icons/icon_search.svg';
import {
  LOCATION_OPTIONS,
  LocationOption,
} from '@/app/customer/search/_constants/location';

interface LocationFilterProps {
  value: string | undefined;
  onChange: (value: string) => void;
  onConfirm: () => void;
}

export default function LocationFilter({
  value,
  onChange,
  onConfirm,
}: LocationFilterProps) {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filtered = LOCATION_OPTIONS.filter(
    (loc: LocationOption) => search === '' || loc.label.includes(search)
  );

  const handleSelect = (loc: LocationOption) => {
    onChange(loc.value);
    setSearch('');
    setIsFocused(false);
    onConfirm(); // 선택 즉시 토글 닫힘
  };

  // 선택 완료 상태 → bg-background-subtle 박스
  if (value) {
    const selectedLabel = LOCATION_OPTIONS.find(
      (loc) => loc.value === value
    )?.label;
    return (
      <div className="h-11 pl-4 pr-3 py-2 bg-background-subtle rounded-lg flex items-center mt-3">
        <span className="text-base text-text-default">{selectedLabel}</span>
      </div>
    );
  }

  // 미선택 상태 → 검색 input + 드롭다운
  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="h-11 px-3 py-2 bg-background-default rounded-lg outline outline-1 outline-border-strong flex items-center gap-1.5">
        <SearchIcon className="size-5 text-icon-subtlest shrink-0" />
        <input
          type="text"
          placeholder="지역을 선택하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="flex-1 bg-transparent text-base text-text-default placeholder:text-text-placeholder outline-none"
        />
      </div>

      {isFocused && filtered.length > 0 && (
        <div className="rounded-lg outline outline-1 outline-border-default overflow-hidden shadow-[0px_0px_15px_0px_rgba(0,0,0,0.05)]">
          {filtered.slice(0, 5).map((loc, idx, arr) => (
            <button
              key={loc.value}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(loc)}
              className={`w-full h-11 pl-4 pr-3 flex items-center text-sm text-text-default
                bg-background-default hover:bg-interaction-hover transition-colors
                ${idx < arr.length - 1 ? 'border-b border-border-subtle' : ''}`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
