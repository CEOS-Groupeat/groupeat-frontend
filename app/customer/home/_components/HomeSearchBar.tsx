'use client';

import { ChangeEvent, useRef, useState } from 'react';
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setKeyword(event.target.value);

    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <div className="w-full min-h-11 bg-background-default rounded-[36px] pr-1.5 px-4 py-[6px] flex justify-between items-center overflow-hidden">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <Search className="shrink-0" />

          <textarea
            ref={textareaRef}
            value={keyword}
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSearch();
              }
            }}
            rows={1}
            placeholder="가게나 메뉴를 검색해 보세요"
            className="min-w-0 flex-1 resize-none bg-transparent outline-none text-body text-text-default placeholder:text-text-placeholder"
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
