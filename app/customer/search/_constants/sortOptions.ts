import type { StoreSearchParams } from '@/app/customer/search/_types/store.type';

export type SortValue = NonNullable<StoreSearchParams['sortType']>;

export const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'NONE', label: '전체(가나다 순)' },
  { value: 'DISCOUNT_DESC', label: '할인율 높은 순' },
  { value: 'PRICE_ASC', label: '가격 낮은 순' },
  { value: 'PRICE_DESC', label: '가격 높은 순' },
  { value: 'ORDER_DESC', label: '주문 많은 순' },
  { value: 'RATING_DESC', label: '별점 높은 순' },
];
