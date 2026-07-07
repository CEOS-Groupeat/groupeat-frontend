'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchStores } from '@/hooks/useSearchStores';
import type {
  SearchStoresResponse,
  StoreSearchParams,
} from '@/app/customer/search/_types/store.type';
import { FILTER_ITEMS } from '../_constants/filterItems';
import { formatChipLabel } from '../_utils/formatChipLabel';

import DownArrow from '@/public/icons/icon_arrow_down.svg';
import UpArrow from '@/public/icons/icon_arrow_up.svg';
import Reset from '@/public/icons/icon_reset.svg';
import Close from '@/public/icons/icon_close.svg';

import LocationFilter from '../_components/filters/LocationFilter';
import QuantityFilter from '../_components/filters/QuantityFilter';
import DateFilter, {
  formatPickupDate,
  formatPickupTime,
} from '../_components/filters/DateFilter';
import BudgetFilter from '../_components/filters/BudgetFilter';
import CategoryFilter from '../_components/filters/CategoryFilter';

// ─── Props ──────────────────────────────────────────
interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchResult: (
    data: SearchStoresResponse,
    filters?: StoreSearchParams
  ) => void;
  initialFilters?: StoreSearchParams;
  initialOpenFilter?: keyof StoreSearchParams;
}
// ─── 스냅 포인트 ─────────────────────────────────────
type SnapPoint = 'half' | 'full';
const SNAP_HEIGHTS: Record<SnapPoint, string> = {
  half: '50dvh',
  full: '85dvh',
};
const DRAG_THRESHOLD = 60;

export default function FilterBottomSheet({
  isOpen,
  onClose,
  onSearchResult,
  initialFilters = {},
  initialOpenFilter,
}: FilterBottomSheetProps) {
  const [snap, setSnap] = useState<SnapPoint>(
    initialOpenFilter ? 'full' : 'half'
  );
  const [filters, setFilters] = useState<StoreSearchParams>(initialFilters);
  const [openFilter, setOpenFilter] = useState<keyof StoreSearchParams | null>(
    initialOpenFilter ?? null
  );

  const { isLoading, search } = useSearchStores();
  const dragStartY = useRef(0);
  const dragStartSnap = useRef<SnapPoint>('half');

  // ── 닫기 ──
  const handleClose = useCallback(() => {
    setSnap('half');
    onClose();
  }, [onClose]);

  // ── 재설정 ──
  const handleReset = () => {
    setFilters({});
    setOpenFilter(null);
  };

  // ── 바디 스크롤 잠금 ──
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ── ESC 닫기 ──
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, handleClose]);

  // ── 드래그 ──
  const handleDragStart = (e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
    dragStartSnap.current = snap;
    const onUp = (up: PointerEvent) => {
      const delta = up.clientY - dragStartY.current;
      if (dragStartSnap.current === 'half') {
        if (delta < -DRAG_THRESHOLD) setSnap('full');
        else if (delta > DRAG_THRESHOLD) handleClose();
      } else {
        if (delta > DRAG_THRESHOLD) setSnap('half');
      }
      document.removeEventListener('pointerup', onUp);
    };
    document.addEventListener('pointerup', onUp);
  };

  // ── 필터 업데이트 헬퍼 ──
  const updateFilter = <K extends keyof StoreSearchParams>(
    key: K,
    value: StoreSearchParams[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ── 칩 삭제 ──
  const handleRemoveFilter = (key: keyof StoreSearchParams) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      if (key === 'pickupDate') delete next['pickupTimes']; // ✅ 함께 삭제
      return next;
    });
  };

  // ── 검색 ──
  const handleSearch = async () => {
    const result = await search(filters);
    onSearchResult(
      result ?? { storeList: [], totalElements: 0 },
      filters // 필터 같이 전달
    );
    handleClose();
  };

  // ── 파생 상태 ──
  const selectedChips = FILTER_ITEMS.filter(
    (item) => filters[item.key] !== undefined
  );
  const hasFilter = selectedChips.length > 0;

  return (
    <div
      className={`fixed inset-0 z-modal transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}
    >
      {/* 오버레이 */}
      <button
        type="button"
        aria-label="상세 검색 닫기"
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* 시트 */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        style={{ height: SNAP_HEIGHTS[snap] }}
        className={`absolute bottom-0 left-1/2 flex w-full max-w-[480px] flex-col
          -translate-x-1/2 bg-background-default rounded-t-[36px]
          transition-[transform,height] duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* 드래그 핸들 */}
        <div
          onPointerDown={handleDragStart}
          className="flex shrink-0 flex-col items-center pt-3 pb-1 cursor-grab active:cursor-grabbing touch-none"
        >
          <div className="h-1 w-10 rounded-full bg-border-subtle" />
        </div>

        {/* 헤더 */}
        <header className="shrink-0 h-14 border-b border-border-subtle shadow-[0px_0px_9px_0px_rgba(0,0,0,0.04)] flex items-center justify-center">
          <h2
            id="sheet-title"
            className="text-lg font-semibold text-text-default"
          >
            상세 검색
          </h2>
        </header>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto pt-4 pb-4">
          {/* 선택된 필터 칩 */}
          {selectedChips.length > 0 && (
            <div className="px-4 mb-4 flex flex-wrap gap-2">
              {selectedChips.map((item) => (
                <div
                  key={item.key}
                  className="pl-2.5 pr-3.5 py-2 bg-background-default rounded-full outline outline-1 outline-border-default inline-flex items-center gap-1"
                >
                  <button
                    type="button"
                    aria-label={`${item.label} 필터 삭제`}
                    onClick={() => handleRemoveFilter(item.key)}
                  >
                    <Close className="size-4 text-icon-subtle" />
                  </button>
                  <span className="text-xs text-text-default">
                    {formatChipLabel(item.key, filters[item.key])}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 필터 목록 */}
          <div className="px-4 flex flex-col gap-3.5">
            {FILTER_ITEMS.map((item) => {
              const isExpanded = openFilter === item.key;
              const selectedValue = filters[item.key];
              const closeFilter = () => setOpenFilter(null);

              return (
                <div
                  key={item.key}
                  className={`flex flex-col ${isExpanded ? 'pb-6 border-b border-border-subtle' : ''}`}
                >
                  {/* 필터 행 */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFilter((prev) =>
                        prev === item.key ? null : item.key
                      )
                    }
                    className={`h-11 pb-3 flex items-center justify-between ${isExpanded ? '' : 'border-b border-border-subtle'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-text-default">
                        {item.label}
                      </span>
                      {selectedValue !== undefined &&
                        !isExpanded &&
                        (item.key === 'pickupDate' ? (
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-brand-default leading-4">
                              {formatPickupDate(selectedValue as string)}
                            </span>
                            {filters.pickupTimes && (
                              <>
                                <div className="size-[2.5px] bg-brand-default rounded-full" />
                                <span className="text-xs font-medium text-brand-default leading-4">
                                  {formatPickupTime(filters.pickupTimes[0])}
                                </span>
                              </>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs font-medium text-brand-default leading-4">
                            {formatChipLabel(item.key, selectedValue)}
                          </span>
                        ))}
                    </div>
                    {isExpanded ? (
                      <UpArrow className="size-5 text-icon-default" />
                    ) : (
                      <DownArrow className="size-5 text-icon-subtlest" />
                    )}
                  </button>

                  {/* 각 필터 컴포넌트 — 조건만 여기서, 로직은 컴포넌트 안에 */}
                  {isExpanded && item.key === 'region' && (
                    <LocationFilter
                      value={filters.region}
                      onChange={(v) => updateFilter('region', v)}
                      onConfirm={closeFilter}
                    />
                  )}
                  {isExpanded && item.key === 'pickupDate' && (
                    <div className="mt-3">
                      <DateFilter
                        date={filters.pickupDate}
                        times={filters.pickupTimes ?? []}
                        onDateChange={(v) => updateFilter('pickupDate', v)}
                        onTimeChange={(times) =>
                          updateFilter('pickupTimes', times)
                        }
                      />
                    </div>
                  )}
                  {isExpanded && item.key === 'quantity' && (
                    <QuantityFilter
                      value={filters.quantity}
                      onChange={(v) => updateFilter('quantity', v)}
                      onConfirm={closeFilter}
                    />
                  )}
                  {isExpanded && item.key === 'budget' && (
                    <BudgetFilter
                      value={filters.budget}
                      onChange={(v) => updateFilter('budget', v)}
                    />
                  )}
                  {isExpanded && item.key === 'category' && (
                    <CategoryFilter
                      value={filters.category}
                      onChange={(v) => updateFilter('category', v)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 푸터 */}
        <footer className="shrink-0 px-4 pt-4 pb-6 bg-background-default border-t border-border-subtle flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            disabled={!hasFilter}
            className="flex items-center gap-1 text-base font-medium text-text-subtlest disabled:opacity-40"
          >
            <Reset className="size-6 text-icon-subtlest" />
            재설정
          </button>
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading || !hasFilter}
            className={`w-64 h-12 rounded-[36px] text-base font-bold transition-colors ${
              hasFilter
                ? 'bg-brand-default text-text-inverse'
                : 'bg-background-subtlest text-text-subtle cursor-not-allowed'
            }`}
          >
            {isLoading ? '검색 중...' : '검색하기'}
          </button>
        </footer>
      </section>
    </div>
  );
}
