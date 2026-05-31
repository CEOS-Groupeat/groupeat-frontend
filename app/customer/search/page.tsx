'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useSearchStore } from '@/store/useSearchStore';
import { useSearchStores } from '@/hooks/useSearchStores';
import type { StoreSearchParams } from '@/app/customer/search/_types/store.type';

import CartButton from '@/components/ui/CartButton';
import SearchField from '@/components/ui/SearchField';
import StoreCard from '@/components/features/StoreCard';
import SearchFilterChipBar from './_components/SearchFilterChipBar';
import SearchSortDropdown from './_components/SearchSortDropdown';
import SearchEmptyState from './_components/SearchEmptyState';
import FilterBottomSheet from './_components/FilterBottomSheet';

import BackIcon from '@/public/icons/icon_arrow_Left.svg';
import FilterIcon from '@/public/icons/icon_filter.svg';
import ResetIcon from '@/public/icons/icon_reset.svg';

// ─── 정렬 옵션 ───────────────────────────────────────
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

  const [sort, setSort] = useState('NONE');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterKey, setFilterKey] = useState(0); // key를 위한 state 추가
  const [searchInput, setSearchInput] = useState(keyword); //직접 입력 가능한 input

  // ── 키워드로 진입 시 API 호출 ──
  useEffect(() => {
    if (keyword) {
      clearResultsOnly();
      search({ keyword, sortType: sort });
    }
  }, [keyword, sort]);

  // ── 활성 필터 수 ──
  const activeFilterCount = Object.keys(appliedFilters).filter(
    (k) => appliedFilters[k as keyof StoreSearchParams] !== undefined
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
  const handleChipClick = () => handleOpenFilter();

  // ── 필터 재설정 ──
  const handleFilterReset = () => {
    clearResults();
    if (keyword) search({ keyword, sortType: sort });
  };

  return (
    <div className="w-full min-h-screen bg-background-default flex flex-col">
      {/* ── 헤더 ── */}
      <div className="h-24 px-4 pt-16 flex flex-col justify-end">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-1">
            {/* 뒤로가기 */}
            <button
              type="button"
              onClick={() => router.back()}
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
              placeholder="검색어를 입력하세요"
              variant={searchInput ? 'filled' : 'outlined'}
              showIcon={searchInput ? false : true}
            />
          </div>

          {/* 장바구니 */}
          <CartButton count={0} onClick={() => router.push('/customer/cart')} />
        </div>
      </div>

      {/* ── 결과 수 + 정렬 + 필터 버튼 ── */}
      <div className="pl-4 pr-1.5 pt-0.5 pb-1 flex justify-between items-center">
        <span className="text-xs text-text-default">총 {totalCount}개</span>

        <div className="h-8 flex items-center gap-0.5">
          {/* 정렬 드롭다운 */}
          <SearchSortDropdown
            value={sort}
            onChange={(v) => {
              setSort(v);
              if (keyword) search({ keyword, sortType: v, ...appliedFilters });
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
                  <span className="text-xs font-semibold text-brand-default leading-4">
                    필터 {activeFilterCount}
                  </span>
                </button>

                {/* ✅ 리셋 버튼 분리 */}
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
                <span className="text-xs font-normal text-text-default leading-4">
                  필터
                </span>
                <FilterIcon className="size-4 text-icon-default" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 필터 칩 가로 스크롤 ── */}
      <div className="pb-2">
        <SearchFilterChipBar
          filters={appliedFilters}
          onChipClick={handleChipClick}
        />
      </div>

      {/* ── 가게 목록 / 로딩 / 빈 결과 ── */}
      <div className="flex-1 px-4 pb-6">
        {isLoading ? (
          // 로딩 스켈레톤
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl outline outline-1 outline-border-subtle overflow-hidden"
              >
                <div className="h-24 bg-background-subtlest animate-pulse" />
                <div className="p-2.5 flex flex-col gap-2">
                  <div className="h-3 w-16 bg-background-subtlest rounded animate-pulse" />
                  <div className="h-4 w-20 bg-background-subtlest rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : stores.length === 0 ? (
          <SearchEmptyState keyword={keyword} />
        ) : (
          // ✅ 2열 그리드
          <div className="grid grid-cols-2 gap-2">
            {stores.map((store) => (
              <StoreCard
                key={store.storeId}
                store={store}
                onClick={() =>
                  router.push(`/customer/store/detail?storeId=${store.storeId}`)
                }
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
