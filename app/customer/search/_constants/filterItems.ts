import type { StoreSearchParams } from '@/app/customer/search/_types/store.type';
// 바텀시트 순서
export const FILTER_ITEMS: { key: keyof StoreSearchParams; label: string }[] = [
  { key: 'district', label: '위치' },
  { key: 'pickupDate', label: '픽업 날짜' },
  { key: 'quantity', label: '수량' },
  { key: 'budget', label: '1인당 예산' },
  { key: 'category', label: '카테고리' },
];

// 검색결과 페이지 칩순서
export const FILTER_CHIPS_ITEMS: { key: keyof StoreSearchParams; label: string }[] = [
  { key: 'district', label: '위치' },
  { key: 'pickupDate', label: '픽업 날짜' },
  { key: 'category', label: '카테고리' },
  { key: 'quantity', label: '수량' },
  { key: 'budget', label: '1인당 예산' },
];
