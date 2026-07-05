'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecentSearches } from '@/hooks/useRecentSearches';

import SearchBar from '@/components/ui/SearchBar';
import CloseIcon from '@/public/icons/icon_close.svg';
import BackIcon from '@/public/icons/icon_arrow_Left.svg';

function RecentSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searches, remove } = useRecentSearches();
  const [searchInput, setSearchInput] = useState(
    searchParams.get('keyword') ?? ''
  );

  const filtered = searchInput
    ? searches.filter((s) => s.includes(searchInput))
    : searches;

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col">
      {/* 상단 검색창 */}
      <div className="pl-3 pr-4 pt-16 mb-3 flex items-center gap-2">
        {/* 뒤로가기 */}
        <button
          type="button"
          onClick={() => router.back()}
          className="h-6 flex items-center"
        >
          <BackIcon className="size-6 text-icon-subtle" />
        </button>
        <SearchBar
          onChange={setSearchInput}
          initialKeyword={searchParams.get('keyword') ?? ''}
          autoFocus
        />
      </div>

      {/* 최근 검색어 목록 */}
      <div className="flex flex-col gap-1">
        {filtered.map((keyword) => (
          <div
            key={keyword}
            className="flex items-center justify-between h-[52px] pl-4 pr-6 py-3"
          >
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/customer/search?keyword=${encodeURIComponent(keyword)}`
                )
              }
              className="text-body font-normal font-['Pretendard'] text-text-default"
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

export default function RecentSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-sm text-text-subtle">로딩 중...</div>
        </div>
      }
    >
      <RecentSearchContent />
    </Suspense>
  );
}
