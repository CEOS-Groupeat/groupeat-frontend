'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/useSearchStore';

import Filter from '@/public/icons/icon-filter.svg';

import SearchField from '@/components/ui/SearchField';
import FilterBottomSheet from '../../search/_components/FilterBottomSheet';

export default function HomeSearchBar() {
  const router = useRouter();
  const { setResults } = useSearchStore();

  const [keyword, setKeyword] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) return;

    router.push(
      `/customer/search?keyword=${encodeURIComponent(trimmedKeyword)}`
    );
  };

  const handleChange = (value: string) => {
    setKeyword(value);
  };

  return (
    <>
      <SearchField
        value={keyword}
        onChange={handleChange}
        onSearch={handleSearch}
        placeholder="가게나 메뉴를 검색해 보세요"
        variant={'outlined'}
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
