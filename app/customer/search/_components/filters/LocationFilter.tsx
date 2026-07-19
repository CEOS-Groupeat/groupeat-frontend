'use client';

import { useState } from 'react';
import SearchIcon from '@/public/icons/icon_search.svg';
import { LOCATION_OPTIONS } from '@/app/customer/search/_constants/location';
import type { LocationOption } from '@/app/customer/search/_constants/location';
import type { StoreSearchParams } from '@/app/customer/search/_types/store.type';

type RegionValue = StoreSearchParams['district'];

interface LocationFilterProps {
  value: RegionValue;
  onChange: (value: RegionValue) => void;
  onConfirm: () => void;
}

export default function LocationFilter({
  value,
  onChange,
  onConfirm,
}: LocationFilterProps) {
  const [isEditing, setIsEditing] = useState(value === undefined);
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filtered =
    search === ''
      ? []
      : LOCATION_OPTIONS.filter((loc: LocationOption) =>
          loc.label.includes(search)
        );

  const handleSelect = (loc: LocationOption) => {
    onChange(loc.value);
    setSearch('');
    setIsFocused(false);
    setIsEditing(false);
    onConfirm(); // 선택 즉시 토글 닫힘
  };

  // 선택 완료 상태 → bg-background-subtle 박스
  if (value && !isEditing) {
    const selectedLabel = LOCATION_OPTIONS.find(
      (loc) => loc.value === value
    )?.label;
    return (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="w-full h-11 pl-4 pr-3 py-2 bg-background-subtle rounded-lg flex items-center"
      >
        <span className="text-base text-text-default">{selectedLabel}</span>
      </button>
    );
  }

  // 미선택 상태 → 검색 input + 드롭다운
  return (
    <div className="flex flex-col gap-3">
      <div className="h-11 px-3 py-2 bg-background-default rounded-lg outline outline-1 outline-border-strong flex items-center gap-1.5">
        <SearchIcon className="size-5 text-icon-subtlest shrink-0" />
        <input
          type="text"
          placeholder="지역을 선택하세요 (예: 강남구)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          autoFocus
          className="flex-1 bg-transparent text-base text-text-default placeholder:text-text-placeholder outline-none"
        />
      </div>

      {isFocused && filtered.length > 0 && (
        <div className="max-h-[220px] overflow-y-auto rounded-lg outline outline-1 outline-border-default overflow-hidden shadow-[0px_0px_15px_0px_rgba(0,0,0,0.05)]">
          {filtered.map((loc, idx, arr) => (
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
