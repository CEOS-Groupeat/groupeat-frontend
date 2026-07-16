'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/useSearchStore';

import HomeSearchBar from './HomeSearchBar';
import IconDownArrow from '@/public/icons/icon_arrow_down.svg';
import CategorySection from './CategorySection';
import PickerSection from './PickerSection';
import FilterBottomSheet from '@/app/customer/search/_components/FilterBottomSheet';

import { StoreSearchParams } from '@/app/customer/search/_types/store.type';

export default function FiltersContainer() {
  const router = useRouter();
  const { setResults, appliedFilters } = useSearchStore();
  const [filterKey, setFilterKey] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [initialOpenFilter, setInitialOpenFilter] = useState<
    keyof StoreSearchParams | undefined
  >();

  const handleOpenFilter = (filter: keyof StoreSearchParams) => {
    setInitialOpenFilter(filter);
    setFilterKey((k) => k + 1);
    setIsFilterOpen(true);
  };
  return (
    <section className="w-full bg-background-default pt-6 pb-10 px-4 font-['Pretendard']">
      <h1 className="text-text-subtlest text-body font-medium mb-0.5">
        단체 주문 어디서부터 시작할까요?
      </h1>
      <button
        type="button"
        onClick={() => handleOpenFilter('district')}
        className="flex gap-2 mb-2.5"
      >
        <span className="text-headline1 font-bold text-text-default">지역</span>
        <IconDownArrow className="size-5 text-icon-subtle my-2" />
      </button>
      <HomeSearchBar />

      <div className="flex flex-col gap-2 mt-5">
        <span className="text-label2 font-semibold text-text-subtlest">
          조건에 맞는 맞춤 가게 찾기
        </span>
        <PickerSection
          onPickerClick={handleOpenFilter}
          appliedFilters={appliedFilters}
        />
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <span className="text-label2 font-semibold text-text-subtlest">
          카테고리별 탐색
        </span>
        <CategorySection
          onCategoryClick={() => handleOpenFilter('category')}
          appliedFilters={appliedFilters}
        />
      </div>

      <FilterBottomSheet
        key={filterKey}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSearchResult={(data, filters) => {
          setResults(data, filters);
          router.push('/customer/search');
          setIsFilterOpen(false);
        }}
        initialFilters={appliedFilters}
        initialOpenFilter={initialOpenFilter}
      />
    </section>
  );
}
