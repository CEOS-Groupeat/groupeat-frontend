'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useSearchStore } from '@/store/useSearchStore';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { useSearchStores } from '@/hooks/useSearchStores';
import type { StoreSearchParams } from '@/app/customer/search/_types/store.type';
import type { SortValue } from './_constants/sortOptions';

import CartIconButton from '@/components/cart/CartIconButton';
import SearchField from '@/components/ui/SearchField';
import StoreCard from '@/components/features/StoreCard';
import SearchFilterChipBar from './_components/SearchFilterChipBar';
import SearchSortDropdown from './_components/SearchSortDropdown';
import SearchEmptyState from './_components/SearchEmptyState';
import FilterBottomSheet from './_components/FilterBottomSheet';

import BackIcon from '@/public/icons/icon_arrow_Left.svg';
import FilterIcon from '@/public/icons/icon_filter.svg';
import ResetIcon from '@/public/icons/icon_reset.svg';
import CloseIcon from '@/public/icons/icon_close.svg';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';

  const {
    results,
    appliedFilters,
    setResults,
    clearResults,
    clearResultsOnly,
  } = useSearchStore();
  const { search, data: keywordData, isLoading } = useSearchStores();

  const [sort, setSort] = useState<SortValue>('NONE');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterKey, setFilterKey] = useState(0);
  const [searchInput, setSearchInput] = useState(keyword);
  const [initialOpenFilter, setInitialOpenFilter] = useState<
    keyof StoreSearchParams | undefined
  >();

  const { add } = useRecentSearches();
  useEffect(() => {
    if (keyword) {
      add(keyword);
    }
    clearResultsOnly();
    search({ ...appliedFilters, keyword, sortType: sort });
  }, [keyword, sort, appliedFilters, add, search, clearResultsOnly]);

  // ── 활성 필터 수 ──
  const activeFilterCount = Object.keys(appliedFilters).filter(
    (k) =>
      k !== 'sortType' &&
      appliedFilters[k as keyof StoreSearchParams] !== undefined
  ).length;

  // ── 표시할 가게 목록 ──
  const stores = results?.storeList ?? keywordData?.storeList ?? [];
  const totalCount = results?.totalElements ?? keywordData?.totalElements ?? 0;

  // 필터 열 때 key 증가 → 새 인스턴스 마운트 → initialFilters로 초기화됨
  const handleOpenFilter = () => {
    setFilterKey((k) => k + 1);
    setIsFilterOpen(true);
  };

  // ── 필터 칩 클릭 → 바텀시트 열기 ──
  const handleChipClick = (key: keyof StoreSearchParams) => {
    setInitialOpenFilter(key);
    handleOpenFilter();
  };

  // ── 필터 재설정 ──
  const handleFilterReset = () => {
    clearResults();
    if (keyword) search({ keyword, sortType: sort });
  };

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col font-['Pretendard']">
      {/* ── 헤더 ── */}
      <div className="h-24 pl-3 pr-4 pt-16 pb-1 flex flex-col justify-end">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2">
            {/* 뒤로가기 */}
            <button
              type="button"
              onClick={() => router.replace('/customer/home')}
              className="h-6 flex items-center"
            >
              <BackIcon className="size-6 text-icon-subtle" />
            </button>

            {/* 검색바 — SearchField 공통 컴포넌트 적용 */}
            <SearchField
              value={searchInput}
              onChange={setSearchInput}
              onSearch={(keyword) =>
                router.push(
                  `/customer/search?keyword=${encodeURIComponent(keyword)}`
                )
              }
              onFocus={() =>
                router.push(
                  `/customer/search/recent?keyword=${encodeURIComponent(searchInput)}`
                )
              }
              iconPosition={searchInput ? undefined : 'right'}
            >
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                  }}
                  aria-label="검색어 지우기"
                >
                  <CloseIcon className="size-5 text-icon-subtlest" />
                </button>
              )}
            </SearchField>
          </div>

          {/* 장바구니 */}
          <CartIconButton iconColor="text-icon-subtle" />
        </div>
      </div>

      {/* ── 결과 수 + 정렬 + 필터 버튼 ── */}
      <div className="mb-1.5 pl-4 pr-1.5 py-1 flex justify-between items-center">
        <span className="text-xs font-normal text-text-default">
          총 {totalCount}개
        </span>

        <div className="h-8 flex items-center gap-0.5">
          {/* 정렬 드롭다운 */}
          <SearchSortDropdown
            value={sort}
            onChange={async (v) => {
              const params = {
                ...(keyword ? { keyword } : {}),
                ...appliedFilters,
                sortType: v,
              };

              const result = await search(params);
              if (result) {
                setSort(v);
                setResults(result, { ...appliedFilters, sortType: v });
              }
            }}
          />

          {/* 구분선 */}
          <div className="w-px h-3.5 bg-border-strong mx-0.5" />

          {/* 필터 버튼 */}
          <div className="h-8 px-1.5 flex items-center gap-1">
            {activeFilterCount > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => handleOpenFilter()}
                  className="flex items-center gap-1"
                >
                  <span className="text-label2 font-semibold text-brand-default">
                    필터 {activeFilterCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleFilterReset}
                  className="flex items-center"
                >
                  <ResetIcon className="size-4 text-icon-active" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => handleOpenFilter()}
                className="flex items-center gap-1"
              >
                <span className="text-label2 font-normal text-text-default">
                  필터
                </span>
                <FilterIcon className="size-4 text-icon-default" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 필터 칩 가로 스크롤 ── */}
      <div className="pb-2.5">
        <SearchFilterChipBar
          filters={appliedFilters}
          onChipClick={handleChipClick}
        />
      </div>

      {/* ── 가게 목록 / 로딩 / 빈 결과 ── */}
      <div className="flex-1 pb-6">
        {isLoading ? (
          // 로딩 스켈레톤
          <div className="flex flex-col">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[132px] flex px-4 py-2.5 border-b border-border-subtle"
              >
                <div className="min-w-[112px] h-[94px] my-[9px] rounded-lg bg-background-subtlest animate-pulse" />

                <div className="flex-1 py-1 pl-3.5 pr-3 flex flex-col gap-1.5">
                  <div className="h-4 w-16 bg-background-subtlest rounded animate-pulse" />
                  <div className="h-5 w-24 bg-background-subtlest rounded animate-pulse" />
                  <div className="h-4 w-32 bg-background-subtlest rounded animate-pulse" />
                  <div className="h-3 w-20 bg-background-subtlest rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : stores.length === 0 ? (
          <SearchEmptyState />
        ) : (
          <div className="flex flex-col">
            {stores.map((store) => (
              <StoreCard
                key={store.storeId}
                store={store}
                onClick={() => router.push(`/customer/store/${store.storeId}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── 필터 바텀시트 ── */}
      <FilterBottomSheet
        key={filterKey}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSearchResult={(data, filters) => {
          setResults(data, filters);
          setIsFilterOpen(false);
        }}
        initialFilters={appliedFilters}
        initialOpenFilter={initialOpenFilter}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-sm text-text-subtle">로딩 중...</div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
