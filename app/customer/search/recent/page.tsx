'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { useSearchStores } from '@/hooks/useSearchStores';

import CategorySection from '@/app/customer/home/_components/CategorySection';
import RecentKeywordChip from './_components/RecentKeywordChip';
import ToastError from '@/components/ui/ToastError';

import SearchBar from '@/components/ui/SearchBar';
import BackIcon from '@/public/icons/icon_arrow_Left.svg';
import { useSearchStore } from '@/store/useSearchStore';

function RecentSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { search } = useSearchStores();
  const setResults = useSearchStore((state) => state.setResults);
  const { searches, remove } = useRecentSearches();
  const [searchInput, setSearchInput] = useState(
    searchParams.get('keyword') ?? ''
  );
  const [showError, setShowError] = useState(false);

  const filtered = searchInput
    ? searches.filter((s) => s.includes(searchInput))
    : searches;

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col">
      {showError && <ToastError text="검색에 실패했어요" />}
      {/* 상단 검색창 */}
      <div className="pl-3 pr-4 pt-16 flex items-center gap-2">
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
      {searchInput ? (
        <div className="flex flex-col gap-1 mt-3">
          {filtered.map((keyword) => (
            <div
              key={keyword}
              className="flex items-center h-[52px] pl-4 pr-6 py-3"
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
            </div>
          ))}
        </div>
      ) : (
        // 검색어 없을 때 - 최근 검색어 + 추천 검색어
        <div className="px-4 pt-[26px] flex flex-col gap-5 font-['Pretendard']">
          {/* 최근 검색어 */}
          <div className="flex flex-col gap-2.5">
            <h2 className="text-body font-semibold text-text-default">
              최근 검색어
            </h2>
            <div className="flex gap-2 flex-wrap">
              {searches.map((keyword) => (
                <RecentKeywordChip
                  key={keyword}
                  keyword={keyword}
                  onClick={() =>
                    router.push(
                      `/customer/search?keyword=${encodeURIComponent(keyword)}`
                    )
                  }
                  onRemove={() => remove(keyword)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h2 className="text-body font-semibold text-text-default">
              카테고리 추천
            </h2>
            <CategorySection
              onCategoryClick={async (category) => {
                const filters = { category };
                const result = await search(filters);

                if (!result) {
                  setShowError(true);
                  setTimeout(() => setShowError(false), 2000);
                  return;
                }

                setResults(result, filters);
                router.push(`/customer/search`);
              }}
              appliedFilters={{}}
            />
          </div>
        </div>
      )}
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
