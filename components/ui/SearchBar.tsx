'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/useSearchStore';

import Filter from '@/public/icons/icon-filter.svg';
import SearchField from '@/components/ui/SearchField';
import FilterBottomSheet from '@/app/customer/search/_components/FilterBottomSheet';

interface SearchBarProps {
  onFocus?: () => void;
}

export default function SearchBar({ onFocus }: SearchBarProps) {
  const router = useRouter();
  const { setResults } = useSearchStore();

  const [keyword, setKeyword] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (kw: string) => {
    const trimmed = kw.trim();
    if (!trimmed) return;
    router.push(`/customer/search?keyword=${encodeURIComponent(trimmed)}`);
  };

  return (
    <>
      <SearchField
        value={keyword}
        onChange={setKeyword}
        onSearch={handleSearch}
        onFocus={onFocus}
        placeholder="가게나 메뉴를 검색해 보세요"
        variant="outlined"
        showIcon={true}
      >
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="w-14 shrink-0 self-stretch px-3 py-2.5 bg-background-subtlest rounded-3xl flex justify-center items-center gap-1"
        >
          <Filter />
        </button>
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