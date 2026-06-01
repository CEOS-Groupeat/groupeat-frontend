'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecentSearches } from '@/hooks/useRecentSearches';

import SearchBar from '@/components/ui/SearchBar';
import CloseIcon from '@/public/icons/icon_close.svg';
import BackIcon from '@/public/icons/icon_arrow_Left.svg';

export default function RecentSearchPage() {
  const router = useRouter();
  const { searches, remove } = useRecentSearches();
  const [searchInput, setSearchInput] = useState('');

  const filtered = searchInput
    ? searches.filter((s) => s.includes(searchInput))
    : searches;

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col">
      {/* 상단 검색창 */}
      <div className="px-4 pt-16 flex items-center gap-1">
        {/* 뒤로가기 */}
        <button
          type="button"
          onClick={() => router.back()}
          className="h-6 flex items-center"
        >
          <BackIcon className="size-6 text-icon-subtle" />
        </button>
        <SearchBar onChange={setSearchInput} />
      </div>

      {/* 최근 검색어 목록 */}
      <div className="px-4 py-7 flex flex-col gap-6">
        {filtered.map((keyword) => (
          <div key={keyword} className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/customer/search?keyword=${encodeURIComponent(keyword)}`
                )
              }
              className="text-base font-medium font-['Pretendard'] text-text-default"
            >
              {keyword}
            </button>
            <button type="button" onClick={() => remove(keyword)}>
              <CloseIcon className="size-5 shrink-0" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
