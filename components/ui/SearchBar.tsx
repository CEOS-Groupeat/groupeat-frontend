'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/useSearchStore';

import Filter from '@/public/icons/icon-filter.svg';
import SearchField from '@/components/ui/SearchField';
import FilterBottomSheet from '@/app/customer/search/_components/FilterBottomSheet';

interface SearchBarProps {
  onFocus?: () => void;
  onChange?: (value: string) => void;
}

export default function SearchBar({ onFocus, onChange }: SearchBarProps) {
  const router = useRouter();
  const { setResults } = useSearchStore();

  const [keyword, setKeyword] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (kw: string) => {
    const trimmed = kw.trim();
    if (!trimmed) return;
    router.push(`/customer/search?keyword=${encodeURIComponent(trimmed)}`);
  };

  const handleChange = (value: string) => {
    setKeyword(value);
    onChange?.(value); // 추가 - 외부로 전달
  };

  return (
    <>
      <SearchField
        value={keyword}
        onChange={handleChange}
        onSearch={handleSearch}
        onFocus={onFocus}
        placeholder="가게나 메뉴를 검색해 보세요"
        variant="outlined"
        showIcon={!keyword}
      >
        {keyword ? (
          <div className="w-14 h-10 shrink-0" />
        ) : (
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="w-14 shrink-0 self-stretch px-3 py-2.5 bg-background-subtlest rounded-3xl flex justify-center items-center gap-1"
          >
            <Filter />
          </button>
        )}
      </SearchField>

      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSearchResult={(data, filters) => {
          setResults(data, filters);
          router.push('/customer/search');
        }}
      />
    </>
  );
}
