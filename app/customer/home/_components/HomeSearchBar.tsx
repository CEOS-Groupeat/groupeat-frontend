'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/useSearchStore';

import Search from '@/public/icons/icon-search.svg';
import Filter from '@/public/icons/icon-filter.svg';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <div className="w-full min-h-11 bg-background-default rounded-[36px] pr-1.5 pl-4 py-1.5 flex justify-between items-center overflow-hidden">
        <div className="flex items-center gap-1.5 flex-1">
          <Search className="shrink-0" />

          <input
            value={keyword}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
            placeholder="가게나 메뉴를 검색해 보세요"
            className="w-full outline-none text-body text-text-default placeholder:text-text-placeholder"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="w-14 shrink-0 self-stretch px-3 py-2.5 bg-background-subtlest rounded-3xl flex justify-center items-center gap-1"
        >
          <Filter />
        </button>
      </div>

      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSearchResult={(data, filters) => {
          setResults(data, filters); // ✅ 필터도 저장
          router.push('/customer/search'); // 검색 페이지로 이동
        }}
      />
    </>
  );
}
